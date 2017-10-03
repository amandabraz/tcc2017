import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import StartTimerLocation from '../localizacao/TimerGeolocation.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';

class HomeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: 'TabsVendedor',
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      gps: 0
    };
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({gps: position});
      // timer ajustado para cada 10 minutos
      StartTimerLocation.start(600000, this.state.userId);
    }, (error) => {
      this.setState({gps: 0});
    });
  }

  render() {
    if (this.state.gps === 0 || typeof this.state.gps === "undefined") {
      return(<LocalizacaoNaoPermitida 
        screenName={this.state.screenName}
        navigation={this.props.navigation}
        userId={this.state.userId} />
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

const styles = StyleSheet.create({  

});

HomeVendedor.defaultProps = { ...HomeVendedor };

export default HomeVendedor;
