/**
 * author: Aline Bender
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
import TagInput from 'react-native-tag-input';

//TODO ALINE: Redirecionar para tela inicial de Cliente
const botaoFinalizar = () => { Alert.alert('Botão Finalizar foi pressionado!'); };

export default class TagInputExample extends Component {
  state = {
    tags: [],
  };

  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'Insira aqui tags dietéticas',
      autoFocus: true,
      placeholderTextColor: '#dc143c'
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 40}}>
        <Text>Insira aqui tags dietéticas: </Text>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            tagColor="pink"
            tagTextColor="white"
            inputProps={inputProps}
            numberOfLines={2}
          />
        </View>
        <Button onPress={botaoFinalizar} title="Finalizar" color="#dc143c" />
      </View>
    );
  }
}

const titleConfig = {
  title: 'Cadastro Cliente',
  tintColor: "#dc143c",
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
