
/**
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
  View,
  Button
} from 'react-native';

//importando o que foi criado
import MTextInput from "../../components/mTextInput/MTextInput.js";
import MButton from "../../components/mButton/MButton.js";

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {
  cadastrar = () => {
    this.props.navigation.navigate('Vendedor');
  };
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
              <MButton
              title={'Entrar'}
              textOnClick={'Bem vindo!'}
              accessibilityLabel={"Botão de login"}
              color={'#50a1e0'}
              />
              <Button
              title={'Cadastre-se!'}
              onPress={this.cadastrar}
              accessibilityLabel={"Botão de cadastro"}
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
    justifyContent: 'center',
    alignItems: 'center',
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
