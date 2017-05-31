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
      <View style={styles.login_container}>
        <Image source={require('./img/cupcakes.jpg')} style={styles.background}>
            <View style={styles.login_centralView}>

              <Text style={styles.login_title}>Bem-Vindo(a)!</Text>

              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({text})}
                value={'seu_email@provedorbacana.com'}
                underlineColorAndroid={'#e2b1a3'}
                keyboardType = {'email-address'}
                value={this.state.login}
              />

              <TextInput
                style={styles.login_input}
                onChangeText={(text) => this.setState({text})}
                value={'12345'}
                underlineColorAndroid={'#e2b1a3'}
                secureTextEntry = {true}
                value={this.state.senha}
              />

              <TouchableOpacity
                style={styles.login_button}
                onPress={this.onButtonPress}
                accessibilityLabel={'Botão de login'}>
                  <Text style={styles.login_buttonFont}>{'Entrar'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.login_button}
                onPress={this.onButtonPress}
                accessibilityLabel={'Botão de cadastro'}>
                  <Text style={styles.login_buttonFont}>{'Cadastre-se!'}</Text>
              </TouchableOpacity>

            </View>
        </Image>
      </View>
    );
  }
}

//css
const styles = StyleSheet.create({
  login_container: {
    flex: 1,
  },
  login_title: {
    fontFamily: 'Roboto',
    color: '#95c9db',
    fontWeight: 'bold',
    fontSize: 40,
  },
  login_background: { //tornando a imagem do tamanho da tela
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  login_centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 108, 122, 0.7)',
  },
  login_input:{
    width: 300,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: '#e2b1a3',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  login_button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#50a1e0',
    alignSelf: 'stretch',
  },
  login_buttonFont: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  },
});
