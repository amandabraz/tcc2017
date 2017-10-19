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
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class LerTokenPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,      
      vendedorId: this.props.navigation.state.params.vendedorId,
      pedidoId: this.props.navigation.state.params.pedidoId,
      token: this.props.navigation.state.params.token,
      status: ''
    }
  };

  tokenInvalido() {
      this.popup.tip({
          title: 'Token Inválido',
          content: 'Esse Token é inválido'
      }
    );
  }

  atualizaStatus() {
    if (this.state.status) {
      fetch(constante.ENDPOINT + 'pedido/' + this.state.pedidoId + '/status/' + this.state.status, 
      {method: 'PUT'})
        .then((response) => response.json())
        .then((responseJson) => {
          if (!responseJson.errorMessage) {
            ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER); 
            this.props.navigation.navigate('Confirmados', {
                  userId: this.state.userId,
                  vendedorId: this.state.vendedorId
                });          
          } else {
            Alert.alert("Houve um erro ao finalizar o pedido, tente novamente");
          }
        });
    }
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
              this.state.status = "Finalizado";
              this.atualizaStatus();   
            }
          }}
        topContent={(
          <Text style={{fontSize: 14, fontWeight: 'bold', justifyContent: 'center'}}>
            Use o scanner e valide o QR Code do seu cliente para finalizar o pedido

          </Text>
        )}
            />
            <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }
}
LerTokenPedido.defaultProps = { ...LerTokenPedido };

export default LerTokenPedido;
