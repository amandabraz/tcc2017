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
    Picker
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import TagInput from 'react-native-tag-input';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import ModalDropdown from 'react-native-modal-dropdown';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';


//dimensão da janela
//const { width, height } = Dimensions.get("window");
const onButtonPress = () => { Alert.alert('Bem vindo Vendedor'); };

//Exporto essa classe pra que na minha "Main"
export default class CadastroProduto extends Component {
  constructor(props) {
  super(props);

  this.state = {
   date: '',
   tags: [],
   ingredientes: [],
   quantidade: '',
   categoria: '',
   categoriasArray: ['Doce', 'Salgado', 'Bebida'],
   nome: '',
   preco: '',
   image: require('./img/camera11.jpg'),
 };
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

  selecionarFoto(){
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
              image: {uri: image.path, width: image.width, height: image.height}});
        });
    }

    mostrarCategorias() {
      var pickerItems = [];
      for(i in this.state.categoriasArray) {
        let categoria = this.state.categoriasArray[i];
        pickerItems.push (
          <Picker.Item key={i} label={categoria} value={categoria} />
        );
      }
      return pickerItems;
    }
  salvaProduto() {
    // TODO; rest para salvar o produto no banco
  }

render() {
    const {goBack} = this.props.navigation;
    const inputIngredientes = {
      placeholder: 'Adicione aqui os ingredientes do produto',
      placeholderTextColor: '#8B636C',
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      height:300
    };

  const inputTags = {
     placeholder: 'Adicione aqui tags relacionadas ao produto',
     placeholderTextColor: '#8B636C',
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
            <MaterialsIcon name="chevron-left" size={40} color={'#8B636C'} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity onPress={() => this.salvaProduto}>
            <MaterialsIcon name="check" size={34} color={'#8B636C'} />
          </TouchableOpacity>
        } />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.selecionarFoto.bind(this)}>
            <Image source={this.state.image}/>
          </TouchableOpacity>

          <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Nome'}
                  iconClass={FontAwesomeIcon}
                  onChangeText={(nome) => this.setState({nome: nome})}
                  iconName={'cutlery'}
                  iconColor={'#8B636C'}/>

          <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Preço'}
                  iconClass={FontAwesomeIcon}
                  onChangeText={(preco) => this.setState({preco: preco})}
                  keyboardType={'numeric'}
                  iconName={'dollar'}
                  iconColor={'#8B636C'}/>

          <View style={{flexDirection: 'row', justifyContent:'space-around', paddingLeft: 18}}>
              <MaterialsIcon name="description" size={20} color={'#CCCCCC'} />
              <Text style={{textAlign: 'left', paddingLeft: 4, fontSize: 16, fontWeight: 'bold', fontFamily: 'Roboto'}}>Selecione uma categoria:</Text>
          </View>
          <View style={{justifyContent:'space-around', padding:10, width: 340}}>
              <ModalDropdown options={this.state.categoriasArray}
                  style={{width: 340, height: 48}}
                  defaultValue="Lista de categorias"
                  onSelect={(categoria) => this.setState({categoria: categoria})}
                  textStyle={{color: '#8B636C', fontSize: 16, fontStyle: 'italic', fontFamily: 'Roboto'}}
                  dropdownTextStyle={{fontSize: 16, fontFamily: 'Roboto', textAlign: 'center'}}
                  dropdownStyle={{alignSelf: 'flex-end', width: 340 }}
                  />
          </View>

          <DatePicker
              style={{width: 390, height: 48}}
              date={this.state.date}
              mode="date"
              placeholder="Data de Preparação"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: { borderWidth: 0 },
               dateIcon: {
                 position: 'absolute',
                 left: 0,
                 top: 4,
                 marginLeft: 0
               },
               placeholderText: {
                 fontFamily: 'Roboto',
                 fontWeight: 'bold',
                 fontSize: 16
               },
               dateText: {
                 fontFamily: 'Roboto',
                 fontSize: 16
               }
             }}
              onDateChange={(date) => {this.setState({date: date});}}
              />

            <Fumi style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                    label={'Quantidade Disponível'}
                    iconClass={FontAwesomeIcon}
                    onChangeText={(quantidade) => this.setState({quantidade: quantidade})}
                    keyboardType={'numeric'}
                    iconName={'shopping-cart'}
                    iconColor={'#8B636C'}/>

            <View style={{ width: 378, height: 86, alignItems: 'center', padding: 15}}>

              <TagInput
                value={this.state.ingredientes}
                onChange={this.onChangeIngredientes}
                tagColor="#8B636C"
                tagTextColor="white"
                tagAlign="center"
                inputProps={inputIngredientes}
                numberOfLines={15}/>

              </View>

            <View style={{ width: 378, height: 86, alignItems: 'center', padding: 15}}>
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
    alignItems: 'center',
    padding: 15
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
