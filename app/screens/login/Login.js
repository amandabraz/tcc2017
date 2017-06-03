
/**
  Interface de Login para o usuário.
*/

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

//importando o que foi criado
import MTextInput from "../../components/mTextInput/MTextInput.js";

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {

  cadastrar = () => {
    this.props.navigation.navigate('Cadastro');
  };

  //evento no click do botão
  eventLogin = () => {
     Alert.alert('Bem-vindo!');
  };

  //render
  render() {

    //retorno
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

              <TouchableOpacity
              style={styles.button}
              onPress={this.eventLogin}
              accessibilityLabel={'Botão de login'}>
                  <Text style={styles.font}>{'Entrar'}</Text>
              </TouchableOpacity>

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
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  font: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  },
});
