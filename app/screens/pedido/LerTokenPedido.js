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
import QRCodeScanner from 'react-native-qrcode-scanner';
import Popup from 'react-native-popup';

const { width, height } = Dimensions.get("window");

class LerTokenPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidoId: this.props.navigation.state.params.pedidoId,
      token: this.props.navigation.state.params.token
    }
  };


  tokenInvalido() {
      this.popup.tip({
          title: 'Token Inválido',
          content: 'Esse Token é inválido'
      }
    );
  }

render() {
  return(
  <View style={{flex: 1, margin: 15, alignItems:'center', width: '95%'}}>
  <QRCodeScanner
    reactivate={true}
    showMarker={true}
    fadeIn={true}
    cameraStyle={{width: '90%', alignSelf:'center'}}
    onRead = {(tokenLido) => {
        if(tokenLido.data != this.state.token){
          this.tokenInvalido();
        } else {
          ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
          this.props.navigation.navigate('PedidosVendedor', {tokenOK: "ok"});
        }
      }}
  topContent={(
      <Text style={{fontSize: 18, justifyContent: 'center'}}>
        Leia o token para finalizar o pedido</Text>)}
        />
        <Popup ref={popup => this.popup = popup }/>
</View>
    );
  }
}
LerTokenPedido.defaultProps = { ...LerTokenPedido };

export default LerTokenPedido;
