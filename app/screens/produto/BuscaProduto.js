/**
* Interface de Busca de Produtos.
* by https://github.com/maiarar
*/

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

const { width, height } = Dimensions.get("window");

export default class BuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagemProduto: require('./img/pacoca.jpg'),
      imagemVendedor: require('./img/sabrina-copy.jpg'),
      resultadoPesquisaProduto: [],
      resultadoPesquisaVendedor: []
    }
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    fetch("http://10.0.2.2:8080/produto?filtro=" + searchText)
      .then((response) => {
      response.json();})
      .then((responseJson) => {
            this.setState({resultadoPesquisaProduto: responseJson});
        });
    fetch("http://10.0.2.2:8080/vendedor?filtro=" + searchText)
    .then((response) => {
      response.json();
    })
      .then((responseJson) => {
            this.setState({resultadoPesquisaVendedor: responseJson});

              Alert.alert(JSON.stringify(responseJson));
        });
  }

  buscaProduto() {
    var views = [];
    for(i in this.state.resultadoPesquisaProduto) {
      let produto = this.state.resultadoPesquisaProduto[i];
      views.push (
        <View key={i} style={styles.oneResult}>
            <Image source={this.state.imagemProduto}
                   style={styles.imageResultSearch}
                   justifyContent='flex-start'/>

            <View style={{width: 250}}>
              <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
              <Text style={styles.oneResultfont} justifyContent='center'>{produto.preco}</Text>
              <Text style={styles.oneResultfont} justifyContent='center'>{produto.vendedor.usuario.nome}</Text>
            </View>
            <Icon
              name='arrow-forward'
              type=' material-community'
              color='#1C1C1C'
              style={styles.imageResultSearch}
              left='25'
               />
          </View>
        );
    }
      return views;
  }

  buscaVendedor() {
    var views = [];
    for(i in this.state.resultadoPesquisaVendedor) {
      let vendedor = this.state.resultadoPesquisaVendedor[i];
      Alert.alert(vendedor);

      views.push (
        <View key={i} style={styles.oneResult}>
          <Image source={this.state.imagemVendedor}
                 style={styles.imageResultSearch}
                 justifyContent='flex-start'/>

          <View style={{width: 250}}>
            <Text style={styles.oneResultfontTitle} justifyContent='center'>{vendedor.usuario.nome}</Text>
            <Text style={styles.oneResultfont} justifyContent='center'>{vendedor.nomeFantasia}</Text>
          </View>
          <Icon
            name='arrow-forward'
            type=' material-community'
            color='#1C1C1C'
            style={styles.imageResultSearch}
            left='25'
             />
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
           placeholder={'Search'}
           multiline={false} />
        </View>
        <View style={styles.centralView}>
          <View style={styles.results}>
            <ScrollView>
              {this.buscaVendedor()}
            </ScrollView>
          </View>
        </View>
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
     paddingTop: 10,
  },
  oneResultfontTitle:{
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 18,
    left: 5,
  },
  oneResultfont:{
    color: '#1C1C1C',
    fontSize: 15,
    left: 5,
  },
  results:{
    top:70,
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
  },
  search:{
    top: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#DCDCDC'
  },
  centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
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
