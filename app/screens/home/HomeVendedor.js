import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import verificaLocalizacao from '../localizacao/checkLocalizacao.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';

class HomeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      localizacao: this.props.navigation.state.params.localizacao,
    };
  };

  render() {
    if (!verificaLocalizacao(this.state.localizacao, this.state.userId)) {
      return(
        <LocalizacaoNaoPermitida />
      );
    } else {
      return(
        <View>
          <Text>Home mock para vendedor</Text>
        </View>
      );
    }
  }

}

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
