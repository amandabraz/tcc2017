import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
// import StartTimerLocation from '../localizacao/Timer.js';

class HomeVendedor extends Component {

  // componentDidMount(){
  //   StartTimerLocation.start (5000);
  // }

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
