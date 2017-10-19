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
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import {
  Button
} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import BuscaProduto from '../produto/BuscaProduto';

const { width, height } = Dimensions.get("window");

class PedidoCliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
        pedidoId: 23, //TODO: Inserir id exato do produto
        screenName: 'TabsCliente',
        userId: this.props.navigation.state.params.userId,
        clienteId: this.props.navigation.state.params.clienteId,
        gps: 0,
        nomeProdutoText: '',
        quantidadeText: '',
        precoText: '',
        dataSolicitacaoText: '',
        meioPagamentoText: '',
        nomeVendedorText: '',
        imagemProduto: require('./img/camera2.jpg'),
        imagemVendedor: require('./img/camera2.jpg'),
        statusPedido: 'Pendente de aprovação',
        userId: this.props.navigation.state.params.userId,
        clienteId: this.props.navigation.state.params.clienteId
      };
      this.buscaDadosPedido();
    };

    buscaDadosPedido() {
      //TODO: Trazer apenas dados dos pedidos solicitados
      fetch(constante.ENDPOINT+'pedido/' + this.state.pedidoId)
      .then((response) => response.json())
        .then((responseJson) => {
            if (!responseJson.errorMessage) {
              if (responseJson.produto.imagemPrincipal) {
                this.setState({imagemProduto: { uri: responseJson.produto.imagemPrincipal } })
              }
              if (responseJson.produto.vendedor.usuario.imagemPerfil) {
                this.setState({imagemVendedor: { uri: responseJson.produto.vendedor.usuario.imagemPerfil } })
              }
            this.setState({nomeProdutoText: responseJson.produto.nome});
            this.setState({quantidadeText: responseJson.quantidade});
            this.setState({precoText: responseJson.valorCompra});
            this.setState({statusPedidoText: responseJson.status});
            this.setState({meioPagamentoText: responseJson.pagamento.descricao});
            this.setState({nomeVendedorText: responseJson.produto.vendedor.usuario.nome});
            this.setState({dataSolicitacaoText: responseJson.dataSolicitada});
          }
        });
    };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
    }, (error) => {
      this.setState({gps: 0});
    });
  }

  cancelarPedido() {
      this.popup.confirm({
          title: 'Cancelar Pedido',
          content: ['Deseja realmente cancelar esse pedido?'],
          ok: {
              text: 'Confirmar',
              style: {
                  color: 'green',
                  fontWeight: 'bold'
              },
          },
          cancel: {
              text: 'Cancelar',
              style: {
                  color: 'red'
              }
          }
      });
  }

  render() {
    if (this.state.gps === 0 || typeof this.state.gps === "undefined") {
      return(<LocalizacaoNaoPermitida
          screenName={this.state.screenName}
          navigation={this.props.navigation}
          userId={this.state.userId}/>
      );
    } else {
      return(
        <View style={{flex:1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="#768888"/>
            <View style={styles.container}>
              <View style={styles.oneResult}>
                <View style={{flexDirection: 'row'}}>
                  <View style = {{ width: '30%'}}>
                    <Image source={this.state.imagemProduto}
                           style={styles.imagemProduto}/>
                  </View>
                  <View style={{width: '68%', paddingLeft: 5}}>
                    <View style={{flexDirection: 'row'}}>
                     <View style = {{ width: '30%'}}>
                       <Image source={this.state.imagemVendedor}
                              style={styles.imagemVendedor}/>
                     </View>
                     <View style={{width: '70%'}}>
                       <Text style={styles.oneResultfont}>Seu pedido</Text>
                       <Text style={styles.totalFont}> {this.state.nomeVendedorText}</Text>
                     </View>
                   </View>
                     <View style={{paddingTop:10}}>
                      <Text style={styles.oneResultfont}>Quantidade:
                        <Text style={styles.totalFont}> {this.state.quantidadeText}{'\n'}</Text>
                      </Text>
                      <Text style={styles.oneResultfont}>Status da compra: {this.state.statusPedidoText}
                      </Text>
                      <Text style={styles.totalFont}> R$ {this.state.precoText}{'\n'}</Text>
                      <Text style={styles.oneResultfont}>Solicitado em:
                        <Text style={styles.totalFont}> {this.state.dataSolicitacaoText}{'\n'}</Text>
                      </Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, paddingTop:10}}>

                      <Button title ="Cancelar"
                              color="#fff"
                              backgroundColor="#88557B"
                              borderRadius={10}
                              large={true}
                              onPress={this.cancelarPedido.bind(this)}/>

                      </View>
                    </View>
                  </View>
               </View>
             </View>
             <Popup ref={popup => this.popup = popup }/>
          </View>
        </View>
      );
    }
  }
}

const titleConfig = {
  title: 'Pedidos',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%'
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
  totalFont:{
    color: '#1C1C1C',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imagemCliente:{
    width: 60,
    height: 60,
    borderRadius: 100
  },
  imagemProduto:{
    width: '98%',
    height: 250,
    borderRadius: 10
  }
});

PedidoCliente.defaultProps = { ...PedidoCliente };

export default PedidoCliente;
