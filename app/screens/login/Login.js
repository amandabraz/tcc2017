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

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {

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
    this.props.navigation.navigate('AceiteTermoUso');
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
        <Image source={require('./img/fofo.jpg')} style={styles.background}>
            <View style={styles.centralView}>
              <View style={{height: '32%', paddingTop: 20}}>
              <Image
                  style={styles.profilepic}
                  source={require('./img/amora-logo.png')}/>
              </View>
            <View style={{height: '60%', alignItems: 'center', padding:10}}>
            <Image
                  source={require('./img/amora-text.png')}/>

             <View style={{flexDirection:'row', alignItems: 'center', paddingTop: 16}}>
              <FontAwesomeIcon
                name='at'
                color='#0B2F3A'
                size = {18}/>
              <TextInput
                style={styles.input}
                onChangeText = {
                  (email) => {
                    this.setState({email: email});
                  }
                }
                underlineColorAndroid={'#0B2F3A'}
                maxLength={40}
                placeholder = " seu_email@provedor.com"
                placeholderTextColor = "#0B2F3A"
                keyboardType={'email-address'}
              />
              </View>
              <View style={{flexDirection:'row', alignItems: 'center'}}>
                <FontAwesomeIcon
                  name='lock'
                  color='#0B2F3A'
                  size = {18}/>
              <TextInput
                style={styles.input}
                onChangeText = {
                  (senha) => this.setState({
                    senha: senha
                  })
                }
                underlineColorAndroid={'#0B2F3A'}
                maxLength={10}
                secureTextEntry={true}
                placeholder = " senha"
                placeholderTextColor = "#0B2F3A"
                onSubmitEditing={this.eventLogin}
              />
              </View>

              <TouchableOpacity
              style={styles.button}
              onPress={this.eventLogin}
              accessibilityLabel={'Botão de login'}>
                  <Text style={styles.font}>{'Entrar'}</Text>
              </TouchableOpacity>

            <View style={{paddingTop:30}}>
            <Text style={styles.fonteNovo}>{'Novo por aqui?'}</Text>
            <TouchableOpacity
              accessibilityLabel={'Botão de cadastro'}>
                  <Text style={styles.fontC}>{'Cadastre-se'}</Text>
              </TouchableOpacity>
              </View>
              </View>
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
  background: { //tornando a imagem do tamanho da tela
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  centralView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'100%'
  },
  input:{
    width: 300,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: '#0B2F3A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profilepic:{
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 100
  },
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#80C1C4",
    alignSelf: 'stretch',
    borderRadius: 25
  },
  font: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  },
  fontC: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'#0B2F3A',
    alignSelf: 'center',
    textDecorationLine: 'underline'
  },
  fonteNovo: {
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 14,
    alignSelf: 'center'
  },
});
