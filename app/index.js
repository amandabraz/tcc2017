import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ScrollView, DatePickerAndroid } from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker'


class cadastro extends Component {
  constructor(props) {
   super(props);

   this.state = {
    date: '',
  };
 }

 handleFinalizarPress = () => {
    this.props.navigation.navigate('Finalizar');
};

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
        style={{width: 368,
        height: 46}}
        date={this.state.date}
        mode="date"
        placeholder="Data de Nascimento"
        format="DD-MM-YYYY"
        minDate="01-01-1930"
        maxDate="01-01-2016"
        confirmBtnText="OK"
        cancelBtnText="Cancelar"
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
         onPress={this.handleFinalizarPress}/>

          <Button
          title="       Quero Comprar      "
          color="#87cefa"
          onPress={this.handleFinalizarPress}/>
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
    fontWeight: 'bold',
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
