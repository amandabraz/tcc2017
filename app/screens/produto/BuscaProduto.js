import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class BuscaProduto extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Busca de produtos</Text>
      </View>
    );
  }

}

BuscaProduto.defaultProps = { ...BuscaProduto };

export default BuscaProduto;
