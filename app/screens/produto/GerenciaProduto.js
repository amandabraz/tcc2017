import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class GerenciaProduto extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Gerencia de produtos</Text>
      </View>
    );
  }

}

GerenciaProduto.defaultProps = { ...GerenciaProduto };

export default GerenciaProduto;
