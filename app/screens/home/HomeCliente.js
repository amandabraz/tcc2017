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

  verificaLocalizacaoFlag() {
    if (!this.state.localizacao) {
      Alert.alert(
        'Ative uso de localização!',
        'Para utilizar este aplicativo, é necessário permitir o uso do GPS.',
        [
          {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Permitir', onPress: () => {
            fetch("", {method: 'PUT'})
              .then((response) => response.json())
              .then((responseJson) => {
                if (!responseJson.errorMessage) {
                  // implement stuff here
                }
              });
            }
          },
        ],
        { cancelable: false }
      )
    }
  }

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
