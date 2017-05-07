import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

export default class MButton extends Component {
 render() {
   var eventOnPress = () => {
     Alert.alert(this.props.textOnClick);
   };
   return (
     <TouchableOpacity
     style={styles.button}
     onPress={eventOnPress}
     accessibilityLabel={this.props.accessibilityLabel}>
         <Text style={styles.font}>{this.props.title}</Text>
     </TouchableOpacity>
   );
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
