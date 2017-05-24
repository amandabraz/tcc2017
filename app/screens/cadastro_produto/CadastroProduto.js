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
 Alert
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import CameraRollPicker from 'react-native-camera-roll-picker';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import TagInput from 'react-native-tag-input';

import DropDown, {
  Select,
  Option,
  OptionList,
  updatePosition
} from 'react-native-dropdown';

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
 };
}


componentDidMount() {
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['SELECT2']);

    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
}

  _quantidade(numero) {

  this.setState({
      ...this.state,
      quantidade: numero
    });
  }

    _categoria(cat) {

    this.setState({
        ...this.state,
        categoria: cat
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

pickMultiple(){
  ImagePicker.openPicker({
  multiple: true
}).then(images => {
  console.log(images);
});
}

abrircamera(){
  ImagePicker.openCamera({
}).then(image => {
  console.log(image);
});
}
  render() {
    const inputProps = {
      placeholder: 'Ingredientes',
      placeholderTextColor: '#dc143c',
      fontSize: 20,
      fontFamily: 'Roboto',
      textAlign: 'center',
      height:300
};

const inputProp = {
  placeholder: 'Tags',
  placeholderTextColor: '#dc143c',
  fontSize: 20,
  fontFamily: 'Roboto',
  textAlign: 'center',
  height:300
};

    return (
      <View style= {{flex: 1, backgroundColor: '#ffffff'}}>
      <NavigationBar
       title={titleConfig}
       tintColor="#f5f5f5"/>
        <ScrollView>

      <View style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Nome"
          placeholderTextColor = "#ffb6c1"
        />



        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Preço"
          placeholderTextColor = "#ffb6c1"
        />

        <DatePicker
        style={{width: 378,
        height: 48}}
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
           color: '#ffb6c1',
           fontFamily: 'Roboto',
           fontSize: 20
         },
         dateText: {
           color: '#f08080',
           fontFamily: 'Roboto',
           fontSize: 20
         }
       }}
        onDateChange={(date) => {this.setState({date: date});}}
        />

      <View style={{ width: 378, height: 86, alignItems: 'center'}}>
      <Text>      </Text>
        <TagInput
          value={this.state.ingredientes}
          onChange={this.onChangeIngredientes}
          tagColor="pink"
          tagTextColor="white"
          tagAlign="center"
          inputProps={inputProps}
          numberOfLines={15}/>

        </View>

        <Select
          width={378}
          ref="SELECT1"
          ptionListRef={this._getOptionList.bind(this)}
          styleText={{color: '#f08080',
                              fontFamily: 'Roboto',
                              fontSize: 20,
                              textAlign: 'center'}}
          defaultValue="Selecione a categoria"
          onSelect={this._categoria.bind(this)}>
          <Option value = {{id : "Doce"}}
                  styleText={{color: '#f08080',
                              fontFamily: 'Roboto',
                              fontSize: 20,
                              textAlign: 'center'}}>Doce</Option>
          <Option styleText={{color: '#f08080',
                              fontFamily: 'Roboto',
                              fontSize: 20,
                              textAlign: 'center'}}>Salgado</Option>
          <Option styleText={{color: '#f08080',
                              fontFamily: 'Roboto',
                              fontSize: 20,
                              textAlign: 'center'}}>Bebida</Option>

          </Select>


        <Select
            width={378}
            ref="SELECT2"
            optionListRef={this._getOptionList.bind(this)}
            styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}
            defaultValue="Selecione a quantidade"
            onSelect={this._quantidade.bind(this)}>
            <Option value = {{id : "1"}}
                    styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>1</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>2</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>3</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>4</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>5</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>6</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>7</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>8</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>9</Option>
            <Option styleText={{color: '#f08080',
                                fontFamily: 'Roboto',
                                fontSize: 20,
                                textAlign: 'center'}}>10</Option>
          </Select>
          <OptionList ref="OPTIONLIST"/>

        <Text>      </Text>
        <Text style={styles.foto}>Foto do Produto</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
        <Button
         title ="Abrir Galeria"
         color="#87cefa"
         onPress={() => this.pickMultiple(true)}/>

         <Text>      </Text>

        <Button
           title ="Abrir Camera"
           color="#87cefa"
           onPress={() => this.abrircamera(true)}/>

        </View>

        <Text>      </Text>
        <View style={{ width: 378, height: 86, alignItems: 'center'}}>
        <TagInput
          value={this.state.tags}
          onChange={this.onChangeTags}
          tagColor="pink"
          tagTextColor="white"
          tagAlign="center"
          inputProps={inputProp}
          numberOfLines={15}/>
        </View>
        <Button
         title ="Salvar"
         color="#ffa07a"
         onPress={onButtonPress}/>

         </View>
     </ScrollView>
       </View>
    );
  }
}

const titleConfig = {
  title: 'Cadastro Produto',
  tintColor: '#f08080',
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  texto: {
    color: '#f08080',
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },

  foto: {
    color: '#f08080',
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },

    input:{
      width: 378,
      height: 65,
      borderColor: "#778899",
      borderWidth: 0.15,
      margin: 5,
      fontFamily: 'Roboto',
      color: '#f08080',
      fontSize: 20,
      textAlign: 'center',
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
