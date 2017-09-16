import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableHighlight
} from 'react-native';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';

class HomeCliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      return(
        <View>
          <LocalizacaoNaoPermitida />      
      </View>
      );
    } else {
      return(
        <View>
          <Text>Home mock para Cliente</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({  
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  font: {
    fontWeight: 'bold',
    fontSize: 25,
    color:'white',
    alignSelf: 'center',
  }
});

HomeCliente.defaultProps = { ...HomeCliente };

export default HomeCliente;
