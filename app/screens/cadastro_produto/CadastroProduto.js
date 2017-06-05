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
    TouchableOpacity
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import TagInput from 'react-native-tag-input';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import ModalDropdown from 'react-native-modal-dropdown';

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



render() {
    const inputProps = {
      placeholder: 'Ingredientes',
      placeholderTextColor: '#8B636C',
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      height:300
};

  const inputProp = {
     placeholder: 'Tags',
     placeholderTextColor: '#8B636C',
     fontSize: 20,
     fontFamily: 'Roboto',
     fontWeight: 'bold',
     height:300
};

return (
    <View style= {{flex: 3}}>
    <Image source={require('./img/fundo5.jpeg')}
            style={styles.backgroundImage}>
    <NavigationBar
       title={titleConfig}
       tintColor="#f5f5f5"/>

    <ScrollView>

    <View style={styles.container}>

    <Text style={styles.foto}>Foto do Produto</Text>
    <TouchableOpacity onPress={this.selecionarFoto.bind(this)}>
    <Image source={this.state.image}/>
    </TouchableOpacity>


    <Kohana style={{ backgroundColor: 'transparent' }}
            label={'Nome'}
            iconClass={FontAwesomeIcon}
            onChangeText={(nome) => this.setState({nome: nome})}
            iconName={'cutlery'}
            iconColor={'#8B636C'}
            labelStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
            inputStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>



    <Kohana style={{ backgroundColor: 'transparent' }}
            label={'Preço'}
            iconClass={FontAwesomeIcon}
            onChangeText={(preco) => this.setState({preco: preco})}
            keyboardType={'numeric'}
            iconName={'money'}
            iconColor={'#8B636C'}
            labelStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
            inputStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

  <ModalDropdown options={['Doce', 'Salgado', 'Bebida']}
            style={{width: 390, height: 48}}
            defaultValue="Selecione a Categoria"
            onSelect={(categoria) => this.setState({categoria: categoria})}
            textStyle={{color: '#8B636C', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto', textAlign: 'center'}}
            dropdownTextStyle={{color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center'}}
            dropdownStyle={{width: 390, height: 78}}
            />

    <DatePicker
        style={{width: 390,
        height: 48, borderColor: '#EEE9E9',  borderWidth: 0.5 }}
        date={this.state.date}
        mode="date"
        placeholder="Data de Preparação"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         placeholderText: {
           color: '#8B636C',
           fontFamily: 'Roboto',
           fontWeight: 'bold',
           fontSize: 20
         },
         dateText: {
           color: '#8B636C',
           fontFamily: 'Roboto',
           fontSize: 20
         }
       }}
        onDateChange={(date) => {this.setState({date: date});}}
        />

          <Kohana style={{ backgroundColor: 'transparent' }}
                  label={'Quantidade Disponível'}
                  iconClass={FontAwesomeIcon}
                  onChangeText={(quantidade) => this.setState({quantidade: quantidade})}
                  keyboardType={'numeric'}
                  iconName={'shopping-basket'}
                  iconColor={'#8B636C'}
                  labelStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
                  inputStyle={{ color: '#8B636C', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <View style={{ width: 378, height: 86, alignItems: 'center'}}>
      <Text>      </Text>

        <TagInput
          value={this.state.ingredientes}
          onChange={this.onChangeIngredientes}
          tagColor="#8B636C"
          tagTextColor="white"
          tagAlign="center"
          inputProps={inputProps}
          numberOfLines={15}/>

        </View>

        <View style={{ width: 378, height: 86, alignItems: 'center'}}>
       <TagInput
          value={this.state.tags}
          onChange={this.onChangeTags}
          tagColor="#8B636C"
          tagTextColor="white"
          tagAlign="center"
          inputProps={inputProp}
          numberOfLines={15}/>

        </View>
        <Button
         title ="Adicionar Produto"
         color="#8B636C"
          buttonStyle={{ padding: 16, marginBottom: 3 }}
         onPress={onButtonPress}/>

         </View>
     </ScrollView>
     </Image>
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
  },

  texto: {
    color: '#8B636C',
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },

  foto: {
    color: '#8B636C',
    fontSize: 20,
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
