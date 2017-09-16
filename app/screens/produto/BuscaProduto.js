/**
* Interface de Busca de Produtos.
* by https://github.com/maiarar
*/

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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  Icon,
  Button
} from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';

const { width, height } = Dimensions.get("window");

export default class BuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultadoPesquisaProduto: [],
      resultadoPesquisaVendedor: [],
      selectUserId: '',
      vendedorId: ''
    }
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    fetch("http://10.0.2.2:8080/produto?filtro=" + searchText)
     .then((response) => response.json())
      .then((responseJson) => {
            this.setState({resultadoPesquisaProduto: responseJson});
        });
    fetch("http://10.0.2.2:8080/vendedor?filtro=" + searchText)
     .then((response) => response.json())
      .then((responseJson) => {
            this.setState({resultadoPesquisaVendedor: responseJson});
        });
  }

  //TODO: Implementar busca para tela do produto
  onButtonOpenProduct = () => {
    this.props.navigation.navigate('ExibeProduto');//, {produto: produto});
  };

  //TODO: Implementar busca para tela do vendedor
  onButtonOpenVendedor = () => {
    this.props.navigation.navigate('ExibeVendedor', {selectUserId: this.state.selectUserId, vendedorId: this.state.vendedorId });
  };

  buscaProduto() {
    var views = [];
    for(i in this.state.resultadoPesquisaProduto) {
      let produto = this.state.resultadoPesquisaProduto[i];
      views.push (
        <View key={i}>
          <View style={styles.oneResult}>
              <Image source={{ uri: produto.imagemPrincipal }}
                     style={styles.imageResultSearch}
                     justifyContent='flex-start'/>

              <View style={{width: 210, margin: 10}}>
                <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.preco}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.vendedor.usuario.nome}</Text>
              </View>
              <Icon
                name='shopping-cart'
                type=' material-community'
                color='#1C1C1C'
                onPress={this.onButtonOpenProduct}//(produto)}
                style={styles.imageResultSearch} />
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
      this.state.vendedorId = vendedor.id;
      this.state.selectUserId = vendedor.usuario.id;
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
            onPress={this.onButtonOpenVendedor}
            style={styles.imageResultSearch}
             />
        </View>
        <Text>{'\n'}</Text>
        </View>
      );
  }
  return views;
}



  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={titleConfig}
          tintColor="#023329"
        />
       <View style={styles.container}>
         <TextInput
           onSubmitEditing={this.setSearchText.bind(this)}
           returnKeyType={'search'}
           style={styles.searchBar}
           value={this.state.searchText}
           placeholder={'Search'} />
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

const titleConfig = {
  title: 'Busca de Produtos',
  tintColor: "#DCDCDC",
  fontFamily: 'Roboto',
};

//css
const styles = StyleSheet.create({
  oneResult:{
     width: 370,
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
