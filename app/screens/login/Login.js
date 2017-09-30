import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import * as constante from '../../constantes';

import startTimerLocation from '../localizacao/TimerGeolocation.js';
import MyGeolocation from '../localizacao/MyGeolocation.js';


//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {

  componentDidMount(){
    MyGeolocation.returnPosition();
    // let loc = Geolocation.returnPosition();
    // Alert.alert(loc.latitude);
  }

  constructor(props) {
   super(props);

   this.state = {
     email: '',
     senha: ''
   }
  }

  esqueceuSenha = () => {
    Alert.alert("Programar envio por email..");
    //TODO: Colocar envio de recuperacao de senha por email
  }

  validaCampos = (login) => {
    var camposVazios = "";
    //validar Email
    if (!login.email) {
      camposVazios += " Email ";
    }
    //validar senha
    if (!login.senha) {
      if (camposVazios) {
        camposVazios += "e Senha ";
      } else {
        camposVazios += " Senha ";
      }
    }
    if (camposVazios) {
      ToastAndroid.showWithGravity('Campo (s) ' + camposVazios + 'com preenchimento obrigatório.' , ToastAndroid.LONG, ToastAndroid.CENTER);
      return false;
    }
    return true;
  }

  cadastrar = () => {
    this.props.navigation.navigate('Cadastro');
  };

  //evento no click do botão
  eventLogin = () => {
    const {
      state: {
        email, senha
      }
    } = this;
    login = {
      "email": email,
      "senha": senha,
    }

    let continuar = this.validaCampos(login);

    //https://auth0.com/blog/adding-authentication-to-react-native-using-jwt/
    //Link de exemplo, item Signing up Users and Acquiring a JWT

    if (continuar) {
      fetch(constante.ENDPOINT + 'usuario/login', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(login)
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson != null) {
              ToastAndroid.showWithGravity('Seja bem vindo!', ToastAndroid.LONG, ToastAndroid.CENTER);
              if (responseJson.usuario.perfil == "V") {
                this.props.navigation.navigate('TabsVendedor', {
                  userId: responseJson.usuario.id,
                  vendedorId: responseJson.id
                });
              } else if (responseJson.usuario.perfil == "C") {
                this.props.navigation.navigate('TabsCliente', {
                  userId: responseJson.usuario.id,
                  clienteId: responseJson.id
                });
              }
            }
          } else {
              Alert.alert("E-mail ou senha inválidos!");
          }
        })
        .catch((error) => {
          Alert.alert("error Response", JSON.stringify(error));
          console.error(error);
      });
    }

  };

  //render
  render() {
    //retorno
    return (

      <ScrollView>
      <View style={styles.container}>
        <Image source={require('./img/cupcakes.jpg')} style={styles.background}>
            <View style={styles.centralView}>
              <Text style={styles.title}>Bem-Vindo(a)!{'\n'}{'\n'}</Text>

              <TextInput
                style={styles.input}
                onChangeText = {
                  (email) => {
                    this.setState({email: email});
                  }
                }
                underlineColorAndroid={'#e2b1a3'}
                maxLength={40}
                placeholder = "seu_email@provedorbacana.com"
                placeholderTextColor = "#e2b1a3"
                keyboardType={'email-address'}
              />

              <TextInput
                style={styles.input}
                onChangeText = {
                  (senha) => this.setState({
                    senha: senha
                  })
                }
                underlineColorAndroid={'#e2b1a3'}
                maxLength={10}
                secureTextEntry={true}
                placeholder = "Senha"
                placeholderTextColor = "#e2b1a3"
              />

              <TouchableOpacity
              style={styles.button}
              onPress={this.eventLogin}
              accessibilityLabel={'Botão de login'}>
                  <Text style={styles.font}>{'Entrar'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.button}
              onPress={this.cadastrar}
              accessibilityLabel={'Botão de cadastro'}>
                  <Text style={styles.font}>{'Cadastre-se!'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={styles.buttonEsqueceuSenha}
              onPress={this.esqueceuSenha}
              accessibilityLabel={'Esqueceu sua senha'}>
                  <Text style={styles.fontEsqueciSenha}>{'\n'}{'Esqueci minha senha'}</Text>
              </TouchableOpacity>

            </View>
        </Image>
      </View>
      </ScrollView>
    );
  }
}

//css
const styles = StyleSheet.create({
  container: {
    flex: 3,
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
  buttonEsqueceuSenha: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  font: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  },
  fontEsqueciSenha: {
    width: 300,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
