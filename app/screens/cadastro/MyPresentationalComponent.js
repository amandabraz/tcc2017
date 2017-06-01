import React, { Component } from 'react'

import {
   View,
   Text,
   TouchableHighlight,
   TextInput,
   StyleSheet
} from 'react-native'

export default MyPresentationalComponent = (props) => {
   return (
      <View style = {styles.cliente_container}>
         <TextInput
            style = {styles.cliente_input}
            placeholder = 'Email'
            autoCapitalize = 'none'
            onChangeText = {props.updateEmail}
         />
         <TextInput
            style = {styles.cliente_input}
            placeholder = 'Password'
            autoCapitalize = 'none'
            onChangeText = {props.updatePassword}
         />
         <TouchableHighlight
            style = {styles.cliente_submit}
            onPress = { () => props.login(props.email, props.password)}>
            <Text>
               Submit
            </Text>
         </TouchableHighlight>
      </View>
   )
}

const styles = StyleSheet.create ({
   cliente_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      paddingTop: 23
   },
   cliente_input: {
      margin: 15,
      height: 40,
      borderColor: 'grey',
      borderWidth: 1
   },
   cliente_submit: {
      backgroundColor: 'silver',
      padding: 1
   }
})
