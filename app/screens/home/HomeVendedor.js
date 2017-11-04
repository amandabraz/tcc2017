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
  RefreshControl
} from 'react-native';
import StartTimerLocation from '../localizacao/TimerGeolocation.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import {Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import Switch from 'react-native-customisable-switch';
import * as constante from '../../constantes';
import OneSignal from 'react-native-onesignal';

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
        informacoes: '',
        filtroMensal: true,
        alturaPedido: '1%',
        alturaResumo: '100%'
    };
    this.buscaDadosPedido();
    this.buscaInformacoes();
  };

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    //salvar token do onesignal no nosso banco
    var token = this.onIds;

    if (token) {
      vendedorEditado = {
        "id": this.state.vendedorId,
        "token": token.userId
      }
      fetch(constante.ENDPOINT + 'token', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendedorEditado)})
      .then((response) => response.json())
      .then((responseJson) => { 
        if (!responseJson.errorMessage) {
          console.log('Token salvo para usuario');
        }        
      })
    }
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('registered', this.onRegistered);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
      console.log("Device has been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
    return device;
  }

  buscaDadosPedido() {
    fetch(constante.ENDPOINT+'pedido/'+ 'Solicitado' + '/vendedor/' + this.state.vendedorId, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.setState({pedidoSolicitado: responseJson});
            this.setState({alturaPedido: '40%'});
            this.setState({alturaResumo: '50%'});
            if (responseJson.cliente.usuario.imagemPerfil) {
              this.setState({imagemCliente: {uri: responseJson.cliente.usuario.imagemPerfil }})
            }
            if (responseJson.produto.imagemPrincipal) {
              this.setState({imagemProduto:{ uri: responseJson.produto.imagemPrincipal }})
            }
            var dataNormal = new Date(responseJson.dataSolicitada);
            var dataS = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear() + 
                        " - "+dataNormal.getHours() + ":" + (dataNormal.getMinutes()<10?"0"+dataNormal.getMinutes():dataNormal.getMinutes());
            this.setState({dataSolicitada: dataS})
            this.setState({refreshing:false});
      }});
  };

  buscaInformacoes(){
    fetch(constante.ENDPOINT+'pedido/qtd/ncliente/vendedor/' + this.state.vendedorId + '/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
          this.setState({informacoes: responseJson});
          this.setState({refreshing:false});
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
          this.setState({alturaResumo: '100%'});
          this.setState({alturaPedido: '1%'});
          this.setState({refreshing:false});
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

  escolherData(value) {
    value =!this.state.filtroMensal;
     this.setState({filtroMensal: value});
    this.buscaInformacoes();
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
            <ScrollView refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.setState({refreshing:true});
                    this.pedidoSolicitado();
                    this.buscaInformacoes();
                  }}
                />
              }>
                <View style={{height: this.state.alturaPedido}}>
                  {this.pedidoSolicitado()}
                </View>
                <View style={{height:this.state.alturaResumo}}>
                <View style={styles.oneResultResumo}>
                <View style={{alignItems: 'flex-end'}}>
                  <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 12, padding: 5, alignSelf: 'center'}}>
                        Semanal
                      </Text>
                      <Switch value = {this.state.filtroMensal}
                              onChangeValue = {(value) => this.escolherData(value)}
                              switchWidth = {40}
                              switchHeight = {18}
                              buttonWidth = {16}
                              buttonHeight = {16}/>
                      <Text style={{fontSize: 12, paddingLeft: 5, alignSelf: 'center'}}>
                         Mensal
                      </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', height: '30%'}}>
                <View style={{width: '50%', alignItems: 'center'}}>
                  <Text style={{fontSize: 14, alignSelf: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: 'crimson'}}>
                      {this.state.informacoes.numeroClientes + ' '}
                    </Text>
                       Clientes conquistados
                    </Text>
                  <Image source={require('./img/iconp.png')}/>
               </View>
               <View style={{width: '50%', alignItems: 'center'}}>
               <Text style={{fontSize: 14, alignSelf: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'crimson'}}>
                  {this.state.informacoes.quantidadeVendida + ' '}
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
                    R$ {this.state.informacoes.valorRecebido}
                  </Text>
                  <Text style={{fontSize: 18, alignSelf: 'center'}}>
                     Reais obtidos
                  </Text>
                    </View>
                  </View>
                </View>
              </View>
              </ScrollView>
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
