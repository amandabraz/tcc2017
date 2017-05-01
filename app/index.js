import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';


class cadastro extends Component {
  constructor(props) {
   super(props);
 }

 handleFinalizarPress = () => {
    this.props.navigation.navigate('Finalizar');
};

  render() {
    return (
      <View style= {{flex: 3, backgroundColor: 'powderblue'}}>
      <ScrollView>
        <Text style={styles.texto}>Faça seu Cadastro!</Text>

     <View style= {{margin: 5}}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Nome Completo"
          placeholderTextColor = "#ffb6c1"
        />

        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Data de nascimento"
          placeholderTextColor = "#ffb6c1"
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

         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <Button
         style={styles.botao}
         title="        Quero Vender         "
         color="#ffa07a"
         onPress={this.handleFinalizarPress}/>
          <Button
          style={styles.botao}
          title="      Quero Comprar      "
          color="#87cefa"
          onPress={this.handleFinalizarPress}/>
          </View>
     </View>
     </ScrollView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  texto: {
    color: '#f08080',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
    botao: {
      //borderRadius: 700,
      //fontSize: 50,
      fontFamily: 'Roboto',
    },

    input:{
      width: 380,
      height: 65,
      borderColor: "#778899",
      borderWidth: 0.15,
      margin: 10,
      fontFamily: 'Roboto',
      color: '#f08080',
      fontSize: 20,
      textAlign: 'center',
    },
});

export default cadastro;
