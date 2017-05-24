/**
* Classe de validação de campos.
*
* Criada por Maiara Rodrigues.
*/

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

var ValidateField = React.createClass({

  isEmail: function(textOfField){
    var code = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(textOfField);
  },

  verifyEmail(email, field){
    if(!this.isEmail(email)){
      //TODO: TERMINAR
    }
  },

  onBlur: function() {
    console.log('this.state.defaultVal', this.state.defaultVal)
    if(this.state.defaultVal.indexOf(' ') >= 0) {
        this.setState({
        inputBorder: 'red'
      })
    }
  },

  onChange: function(text) {
    this.setState({
        defaultVal: text
    })
    if(text.indexOf(' ') >= 0) {
        this.setState({
        inputBorder: '##FFC200'
      })
    } else {
        this.setState({
        inputBorder: 'green'
      })
    }
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={{marginTop:100}}>
            <TextInput
            onBlur={ () => this.onBlur() }
            onChangeText={ (text) => this.onChange(text) }
            style={{ height: 70, backgroundColor: "#ededed", borderWidth: 1, borderColor: this.state.inputBorder }} />
        </View>
        <View style={{marginTop:30}}>
            <TextInput
          style={{ height: 70, backgroundColor: "#ededed" }} />
        </View>
      </View>
    );
  }
});
