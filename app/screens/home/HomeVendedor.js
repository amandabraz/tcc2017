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
  TouchableOpacity,
  Animated,
  RefreshControl,
  Switch
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
        },
        refreshing: false,
        informacoes: [],
        data: true
    };
    this.buscaDadosPedido();
    this.buscaInformacoes();
  };

  buscaDadosPedido() {
    fetch(constante.ENDPOINT+'pedido/'+ 'Solicitado' + '/vendedor/' + this.state.vendedorId, {method: 'GET'})
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

  buscaInformacoes(){
    fetch(constante.ENDPOINT+'pedido/qtd/ncliente/vendedor/' + this.state.vendedorId + this.state.data, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
          this.setState({informacoes: responseJson});
      }});
  }

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
          this.setState({informacoes: []})
          this.buscaDadosPedido();
          this.pedidoSolicitado();
          this.buscaInformacoes();
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
                pedido.status = "Recusado";
                this.atualizaStatus(pedido);
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
             <Text style={{fontSize:14}}>{this.state.dataSolicitada}</Text>
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
            <Text style={styles.totalFont}> R$ {this.state.pedidoSolicitado.valorCompra}{'\n'}</Text>
            </Text>

          </View>
          <View style={{flexDirection: 'row', paddingTop:10}}>

          <Button title ="Recusar"
                  color="#fff"
                  backgroundColor="#88557B"
                  borderRadius={10}
                  onPress = {() =>this.cancelarPedido(this.state.pedidoSolicitado)}/>

          <Button title=" Aceitar "
                  color="#fff"
                  backgroundColor="#768888"
                  borderRadius={10}
                  onPress={() => {
                         this.state.pedidoSolicitado.status = "Confirmado";
                         this.atualizaStatus(this.state.pedidoSolicitado);
                       }}/>

          </View>
        </View>
     </View>
   </View>
 )}
  return views;
}

resumoVendas(){
  var views = [];
  var qtdProdutos = 0;
  var cliente = 0;
  var total = 0;
  if(this.state.informacoes.length > 0){
    for (i in this.state.informacoes) {
      let prod = this.state.informacoes[i];
      qtdProdutos = prod[0] + ' '
      cliente = prod[1] + ' '
      total = prod[2]
      views.push(
        <View key={1} style={styles.oneResultResumo}>
          <Switch
            onValueChange = {(value) => console.log(value) }/>
        <View style={{flexDirection: 'row', height: '30%'}}>
        <View style={{width: '50%', alignItems: 'center'}}>
          <Text style={{fontSize: 14, alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'crimson'}}>
              {cliente}
            </Text>
              Clientes conquistados
            </Text>
          <Image source={require('./img/iconp.png')}/>
       </View>
       <View style={{width: '50%', alignItems: 'center'}}>
       <Text style={{fontSize: 14, alignSelf: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: 'crimson'}}>
          {qtdProdutos}
        </Text>
            Produtos vendidos
        </Text>
        <Image source={require('./img/iconf.png')}/>
      </View>
      </View>
      <View style={{flexDirection: 'row', height: '60%', alignItems:'center'}}>
        <View style={{width: '50%'}}>
          <Image source={require('./img/carteira2.png')}/>
        </View>
        <View style={{width: '50%', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 30, alignSelf: 'center', color: 'cadetblue'}}>
            {total}
          </Text>
          <Text style={{fontSize: 18, alignSelf: 'center'}}>
             Reais
          </Text>
        </View>
    </View>
   </View>
  )}
 }
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
                <View style={{ height:'38%'}}>
                  {this.pedidoSolicitado()}
                </View>
                <View style={{ height:'50%'}}>
                  {this.resumoVendas()}
                </View>
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
    alignItems: 'center',
    height: '100%'
  },
  bar: {
    borderRadius: 5,
    height: 7,
    marginRight: 5
  },
  points: {
    backgroundColor: '#88557B'
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%',
     height: '98%'
  },
  produtosV:{
    margin: 6,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
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
    fontSize: 14,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imagemCliente:{
    width: 60,
    height: 60,
    borderRadius: 100
  },
  oneResultResumo:{
     flexDirection: 'column',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%',
     height: '100%'
  },
  imagemProduto:{
    width: '98%',
    height: '98%',
    borderRadius: 10
  }
});

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
