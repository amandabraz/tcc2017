import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
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
import { Fumi } from 'react-native-textinput-effects';
import {
  Icon,
  Button
} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class ExibeComprovante extends Component {
  constructor(props) {
   super(props);

   this.state = {
     nomeProdutoText: '',
     quantidadeText: '',
     precoText: '',
     tokenText: ''
   }
  }

  //TODO: Implementar busca para tela do comprovante
  onButtonVoltar = () => {
    this.props.navigation.navigate('ExibeComprovante');
  };

  //render
  render() {
    //retorno
    return (

      <ScrollView>
      <View style={styles.container}>
        <Image source={require('./img/fundo2.png')} style={styles.background}>
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
