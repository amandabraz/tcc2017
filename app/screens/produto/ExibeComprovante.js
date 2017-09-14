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
     nomeProdutoText: 'Nome exemplo',
     quantidadeText: '01',
     precoText: '1.00',
     meioPagamentoText: 'dinheiro',
     tokenText: 'BLABLA123',
     nomeVendedorText: 'Nome vendedor exemplo'
   };
   this.buscaDadosPedido();
  }

  buscaDadosPedido() {
      //TODO: Implementar busca de pedido para tela do comprovante
  }

  onButtonVoltar = () => {
    this.props.navigation.navigate('ExibeComprovante');
  };

  //render
  render() {
    //retorno
    return (

      <ScrollView>
      <View style={styles.container}>
        <Image source={require('./img/comidinhas.jpg')} style={styles.background}>
            <View style={styles.oneResult}>
              <Image source={require('./img/sabrina-copy.jpg')}
                     style={styles.imageResultSearch}
                     justifyContent='flex-start'/>
              <View style={{width: 290, margin: 10}}>
                <Text style={styles.oneResultfontTitle} justifyContent='center'>{this.state.nomeProdutoText}</Text>
                <Text>{'\n'}{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Quantidade solicitada:    {this.state.quantidadeText}</Text>
                <Text>{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Total a pagar em {this.state.meioPagamentoText}:</Text>
                <Text style={styles.totalFont}>R$ {this.state.precoText}</Text>
                <Text>{'\n'}{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Verifique o token da sua compra feita com {this.state.nomeVendedorText}:</Text>
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
  title: {
    fontFamily: 'Roboto',
    color: '#95c9db',
    fontWeight: 'bold',
    fontSize: 40,
  },
  background: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  profilepicWrap:{
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profilepic:{
    flex: 1,
    width: null,
    borderRadius: 100,
    borderWidth: 4
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
  oneResult:{
     width: 370,
     height: 390,
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.97)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  oneResultfontTitle:{
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  oneResultfont:{
    color: '#1C1C1C',
    fontSize: 20,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  results:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
  },
  search:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC'
  },
  centralView: {
    alignItems: 'center'
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
