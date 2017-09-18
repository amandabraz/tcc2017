import React, { Component } from 'react';
import { Root, TabsVendedor, TabsCliente } from './navigation/router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fcm_token: ""
    };
  }
  componentDidMount () {
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      this.setState({fcm_token:token});
      //update your fcm token on server.
    });
  }
  render() {
    return <Root />;
  }
}

export default App;
