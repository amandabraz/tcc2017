import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class ConfiguracaoVendedor extends Component {

  render() {
    return(
      <View>
        <Text>Mock - Config Vendedor</Text>
      </View>
    );
  }

}

ConfiguracaoVendedor.defaultProps = { ...ConfiguracaoVendedor };

export default ConfiguracaoVendedor;
