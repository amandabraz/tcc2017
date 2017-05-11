import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';

export default class ModalTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeText: "Shirley",
      dataNascimentoText: '23/03/1984',
      emailText: 'shirley.silva@gmail.com',
      perfilText: 'Perfil Vendedor',
      CPFText: '136.598.438-90',
      tagsText: '#Doce #Brigadeiro #Chocolate',
      nomeFantasia: "Docinhos :)"
    };
  }

  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    return (
      <View style={{flex:1}}>
      <Image source={require('./img/fundo2.png')}
      style={styles.backgroundImage}>

        <NavigationBar
          title={titleConfig}
          tintColor="#f5f5f5"
        />

        <View style={styles.container}>

        <Image
         style={{width: 200, height: 200, borderRadius: 100}}
         source={require('./img/sabrina.jpg')}
       />

        <Text style={styles.baseText}>{'\n'}
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.nomeFantasia}{'\n'}{'\n'}
        </Text>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.nomeText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.dataNascimentoText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.emailText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.perfilText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.CPFText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.tagsText}{'\n'}{'\n'}
        </Text>
      </Text>

        </View>
        <TouchableOpacity onPress={this._showModal}>
          <Text></Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Edicao de cadastro!</Text>
          </View>
        </Modal>
        </Image>
      </View>
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
      alignItems: 'center'
  },

  baseText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 18,
    color: '#dc143c'

  },

  backgroundImage: {
       flex: 1,
       width: null,
       height: null,
       resizeMode: 'cover'
   },

  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#dc143c'
  },
});
