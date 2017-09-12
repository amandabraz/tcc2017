import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';

class HomeCliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userId: this.props.navigation.state.params.userId,
        clienteId: this.props.navigation.state.params.clienteId,
        localizacao: this.props.navigation.state.params.localizacao
    }
    this.verificaLocalizacaoFlag();
  };
  
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
