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
import QRCode from 'react-native-qrcode';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';

//dimensão da janela
const { width, height } = Dimensions.get("window");

//Exporto essa classe pra que na minha "Main"
export default class ExibeComprovante extends Component {
  constructor(props) {
   super(props);

   this.state = {
     pedidoId: this.props.navigation.state.params.pedidoId,
     nomeProdutoText: '',
     quantidadeText: '',
     precoText: '',
     meioPagamentoText: '',
     tokenText: 'token',
     nomeVendedorText: '',
     imagemProduto: require('./img/camera11.jpg')
   };
   this.buscaDadosPedido();
  }

  buscaDadosPedido() {
    fetch(constante.ENDPOINT+'pedido/' + this.state.pedidoId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson.produto.imagemPrincipal) {
              this.setState({imagemProduto: { uri: responseJson.produto.imagemPrincipal } })
            }
          this.setState({nomeProdutoText: responseJson.produto.nome});
          this.setState({quantidadeText: responseJson.quantidade});
          this.setState({precoText: responseJson.valorCompra});
          this.setState({meioPagamentoText: responseJson.pagamento.descricao});
          this.setState({tokenText: responseJson.token});
          this.setState({nomeVendedorText: responseJson.produto.vendedor.usuario.nome});
        }
      });
  };

  onButtonVoltar = () => {
    this.props.navigation.navigate('ExibeComprovante');
  };

  //render
  render() {
    //retorno
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={titleConfig}
          tintColor="skyblue"/>

      <ScrollView>
      <View style={styles.container}>
            <View style={styles.oneResult}>
             <View style = {{ flexDirection: 'row'}}>
              <Image source={this.state.imagemProduto}
                     style={styles.imageResultSearch}/>
                <Text style={styles.oneResultfontTitle}>{this.state.nomeProdutoText}</Text>
                <Text>{'\n'}{'\n'}{'\n'}</Text>
                </View>
                <View style={{paddingTop: 20}}>
                <Text style={styles.oneResultfont}>Quantidade solicitada:
                  <Text style={styles.totalFont}> {this.state.quantidadeText}</Text>
                </Text>
                <Text>{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Total a pagar em {this.state.meioPagamentoText}:
                  <Text style={styles.totalFont}> R$ {this.state.precoText}</Text>
                </Text>
                <Text>{'\n'}{'\n'}</Text>
                <Text style={styles.oneResultfont}>Verifique o token da sua compra feita com
                  <Text style={styles.totalFont}> {this.state.nomeVendedorText}</Text>:
                </Text>
                <Text>{'\n'}</Text>
                <View style = {{ alignItems: 'center'}}>
                <QRCode
                  value={this.state.tokenText}
                  size={200}
                  bgColor='black'
                  fgColor='white'/>
                  </View>
                <Text style={styles.tokenfont}> {this.state.tokenText}</Text>
              </View>

            </View>
            </View>
          </ScrollView>
        </View>

    );
  }
}

const titleConfig = {
  title: 'Comprovante de Compra',
  tintColor: "#1C1C1C",
  fontFamily: 'Roboto',
};

//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 5,
     width: '90%'
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
    fontSize: 18,
    textAlign: 'left',
  },
  tokenfont:{
    color: 'gray',
    fontSize: 15,
    textAlign: 'center',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imageResultSearch:{
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});
