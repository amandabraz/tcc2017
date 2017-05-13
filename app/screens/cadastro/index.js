import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, Image} from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';

const onButtonPress = () => { Alert.alert('Bem vindo Vendedor'); };
const onButtonPressComprar = () => { Alert.alert('Bem vindo '); };


class cadastro extends Component {
  constructor(props) {
   super(props);

   this.state = {
    date: '',
    nome: '',
    email: '',
    senha:'',
  };
 }
 render() {
    return (
      <View style= {{flex: 3}}>
      <Image source={require('./img/cake1.jpg')}
      style={styles.backgroundImage}>
      <NavigationBar
       title={titleConfig}
       tintColor="#f5f5f5"/>
        <ScrollView>

   <View style={styles.container}>
   <Text>{'\n'}</Text>

   <Image style={{width: 200, height: 200, borderRadius: 100}}
          source={require('./img/cameraa.jpg')}/>

   <Kohana
     style={{ backgroundColor: 'transparent' }}
     label={'Nome Completo'}
     iconClass={FontAwesomeIcon}
     onChangeText={(nome) => this.setState({nome: nome})}
    iconName={'user'}
     iconColor={'#f5f5f5'}
     labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
     inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
   />

      <DatePicker
        style={{width: 378, height: 48}}
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
           color: '#f5f5f5',
           fontFamily: 'Roboto',
           fontSize: 20
         },
         dateText: {
           color: '#f5f5f5',
           fontFamily: 'Roboto',
           fontSize: 20
         }
       }}
        onDateChange={(date) => {this.setState({date: date});}}
        />
        <Kohana
          style={{ backgroundColor: 'transparent' }}
          label={'Email'}
          iconClass={FontAwesomeIcon}
          onChangeText={(email) => this.setState({email: email})}
          iconName={'envelope'}
          iconColor={'#f5f5f5'}
          labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
          inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
        />

        <Kohana
          style={{ backgroundColor: 'transparent' }}
          label={'Senha'}
          iconClass={FontAwesomeIcon}
          iconName={'lock'}
          onChangeText={(senha) => this.setState({senha: senha})}
          iconColor={'#f5f5f5'}
          labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
          inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
          secureTextEntry={true}
        />

        <Kohana
          style={{ backgroundColor: 'transparent', borderColor: '#778899', borderWidth: 0.15 }}
          label={'Confirmação de Senha'}
          iconClass={FontAwesomeIcon}
          iconName={'lock'}
          iconColor={'#f5f5f5'}
          labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
          inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
          secureTextEntry={true}
        />

        </View>
        <Text>{'\n'}{'\n'}{'\n'}</Text>

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
     </Image>
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
    alignItems: 'center'
  },

  texto: {
    color: '#f08080',
    fontSize: 30,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },

  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
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
