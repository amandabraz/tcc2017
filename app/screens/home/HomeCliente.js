import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class HomeCliente extends Component {

  render() {
    return(
      <View>
        <Text>Home mock para cliente</Text>
      </View>
    );
  }

}

HomeCliente.defaultProps = { ...HomeCliente };

export default HomeCliente;
