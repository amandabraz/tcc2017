import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class PedidosCliente extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Config Cliente</Text>
      </View>
    );
  }

}

PedidosCliente.defaultProps = { ...PedidosCliente };

export default PedidosCliente;
