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

const { width, height } = Dimensions.get("window");

class HomeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidoId: 23,
      nomeProdutoText: '',
      quantidadeText: '',
      precoText: '',
      meioPagamentoText: '',
      screenName: 'TabsVendedor',
      nomeClienteText: '',
      imagemProduto: require('./img/camera2.jpg'),
      imagemCliente: require('./img/camera2.jpg'),
      gps: 0,
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId
    };
    this.buscaDadosPedido();
  };

  buscaDadosPedido() {
    //TODO: Trazer apenas dados dos pedidos solicitados
    fetch(constante.ENDPOINT+'pedido/' + this.state.pedidoId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson.produto.imagemPrincipal) {
              this.setState({imagemProduto: { uri: responseJson.produto.imagemPrincipal } })
            }
            if (responseJson.cliente.usuario.imagemPerfil) {
              this.setState({imagemCliente: { uri: responseJson.cliente.usuario.imagemPerfil } })
            }
          this.setState({nomeProdutoText: responseJson.produto.nome});
          this.setState({quantidadeText: responseJson.quantidade});
          this.setState({precoText: responseJson.valorCompra});
          this.setState({meioPagamentoText: responseJson.pagamento.descricao});
          this.setState({nomeClienteText: responseJson.cliente.usuario.nome});
        }
      });
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

  cancelarPedido() {
      this.popup.confirm({
          title: 'Recusar Pedido',
          content: ['Deseja realmente cancelar esse pedido?'],
          ok: {
              text: 'Confirmar',
              style: {
                  color: 'green',
                  fontWeight: 'bold'
              },
          },
          cancel: {
              text: 'Cancelar',
              style: {
                  color: 'red'
              }
          }
      });
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
              <View style={styles.oneResult}>
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
                       <Text style={styles.totalFont}> {this.state.nomeClienteText}</Text>
                       <Text style={styles.oneResultfont}>Fez um pedido!
                       </Text>
                     </View>
                   </View>
                     <View style={{paddingTop:10}}>
                      <Text style={styles.oneResultfont}>Quantidade:
                        <Text style={styles.totalFont}> {this.state.quantidadeText}{'\n'}</Text>
                      </Text>
                      <Text style={styles.oneResultfont}>Total a pagar em {this.state.meioPagamentoText}:
                      </Text>
                      <Text style={styles.totalFont}> R$ {this.state.precoText}{'\n'}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, paddingTop:10}}>

                      <Button title ="Recusar"
                              color="#fff"
                              backgroundColor="#88557B"
                              borderRadius={10}
                              large={true}
                              onPress={this.cancelarPedido.bind(this)}/>

                      <Button title="Aceitar"
                              color="#fff"
                              backgroundColor="#768888"
                              borderRadius={10}
                              large={true}/>

                      </View>
                    </View>
                  </View>
               </View>
             </View>
             <Popup ref={popup => this.popup = popup }/>
          </View>
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
    height: 250,
    borderRadius: 10
  }
});

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
