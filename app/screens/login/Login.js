
4/**
  Interface de Login para o usuário.
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

//importando o input que criei
import MTextInput from "../../components/mTextInput/MTextInput.js";

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/cupcakes.jpg')} style={styles.background}>
            <View style={styles.centralView}>
              <Text style={styles.title}>Bem-Vindo(a)!</Text>
              <MTextInput
              exampleText={'seu_email@provedorbacana.com'}
              keyboardType={'email-address'}
              />
              <MTextInput
              exampleText={'123456'}
              secureTextEntry={true}
              />
            </View>
        </Image>
      </View>
    );
  }
}

//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#95c9db',
    fontWeight: 'bold',
    fontSize: 40,
  },
  background: { //tornando a imagem do tamanho da tela
    width,
    height,
    flex: 1,
    resizeMode: 'cover',
  },
  centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 108, 122, 0.7)',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
});
