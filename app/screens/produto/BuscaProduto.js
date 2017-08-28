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
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import Search from 'react-native-search-box';

//dimensão da janela
const { width, height } = Dimensions.get("window");


//Retornando as fotos das comidas
//TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde

// getFoods = (foods) => {
//   foods.map(
//     food => <View><Image source={{ uri: './img/'+food.name+'.jpg' }}/></View>
//   );
// }
// const foodsList = getFoods([
//   {name: 'paçoca'},
//   {name: 'salgadinho'},
//   {name: 'brigadeiro'},
//   {name: 'pudim'}
// ]);

//Exporto essa classe pra que na minha "Main"
export default class BuscaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeProduto: 'Produto',
      nomeVendedor: 'Vendedor',
      precoProduto: 'preço',
      lojaVendedor: 'Nome Fantasia',
      imagemProduto: require('./img/pacoca.jpg'),
      imagemVendedor: require('./img/sabrina-copy.jpg'),
      resultadoPesquisaProduto: [1],
      resultadoPesquisaVendedor: [1]
    }

    //TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde
    // this.state = {
    //   result: [<View></View>],
    // };
    // this.search = this.search.bind(this);
  }
  search = () => {
    Alert.alert("Pesquisa!");

    //TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde
    // this.setState({
    //   result:{foodsList}
    // });
  }

  buscaProduto() {
    var views = [];
    for(i in this.state.resultadoPesquisaProduto) {
    views.push (
    <View style={styles.oneResult}>
          <Image source={this.state.imagemProduto}
                 style={styles.imageResultSearch}
                 justifyContent='flex-start'/>

          <View style={{width: 250}}>
          <Text style={styles.oneResultfontTitle} justifyContent='center'>{this.state.nomeProduto}</Text>
          <Text style={styles.oneResultfont} justifyContent='center'>{this.state.precoProduto}</Text>
          <Text style={styles.oneResultfont} justifyContent='center'>{this.state.nomeVendedor}</Text>
          </View>
          <Icon
          name='arrow-forward'
          type=' material-community'
          color='#1C1C1C'
          style={styles.imageResultSearch}
          left='25'
          onPress={this.search} />
        </View>
      );
    }
      return views;
  }

  buscaVendedor(){
    var views = [];
    for(i in this.state.resultadoPesquisaVendedor) {
    views.push (
    <View style={styles.oneResult}>
      <Image source={this.state.imagemVendedor}
             style={styles.imageResultSearch}
             justifyContent='flex-start'/>

      <View style={{width: 250}}>
      <Text style={styles.oneResultfontTitle} justifyContent='center'>{this.state.nomeVendedor}</Text>
      <Text style={styles.oneResultfont} justifyContent='center'>{this.state.lojaVendedor}</Text>
      </View>
      <Icon
      name='arrow-forward'
      type=' material-community'
      color='#1C1C1C'
      style={styles.imageResultSearch}
      left='25'
      onPress={this.search} />
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
          tintColor="#CDB7B5"
        />
       <View style={styles.container}>
        <Search ref="search_box"
               placeholder= "Pesquisar"
               cancelTitle="Cancelar"/>

        <View style={styles.centralView}>
          <View style={styles.results}>
            {this.buscaProduto()}
            {this.buscaVendedor()}

          </View>
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
     alignItems:'center',
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
});
