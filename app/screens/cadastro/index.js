import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert} from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';


const onButtonPress = () => { Alert.alert('Bem vindo Vendedor'); };
const onButtonPressComprar = () => { Alert.alert('Bem vindo '); };

class cadastro extends Component {
  constructor(props) {
   super(props);

   this.state = {
    date: '',
  };
 }

  render() {
    return (
      <View style= {{flex: 3, backgroundColor: '#ffffff'}}>
      <NavigationBar
       title={titleConfig}
       tintColor="#f5f5f5"/>
        <ScrollView>
   <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Nome Completo"
          placeholderTextColor = "#ffb6c1"
        />

        <DatePicker
        style={{width: 378,
        height: 48}}
        date={this.state.date}
        mode="date"
        placeholder="Data de Nascimento"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         placeholderText: {
           color: '#ffb6c1',
           fontFamily: 'Roboto',
           fontSize: 20
         },
         dateText: {
           color: '#f08080',
           fontFamily: 'Roboto',
           fontSize: 20
         }
       }}
        onDateChange={(date) => {this.setState({date: date});}}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Email"
          placeholderTextColor = "#ffb6c1"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Senha"
          placeholderTextColor = "#ffb6c1"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Confirmação da senha"
          placeholderTextColor = "#ffb6c1"
          secureTextEntry={true}
        />

        </View>

         <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
         <Button
         title ="        Quero Vender         "
         color="#ffa07a"
         onPress={onButtonPress}/>

          <Button
          title="       Quero Comprar      "
          color="#87cefa"
          onPress={onButtonPressComprar}/>
     </View>
     </ScrollView>
       </View>
    );
  }
}

const titleConfig = {
  title: 'Faça seu Cadastro',
  tintColor: '#f08080',
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  texto: {
    color: '#f08080',
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },

    input:{
      width: 378,
      height: 65,
      borderColor: "#778899",
      borderWidth: 0.15,
      margin: 5,
      fontFamily: 'Roboto',
      color: '#f08080',
      fontSize: 20,
      textAlign: 'center',
    },
});

export default cadastro;
