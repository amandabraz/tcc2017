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
     nomeVendedorText: 'Nome vendedor exemplo',
     imagemProduto: require('./img/camera11.jpg')
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
      <View style={styles.container}>
       <View style={styles.centralView}>
            <View style={styles.oneResult}>
             <View style = {{ flexDirection: 'row'}}>
              <Image source={this.state.imagemProduto}
                     style={styles.imageResultSearch}/>
                <Text style={styles.oneResultfontTitle}>{this.state.nomeProdutoText}</Text>
                <Text>{'\n'}{'\n'}{'\n'}</Text>
                </View>
                <View style={{paddingTop: 20}}>
                <Text style={styles.oneResultfont}>Quantidade solicitada:    {this.state.quantidadeText}</Text>
                <Text>{'\n'}{'\n'}</Text>
                <View style = {{ flexDirection: 'row'}}>
                <Text style={styles.oneResultfont}>Total a pagar em {this.state.meioPagamentoText}:</Text>
                <Text style={styles.totalFont}>  R$ {this.state.precoText}</Text>
                </View>
                <Text>{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Verifique o token da sua compra feita com {this.state.nomeVendedorText}:</Text>
                <Text style={styles.oneResultfont}> {this.state.tokenText}</Text>
              </View>

            </View>
            </View>
            </View>

    );
  }
}

//css
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 5
  },
  oneResultfontTitle:{
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    paddingLeft: 20
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
  centralView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  imageResultSearch:{
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
