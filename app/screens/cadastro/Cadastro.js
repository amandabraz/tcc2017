import React, { Component } from 'react';
import { AppRegistry,
         StyleSheet,
         Text,
         View,
         Button,
         TextInput,
         ScrollView,
         Alert,
         Image,
         TouchableHighlight,
         TouchableOpacity,
         ToastAndroid } from 'react-native';
import NavigationBar from 'react-native-navbar';
import DatePicker from 'react-native-datepicker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';

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
    confirmaSenha: '',
    image: require('./img/cameraa.jpg'),
    backgroundColorEmail: "transparent",
    backgroundColorCpf: "transparent",
    backgroundColorSenha: "transparent",
  }
 }

  validaEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
   return re.test(email);
  }

  validaCPF = (cpf) => {
      cpf = cpf.replace(/[^\d]+/g,'');
      if(cpf == '') return false;
      // Elimina CPFs invalidos conhecidos
      if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999")
              return false;
      // Valida 1o digito
      add = 0;
      for (i=0; i < 9; i ++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
          rev = 11 - (add % 11);
          if (rev == 10 || rev == 11)
              rev = 0;
          if (rev != parseInt(cpf.charAt(9)))
              return false;
      // Valida 2o digito
      add = 0;
      for (i = 0; i < 10; i ++)
          add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
          rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
          return false;
      return true;
  }

  validaCampos = (usuario) => {
    let camposVazios = [];
    let erros = [];
    //validar nome
    if (!usuario.nome) {
        camposVazios.push("nome");
    }
    //validar cpf
    if (!usuario.cpf) {
      camposVazios.push("CPF");
    } else {
      if (!this.validaCPF(usuario.cpf)) {
        erros.push("CPF inválido");
      }
    }
    //validar Email
    if (!usuario.email) {
      camposVazios.push("e-mail");
    } else {
      if (!this.validaEmail(usuario.email)) {
        erros.push("E-mail inválido")
      }
    }
    // validar ddd e telefone
    if (!usuario.ddd) {
      camposVazios.push("ddd");
    }
    if (!usuario.telefone) {
      camposVazios.push("celular");
    } else {
      if (usuario.telefone.length < 8) {
        erros.push("Telefone inválido: insira DDD e celular");
      }
    }
    //validar data de Nascimento
    if (!usuario.dataNasc) {
      camposVazios.push("data de nascimento");
    }
    //validar senha
    if (!usuario.senha) {
      camposVazios.push("senha");
    } else {
      if (usuario.senha.length < 6) {
        erros.push("Sua senha deve ter mais que 6 caracteres");
        this.setState({backgroundColorSenha: 'rgba(255, 0, 0, 0.3);'});
      } else {
        this.setState({backgroundColorSenha: 'transparent'});
      }

      // validar com o Confirma Senha
      if (usuario.senha != this.state.confirmaSenha) {
        erros.push("Senha e confirmação de senha não conferem");
        this.setState({backgroundColorSenha: 'rgba(255, 0, 0, 0.3);'});
      } else {
        this.setState({backgroundColorSenha: 'transparent'});
      }
    }

    if (camposVazios.length) {
      ToastAndroid.showWithGravity('Os seguinte campos são obrigatórios: ' + this.quebraEmLinhas(camposVazios) + '.', ToastAndroid.LONG, ToastAndroid.CENTER);
      return false;
    }
    if (erros.length) {
      ToastAndroid.showWithGravity(this.quebraEmLinhas(erros), ToastAndroid.LONG, ToastAndroid.CENTER);
      return false;
    }
    return true;
  }

  quebraEmLinhas(lista) {
    var listaQuebrada = "";
    for(item in lista) {
      listaQuebrada += lista[item] + "\n";
    }
    return listaQuebrada.trim();
  }

  onButtonVendedor = () => {
    const {
      state: {
        date, nome, email, cpf, celular, senha
      }
    } = this;
    usuario = {
      "dataNasc": date,
      "nome": nome,
      "email": email,
      "cpf": cpf,
      "ddd": celular.substr(0,2),
      "telefone": celular.substr(2,10),
      "senha": senha,
      "perfil": 'V'
    }
    let continuar = this.validaCampos(usuario);

    if (continuar) {
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
              if (responseJson.errorMessage) {
                Alert.alert(responseJson.errorMessage);
              } else {
                ToastAndroid.showWithGravity('Cadastro de Vendedor iniciado!', ToastAndroid.LONG, ToastAndroid.CENTER);
                this.props.navigation.navigate('Vendedor', {userId: responseJson.id});
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };
  onButtonCliente = () => {
    const {
      state: {
        date, nome, cpf, celular, email, senha
      }
    } = this;
    usuario = {
      "dataNasc": date,
      "nome": nome,
      "email": email,
      "cpf": cpf,
      "ddd": celular.substr(0,2),
      "telefone": celular.substr(2,10),
      "senha": senha,
      "perfil": 'C'
    }
    let continuar = this.validaCampos(usuario);

    if (continuar) {
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
              if (responseJson.errorMessage) {
                Alert.alert(responseJson.errorMessage);
              } else {
                ToastAndroid.showWithGravity('Cadastro de Cliente iniciado!', ToastAndroid.LONG, ToastAndroid.CENTER);
                this.props.navigation.navigate('Cliente', {userId: responseJson.id});
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };
  selecionarPerfil() {
    var options = {
      title: 'Selecione sua foto',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Selecionar uma foto da biblioteca',
      cancelButtonTitle: 'Cancelar',
      storageOptions: {
        skipBackup: false,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        //do nothing
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = { uri: response.uri };
        this.setState({
          image: {uri: response.uri, width: 200, height: 200, changed: true}
        });
      }
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


      <Kohana style={{ backgroundColor: this.state.backgroundColorCpf }}
              label={'CPF'}
              maxLength={11}
              iconClass={FontAwesomeIcon}
              onChangeText={(cpf) => {
                this.setState({cpf: cpf});
                if (this.validaCPF(cpf)) {
                  this.setState({backgroundColorCpf: 'transparent'});
                } else {
                  this.setState({backgroundColorCpf: 'rgba(255, 0, 0, 0.3);'});
                }
            }}
              iconName={'info'}
              iconColor={'#f5f5f5'}
              keyboardType={'numeric'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <Kohana style={{ backgroundColor: 'transparent' }}
              label={'Celular'}
              maxLength={11}
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
                    dateInput: { borderWidth: 0 },
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

      <Kohana style={{ backgroundColor: this.state.backgroundColorEmail }}
              label={'Email'}
              iconClass={FontAwesomeIcon}
              keyboardType={'email-address'}
              onChangeText={(email) => {
                this.setState({email: email});
                if (this.validaEmail(email)) {
                this.setState({backgroundColorEmail: 'transparent'});
              } else {
                this.setState({backgroundColorEmail: 'rgba(255, 0, 0, 0.3);'});
              }}}
              iconName={'at'}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}/>

      <Kohana style={{ backgroundColor: this.state.backgroundColorSenha }}
              label={'Senha'}
              maxLength={10}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              onChangeText={(senha) => this.setState({senha: senha})}
              iconColor={'#f5f5f5'}
              labelStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              inputStyle={{ color: '#f5f5f5', fontSize: 20, fontFamily: 'Roboto', textAlign: 'center' }}
              secureTextEntry={true}/>

      <Kohana style={{ backgroundColor: this.state.backgroundColorSenha }}
              label={'Confirmação de Senha'}
              maxLength={10}
              iconClass={FontAwesomeIcon}
              iconName={'lock'}
              onChangeText={(confirmaSenha) => this.setState({confirmaSenha: confirmaSenha})}
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
