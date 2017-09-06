import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import {
  Icon,
  Button
} from 'react-native-elements';
import CheckBox from 'react-native-check-box';

//TODO: Pegar dados do produto certo, o que o clique foi feito

export default class ExibeProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeProdutoText: '',
      tagsText: "Nenhuma tag cadastrada",
      tagEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      restricoesDieteticasText: "Nenhuma restrição cadastrada",
      restricaoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      dietaProdutoText: "Nenhuma restrição cadastrada",
      dietaEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      ingredientesText: "Nenhum ingrediente cadastrado",
      ingredientesEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      dateText: '',
      quantidadeText: '',
      categoriaText: '',
      precoText: '',
      observacaoText: '',
      precoTotalText: "0,00",
      image: require('./img/camera11.jpg')
    };
    this.buscaDadosProduto();
    this.preencherDietasArray();
    this.carregarCategoriasArray();
  }

  preencherDietasArray() {
   fetch('http://10.0.3.2:8080/restricaodietetica')
     .then((response) => response.json())
       .then((responseJson) => {
         var dietasBuscadas = [];
           for (i in responseJson) {
             dietasBuscadas.push(responseJson[i]);
           }
           this.setState({dietasArray: dietasBuscadas});
       });
  };

  carregarCategoriasArray() {
    fetch('http://10.0.3.2:8080/categoria')
      .then((response) => response.json())
        .then((responseJson) => {
          var categoriasBuscadas = [];
          categoriasBuscadas.push({descricao: '-----'})
            for (i in responseJson) {
              categoriasBuscadas.push(responseJson[i]);
            }
            this.setState({categoriasArray: categoriasBuscadas});
        });
  }

  //TODO: Implementar busca para tela do comprovante
  onButtonFinalizarCompra = () => {
    this.props.navigation.navigate('ExibeComprovante');
  };

  buscaDadosProduto() {
    //TODO: Fazer busca de dados do produto
  }

  quebraEmLinhas(lista) {
    var listaQuebrada = "";
    for(item in lista) {
      listaQuebrada += lista[item] + "\n";
    }
    return listaQuebrada.trim();
  }

  mostrarCategorias() {
    var pickerItems = [];
    for(i in this.state.categoriasArray) {
      let opcao = this.state.categoriasArray[i];
      pickerItems.push(
        <Picker.Item key={i} label={opcao.descricao} value={opcao} />
      );
    }
    return pickerItems;
  };

  render () {
    return (
        <Image style={styles.headerBackground}
               source={require('./img/fundo2.png')}>
        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            //TODO: TROCAR POR IMAGEM DO PRODUTO
            source={require('./img/sabrina-copy.jpg')}/>
          </View>
          </View>

        <ScrollView>
          <Fumi
            style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
            label={'Nome'}
            iconClass={FontAwesomeIcon}
            iconSize={20}
            iconName={'user'}
            iconColor={'darkslategrey'}
            value={this.state.nomeProdutoText}
            editable={false}
            inputStyle={styles.titleText}/>

            <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Categoria'}
                iconClass={FontAwesomeIcon}
                iconName={'check-square-o'}
                iconColor={'darkslategrey'}
                value={this.state.categoriaText}
                editable={false}
                inputStyle={styles.baseText}/>

            <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Dieta'}
                iconClass={FontAwesomeIcon}
                iconName={'cutlery'}
                iconColor={'darkslategrey'}
                value={this.state.dietaProdutoText}
                editable={false}
                inputStyle={this.state.dietaEstilo}/>

            <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
                label={'Tags'}
                iconClass={FontAwesomeIcon}
                iconName={'hashtag'}
                iconColor={'darkslategrey'}
                value={this.state.tagsText}
                editable={false}
                multiline={true}
                inputStyle={this.state.tagEstilo}/>

            <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
                label={'Restrições dietéticas'}
                iconClass={FontAwesomeIcon}
                iconName={'asterisk'}
                iconColor={'darkslategrey'}
                value={this.state.restricoesDieteticasText}
                multiline={true}
                editable={false}
                inputStyle={this.state.restricaoEstilo}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
                  label={'Ingredientes'}
                  iconClass={FontAwesomeIcon}
                  iconName={'file-text-o'}
                  iconColor={'darkslategrey'}
                  value={this.state.ingredientesText}
                  multiline={true}
                  editable={false}
                  inputStyle={this.state.ingredientesEstilo}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Data'}
              iconClass={FontAwesomeIcon}
              iconName={'calendar'}
              iconColor={'darkslategrey'}
              value={this.state.dateText}
              editable={false}
              inputStyle={styles.baseText}/>


              <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Preço da unidade'}
                iconClass={FontAwesomeIcon}
                iconName={'money'}
                iconColor={'darkslategrey'}
                value={this.state.precoText}
                editable={false}
                inputStyle={styles.baseText}/>


                <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Observação'}
                  iconClass={FontAwesomeIcon}
                  iconName={'info'}
                  iconColor={'darkslategrey'}
                  value={this.state.observacaoText}
                  editable={false}
                  inputStyle={styles.baseText}/>


                  <View style={styles.baseQuantidadeText}>
                    <Text style={styles.baseText}>   Quantidade:  </Text>
                    <TouchableOpacity onPress={() => {
                      if (produto.quantidade > 0) {
                        produto.quantidade -= 1;
                        this.alteraQuantidade(produto);
                      }
                    }}>
                      <FontAwesomeIcon name="minus" size={40} color={'pink'}/>
                    </TouchableOpacity>
                    <Text style={styles.baseText}> 01 </Text>
                    <TouchableOpacity onPress={() => {
                      produto.quantidade += 1;
                      this.alteraQuantidade(produto);
                    }}>
                      <FontAwesomeIcon name="plus" size={40} color={'pink'}/>
                    </TouchableOpacity>
                  </View>


                                      <Fumi
                                        style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                                        label={'Preço total R$'}
                                        iconClass={FontAwesomeIcon}
                                        iconName={'money'}
                                        iconColor={'darkslategrey'}
                                        value={this.state.precoTotalText}
                                        editable={false}
                                        inputStyle={styles.baseText}
                                        // Fazer multiplicação da quantidade pelo preço unitário onChangeText={(text) => { this.setState({textValue: text})
                                         />



                  <Button
                    onPress={this.onButtonFinalizarCompra}
                    title="Comprar"
                    color="#dc143c"
                    textStyle={{fontSize: 25}}
                  />

      </ScrollView>
      </Image>
    );
  }
}


  //CSS
  const titleConfig = {
    title: 'Perfil Vendedor',
    tintColor: "#dc143c",
    fontFamily: 'Roboto',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.2)',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  bar:{
    borderTopColor: '#fff',
    borderTopWidth: 4,
    backgroundColor: 'darkslategrey',
    flexDirection: 'row'
  },
  barItem:{
    padding: 18,
    alignItems: 'center'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 20,
  },
  baseQuantidadeText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 375,
    height: 70,
  },
  listText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 16,
  },
  barText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 20,
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
