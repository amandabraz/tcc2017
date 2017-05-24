/**
  Interface de Login para o usuário.
*/

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

//dimensão da janela
const { width, height } = Dimensions.get('window');

//Exporto essa classe pra que na minha 'Main'
export default class Login extends Component {

  //construtor da classe
  constructor(props){
    super(props);
    this.state = {
      login: '',
      senha: ''
    }
  }

  //procedimento que irá calcular as coisas
  onButtonPress = () => {

    //pegando valores do
    const{
      state:{
        login, senha
      }
    } = this;

    //verificando se login e senha existem
    login = {

    }

  }

  //construindo a classe
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/cupcakes.jpg')} style={styles.background}>
            <View style={styles.centralView}>

              <Text style={styles.title}>Bem-Vindo(a)!</Text>

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text})}
                value={'seu_email@provedorbacana.com'}
                underlineColorAndroid={'#e2b1a3'}
                keyboardType = {'email-address'}
                value={this.state.login}
              />

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text})}
                value={'12345'}
                underlineColorAndroid={'#e2b1a3'}
                secureTextEntry = {true}
                value={this.state.senha}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={this.onButtonPress}
                accessibilityLabel={'Botão de login'}>
                  <Text style={styles.buttonFont}>{'Entrar'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={this.onButtonPress}
                accessibilityLabel={'Botão de cadastro'}>
                  <Text style={styles.buttonFont}>{'Cadastre-se!'}</Text>
              </TouchableOpacity>

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
  input:{
    width: 300,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: '#e2b1a3',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#50a1e0',
    alignSelf: 'stretch',
  },
  buttonFont: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  },
});
