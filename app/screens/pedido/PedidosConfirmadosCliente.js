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
import {Icon,Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import QRCode from 'react-native-qrcode';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';
import Camera from 'react-native-camera';

const { width, height } = Dimensions.get("window");

class PedidosConfirmadosCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      pedidosConfirmados: [],
    };
    this.buscaDadosPedidosCliente();
  };

  buscaDadosPedidosCliente() {
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Confirmado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosConfirmados: responseJson});
        }
      });
  };

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosCliente();
          this.setState({pedidosConfirmados: []});
          this.pedidoConfirmado();
          ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }


pedidoConfirmado(){
  var views = [];
  if(this.state.pedidosConfirmados.length > 0){
    for (i in this.state.pedidosConfirmados){
      let pedidoC = this.state.pedidosConfirmados[i];
      views.push(
        <View key={i} style={styles.oneResult1}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
          <View style = {{ width: '20%'}}>
          <Image source={{uri: pedidoC.produto.vendedor.usuario.imagemPerfil}}
                 style={styles.imagemPrincipal}/>
          </View>
        <View style={{width: '65%', alignSelf:'center'}}>
          <Text style={styles.totalFont}> {pedidoC.produto.vendedor.usuario.nome}</Text>
           <Text style={styles.oneResultfont}> Receber:
           <Text style={styles.totalFont}> {pedidoC.quantidade}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Produto:
           <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Pagar {pedidoC.pagamento.descricao}:
           <Text style={styles.totalFont}> R$  {pedidoC.valorCompra}</Text>
           </Text>
        </View>
        <View style={{width: '5%',justifyContent: 'center'}}>
        <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
        </View>
    </View>
        } content={
          <View style={{margin: 15, alignItems:'center'}}>
          <View style = {{ alignItems: 'center'}}>
          <QRCode
            value={this.state.tokenText}
            size={200}
            bgColor='black'
            fgColor='white'/>
            </View>
          <Text style={styles.tokenfont}> {pedidoC.token}</Text>
        </View>

            }
        underlayColor="white"
        easing="easeOutCubic"/>
    </View>
    )}
 } else {
   views.push(
     <View key={0} style={{alignItems: 'center'}}>
     <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: 'darkslategrey'}}>
       Nenhum pedido confirmado.
     </Text>
     </View>
   )
 }
 return views;
}

  render() {
    return(
      <View style={styles.container}>
      <ScrollView>
        <View style = {{margin: 5}}>
          <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#6E6362', fontWeight: 'bold'}}>
            Pedidos Confirmados
          </Text>
        </View>
        {this.pedidoConfirmado()}
      </ScrollView>
      <Popup ref={popup => this.popup = popup }/>
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
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
  imagemProduto:{
    width: '98%',
    height: 100,
    borderRadius: 10
  },
  imagemPrincipal:{
    width: '98%',
    height: 80,
    borderRadius: 10
  }
});

PedidosConfirmadosCliente.defaultProps = { ...PedidosConfirmadosCliente };

export default PedidosConfirmadosCliente;
