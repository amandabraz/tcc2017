import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import BuscaProduto from '../produto/BuscaProduto';

class HomeCliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
        screenName: 'TabsCliente',
        userId: this.props.navigation.state.params.userId,
        clienteId: this.props.navigation.state.params.clienteId,
        gps: 0
      };
    };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
    }, (error) => {
      this.setState({gps: 0});
    });
  }

  render() {
    if (this.state.gps === 0 || typeof this.state.gps === "undefined") {
      return(<LocalizacaoNaoPermitida
          screenName={this.state.screenName}
          navigation={this.props.navigation}
          userId={this.state.userId}/>
      );
    } else {
      return(<BuscaProduto
        screenName={this.state.screenName}
        navigation={this.props.navigation}/>
      );
    }
  }
}

const styles = StyleSheet.create({
});

HomeCliente.defaultProps = { ...HomeCliente };

export default HomeCliente;
