import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
      textoBusca: ''
    }
  }

  setSearchText(searchText) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
    }, (error) => {
      this.setState({gps: false});
    });
    if (this.state.gps) {
      fetch(constante.ENDPOINT + 'produto?filtro=' + searchText
                               + '&latitude=' + this.state.gps.coords.latitude
                               + '&longitude=' + this.state.gps.coords.longitude
                               + '&altitude=' + this.state.gps.coords.altitude)

       .then((response) => response.json())
        .then((responseJson) => {
              this.setState({resultadoPesquisaProduto: responseJson});
          });
      fetch(constante.ENDPOINT + 'vendedor?filtro=' + searchText)
       .then((response) => response.json())
        .then((responseJson) => {
              this.setState({resultadoPesquisaVendedor: responseJson});
          });
    }
  }

  onButtonOpenProduct = (produtoIdSelecionado) => {
    this.props.navigation.navigate('ExibeProduto',
          {produtoId: produtoIdSelecionado,
            clienteId: this.state.clienteId
          });
  };

  onButtonOpenVendedor = (usuarioSelecionado, vendedorIdSelecionado) => {
    this.props.navigation.navigate('ExibeVendedor',
          {selectUserId: usuarioSelecionado,
            vendedorId: vendedorIdSelecionado,
            clienteId: this.state.clienteId
          });
  };

  buscaProduto() {
    var views = [];
    if (this.state.resultadoPesquisaProduto.length > 0) {
      for(i in this.state.resultadoPesquisaProduto) {
        let produto = this.state.resultadoPesquisaProduto[i];
        let distancia = parseInt(produto.distancia);
        let distanciaEstilo = {
          fontWeight: 'bold',
          fontSize: 18,
          padding: 4,
          color: '#fff',
          backgroundColor: '#f2a59d',
          borderColor: '#f2a59d',
          borderStyle: 'solid',
          borderRadius: 100,
          textAlign: 'center'
        };
        if (distancia > 0) {
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
            <View style={styles.oneResult}>
              <View style={{width: "25%"}}>
                <Image source={{ uri: produto.imagemPrincipal }}
                       style={styles.imageResultSearch}
                       justifyContent='flex-start'/>
              </View>
              <View style={{width: "45%"}}>
                <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.preco}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.vendedor.usuario.nome}</Text>
              </View>
              <View style={{width: "15%"}} justifyContent='center'>
                <Text style={distanciaEstilo} justifyContent='center'>{distancia}</Text>
              </View>
              <View style={{width: "15%"}}>
                <Icon
                  name='shopping-cart'
                  type=' material-community'
                  color='#1C1C1C'
                  onPress={() => this.onButtonOpenProduct(produto.id)}
                  style={styles.imageResultSearch} />
              </View>
            </View>
            <Text>{'\n'}</Text>
          </View>
        );
      }
    }
    else {
      views.push (
        <View key={0}>
          <View style={styles.oneResult}>
            <View style={{width: "45%"}}>
              <Text style={styles.oneResultfontTitle} justifyContent='center'>Não há produtos cadastrados.</Text>
            </View>
          </View>
          <Text>{'\n'}</Text>
        </View>
      );
    }
      return views;
  }

  buscaVendedor() {
    var views = [];
    for(i in this.state.resultadoPesquisaVendedor) {
      let vendedor = this.state.resultadoPesquisaVendedor[i];
      views.push (
        <View key={i}>
        <View style={styles.oneResult}>
          <Image source={{ uri: vendedor.usuario.imagemPerfil }}
                 style={styles.imageResultSearch}
                 justifyContent='flex-start'/>

          <View style={{width: 210, margin: 10}}>
            <Text style={styles.oneResultfontTitle} justifyContent='center'>{vendedor.usuario.nome}</Text>
            <Text style={styles.oneResultfont} justifyContent='center'>{vendedor.nomeFantasia}</Text>
          </View>
          <Icon
            name='person'
            type=' material-community'
            color='#1C1C1C'
            onPress={() => this.onButtonOpenVendedor(vendedor.usuario.id, vendedor.id)}
            style={styles.imageResultSearch}
             />
        </View>
        <Text>{'\n'}</Text>
        </View>
      );
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
            tintColor="#023329"
          />
        <View style={styles.container}>
        <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'search'}
            iconColor={'white'}
            iconBackgroundColor={'#f2a59d'}
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
  tintColor: "#DCDCDC",
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
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oneResultfont:{
    color: '#1C1C1C',
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
