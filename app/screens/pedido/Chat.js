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
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import * as constante from '../../constantes';
import { Keyboard } from 'react-native'
import {Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      otherUserId: this.props.navigation.state.params.otherUserId,
      otherUserName: this.props.navigation.state.params.otherUserName,   
      pedidoId: this.props.navigation.state.params.pedidoId,
      mensagemEnviada: '',
      mensagens: [],
      refreshing: false,      
      carregou: true
    }
    this.buscaMensagens();
  };

  buscaMensagens() {
    fetch(constante.ENDPOINT + 'mensagem/pedido/' + this.state.pedidoId, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (responseJson && !responseJson.errorMessage) {
            this.setState({mensagens: responseJson});
          }
          this.setState({carregou: false});
          this.setState({refreshing: false});          
      });
  };

  enviarMensagem() {
    Keyboard.dismiss();
    if (!this.state.mensagemEnviada) {
      return;
    }
    const {
      state: {
        userId,
        otherUserId,
        pedidoId,
        mensagemEnviada
      }
    } = this;
    mensagem = {
      "dataMsg": new Date(),
      "pedido": pedidoId,
      "receiver": otherUserId,
      "sender": userId,
      "conteudo": mensagemEnviada
    };
    fetch(constante.ENDPOINT + 'mensagem', {method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(mensagem)
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.errorMessage) {
      this.setState({mensagemEnviada: ''});
      var msgs = this.state.mensagens;
      msgs.push(responseJson);
      this.setState({mensagens: msgs});
      this.mensagens();
    } else {
      Alert.alert("Houve um erro ao enviar a mensagem, tente novamente");
    }
  })
  .catch((error) => {
    console.error(error);
  });
};

  mensagens(){
    var views = [];
    if (this.state.mensagens.length > 0) {
      for (i in this.state.mensagens) {
        let msg = this.state.mensagens[i];
        let dataNormal = new Date(msg.dataMsg);
        let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
        let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
        let ano = dataNormal.getFullYear();
        let hora = dataNormal.getHours();
        let min = dataNormal.getMinutes() < 10 ? "0" + dataNormal.getMinutes() : dataNormal.getMinutes();
        let dataEnv = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;
        
        if (msg.sender === this.state.userId) {
          views.push(
            <View key={i} style={{padding: 10, alignItems: 'flex-end'}}>
              <View style={{width: '75%', backgroundColor: '#fcf3cf', borderRadius: 10}}>
                <Text style={{margin: 10}}>{msg.conteudo}</Text>
              </View>
                <Text style={{fontSize: 11, color: '#ccc', alignItems: 'flex-end'}}>{dataEnv}</Text>
            </View>
          );
        } else {
          views.push(
            <View key={i} style={{padding: 10}}>
                <View style={{width: '75%', backgroundColor: '#f2f3f4', borderRadius: 10, justifyContent: 'flex-start'}}>
                  <Text style={{margin: 10}}>{msg.conteudo}</Text>
                </View>
                  <Text style={{fontSize: 11, justifyContent: 'flex-end', color: '#ccc'}}>{dataEnv}</Text>
            </View>
          );
        }
      }
    } else {
      views.push(
        <View key={0} style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
          <Icon name="comments-o" size={40} 
          color={'#ccc'} 
          type='font-awesome'
          style={{margin: 10}}/>
          <Text style={{color: "#ccc", fontSize: 15}}>Entre em contato!</Text>
        </View>
      );
    }
  return views;
}

render() {
  const titleConfig = {
    title: this.state.otherUserName,
    tintColor: "#4A4A4A",
    fontFamily: 'Roboto',
  };
  const {goBack} = this.props.navigation
  var DismissKeyboard = require('dismissKeyboard');
  
  return(
    <View style={{flex: 1}}>
    <NavigationBar
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialsIcon name="chevron-left" size={40} color={'#4A4A4A'}  style={{ padding: 3 }} />
          </TouchableOpacity>
        }
        title={titleConfig}
        />
      <View style={{height: '82%'}}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaMensagens();
            }}
          />
        }>
          {this.mensagens()}
        </ScrollView>
      </View>
      <Spinner visible={this.state.carregou}/>
      <View style={{height: '10%'}}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '90%'}}>
            <TextInput
              style={{height: 50, borderColor: '#ccd1d1', borderWidth: 1}}
              onChangeText={(text) => this.setState({mensagemEnviada: text})}
              placeholder='Digite aqui'
              placeholderTextColor='#ccd1d1'
              onSubmitEditing={() => this.enviarMensagem()}
              value={this.state.mensagemEnviada}
              />
          </View> 
          <View style={{width: '10%'}}>
            <TouchableOpacity onPress={() => this.enviarMensagem()} style={styles.EvenBtn}>
                <MaterialsIcon name="send" size={20} color={'#fff'} style={{ alignSelf: 'center', paddingTop: 15, paddingLeft: 5}}/>
            </TouchableOpacity>
          </View>
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
