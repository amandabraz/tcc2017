import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import StartTimerLocation from '../localizacao/TimerGeolocation.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import {Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import Chart from 'react-native-chart';

const { width, height } = Dimensions.get("window");

class HomeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gps: 0,
        userId: this.props.navigation.state.params.userId,
        vendedorId: this.props.navigation.state.params.vendedorId,
        imagemProduto: require('./img/camera2.jpg'),
        imagemCliente: require('./img/camera2.jpg'),
        dataSolicitada:'',
        pedidoSolicitado: {
          id:'',
          status:'',
          quantidade:'',
          valorCompra:'',
          produto: {
            nome:''
          },
          cliente: {
            usuario: {
              nome: ''
            }
          },
          pagamento: {
            descricao:''
          }
        }
    };
    this.buscaDadosPedido();
  };

  buscaDadosPedido() {
    fetch(constante.ENDPOINT+'pedido/data/vendedor/' + this.state.vendedorId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.setState({pedidoSolicitado: responseJson});
            if (responseJson.cliente.usuario.imagemPerfil) {
              this.setState({imagemCliente: {uri: responseJson.cliente.usuario.imagemPerfil }})
          }
            if (responseJson.produto.imagemPrincipal) {
              this.setState({imagemProduto:{ uri: responseJson.produto.imagemPrincipal }})
        }
        var dataNormal = new Date(responseJson.dataSolicitada);
        var dataS = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
        this.setState({dataSolicitada: dataS})
      }});
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
      // timer ajustado para cada 10 minutos
      StartTimerLocation.start(60000, this.state.userId);
    }, (error) => {
      this.setState({gps: 0});
    });
  }

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({pedidoSolicitado: []})
          this.buscaDadosPedido();
          this.pedidoSolicitado();
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
}

  cancelarPedido(pedido) {
      this.popup.confirm({
          title: 'Recusar Pedido',
          content: ['Deseja realmente cancelar esse pedido?'],
          ok: {
              text: 'Confirmar',
              style: {
                  color: 'green',
                  fontWeight: 'bold'
              },
              callback: () => {
                this.state.pedidoSolicitado.status = "Recusado";
                this.atualizaStatus(this.state.pedidoSolicitado);
                }
          },
          cancel: {
              text: 'Cancelar',
              style: {
                  color: 'red'
              }
          }
      });
  }

  pedidoSolicitado(){
    var views = [];
    if(this.state.pedidoSolicitado.id){
    views.push(
    <View key={1} style={styles.oneResult}>
      <View style={{flexDirection: 'row'}}>
        <View style = {{ width: '30%'}}>
          <Image source={this.state.imagemProduto}
                 style={styles.imagemProduto}/>
        </View>
        <View style={{width: '68%', paddingLeft: 5}}>
          <View style={{flexDirection: 'row'}}>
           <View style = {{ width: '30%'}}>
             <Image source={this.state.imagemCliente}
                    style={styles.imagemCliente}/>
           </View>
           <View style={{width: '70%'}}>
             <Text style={styles.totalFont}> {this.state.pedidoSolicitado.cliente.usuario.nome}</Text>
             <Text style={styles.oneResultfont}>Fez um pedido!</Text>
             <Text style={{fontSize:18}}>{this.state.dataSolicitada}</Text>
           </View>
         </View>
           <View style={{paddingTop:10}}>
           <Text style={styles.oneResultfont}>Produto:
             <Text style={styles.totalFont}> {this.state.pedidoSolicitado.produto.nome}{'\n'}</Text>
           </Text>
            <Text style={styles.oneResultfont}>Quantidade:
              <Text style={styles.totalFont}> {this.state.pedidoSolicitado.quantidade}{'\n'}</Text>
            </Text>
            <Text style={styles.oneResultfont}>Total a pagar em {this.state.pedidoSolicitado.pagamento.descricao}:
            </Text>
            <Text style={styles.totalFont}> R$ {this.state.pedidoSolicitado.valorCompra}{'\n'}</Text>

          </View>
        </View>
     </View>
     <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, paddingTop:10}}>

     <Button title ="Recusar"
             color="#fff"
             backgroundColor="#88557B"
             borderRadius={10}
             onPress = {() =>this.cancelarPedido(this.state.pedidoSolicitado)}
             buttonStyle={{width: 80}}/>

     <Button title="Aceitar"
             color="#fff"
             backgroundColor="#768888"
             borderRadius={10}
             buttonStyle={{width: 80}}
             onPress={() => {
                    this.state.pedidoSolicitado.status = "Confirmado";
                    this.atualizaStatus(this.state.pedidoSolicitado);
                  }}/>

     </View>
   </View>
 )} else {
   views.push(
     <View key={0} style={{alignItems: 'center'}}>
     <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
       Você não tem nova solicitação! :(
     </Text>
     </View>
   )}

   return views;
}

  render() {
    if (this.state.gps === 0 || typeof this.state.gps === "undefined") {
      return(<LocalizacaoNaoPermitida
        screenName={this.state.screenName}
        navigation={this.props.navigation}
        userId={this.state.userId} />
      );
    } else {
      return(
        <View style={{flex:1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="#768888"/>
            <View style={styles.container}>
              {this.pedidoSolicitado()}
            </View>
           <Popup ref={popup => this.popup = popup }/>
        </View>
      )
  }
 }
}

const titleConfig = {
  title: 'Home',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%'
  },
  oneResultfontTitle:{
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    paddingLeft: 20
  },
  oneResultfont:{
    color: '#1C1C1C',
    fontSize: 18,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imagemCliente:{
    width: 60,
    height: 60,
    borderRadius: 100
  },
  imagemProduto:{
    width: '98%',
    height: 190,
    borderRadius: 10
  }
});

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
