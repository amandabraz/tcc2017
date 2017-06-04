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
  Dimensions,
  ToastAndroid,
  ScrollView
} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import TagInput from 'react-native-tag-input';

//TODO ALINE: Redirecionar para tela inicial de Cliente
//const botaoFinalizar = () => { Alert.alert('Botão Finalizar foi pressionado!'); };

const {width, height} = Dimensions.get("window");

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  handleFinalizarPress = () => {
    const {
      state: {
        tags
      }
    } = this;

    cliente = {
      "usuario": 1,
      "tags": tags,
    }

    fetch('http://10.0.2.2:8080/cliente', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente)
    })
      .then((response) => response.json())
      .then((reponseJson) => {
        ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
        this.props.navigation.navigate('TabsCliente');
      })
      .catch((error) => {
        Alert.alert("error Response", JSON.stringify(error));
        console.error(error);
      });
};


  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

  botaoFinalizar = () => {
    this.props.navigation.navigate('TabsCliente');
  }

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'Insira aqui tags dietéticas',
      autoFocus: true,
      placeholderTextColor: '#dc143c',
      height:300
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <View style={{ flexDirection: 'column', flex: 1}}>
          <TagInput
            value={this.state.tags}
            onChange={(tags) => this.setState({tags,})}
            tagColor="pink"
            tagTextColor="white"
            inputProps={inputProps}
            numberOfLines={15}
          />
          //TODO Aline: redirecionar para handleFinalizarPress quando o banco estiver oka
          <Button onPress={this.botaoFinalizar} title="Finalizar" color="#dc143c" />
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
  container: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
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
  textInputContainer: {
    flex: 1,
    width: 100,
    height: 32,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },

  textInput: {
    margin: 0,
    padding: 0,
    paddingLeft: 12,
    paddingRight: 12,
    flex: 1,
    height: 32,
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
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

Cliente.defaultProps = { ...Cliente };

export default Cliente;
