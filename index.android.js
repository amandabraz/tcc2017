/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//IMPORTANDO BIBLIOTECAS BÁSICAS
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

//IMPORTANDO SCREEN DE LOGIN
import Cliente from "./app/screens/cadastro/Cliente.js";

//MAIN
export default class tcc2017 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Cliente />
      </View>
    );
  }
}

//"CSS"
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
}); //coloquei isso pra que o style do css seja de acordo com a tela

AppRegistry.registerComponent('tcc2017', () => tcc2017);
