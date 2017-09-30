import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
<<<<<<< HEAD
// import StartTimerLocation from '../localizacao/Timer.js';
=======
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
>>>>>>> 0d9eeba30e1d7b804cd6e46703abe138a450b033

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

  // componentDidMount(){
  //   StartTimerLocation.start (5000);
  // }

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
