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




//dimensão da janela
//const { width, height } = Dimensions.get("window");
const onButtonPress = () => { Alert.alert('Bem vindo Vendedor'); };

//Exporto essa classe pra que na minha "Main"
export default class CadastroProduto extends Component {
  constructor(props) {
  super(props);

  this.state = {
   date: '',
 };
}
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
    return (
      <View style= {{flex: 3, backgroundColor: '#ffffff'}}>
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

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Categoria"
          placeholderTextColor = "#ffb6c1"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Ingredientes"
          placeholderTextColor = "#ffb6c1"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Quantidade"
          placeholderTextColor = "#ffb6c1"
          secureTextEntry={true}
        />

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

      //  <CameraRollPicker
        //  callback={this.getSelectedImages} />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Tags"
          placeholderTextColor = "#ffb6c1"
        />


        </View>
        <Button
         title ="Salvar"
         color="#ffa07a"
         onPress={onButtonPress}/>
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

});
