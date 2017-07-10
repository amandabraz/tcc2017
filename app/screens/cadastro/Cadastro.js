import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, ScrollView, Alert, Image, TouchableOpacity, ToastAndroid, ToastAndroid } from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-crop-picker';

class Cadastro extends Component {
  constructor(props) {
   super(props);

   this.state = {
    date: '',
    cpf: '',
    celular: '',
    nome: '',
    email: '',
    senha:'',
    image: require('./img/cameraa.jpg'),
  }
 }

  validaEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validaCampos = (usuario) => {
    var camposVazios = "";
    //validar nome
    if (!usuario.nome) {
      camposVazios.append("nome");
    }
    //validar data de Nascimento
    if (!usuario.dataNasc) {
      if (camposVazios) {
        camposVazios.append(", data de nascimento");
      } else {
        camposVazios.append("data de nascimento");
      }
    }
    //validar senha
    if (!usuario.senha) {
      if (camposVazios) {
        camposVazios.append(", senha");
      } else {
        camposVazios.append("senha");
      }
    }
    //TODO: validar ddd/telefone
    //TODO: validar cpf
    if (camposVazios) {
      ToastAndroid.showWithGravity('Preencha ' + camposVazios, ToastAndroid.LONG, ToastAndroid.CENTER);
    }
  }

  onButtonVendedor = () => {
    const {
      state: {
        date, nome, email, senha
      }
    } = this;
    usuario = {
      "dataNasc": date,
      "nome": nome,
      "email": email,
      "cpf": cpf,
      "telefone": celular,
      "senha": senha,
      "perfil": 'V'
    }
    validaCampos(usuario);

    fetch('http://10.0.2.2:8080/usuario', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      })
          .then((response) => response.json())
          .then((responseJson) => {
            ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
            this.props.navigation.navigate('Vendedor');

          })
          .catch((error) => {
            Alert.alert("error Response", JSON.stringify(error));
            console.error(error);
          });
  };
  onButtonCliente = () => {
    const {
      state: {
        date, nome, email, senha
      }
    } = this;
    usuario = {
      "dataNasc": date,
      "nome": nome,
      "email": email,
      "cpf": cpf,
      "telefone": celular,
      "senha": senha,
      "perfil": 'C'
    }
    validaCampos(usuario);
       fetch('http://10.0.2.2:8080/usuario', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
      })
          .then((response) => response.json())
          .then((responseJson) => {
            ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
               this.props.navigation.navigate('Cliente');

          })
          .catch((error) => {
            Alert.alert("error Response", JSON.stringify(error));
            console.error(error);
          });
  };
  selecionarPerfil(){
   ImagePicker.openPicker({
     width: 200,
     height: 200,
     cropping: true}).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height}
});
     });
  }

 render() {
    return (
      <View style= {{flex: 3}}>
      <Image source={require('./img/cake1.jpg')}
             style={styles.backgroundImage}>

      <NavigationBar title={titleConfig}
                     tintColor="#f5f5f5"/>

      <ScrollView>

      <View style={styles.container}>
      <Text>{'\n'}</Text>
      <TouchableOpacity onPress={this.selecionarPerfil.bind(this)}>
      <Image style={{width: 200, height: 200, borderRadius: 100}}
             source={this.state.image}/>
      </TouchableOpacity>

      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'Nome Completo'}
              iconClass={FontAwesomeIcon}
              onChangeText={(nome) => this.setState({nome: nome})}
              iconName={'user'}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>


      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'CPF'}
              iconClass={FontAwesomeIcon}
              onChangeText={(cpf) => this.setState({cpf: cpf})}
              iconName={'info'}
              iconColor={'#f5f5f5'}
              keyboardType={'numeric'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'Celular'}
              iconClass={FontAwesomeIcon}
              onChangeText={(celular) => this.setState({celular: celular})}
              iconName={'mobile'}
              keyboardType={'phone-pad'}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <DatePicker style={{width: 375, height: 48}}
                  date={this.state.date}
                  mode="date"
                  placeholder="Data de Nascimento"
                  format="YYYY-MM-DD"
                  maxDate="2002-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 5
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
                  onDateChange={(date) => {this.setState({date: date});}}/>

      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'Email'}
              iconClass={FontAwesomeIcon}
              keyboardType={'email-address'}
              onChangeText={if (validaEmail) {
                (email) => this.setState({email: email})
              } else {
                this.style.{{ backgroundColor: 'red' }}
              }}
              iconName={'at'}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'Senha'}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              onChangeText={(senha) => this.setState({senha: senha})}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              secureTextEntry={true}/>

      <Kohana style={{ backgroundColor: 'transparent', borderColor: '#778899', borderWidth: 0.15 }}
              label={'Confirmação de Senha'}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              secureTextEntry={true}/>

      </View>
      <Text>{'\n'}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>

      <Button title ="        Quero Vender         "
              color="#ffa07a"
              onPress={this.onButtonVendedor}/>

      <Button title="       Quero Comprar      "
              color="#87cefa"
              onPress={this.onButtonCliente}/>

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
    alignItems: 'center',
    padding: 15
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

export default Cadastro;
