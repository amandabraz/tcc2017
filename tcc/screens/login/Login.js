/**
  Interface de Login para o usuário.
*/

import React, { Component } from 'react';
import { AppRegistry, Text, Image} from 'react-native';

const cupcakes = require('./img/cupcakes.jpg');

//Exporto essa classe pra que na minha "Main"
export default class Login extends Component {
  render() {
    return (
      <Image source={cupcakes}/>
    );
  }
}
