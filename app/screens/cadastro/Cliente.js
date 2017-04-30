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

//TODO ALINE: Redirecionar para tela inicial de Cliente
const botaoConfirmar = () => { Alert.alert('Botão Confirmar foi pressionado!'); };

export default class Cliente extends Component {
  constructor(props) {
    super (props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, textAlign: 'center'}}
          placeholder="Insira aqui tags dietéticas"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize:42}}>
          {this.state.text.split(' ').map((word) => word).join(' ')}
        </Text>
        <Button onPress={botaoConfirmar} title="Confirmar" color="#841584" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
