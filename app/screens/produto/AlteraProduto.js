import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    Picker,
    ToastAndroid
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import TagInput from 'react-native-tag-input';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import * as constante from '../../constantes';
import Spinner from 'react-native-loading-spinner-overlay';

export default class AlteraProduto extends Component {
  constructor(props) {
  super(props);

  this.state = {
     produtoId: this.props.navigation.state.params.produtoId,
     vendedorId: this.props.navigation.state.params.vendedorId,
     userId: this.props.navigation.state.params.userId,
     dataPreparacao: '',
     tags: [],
     ingredientes: [],
     restricoesDieteticas: [],
     dietasArray: [],
     quantidade: '',
     categoria: {
       descricao: ''
     },
     categoriasArray: [],
     nome: '',
     preco: '',
     observacao: '',
     imagemPrincipal: require('./img/camera11.jpg'),
     imagemProduto: '',
     backgroundColorPreco: "transparent",
     restricoesProdutos: [],
     dataOriginal: '',
     carregou: true
    }
    this.buscaProduto();
    this.carregarCategoriasArray();
    this.preencherDietasArray();
 };

 buscaProduto() {
   if (this.state.produtoId > 0) {
     fetch(constante.ENDPOINT+'produto/' + this.state.produtoId)
     .then((response) => response.json())
     .then((rJson) => {
       if (!rJson.errorMessage) {
         this.setState({produto: rJson});

         if (rJson.imagemPrincipal) {
           this.setState({imagemPrincipal: { uri: rJson.imagemPrincipal }});
         }
         this.setState({nome: rJson.nome});
         this.setState({preco: rJson.preco.toString()});
         this.setState({quantidade: rJson.quantidade.toString()});
         this.setState({categoria: rJson.categoria});
         this.setState({observacao: rJson.observacao});
         var dataNormal = new Date(rJson.dataPreparacao);
        let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
        let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
        let ano = dataNormal.getFullYear();
        let dataPrep = dia + "/" + mes + "/" + ano;
         this.setState({dataOriginal: rJson.dataPreparacao});
         this.setState({dataPreparacao: dataPrep});
         if (rJson.restricoesDieteticas.length > 0) {
           this.setState({restricoesProdutos: rJson.restricoesDieteticas});
         }

         if (rJson.tags.length > 0) {
           var tags = [];
           var tagEncontrada = rJson.tags;
           for(i in tagEncontrada) {
             tags.push(tagEncontrada[i].descricao);
           }
           this.setState({tags: tags});
         }
         if (rJson.ingredientes.length > 0) {
           var ingredientes = [];
           var ingredienteEncontrado = rJson.ingredientes;
           for(i in ingredienteEncontrado) {
             ingredientes.push(ingredienteEncontrado[i].item);
           }
           this.setState({ingredientes: ingredientes});
           this.setState({carregou: false});
         }
       }
     });
   }
 }

 onChangeTags = (tags) => {
   this.setState({
     tags,
   });
};

 onChangeIngredientes = (ingredientes) => {
   this.setState({
     ingredientes,
   });
};

validaCampos = (produto) => {
  let camposVazios = [];
  let erros = [];
  //validar nome
  if (!produto.nome) {
      camposVazios.push("nome");
  }
  //validar preco
  if (!produto.preco) {
    camposVazios.push("preço");
  }
  //validar data de preparo
  if (!produto.dataPreparacao) {
    camposVazios.push("data de preparo");
  }

  // validar quantidade
  if (!produto.quantidade) {
    camposVazios.push("quantidade disponível");
  }

  // validar categoria
  if (!produto.categoria) {
    camposVazios.push("categoria");
  }

  if (camposVazios.length) {
    ToastAndroid.showWithGravity('Os seguinte campos são obrigatórios: ' + this.quebraEmLinhas(camposVazios) + '.', ToastAndroid.LONG, ToastAndroid.CENTER);
    return false;
  }
  if (erros.length) {
    ToastAndroid.showWithGravity(this.quebraEmLinhas(erros), ToastAndroid.LONG, ToastAndroid.CENTER);
    return false;
  }
  return true;
}

quebraEmLinhas(lista) {
  var listaQuebrada = "";
  for(item in lista) {
    listaQuebrada += lista[item] + "\n";
  }
  return listaQuebrada.trim();
}

 preencherDietasArray() {
  fetch(constante.ENDPOINT + 'restricaodietetica')
    .then((response) => response.json())
      .then((responseJson) => {
        var dietasBuscadas = [];
          for (i in responseJson) {
            dietasBuscadas.push(responseJson[i]);
          }
          this.setState({dietasArray: dietasBuscadas});
      });
 };

onClickRestricao(restricao) {
   restricao.checked = !restricao.checked;
   var objRestricoes = {
     "id": restricao.id,
     "descricao": restricao.descricao
   }
   var restricoes = this.state.restricoesProdutos;
   if (restricao.checked) {
     restricoes.push(objRestricoes);
   } else {
     restricoes.pop(objRestricoes);
   }
   this.setState({restricoesProdutos: restricoes});
 };

