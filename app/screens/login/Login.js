
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
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';

//importando o que foi criado
import MTextInput from "../../components/mTextInput/MTextInput.js";
import MButton from "../../components/mButton/MButton.js";

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {
  constructor(props) {
   super(props);

   this.state = {
     email: '',
     senha:'',
     backgroundColorEmail: "transparent",
     backgroundColorSenha: "transparent",
   }
  }

  validaCampos = (login) => {
    var camposVazios = "";
    //validar Email
    if (!login.email) {
      camposVazios += "Email";
      this.setState({backgroundColorEmail: 'rgba(255, 0, 0, 0.3);'});
    }
    //validar senha
    if (!login.senha) {
      if (camposVazios) {
        camposVazios += ", senha";
        this.setState({backgroundColorSenha: 'rgba(255, 0, 0, 0.3);'});
      } else {
        camposVazios += "senha";
        this.setState({backgroundColorSenha: 'rgba(255, 0, 0, 0.3);'});
      }
    }
    if (camposVazios) {
      ToastAndroid.showWithGravity('Campos com preenchimento obrigatório.' , ToastAndroid.LONG, ToastAndroid.CENTER);
      return false;
    }
    this.setState({backgroundColorEmail: 'transparent'});
    this.setState({backgroundColorSenha: 'transparent'});
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

    if (continuar) {
      fetch('http://10.0.2.2:8080/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(login)
      })
        .then((response) => response.json())
        .then((responseJson) => {
        ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
        this.props.navigation.navigate('Cliente');
      })
        .catch((error) => {
        Alert.alert("error Response", JSON.stringify(error));
        console.error(error);
      });
    }

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
                style={{ backgroundColor: this.state.backgroundColorEmail }}
                onChangeText = {
                  (email) => {
                    if (this.validaEmail(email)) {
                      this.setState({email: email});
                      this.setState({backgroundColorEmail: 'transparent'});
                    } else {
                      this.setState({backgroundColorEmail: 'rgba(255, 0, 0, 0.3);'});
                    }
                  }
                }
                label={'seu_email@provedorbacana.com'}
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
});
