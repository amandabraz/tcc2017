import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class GerenciaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      listaProdutos: []
    };
    this.buscaProdutos();
  };

  buscaProdutos() {
    fetch(constante.ENDPOINT + 'vendedor/' + this.state.vendedorId + '/produto', {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({listaProdutos: responseJson});
        }
    });
  };

  adicionarProduto = () => {
    this.props.navigation.navigate('CadastroProduto', {userId: this.state.userId, vendedorId: this.state.vendedorId });
  };

  deletarProduto(produto) {
    Alert.alert(
      'Deletar ' + produto.nome,
      'Tem certeza que quer deletar ' + produto.nome + '?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          fetch(constante.ENDPOINT + 'vendedor/' + this.state.vendedorId + '/produto/' + produto.id, {method: 'DELETE'})
            .then((response) => response.json())
            .then((responseJson) => {
              if (!responseJson.errorMessage) {
                this.buscaProdutos();
                this.mostraProdutos();
              }
            });
          }
        },
      ],
      { cancelable: false }
    )
  };

  editarProduto(produto) {
   // TODO: navigate pra tela de edição do produto (sprint 13)
 };

  alteraQuantidade(produto) {
   fetch(constante.ENDPOINT + 'vendedor/' + this.state.vendedorId + '/produto/' + produto.id + '/qtd/' + produto.quantidade, {method: 'PUT'})
     .then((response) => response.json())
     .then((responseJson) => {
       if (!responseJson.errorMessage) {
         this.buscaProdutos();
         this.mostraProdutos();
       }
     });
  };

  mostraProdutos() {
    var views = [];
    if(this.state.listaProdutos.length > 0){
      for (i in this.state.listaProdutos) {
        let produto = this.state.listaProdutos[i];
        var dataNormal = new Date(produto.dataPreparacao);
        var dataPrep = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
        produto.dataPreparacao = dataPrep;
        views.push(
          <View key={i} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width}}>
            <View style={styles.oneResult}>
              <View style={styles.parteEsquerda}>
              <TouchableOpacity onPress={() => this.deletarProduto(produto)}>
                <FontAwesomeIcon name="trash" size={20} color={'#ccc'} />
              </TouchableOpacity>
                <Image source={{uri: produto.imagemPrincipal}}
                     style={styles.photo}
                     justifyContent='flex-start'/>
                <View style={{width: '65%', marginLeft: 12, marginRight: 12}}>
                  <Text style={styles.textNome}> {produto.nome} </Text>
                </View>
              </View>
              <View style={styles.parteDireita}>
                <View style={styles.qtd}>
                  <TouchableOpacity onPress={() => {
                    produto.quantidade += 1;
                    this.alteraQuantidade(produto);
                  }}>
                    <FontAwesomeIcon name="plus" size={20} color={'darkblue'}/>
                  </TouchableOpacity>
                  <Text style={styles.text}> {produto.quantidade} </Text>
                  <TouchableOpacity onPress={() => {
                    if (produto.quantidade > 0) {
                      produto.quantidade -= 1;
                      this.alteraQuantidade(produto);
                    }
                  }}>
                    <FontAwesomeIcon name="minus" size={20} color={'darkblue'}/>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity onPress={() => this.editarProduto(produto)}>
                  <FontAwesomeIcon name="pencil" size={20} color={'#ccc'} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignSelf: 'flex-start', paddingLeft: 40}}>
              <Text style={styles.textoMenor}>
                Preparado no dia {produto.dataPreparacao}
                {'\n'}{'\n'}
              </Text>
            </View>
          </View>
        );
     }
   } else {
     views.push(
       <View key={0} style={{alignItems: 'center'}}>
       <Text style={styles.texto}>
         Você não tem produtos cadastrados! :(
       </Text>
       </View>
     )
   }
    return views;
 };

  editarProduto(produto) {
   // TODO: navigate pra tela de edição do produto (sprint 13)
 };

  alteraQuantidade(produto) {
   fetch("http://10.0.2.2:8080/vendedor/" + this.state.vendedorId + "/produto/" + produto.id + "/qtd/" + produto.quantidade, {method: 'PUT'})
     .then((response) => response.json())
     .then((responseJson) => {
       if (!responseJson.errorMessage) {
         this.buscaProdutos();
         this.mostraProdutos();
       }
     });
  };

  mostraProdutos() {
    var views = [];
    if(this.state.listaProdutos.length > 0){
      for (i in this.state.listaProdutos) {
        let produto = this.state.listaProdutos[i];
        var dataNormal = new Date(produto.dataPreparacao);
        var dataPrep = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
        produto.dataPreparacao = dataPrep;
        views.push(
          <View key={i} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width}}>
            <View style={styles.oneResult}>
              <View style={styles.parteEsquerda}>
              <TouchableOpacity onPress={() => this.deletarProduto(produto)}>
                <FontAwesomeIcon name="trash" size={20} color={'#ccc'} />
              </TouchableOpacity>
                <Image source={this.state.imagemProduto}
                     style={styles.photo}
                     justifyContent='flex-start'/>
                <View style={{width: '65%', marginLeft: 12, marginRight: 12}}>
                  <Text style={styles.textNome}> {produto.nome} </Text>
                </View>
              </View>
              <View style={styles.parteDireita}>
                <View style={styles.qtd}>
                  <TouchableOpacity onPress={() => {
                    produto.quantidade += 1;
                    this.alteraQuantidade(produto);
                  }}>
                    <FontAwesomeIcon name="plus" size={20} color={'darkblue'}/>
                  </TouchableOpacity>
                  <Text style={styles.text}> {produto.quantidade} </Text>
                  <TouchableOpacity onPress={() => {
                    if (produto.quantidade > 0) {
                      produto.quantidade -= 1;
                      this.alteraQuantidade(produto);
                    }
                  }}>
                    <FontAwesomeIcon name="minus" size={20} color={'darkblue'}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.editarProduto(produto)}>
                  <FontAwesomeIcon name="pencil" size={20} color={'#ccc'} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignSelf: 'flex-start', paddingLeft: 40}}>
              <Text style={styles.textoMenor}>
                Preparado no dia {produto.dataPreparacao}
                {'\n'}{'\n'}
              </Text>
            </View>
          </View>
        );
     }
   } else {
     views.push(
       <View key={0} style={{alignItems: 'center'}}>
       <Text style={styles.texto}>
         Você não tem produtos cadastrados! :(
       </Text>
       </View>
     )
   }
    return views;
 };

  render() {
    const titleConfig = {
      title: 'Gerência de Produtos',
      tintColor: "#fff",
      fontFamily: 'Roboto',
    };

    return(
        <View style={{flex: 1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="darkblue"
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#ccc'}}>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              NOME
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              QUANTIDADE
            </Text>
          </View>
          <ScrollView>
            {this.mostraProdutos()}
          </ScrollView>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.adicionarProduto}
          />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  oneResult: {
     width: '90%',
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  parteEsquerda: {
    width: '60%',
    flexDirection: 'row',
    alignItems:  'center',
  },
  parteDireita: {
    width: '40%',
    flexDirection: 'row',
    alignItems:  'center',
  },
  text: {
    marginLeft: 12,
    marginRight: 10,
    fontSize: 16,
    justifyContent: 'flex-start'
  },
  texto: {
    marginTop: 12,
    fontSize: 18,
    justifyContent: 'center'
  },
  textoMenor: {
    marginLeft: 12,
    fontSize: 12,
    justifyContent: 'flex-start'
  },
  qtd: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  photo: {
    height: 30,
    width: 30,
    marginLeft: 10,
    borderRadius: 20
  },
});

GerenciaProduto.defaultProps = { ...GerenciaProduto };
export default GerenciaProduto;
