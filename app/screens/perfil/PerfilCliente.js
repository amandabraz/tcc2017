import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';

export default class PerfilCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeText: "Cícero",
      dataNascimentoText: '19/05/1990',
      emailText: 'cicinho@mail.com',
      perfilText: 'Perfil Cliente',
      tagsText: '#Arroz #Feijão #eBatata'
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
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, borderRadius: 100}}
          source={require('./img/cicero.jpg')}
        />
        <Text style={styles.baseText}>
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
      </View>
    );
  }
}


  //CSS
  const titleConfig = {
    title: 'Perfil Cliente',
    tintColor: "#dc143c",
    fontFamily: 'Roboto',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#dc143c',
    fontSize: 20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#dc143c',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
