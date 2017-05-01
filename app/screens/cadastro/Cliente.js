/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

//TODO ALINE: Redirecionar para tela inicial de Cliente
const botaoFinalizar = () => { Alert.alert('Botão Finalizar foi pressionado!'); };

export default class Cliente extends Component {
  constructor(props) {
    super (props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
      <NavigationBar
        title={titleConfig}
      />
        <TextInput
          style={{height: 40, textAlign: 'center'}}
          placeholder="Insira aqui tags dietéticas"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize:42}}>
          {this.state.text.split(' ').map((word) => word).join(' ')}
        </Text>
        <Button onPress={botaoFinalizar} title="Finalizar" color="#00BFFF" />
      </View>
    );
  }
}


const titleConfig = {
  title: 'Cadastro Cliente',
  color: '#95c9db',
  fontSize: 40,
  fontFamily: 'Roboto',
};

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#95c9db',
    fontWeight: 'bold',
    fontSize: 40,
    backgroundColor: 'rgba(0, 121, 163, 0.7)',
  },
  centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 108, 122, 0.7)',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
