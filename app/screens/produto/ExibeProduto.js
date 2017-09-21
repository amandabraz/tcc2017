import React, {
  Component
} from 'react';
import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Popup from 'react-native-popup';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
    Fumi
} from 'react-native-textinput-effects';
import {
    Icon,
    Button
} from 'react-native-elements';

export default class ExibeProduto extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          produtoId: this.props.navigation.state.params.produtoId,
          imagemPrincipal: require('./img/camera11.jpg'),          
          produto: {
            nome: '',
            preco: '',
            categoria: {
              descricao: ''
            },
            quantidade: ''
          },
          tagsText: "Nenhuma tag cadastrada",
          tagEstilo: {
            color: '#CCCCCC',
            fontStyle: 'italic'
          },
          dietaProdutoText: "Nenhuma dieta cadastrada",
          restricaoEstilo: {
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
          image: './img/camera11.jpg',
          quantidadeSelecionada: 1
        };
        this.buscaProduto();
    }

  buscaProduto() {
    if (this.state.produtoId > 0) {
      fetch("http://10.0.2.2:8080/produto/" + this.state.produtoId)
      .then((response) => response.json())
      .then((rJson) => {
        if (!rJson.errorMessage) {
          this.setState({produto: rJson});
          if (rJson.imagemPrincipal) {
            this.setState({imagemPrincipal: { uri: rJson.imagemPrincipal }});            
          }
          if (rJson.restricoesDieteticas.length > 0) {
            this.setState({dietaEstilo: styles.listText});
            var restricoes = "";
            for(i in rJson.restricoesDieteticas) {
              restricoes += rJson.restricoesDieteticas[i].descricao + " - ";
            }
            restricoes = restricoes.slice(0, -3);
            this.setState({dietaProdutoText: restricoes});
          }
          if (rJson.tags.length > 0) {
            this.setState({tagEstilo: styles.listText})
            var tags = "";
            for(i in rJson.tags) {
              tags += "#" + rJson.tags[i].descricao + "  ";
            }
            tags = tags.slice(0, -2);
            this.setState({tagsText: tags});
          }
          if (rJson.ingredientes.length > 0) {
            this.setState({ingredientesEstilo: styles.listText})
            var ingredientes = "";
            for(i in rJson.ingredientes) {
              ingredientes += rJson.ingredientes[i].item + ", ";
            }
            ingredientes = ingredientes.slice(0, -2);
            this.setState({ingredientesText: ingredientes});
          }
          var dataNormal = new Date(rJson.dataPreparacao);
          var dataPrep = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
          this.setState({dateText: dataPrep});
        }
      });
    }
  }

    render() {
        return (
          <Image style={styles.headerBackground}
                 source={require('./img/fundo2.png')}>
                 <View style={styles.header}>
                  <View style={styles.profilepicWrap}>
                    <Image
                      style={styles.profilepic}
                      source={this.state.imagemPrincipal}/>
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
                    value={this.state.produto.nome}
                    editable={false}
                    inputStyle={styles.titleText}/>

                  <Fumi
                    style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Categoria'}
                    iconClass={FontAwesomeIcon}
                    iconName={'check-square-o'}
                    iconColor={'darkslategrey'}
                    value={this.state.produto.categoria.descricao}
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
                    label={'Data de preparo'}
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
                    value={this.state.produto.preco.toString()}
                    editable={false}
                    inputStyle={styles.baseText}/>


                  <Fumi
                    style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Observação'}
                    iconClass={FontAwesomeIcon}
                    iconName={'info'}
                    iconColor={'darkslategrey'}
                    value={this.state.produto.observacao}
                    editable={false}
                    inputStyle={styles.baseText}/>

                  <View style={styles.baseQuantidadeText}>
                    <Text style={styles.baseText}>   Quantidade:  </Text>
                      <TouchableOpacity onPress={() => {
                        if (this.state.quantidadeSelecionada > 0) {
                          var novaQtd = this.state.quantidadeSelecionada - 1;
                          this.setState({quantidadeSelecionada: novaQtd});
                          var precoCalculado = this.state.produto.preco * novaQtd;
                          this.setState({precoTotalText: precoCalculado.toFixed(2)});
                        }
                      }}>
                        <FontAwesomeIcon name="minus" size={30} color={'pink'}/>
                      </TouchableOpacity>
                        <TextInput style={styles.baseText} 
                          value={this.state.quantidadeSelecionada.toString()}
                          onChangeText={(qtd) => this.setState({quantidadeSelecionada: qtd})} />
                      <TouchableOpacity onPress={() => {
                        if (this.state.quantidadeSelecionada < this.state.produto.quantidade) {
                          var novaQtd = this.state.quantidadeSelecionada + 1;
                          this.setState({quantidadeSelecionada: novaQtd});
                          var precoCalculado = this.state.produto.preco * novaQtd;
                          this.setState({precoTotalText: precoCalculado.toFixed(2)});
                        }
                      }}>
                          <FontAwesomeIcon name="plus" size={30} color={'pink'}/>
                      </TouchableOpacity>
                   </View>


                  <Fumi
                    style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Preço total R$'}
                    iconClass={FontAwesomeIcon}
                    iconName={'money'}
                    iconColor={'darkslategrey'}
                    value={this.state.precoTotalText.toString()}
                    editable={false}
                    inputStyle={styles.baseText}
                  />
                </ScrollView>
                <TouchableOpacity style={styles.EvenBtn} onPress={this._confirmTest.bind(this)}>
                  <Text style={styles.EvenBtnText}>Comprar</Text>
                </TouchableOpacity>

                <Popup ref={popup => this.popup = popup }/>
          </Image>
        );
    }
};

//CSS
const titleConfig = {
  title: 'Comprar produto',
  tintColor: "#dc143c",
  fontFamily: 'Roboto',
};
let styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EvenBtn: {
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
        position: 'relative',
        backgroundColor: '#dc143c'
    },
    EvenBtnText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
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
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'darkslategrey',
      fontFamily: 'Roboto',
    }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
