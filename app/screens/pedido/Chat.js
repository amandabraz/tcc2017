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
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'this.props.navigation.state.params.userId',
      clienteId: 'this.props.navigation.state.params.clienteId',      
      vendedorId: 'this.props.navigation.state.params.vendedorId',
      pedidoId: 'this.props.navigation.state.params.pedidoId',
      mensagemEnviada: '',
      mensagensRecebidas: [],
    }
  };

  buscaMensagens() {
    fetch(constante.ENDPOINT + 'mensagem/pedido/' + this.state.pedidoId, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.setState({mensagensRecebidas: responseJson})
          }
      });
  };
  
  //"dataMsg": "2017-11-13",
  //"pedido": 102,
  //"receiver": 97,
  //"sender": 88,
  //"conteudo": "teste 3"

  enviarMensagens() {
    fetch(constante.ENDPOINT + 'mensagem', {method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido)
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.errorMessage) {
      ToastAndroid.showWithGravity('Mensagem Enviada!', ToastAndroid.LONG, ToastAndroid.CENTER);
      this.props.navigation.navigate('ExibeComprovante',
      {pedidoId: responseJson.id,
      userId: this.state.userId,
      clienteId: this.state.clienteId});
    } else {
      Alert.alert("Houve um erro ao enviar a mensagem, tente novamente");
    }
  })
  .catch((error) => {
    console.error(error);
  });
};

  mensagemRecebida(){
      var views = [];
      if(this.state.mensagensRecebidas.length > 0){
        for (i in this.state.mensagensRecebidas) {
      views.push(
      <View key={i} style={{padding: 10}}>
        <View style={{width: '75%', backgroundColor: '#f2f3f4', borderRadius: 10, justifyContent: 'flex-start'}}>
          <Text style={{margin: 10}}>{this.state.mensagensRecebidas.conteudo}</Text>
        </View>
          <Text style={{fontSize: 11, justifyContent: 'flex-end', color: '#ccc'}}>{this.state.mensagensRecebidas.dataMsg}</Text>
    </View>
   );}
  }
  return views;
}
  mensagemEnviada(){
  return(
  <View style={{padding: 10, alignItems: 'flex-end'}}>
    <View style={{width: '75%', backgroundColor: '#fcf3cf', borderRadius: 10}}>
      <Text style={{margin: 10}}>{this.state.mensagemEnviada}</Text>
    </View>
      <Text style={{fontSize: 11, color: '#ccc', alignItems: 'flex-end'}}>18:23</Text>
  </View>
  )}
render() {
  const {goBack} = this.props.navigation
  return(
    <View style={{flex: 1}}>
    <NavigationBar
              leftButton={
                <TouchableOpacity onPress={() => goBack()}>
                  <MaterialsIcon name="chevron-left" size={40} color={'#4A4A4A'}  style={{ padding: 3 }} />
                </TouchableOpacity>
              }/>
        {this.mensagemRecebida()}
        {this.mensagemEnviada()}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
        <View style={{width: '90%'}}>
          <TextInput
            style={{height: 50, borderColor: '#ccd1d1', borderWidth: 1}}
            onChangeText={(text) => this.setState({mensagemEnviada})}
            placeholder='Digite aqui'
            placeholderTextColor='#ccd1d1'/>
        </View> 
        <View style={{width: '10%'}}>
          <TouchableOpacity style={styles.EvenBtn}>
              <MaterialsIcon name="send" size={20} color={'#fff'} style={{ alignSelf: 'center', paddingTop: 15, paddingLeft: 5}}/>
          </TouchableOpacity>
        </View>
      </View>     
      </View>
    </View>
    );
  }
}

let styles = StyleSheet.create({
EvenBtn: {
  backgroundColor: '#4A4A4A',
  height: 50,
  width: '100%'
}
})
Chat.defaultProps = { ...Chat };

export default Chat;
