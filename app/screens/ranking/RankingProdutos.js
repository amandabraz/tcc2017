import React, {
  Component
} from 'react';
import {
  Animated,
  AppRegistry,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import * as constante from '../../constantes';
import NavigationBar from 'react-native-navbar';
import Switch from 'react-native-customisable-switch';
import {
  Button
} from 'react-native-elements';

const { width, height } = Dimensions.get("window");

class RankingProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      clienteId: this.props.navigation.state.params.clienteId,
      refreshing: false,
      informacoes: [],
      quantidadeVendida: '',
      filtroMensal: true,
      alturaPedido: '100%',
      alturaResumo: '100%'
    };
    this.buscaInformacoes();
  };

  escolherData(value) {
    value =!this.state.filtroMensal;
     this.setState({filtroMensal: value});
    this.buscaInformacoes();
  }

  buscaInformacoes(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({informacoes: responseJson});
        this.setState({refreshing:false});
      }});
  }

  produtosMaisVendidos() {
      var views = [];
      if (this.state.informacoes.length > 0) {
        for (i in this.state.informacoes) {
          let produtoVendido = this.state.informacoes[i];
          views.push(
            <View key={i}>
                <Text style={{fontSize: 13, justifyContent: 'space-between'}}>
                  {produtoVendido[1]} {produtoVendido[2]} {produtoVendido[0]}
                </Text>
           </View>
          )
        }
      } else {
        views.push(
          <View key={0} style={{alignItems: 'center'}}>
            <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
              Você não tem produtos vendidos! :(
            </Text>
          </View>
        )
      }
      return views;
  }

  render() {
    return(
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaInformacoes();
            }}
          />
        }>
      <View style={{flex:1}}>
        <NavigationBar
          title={titleConfig}
          tintColor="#7A8887"/>
          <View style={styles.container}>
                  <Text style={{fontSize: 14, alignSelf: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: 'purple'}}>
                      {'\n'}{'\n'} Produtos mais vendidos do mês {'\n'}{'\n'}
                    </Text>
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: 'bold',justifyContent: 'space-between'}}>
                    Produto Quantidade Vendedor
                  </Text>
                  {this.produtosMaisVendidos()}
                  <View style={{alignItems: 'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, padding: 5, alignSelf: 'center'}}>
                          Semanal
                        </Text>
                        <Switch value = {this.state.filtroMensal}
                                onChangeValue = {(value) => this.escolherData(value)}
                                switchWidth = {40}
                                switchHeight = {18}
                                buttonWidth = {16}
                                buttonHeight = {16}/>
                        <Text style={{fontSize: 12, paddingLeft: 5, alignSelf: 'center'}}>
                           Mensal
                        </Text>
                    </View>
                  </View>
                </View>
      </View>
  </ScrollView>
    );
  }

}

const titleConfig = {
  title: 'Ranking',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width
  },
  bar: {
    borderRadius: 5,
    height: 7,
    marginRight: 5
  },
  points: {
    backgroundColor: '#88557B'
  },
  oneResult:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%',
     height: '98%'
  },
  produtosV:{
    margin: 6,
    padding: 10,
    borderColor: '#fff',
    width: '98%',
    justifyContent: 'space-between'
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
    fontSize: 14,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  oneResultResumo:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '100%',
     height: '100%'
  },
  imagemProduto:{
    width: '98%',
    height: '98%',
    borderRadius: 10
  }
});

RankingProdutos.defaultProps = { ...RankingProdutos };

export default RankingProdutos;
