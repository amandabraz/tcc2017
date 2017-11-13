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

class RankingProdutos extends Component {
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
    this.buscaQuantidadeProdutosVendidos();
    this.buscaQuantidadeVendas();
    this.buscaQuantidadeClientes();
    this.buscaProdutosMaisVendidos();
    this.buscaProduto();
  };

  escolherData(value) {
    value =!this.state.filtroMensal;
     this.setState({filtroMensal: value});
    this.buscaInformacoes();
  }

  buscaProdutosMaisVendidos(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({produtosMaisVendidos: responseJson});
        this.setState({refreshing:false});
      }});
  }

  buscaQuantidadeProdutosVendidos(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/quantidade/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({quantidadeProdutosVendidos: responseJson});
        this.setState({refreshing:false});
      }});
  }

  buscaQuantidadeVendas(){
    fetch(constante.ENDPOINT + 'pedido/ranking/venda/quantidade/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({quantidadeVendas: responseJson});
        this.setState({refreshing:false});
      }});
  }

  buscaQuantidadeClientes(){
    fetch(constante.ENDPOINT + 'pedido/ranking/cliente/quantidade/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({quantidadeClientes: responseJson});
        this.setState({refreshing:false});
      }});
  }


  buscaProduto() {
    var views = [];
    if (this.state.produtosMaisVendidos.length > 0) {
      let imagemPrincipal = require('./img/camera.jpg');
      for(i in this.state.produtosMaisVendidos) {
        let produto = this.state.produtosMaisVendidos[i];

        if(produto[3]){
          imagemPrincipal = {uri: produto[3]};
        }
        else {
          imagemPrincipal = require('./img/camera.jpg');
        }

        views.push (
          <View key={i}>
          <Text>{'\n'}</Text>
          <TouchableHighlight
            underlayColor = 'backgroundColor: "rgba(255, 255, 255, 0.55)"'
          >
              <View>
                <View style={styles.oneResult}>
                  <View style={{width: "30%"}}>
                    <Image source={imagemPrincipal}
                          style={styles.imageResultSearch}
                          justifyContent='flex-start'/>
                  </View>
                  <View style={{width: "50%"}}>
                    <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto[1]}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{produto[2]} vendidos</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>By: {produto[0]}</Text>
                  </View>
                  <View style={{width: "20%"}}>
                  <Image source={imagemPrincipal}
                        style={styles.imageResultSearch}
                        justifyContent='flex-end'/>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        );
      }
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
                      {'\n'}{'\n'} Produtos Mais Vendidos {'\n'} {'\n'}
                    </Text>
                  </View>
                  <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.oneResult1}>
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
            {this.buscaProduto()}
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

RankingProdutos.defaultProps = { ...RankingProdutos };

export default RankingProdutos;