 mostrarCheckboxesDieta() {
   var dietasProduto = this.state.dietasArray
   if (dietasProduto) {
     var views = [];
     for (i in dietasProduto) {
       let dieta = dietasProduto[i];
       dieta.checked = false;
       for (j in this.state.restricoesProdutos) {
         if (dieta.id === this.state.restricoesProdutos[j].id) {
           dieta.checked = true;
         }
       }
     views.push (
       <View key={i} style={styles.item}>
         <CheckBox
           style={{flex: 1, padding: 10}}
           onClick={()=>this.onClickRestricao(dieta)}
           isChecked={dieta.checked}
           leftText={dieta.descricao}
           />
       </View>
     );
   }
   return views;
 };
}

carregarCategoriasArray() {
  fetch(constante.ENDPOINT + 'categoria')
    .then((response) => response.json())
      .then((responseJson) => {
        var categoriasBuscadas = [];
        categoriasBuscadas.push({descricao: this.state.categoria.descricao})
          for (i in responseJson) {
            if(responseJson[i].descricao!=this.state.categoria){
              categoriasBuscadas.push(responseJson[i]);
            }
        }
        this.setState({categoriasArray: categoriasBuscadas});
      });
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

  salvaEdicaoProduto() {
     var dataNormal = new Date(this.state.dataOriginal);
     var dataAlterada = new Date(this.state.dataPreparacao);
     var dataSalvar = '';
     var imagem = this.state.imagemProduto;
    if (!imagem) {
       imagem = this.state.imagemPrincipal.uri;
     }
     if(dataAlterada!=dataNormal){
       dataSalvar = dataAlterada;
     } else {
       dataSalvar = dataNormal;
    }
    const {
      state: {
        produtoId,
        vendedorId,
        nome,
        quantidade,
        preco,
        observacao,
        categoria,
        ingredientes,
        tags,
        restricoesProdutos
      }
    } = this;

    produtoEditado = {
      "id": produtoId,
      "vendedor": vendedorId,
      "nome": nome,
      "dataPreparacao": dataSalvar,
      "quantidade": quantidade,
      "preco": preco,
      "observacao": observacao,
      "categoria": categoria,
      "ingredientes": ingredientes,
      "tags": tags,
      "restricoesDieteticas": restricoesProdutos,
      "imagemPrincipal": imagem,
      "deletado": false,
      "score": 0,
    }

    let continuar = this.validaCampos(produtoEditado);

      if (continuar) {
        fetch(constante.ENDPOINT + 'produto', {
          method: 'PUT',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(produtoEditado)})
          .then((response) => response.json())
          .then((rJson) => {
            if (!rJson.errorMessage) {
              this.buscaProduto(rJson);
              ToastAndroid.showWithGravity('Produto atualizado com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);
              this.props.navigation.navigate('GerenciaProduto', {userId: this.state.userId, vendedorId: this.state.vendedorId });
            } else {
                ToastAndroid.showWithGravity(rJson.errorMessage, ToastAndroid.LONG, ToastAndroid.CENTER);
            }
          });
      }
    }

    selecionarFoto() {
      var options = {
        title: 'Selecione sua foto',
        takePhotoButtonTitle: 'Tirar uma foto',
        chooseFromLibraryButtonTitle: 'Selecionar uma foto da biblioteca',
        cancelButtonTitle: 'Cancelar',
        storageOptions: {
          skipBackup: false,
          path: 'images'
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          //do nothing
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let source = 'data:image/jpeg;base64,' + response.data;
          this.setState({
            imagemPrincipal: {uri: response.uri, width: 200, height: 200, changed: true}
          });
          this.setState({imagemProduto: source});
        }
      });
    }

render() {
    const {goBack} = this.props.navigation;
    const inputIngredientes = {
      placeholder: 'insira mais ingredientes',
      placeholderTextColor: '#CCCCCC',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      height:300
    };

  const inputTags = {
     placeholder: 'insira mais tags',
     placeholderTextColor: '#CCCCCC',
     fontSize: 16,
     fontFamily: 'Roboto',
     fontWeight: 'bold',
     height:300
};

return (
    <View style= {{flex: 3}}>
      <NavigationBar
        title={titleConfig}
        tintColor="#7A8887"
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialsIcon name="arrow-back" size={34} color={'#fff'}  style={{ padding: 3 }} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity onPress={() => this.salvaEdicaoProduto()}>
            <MaterialsIcon name="check" size={34} color={'#fff'} style={{ padding: 5 }} />
          </TouchableOpacity>
        } />
      <ScrollView>
        <View style={styles.container}>
        <View style={{ alignItems: 'center'}}>
        <View style={styles.profilepicWrap}>
        <TouchableOpacity style={styles.profilepicWrap} onPress={this.selecionarFoto.bind(this)}>
          <Image style={styles.profilepic}
                 source={this.state.imagemPrincipal}
                 justifyContent='flex-start'/>
        </TouchableOpacity>
        </View>
        </View>

          <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Nome'}
                  iconClass={FontAwesomeIcon}
                  maxLength={50}
                  value={this.state.nome}
                  onChangeText={(nome) => this.setState({nome: nome})}
                  iconName={'cutlery'}
                  iconColor={'#7A8887'}/>

          <Fumi style={{ backgroundColor: this.state.backgroundColorPreco, width: 375, height: 70 }}
                  label={'Preço'}
                  maxLength={6}
                  iconClass={FontAwesomeIcon}
                  value={this.state.preco}
                  onChangeText={(preco) => this.setState({preco: preco})}
                  keyboardType={'numeric'}
                  iconName={'dollar'}
                  iconColor={'#7A8887'}/>

         <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Quantidade disponível'}
                    maxLength={4}
                    iconClass={FontAwesomeIcon}
                    value={this.state.quantidade}
                    onChangeText={(quantidade) => this.setState({quantidade: quantidade})}
                    keyboardType={'numeric'}
                    iconName={'shopping-cart'}
                    iconColor={'#7A8887'}/>

      <View style={{flexDirection:'row', padding: 18, alignItems: 'center'}}>
        <FontAwesomeIcon
          name='calendar'
          color='#7A8887'
          size = {18}/>
        <DatePicker
              style={{width: 300}}
              date={this.state.dataPreparacao}
              showIcon={false}
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                  dateInput: { borderWidth: 0 },
                   dateText: {
                       fontFamily: 'Roboto',
                       fontSize: 16,
                       color: '#7A8887'}
                       }}
              onDateChange={(dataPreparacao) => {this.setState({dataPreparacao: dataPreparacao});}}/>
        </View>

