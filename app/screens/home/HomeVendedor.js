import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class HomeVendedor extends Component {

  render() {
    return(
      <View>
        <Text>Home mock para vendedor</Text>
      </View>
    );
  }

}

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
