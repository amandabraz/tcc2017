/**
* Interface de Cadastro de Produto.
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    CameraRoll,
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
import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import TagInput from 'react-native-tag-input';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';


export default class CadastroProduto extends Component {
  constructor(props) {
  super(props);

  this.state = {
     userId: this.props.navigation.state.params.userId,
     vendedorId: this.props.navigation.state.params.vendedorId,
     date: '',
     tags: [],
     ingredientes: [],
     restricoesDieteticas: [],
     dietasArray: [],
     quantidade: '',
     categoria: '',
     categoriasArray: [],
     nome: '',
     preco: '',
     observacao: '',
     image: require('./img/camera11.jpg'),
     backgroundColorPreco: "transparent"
    }
    this.preencherDietasArray();
    this.carregarCategoriasArray();
 };

  preencherDietasArray() {
   fetch('http://10.0.2.2:8080/restricaodietetica')
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
    fetch('http://10.0.2.2:8080/categoria')
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

onClickRestricao(descricao) {
  descricao.checked = !descricao.checked;
  var restricoes = this.state.restricoesDieteticas;
  restricoes.push(descricao);
  this.setState({restricoesDieteticas: restricoes});
};

mostrarCheckboxesDieta() {
  var views = [];
  for(i in this.state.dietasArray) {
    let dieta = this.state.dietasArray[i];
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
      let source = { uri: response.uri };
      this.setState({
        image: {uri: response.uri, width: 200, height: 200, changed: true}
      });
    }
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

  salvaProduto() {

    const {
      state: {
        vendedorId,
        date,
        tags,
        ingredientes,
        restricoesDieteticas,
        quantidade,
        categoria,
        nome,
        preco,
        observacao
      }
    } = this;

    produto = {
      "nome": nome,
      "dataPreparacao": date,
      "quantidade": quantidade,
      "preco": preco,
      "vendedor": vendedorId,
      "tags": tags,
      "restricoesDieteticas": restricoesDieteticas,
      "ingredientes": ingredientes,
      "categoria": categoria,
      "observacao": observacao
    }
    let continuar = this.validaCampos(produto);

    if (continuar){
    fetch('http://10.0.2.2:8080/produto', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto)
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.errorMessage) {
          Alert.alert("Houve um erro ao cadastrar produto! Por favor, tente novamente.");
        } else {
          ToastAndroid.showWithGravity('Produto cadastrado com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);
          this.props.navigation.navigate('GerenciaProduto', {userId: this.state.userId, vendedorId: this.state.vendedorId });
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  };

render() {
    const {goBack} = this.props.navigation;
    const inputIngredientes = {
      placeholder: 'ex: farinha, leite em pó',
      placeholderTextColor: '#CCCCCC',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      height:300
    };

  const inputTags = {
     placeholder: 'ex: brigadeiro, paçoca, bolo',
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
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialsIcon name="chevron-left" size={40} color={'#8B636C'}  style={{ padding: 3 }} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity onPress={() => this.salvaProduto()}>
            <MaterialsIcon name="check" size={34} color={'#8B636C'} style={{ padding: 5 }} />
          </TouchableOpacity>
        } />
      <ScrollView>
        <View style={styles.container}>
        <View style={{ alignItems: 'center'}}>
          <TouchableOpacity onPress={this.selecionarFoto.bind(this)}>
            <Image source={this.state.image}/>
          </TouchableOpacity>
        </View>

          <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Nome'}
                  iconClass={FontAwesomeIcon}
                  maxLength={50}
                  onChangeText={(nome) => this.setState({nome: nome})}
                  iconName={'cutlery'}
                  iconColor={'#8B636C'}/>

          <Fumi style={{ backgroundColor: this.state.backgroundColorPreco, width: 375, height: 70 }}
                  label={'Preço'}
                  maxLength={6}
                  iconClass={FontAwesomeIcon}
                  onChangeText={(preco) => this.setState({preco: preco})}
                  keyboardType={'numeric'}
                  iconName={'dollar'}
                  iconColor={'#8B636C'}/>

         <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Quantidade disponível'}
                    maxLength={4}
                    iconClass={FontAwesomeIcon}
                    onChangeText={(quantidade) => this.setState({quantidade: quantidade})}
                    keyboardType={'numeric'}
                    iconName={'shopping-cart'}
                    iconColor={'#8B636C'}/>

      <View style={{ alignItems: 'center'}}>
        <DatePicker
              style={{width: 352, height: 50}}
              date={this.state.date}
              mode="date"
              placeholder="Data de Preparação"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                  dateInput: { borderWidth: 0 },
                   dateIcon: {
                       position: 'absolute',
                       left: 0,
                       top: 4,
                       marginLeft: 0},
                   placeholderText: {
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                      color: 'gray',
                      fontSize: 16},
                   dateText: {
                       fontFamily: 'Roboto',
                       fontSize: 16,
                       color: '#8B636C'}
                       }}
              onDateChange={(date) => {this.setState({date: date});}}/>
        </View>

            <View style={styles.linhaTitulo}>
              <MaterialsIcon name="description" size={22} color={'#9fa1a3'} /><Text style={styles.titulo}>
                  Selecione uma categoria:{'\n'}{'\n'}
              </Text>
            </View>
            <View style={{paddingLeft: 16, justifyContent:'space-around', width: 340, height: 50, backgroundColor: 'white'}}>
              <Picker onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}
                      selectedValue={this.state.categoria}
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
                tagColor="#8B636C"
                tagTextColor="white"
                tagAlign="center"
                inputProps={inputIngredientes}
                numberOfLines={15}/>
              </View>

            <View style={styles.linhaTitulo}>
              <FontAwesomeIcon name="hashtag" size={17} color={'#9fa1a3'} /><Text style={styles.titulo}>
                Tags relacionadas:
              </Text>
            </View>
            <View style={{ width: 378, height: 86, alignItems: 'center'}}>
             <TagInput
                value={this.state.tags}
                onChange={this.onChangeTags}
                tagColor="#8B636C"
                tagTextColor="white"
                tagAlign="center"
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
                      onChangeText={(observacao) => this.setState({observacao: observacao})}
                      iconName={'pencil-square-o'}
                      iconColor={'#8B636C'}
                      multiline={true}
                      maxLength={255}/>
            </View>
        </ScrollView>
    </View>

    );
  }
}

const titleConfig = {
  title: 'Novo Produto',
  tintColor: '#8B636C',
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
    color: '#8B636C',
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

});