            <View style={styles.linhaTitulo}>
              <MaterialsIcon name="description" size={22} color={'#9fa1a3'} /><Text style={styles.titulo}>
                  Selecione uma categoria:{'\n'}{'\n'}
              </Text>
            </View>
            <View style={{paddingLeft: 16, justifyContent:'space-around', width: 340, height: 50, backgroundColor: 'white'}}>
              <Picker selectedValue={this.state.categoria}
                      onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}
                      mode = 'dropdown'>
                  {this.mostrarCategorias()}
              </Picker>
            </View>
            <Text>{'\n'}</Text>
            <View style={styles.linhaTitulo}>
              <MaterialsIcon name="check-circle" size={20} color={'#9fa1a3'} /><Text style={styles.titulo}>
                  Adequado para a dieta:
              </Text>
            </View>
            <View style={styles.restricoes}>
                <ScrollView>
                    {this.mostrarCheckboxesDieta()}
                </ScrollView>
            </View>

            <View style={styles.linhaTitulo}>
              <MaterialsIcon name="list" size={23} color={'#9fa1a3'} /><Text style={styles.titulo}>
                Ingredientes:
              </Text>
            </View>
            <View style={{ width: 378, height: 86, alignItems: 'center'}}>
              <TagInput
                value={this.state.ingredientes}
                onChange={this.onChangeIngredientes}
                tagColor="#7A8887"
                tagTextColor="white"
                tagAlign="center"
                tagContainerStyle={{height: 24}}
                tagTextStyle = {{fontSize: 18}}
                inputProps={inputIngredientes}
                numberOfLines={15}/>
              </View>

            <View style={styles.linhaTitulo}>
              <FontAwesomeIcon name="hashtag" size={17} color={'#9fa1a3'} /><Text style={styles.titulo}>
                Tags relacionadas:
              </Text>
            </View>
            <Spinner visible={this.state.carregou}/>
            <View style={{ width: 378, height: 86, alignItems: 'center'}}>
             <TagInput
                value={this.state.tags}
                onChange={this.onChangeTags}
                tagColor="#7A8887"
                tagTextColor="white"
                tagAlign="center"
                tagContainerStyle={{height: 24}}
                tagTextStyle = {{fontSize: 18}}
                inputProps={inputTags}
                numberOfLines={15}/>
              </View>

            </View>
            <View style={styles.container}>
              <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 100 }}
                      label={'Observações'}
                      placeholder={'campo opcional'}
                      placeholderTextColor={'#ccc'}
                      iconClass={FontAwesomeIcon}
                      value={this.state.observacao}
                      onChangeText={(observacao) => this.setState({observacao: observacao})}
                      iconName={'pencil-square-o'}
                      iconColor={'#7A8887'}
                      multiline={true}
                      maxLength={255}/>
            </View>
        </ScrollView>
    </View>

    );
  }
}

const titleConfig = {
  title: 'Editar Produto',
  tintColor: '#fff',
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5'
  },
  restricoes: {
      width: 340,
      flex: 3,
      justifyContent: 'space-between',
      padding: 15
  },
  linhaTitulo: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 15
  },
  titulo: {
    paddingLeft: 15,
    color: '#5a5c60',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  foto: {
    color: '#7A8887',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
  },

  tag: {
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    margin: 4,
  },

  tagLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
},
profilepicWrap:{
  width: 180,
  height: 180,
  borderColor: 'rgba(0,0,0,0.4)',
},
profilepic:{
  flex: 1,
  alignSelf: 'stretch',
  borderWidth: 4
}

});
