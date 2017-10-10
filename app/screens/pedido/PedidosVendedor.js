import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class PedidosVendedor extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Config Vendedor</Text>
      </View>
    );
  }

}

PedidosVendedor.defaultProps = { ...PedidosVendedor };

export default PedidosVendedor;
