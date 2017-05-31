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
  Alert,
  Dimensions
} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import TagInput from 'react-native-tag-input';

//TODO ALINE: Redirecionar para tela inicial de Cliente
const botaoFinalizar = () => { Alert.alert('Botão Finalizar foi pressionado!'); };

export default class Cliente extends Component {
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
      placeholderTextColor: '#dc143c',
      height:300
    };

    return (
      <View style={styles.cliente_container}>
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <View style={{ flexDirection: 'column', flex: 1}}>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            tagColor="pink"
            tagTextColor="white"
            inputProps={inputProps}
            numberOfLines={15}
          />
          <Button onPress={botaoFinalizar} title="Finalizar" color="#dc143c" />
        </View>
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
  cliente_container: {
    flex: 1,
  },
  cliente_button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  cliente_title: {
    fontFamily: 'Roboto',
    color: '#95c9db',
    fontWeight: 'bold',
    fontSize: 40,
    backgroundColor: 'rgba(0, 121, 163, 0.7)',
  },
  cliente_centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 108, 122, 0.7)',
  },
  cliente_input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
  cliente_textInputContainer: {
    flex: 1,
    width: 100,
    height: 32,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },

  cliente_textInput: {
    margin: 0,
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
    height: 32,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
  },

  cliente_tag: {
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    margin: 4,
  },
  cliente_tagLabel: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
