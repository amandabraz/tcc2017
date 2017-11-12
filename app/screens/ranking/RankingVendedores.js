import React, {
  Component
} from 'react';
import {
  Animated,
  AppRegistry,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import * as constante from '../../constantes';
import NavigationBar from 'react-native-navbar';
import Switch from 'react-native-customisable-switch';
import {
  Button
} from 'react-native-elements';
import Popup from 'react-native-popup';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-accordion';


const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 250;

class RankingVendedores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtosMaisVendidos: [],
      quantidadeProdutosVendidos: [],
      quantidadeVendas: [],
      quantidadeClientes: [],
      quantidadeVendida: '',
      filtroMensal: true,
      alturaPedido: '100%',
      alturaResumo: '100%',
      dataNascimentoText: '',
      imagemHeader: require('./img/fundof.png'),
      imagemProduto: require('./img/camera.jpg'),
      imagemPremiacao: require('./img/camera.jpg')
    };
  };

  buscaDadosPedidosCliente() {
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Confirmado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosConfirmados: responseJson});
        }
        this.setState({refreshing: false});
      });
  };

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosCliente();
          this.setState({pedidosConfirmados: []});
          this.pedidoConfirmado();
          ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }


pedidoConfirmado(){
  var views = [];
  if(this.state.pedidosConfirmados.length > 0){
    for (i in this.state.pedidosConfirmados) {
      let imagemPrincipalV = require('./img/camera.jpg');
      let pedidoC = this.state.pedidosConfirmados[i];

      if (pedidoC.produto.vendedor.usuario.imagemPerfil) {
        imagemPrincipalV = {uri: pedidoC.produto.vendedor.usuario.imagemPerfil};
      }

      var dataNormal = new Date(pedidoC.dataConfirmacao);
      let dataConfirmado = (dataNormal.getDate()<10?"0"+dataNormal.getDate():dataNormal.getDate()) + "/" + (dataNormal.getMonth()+1<10?"0"+dataNormal.getMonth()+1:dataNormal.getMonth()+1) + "/" + dataNormal.getFullYear() +
      " - "+dataNormal.getHours() + ":" + (dataNormal.getMinutes()<10?"0"+dataNormal.getMinutes():dataNormal.getMinutes());

      views.push(
        <View key={i} style={styles.oneResult1}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
          <View style = {{ width: '20%'}}>
          <Image source={imagemPrincipalV}
                 style={styles.imagemPrincipal}/>
          </View>
        <View style={{width: '65%', alignSelf:'center'}}>
           <Text style={styles.totalFont}> {pedidoC.produto.vendedor.usuario.nome}</Text>
           <Text style={{fontSize: 14}}> Confirmado em {dataConfirmado}</Text>
           <Text style={styles.oneResultfont}> Receber:
           <Text style={styles.totalFont}> {pedidoC.quantidade}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Produto:
           <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Pagar {pedidoC.pagamento.descricao}:
           <Text style={styles.totalFont}> R$  {pedidoC.valorCompra}</Text>
           </Text>
        </View>
        <View style={{width: '5%',justifyContent: 'center'}}>
        <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
        </View>
    </View>
        } content={
          <View style={{margin: 15, alignItems:'center'}}>
          <View style = {{ alignItems: 'center'}}>
          <QRCode
            value={this.state.tokenText}
            size={200}
            bgColor='black'
            fgColor='white'/>
            </View>
          <Text style={styles.tokenfont}> {pedidoC.token}</Text>
        </View>

            }
        underlayColor="white"
        easing="easeOutCubic"/>
    </View>
    )}
 } else {
   views.push(
     <View key={0} style={{alignItems: 'center'}}>
     <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: 'darkslategrey'}}>
       Nenhum pedido confirmado.
     </Text>
     </View>
   )
 }
 return views;
}

  render() {
    return(
      <View style = {{ flex: 1 }}>
        <ScrollView>
          <StatusBar barStyle="light-content"/>
            <HeaderImageScrollView
              maxHeight = {MAX_HEIGHT}
              minHeight = {1}
              maxOverlayOpacity = {0.6}
              minOverlayOpacity = {0.3}
              fadeOutForeground
              renderHeader = { () =>
                <Image source={this.state.imagemHeader} style={styles.image}>
                  <View style = {{alignItems: 'center'}}>
                    <Text style={{marginTop: 8, fontSize: 27, justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>
                      {'\n'}{'\n'} Vendedores em Destaque {'\n'} {'\n'}
                    </Text>
                  </View>
                  <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View key={i} style={styles.oneResult1}>
                      <Accordion header={
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Produtos</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeProdutosVendidos}</Text>
                          </View>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Vendas</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeVendas}</Text>
                          </View>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Clientes</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeClientes}</Text>
                          </View>
                        </View>
                      } content={
                        <View style={{margin: 15, alignItems:'center'}}>
                        </View>
                      }
                      underlayColor="white"
                      easing="easeOutCubic"/>
                    </View>
                  </View>
                </Image>
              }
              renderForeground = {() =>
                <Animatable.View
                  style = {styles.navTitleView}
                  ref = {navTitleView => {
                    this.navTitleView = navTitleView;
                  }}>
                </Animatable.View>
              }>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)
            }>
            <View style={styles.bar}>
            </View>
          </TriggeringView>
        </HeaderImageScrollView>
        <View style={styles.centralView}>
          <View style={styles.results}>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },navTitleView: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },section: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
  },
  oneResult:{
     width: '95%',
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 10,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  oneResultfont:{
    fontSize: 14,
    textAlign: 'center',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  results:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralView: {
    alignItems: 'center'
  },
  oneResultfontTitle:{
    color: '#4A4A4A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oneResultfont:{
    color: '#4A4A4A',
    fontSize: 15,
  },
});

RankingVendedores.defaultProps = { ...RankingVendedores };

export default RankingVendedores;
