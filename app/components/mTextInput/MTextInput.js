import React, { Component } from 'react';
import {
  AppRegistry,
  TextInput,
  StyleSheet
} from 'react-native';

export default class MTextInput extends Component {
  constructor(props) {
   super(props);
   this.state = { text: this.props.exampleText };
 }

 render() {
   return (
      <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        underlineColorAndroid={'#e2b1a3'}
        keyboardType = {this.props.keyboardType}
        secureTextEntry = {this.props.secureTextEntry}
      />
   );
 }
}

const styles = StyleSheet.create({
  input:{
    width: 300,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: '#e2b1a3',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
