import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class ConfiguracaoCliente extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Config Cliente</Text>
      </View>
    );
  }

}

ConfiguracaoCliente.defaultProps = { ...ConfiguracaoCliente };

export default ConfiguracaoCliente;
