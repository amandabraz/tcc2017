import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class MTextInput extends Component {
  constructor(props, value) {
    super(props);
    this.state = { text: value };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}
