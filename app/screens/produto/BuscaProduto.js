import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import {
  Icon,
  Button
} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';
import * as constante from '../../constantes';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';

const { width, height } = Dimensions.get("window");

export default class BuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: 'TabsCliente',
      gps: 0,
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      resultadoPesquisaProduto: [],
      resultadoPesquisaVendedor: [],
      textoBusca: '',
      semProdutos: false,
    }
    this.buscaInicialPedidos();
  }

  buscaInicialPedidos() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ gps: position })

      if (this.state.resultadoPesquisaProduto.length > 0) {
        this.setState({resultadoPesquisaProduto: []})
      }

      fetch(constante.ENDPOINT+'produto/cliente/' 
      + this.state.clienteId
      + '?&latitude=' + this.state.gps.coords.latitude
      + '&longitude=' + this.state.gps.coords.longitude
      + '&altitude=' + this.state.gps.coords.altitude, 
      {method: 'GET'})
      .then((response) => response.json())
        .then((responseJson) => {
            if (!responseJson.errorMessage) {
              this.setState({resultadoPesquisaProduto: responseJson});
            }
        })

    }, (error) => {
      this.setState({ gps: 0 });
    })
  }

  setSearchText(searchText) {
    // zerando listas antes de criar nova lista
    if (this.state.resultadoPesquisaProduto.length > 0) {
      this.setState({resultadoPesquisaProduto: []});
    }
    if (this.state.resultadoPesquisaVendedor.length > 0) {
      this.setState({resultadoPesquisaVendedor: []});
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
    }, (error) => {
      this.setState({gps: false});
    });
    if (this.state.gps) {
      console.log(gps)
      fetch(constante.ENDPOINT + 'produto?filtro=' + searchText
                               + '&latitude=' + this.state.gps.coords.latitude
                               + '&longitude=' + this.state.gps.coords.longitude
                               + '&altitude=' + this.state.gps.coords.altitude)

       .then((response) => response.json())
        .then((responseJson) => {
              if (!responseJson.errorMessage) {
                this.setState({resultadoPesquisaProduto: responseJson});
              }
              else {
                this.setState({semProdutos:true});
                {this.buscaRegistros()}
              }
          });
      fetch(constante.ENDPOINT + 'vendedor?filtro=' + searchText)
       .then((response) => response.json())
        .then((responseJson) => {
              if (!responseJson.errorMessage) {
                this.setState({resultadoPesquisaVendedor: responseJson});
              }
              else {
                this.setState({semProdutos:true});
                {this.buscaRegistros()}
              }
          });
    }
    if (this.state.resultadoPesquisaProduto.length < 1 && this.state.resultadoPesquisaVendedor.length < 1) {
      this.setState({semProdutos:true});
    }
  }


  onButtonOpenProduct = (produtoIdSelecionado) => {
    this.props.navigation.navigate('ExibeProduto',
          {produtoId: produtoIdSelecionado,
            clienteId: this.state.clienteId,
            userId: this.state.userId
          });
  };

  onButtonOpenVendedor = (usuarioSelecionado, vendedorIdSelecionado) => {
    this.props.navigation.navigate('ExibeVendedor',
          {selectUserId: usuarioSelecionado,
            vendedorId: vendedorIdSelecionado,
            clienteId: this.state.clienteId
          });
  };

  buscaRegistros() {
    if (this.state.semProdutos == true) {
      if (this.state.resultadoPesquisaProduto.length < 1 && this.state.resultadoPesquisaVendedor.length < 1){
        return (
          <View key={0} style={{width: '80%'}}>
            <Text style={styles.texto}>
              Não há produtos cadastrados, {'\n'}
              tente outro nome!
            </Text>
          </View>
        )
      }
    }
  }

  buscaProduto() {
    var views = [];
    if (this.state.resultadoPesquisaProduto.length > 0) {
      let imagemPrincipal = require('./img/camera11.jpg');
      for(i in this.state.resultadoPesquisaProduto) {
        let produto = this.state.resultadoPesquisaProduto[i];
        let distancia = parseInt(produto.distancia);
        let distanciaEstilo = {
          fontWeight: 'bold',
          fontSize: 18,
          padding: 4,
          color: '#FCFCFC',
          backgroundColor: '#624063',
          borderColor: '#624063',
          borderStyle: 'solid',
          borderRadius: 100,
          textAlign: 'center'
        };
        if(produto.imagemPrincipal){
          imagemPrincipal = {uri: produto.imagemPrincipal};
        }
        if (distancia > -1) {
          if (distancia > 1000) {
            let convert = (distancia/1000).toString().split('.');
            distancia = convert[0] + ' km';
          } else {
            distancia = distancia.toString() + ' m';
          }
        } else {
          distanciaEstilo.fontSize = 13;
          distancia = "offline há mais de 6h";
        }
        views.push (
          <View key={i}>
            <TouchableHighlight
              onPress={() => this.onButtonOpenProduct(produto.id)}
              underlayColor = 'backgroundColor: "rgba(255, 255, 255, 0.55)"'
            >
              <View>
                <View style={styles.oneResult}>
                  <View style={{width: "25%"}}>
                    <Image source={imagemPrincipal}
                          style={styles.imageResultSearch}
                          justifyContent='flex-start'/>
                  </View>
                  <View style={{width: "45%"}}>
                    <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>R$ {produto.preco}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{produto.vendedor.usuario.nome}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{produto.quantidade} disponíveis</Text>
                  </View>
                  <View style={{width: "15%"}} justifyContent='center'>
                    <Text style={distanciaEstilo} justifyContent='center'>{distancia}</Text>
                  </View>
                  <View style={{width: "15%"}}>
                    <Icon
                      name='shopping-cart'
                      type=' material-community'
                      color='#4A4A4A'
                      onPress={() => this.onButtonOpenProduct(produto.id)}
                      style={styles.imageResultSearch} />
                  </View>
                </View>
                <Text>{'\n'}</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      }
    }
    return views;
  }

  buscaVendedor() {
    var views = [];
    if (this.state.resultadoPesquisaVendedor.length > 0) {
      for(i in this.state.resultadoPesquisaVendedor) {
        let imagemPerfil = require('./img/camera11.jpg');
        let vendedor = this.state.resultadoPesquisaVendedor[i];
        if(vendedor.usuario.imagemPerfil){
          imagemPerfil = {uri: vendedor.usuario.imagemPerfil};
        }
        views.push (
          <View key={i}>
            <TouchableHighlight
              onPress={() => this.onButtonOpenVendedor(vendedor.usuario.id, vendedor.id)}
              underlayColor = 'backgroundColor: "rgba(255, 255, 255, 0.55)"'
            >
              <View>
                <View style={styles.oneResult}>
                <View style={{width:'25%'}}>
                  <Image source={imagemPerfil}
                        style={styles.imageResultSearch}
                        justifyContent='flex-start'/>
                </View>
                  <View style={{width: '60%'}}>
                    <Text style={styles.oneResultfontTitle} justifyContent='center'>{vendedor.usuario.nome}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{vendedor.nomeFantasia}</Text>
                  </View>
                <View style={{width:'15%'}}>
                  <Icon
                    name='person'
                    type=' material-community'
                    color='#4A4A4A'
                    onPress={() => this.onButtonOpenVendedor(vendedor.usuario.id, vendedor.id)}
                    style={styles.imageResultSearch}
                    />
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

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
    }, (error) => {
      this.setState({gps: 0});
    });
  }


  render() {
    if (this.state.gps === 0 || typeof this.state.gps === "undefined") {
      return(<LocalizacaoNaoPermitida
        screenName={this.state.screenName}
        navigation={this.props.navigation}
        userId={this.state.userId} />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="#624063"
          />
        <View style={styles.container}>
        <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={'#624063'}
            iconBackgroundColor={'#FCFCFC'}
            inputStyle={{ color: '#464949' }}
            onChangeText={(textoBusca) => this.setState({textoBusca})}
            onSubmitEditing={() => this.setSearchText(this.state.textoBusca)}
            returnKeyType={'search'}
            />
          </View>

          <ScrollView>
            <View style={styles.centralView}>
              <View style={styles.results}>
                {this.buscaProduto()}
                {this.buscaVendedor()}
                {this.buscaRegistros()}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const titleConfig = {
  title: 'Busca de Produtos',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};

//css
const styles = StyleSheet.create({
  oneResult:{
     width: '97%',
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
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
  results:{
    justifyContent: 'center',
    alignItems: 'center',
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
  texto: {
    marginTop: 12,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    paddingLeft: 30,
    fontSize: 15,
    height: 20,
    flex: .1,
    borderWidth: 9,
    backgroundColor: '#fff',
    borderColor: '#E4E4E4',
  },
});
