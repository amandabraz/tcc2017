import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import * as constante from '../../constantes';


//TODO: Pegar dados do vendedor certo, o que o clique foi feito

export default class ExibeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteId: this.props.navigation.state.params.clienteId,
      selectUserId: this.props.navigation.state.params.selectUserId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      nomeText: '',
      nomeFantasiaText: '----',
      meiosPagamentoText: '',
      pagamentoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      celularText: '',
      resultadoProduto: [],
      imagemPerfil: require('./img/camera11.jpg')
    };
    this.buscaDadosVendedor();
    this.buscaProdutos();
  }

  buscaDadosVendedor() {
    fetch(constante.ENDPOINT+'vendedor/usuario/' + this.state.selectUserId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson.usuario.imagemPerfil) {
              this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
            }
          this.setState({nomeText: responseJson.usuario.nome});
          this.setState({nomeFantasiaText: responseJson.nomeFantasia});
          this.setState({celularText: "(" + responseJson.usuario.ddd + ") " + responseJson.usuario.telefone});

          if (responseJson.meiosPagamentos.length > 0) {
            this.setState({pagamentoEstilo: styles.listText})
            var pagamentos = "";
            for(i in responseJson.meiosPagamentos) {
              pagamentos += responseJson.meiosPagamentos[i].descricao + " - ";
            }
            pagamentos = pagamentos.slice(0, -3);
            this.setState({meiosPagamentoText: pagamentos});
          }
        }
      });
  };

  buscaProdutos() {
    fetch(constante.ENDPOINT + "vendedor/" + this.state.vendedorId + "/produto", {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({resultadoProduto: responseJson});
      }
    });
  };

  mostraProduto() {
    var views = [];
    if(this.state.resultadoProduto.length > 0){
    for(i in this.state.resultadoProduto) {
      let produto = this.state.resultadoProduto[i];
      let imagemPrincipalP = require('./img/camera11.jpg');            
      if (produto.imagemPrincipal) {
        imagemPrincipalP = { uri: produto.imagemPrincipal };
      }      
      views.push (
        <View key={i}>
        <TouchableOpacity onPress={() => this.onButtonOpenProduct(produto)}>
          <View style={styles.oneResult}>
              <Image source={imagemPrincipalP}
                     style={styles.imageResultSearch}
                     justifyContent='flex-start'/>

                <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.categoria.descricao}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>Preço: {produto.preco}</Text>

          </View>
            <Text>{'\n'}</Text>
        </TouchableOpacity>
        </View>
        );
    }
  } else {
    views.push(
      <View key={0} style={{alignItems: 'center'}}>
      <Text style={{marginTop: 12,fontSize: 18, justifyContent: 'center'}}>
        Esse vendedor não tem produtos cadastrados!
      </Text>
      </View>
    )
  }
      return views;
}

onButtonOpenProduct = (produto) => {
  this.props.navigation.navigate('ExibeProduto', {produtoId: produto.id, clienteId: this.state.clienteId});
};

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            source={this.state.imagemPerfil}/>
          </View>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>
          {this.state.nomeText}
          </Text>
          </View>
          </View>

        <ScrollView>
        <Fumi
            style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
            label={'Nome da loja'}
            iconClass={MaterialsIcon}
            iconName={'store'}
            iconColor={'darkslategrey'}
            value={this.state.nomeFantasiaText}
            editable={false}
            inputStyle={styles.baseText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Meios de Pagamento'}
              iconClass={FontAwesomeIcon}
              iconName={'asterisk'}
              iconColor={'darkslategrey'}
              value={this.state.meiosPagamentoText}
              multiline={true}
              editable={false}
              inputStyle={this.state.pagamentoEstilo}/>

      <View style={styles.results}>
      <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={true}>
          {this.mostraProduto()}
      </ScrollView>
      </View>
      </ScrollView>
      </View>
    );
  }
}


  //CSS
  const styles = StyleSheet.create({
    container: {
      flex: 1
  },
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(202, 203, 247, 0.58)',
  },
  profilepicWrap:{
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  profilepic:{
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderWidth: 4
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
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  results:{
    flexDirection: 'row',
    margin: 5
  },
  oneResult:{
     height: 200,
     width: 180,
     alignItems:  'center',
     justifyContent: 'center',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 20,
  },
  listText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 16,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
