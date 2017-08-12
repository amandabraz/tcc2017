import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class ProdutosFavoritos extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Favoritos</Text>
      </View>
    );
  }

}

ProdutosFavoritos.defaultProps = { ...ProdutosFavoritos };

export default ProdutosFavoritos;
