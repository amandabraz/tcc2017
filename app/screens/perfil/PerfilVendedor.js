import React, { Component } from 'react';
import { AppRegistry, Button, Text, StyleSheet, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import * as constante from '../../constantes';
import CheckBox from 'react-native-check-box';

const { width, height } = Dimensions.get("window");


export default class PerfilVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      nomeText: '',
      nomeFantasiaText: '',
      dataNascimentoText: '',
      emailText: '',
      imagemPerfil: require('./img/camera2.jpg'),
      meiosPagamentoText: "Nenhum meio de pagamento escolhido",
      pagamentoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      CPFText: '',
      celularText: '',
      confText: '  Configuração',
      editavel: false,
      meiosPagamentoVendedor: {},
      vendedor: {},
      titleTextClass: styles.titleText,
      baseTextClass: styles.baseText,
      pencilColor: '#fff'      
    };
    this.buscaDadosVendedor();
  }

  buscaDadosVendedor() {
    fetch(constante.ENDPOINT + 'vendedor/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMssage) {
            this.prepararVendedor(responseJson);
        }
      });
  };

  prepararVendedor(responseJson) {
    this.setState({vendedor: responseJson});
    if (responseJson.usuario.imagemPerfil) {
      this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
    }
    this.setState({nomeText: responseJson.usuario.nome});
    this.setState({nomeFantasiaText: responseJson.nomeFantasia});
    var dataNormal = new Date(responseJson.usuario.dataNasc);
    var dataNasc = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
    this.setState({dataNascimentoText: dataNasc});
    this.setState({emailText: responseJson.usuario.email});
    this.setState({CPFText: responseJson.usuario.cpf});
    this.setState({celularText: responseJson.usuario.ddd + responseJson.usuario.telefone});
    if (responseJson.meiosPagamentos.length > 0) {
      this.setState({pagamentoEstilo: styles.listText})
      var pagamentos = "";
      for(i in responseJson.meiosPagamentos) {
        pagamentos += responseJson.meiosPagamentos[i].descricao + " - ";
      }
      pagamentos = pagamentos.slice(0, -3);
      this.setState({meiosPagamentoText: pagamentos});
      this.setState({meiosPagamentoVendedor: responseJson.meiosPagamentos});            
    }
  }
  
  habilitaEdicao() {
    if (this.state.editavel == false) {
      this.setState({editavel: true, 
        titleTextClass: styles.titleTextEdit, 
        baseTextClass: styles.baseTextEdit,
        pencilColor: '#ccc'});
    } else {
      this.setState({editavel: false, 
        titleTextClass: styles.titleText, 
        baseTextClass: styles.baseText,
        pencilColor: '#fff'});
    }
    
  }

  mostraBotaoSalvar() {
    if (this.state.editavel == true) {
      return(
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.button}          
            onPress={() => this.salvaEdicaoVendedor()}>
            <Text style={styles.buttonText}>SALVAR</Text> 
          </TouchableOpacity>


        </View>
      );
    }
  }

  salvaEdicaoVendedor() {
    this.pagamentoEscolhido;

    const {
      state: {
        vendedorId,
        userId,
        nomeText,
        meiosPagamentos,
        vendedor,
        celularText,
        nomeFantasiaText,
        imagemPerfil,
        meiosPagamentoVendedor
      }
    } = this;

    vendedorEditado = {
      "id": vendedorId,
      "usuario": {
          "id": userId,
          "senha": vendedor.usuario.senha,
          "deletado": false,
          "perfil": "V",
          "nome": nomeText,
          "email": vendedor.usuario.email,
          "dataNasc": vendedor.usuario.dataNasc,
          "cpf": vendedor.usuario.cpf,
          "ddd": celularText.substr(0,2),
          "telefone": celularText.substr(2,10),
          "notificacao": false,
          "bloqueado": false,
          "imagemPerfil": imagemPerfil.uri
      },
      "nomeFantasia": nomeFantasiaText,
      "meiosPagamentos": meiosPagamentoVendedor
    }

    fetch(constante.ENDPOINT + 'vendedor', {
      method: 'PUT',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendedorEditado)})
      .then((response) => response.json())
      .then((rJson) => {
        if (!rJson.errorMessage) {
          this.prepararVendedor(rJson);
        }
      });
  }

  meiosPagamento() {
    if (this.state.editavel == false) {
      return (<Fumi
        style={styles.inputDimensions}
        label={'Meios de Pagamento'}
        iconClass={FontAwesomeIcon}
        iconName={'asterisk'}
        iconColor={'darkslategrey'}
        value={this.state.meiosPagamentoText}
        multiline={true}
        editable={false}
        inputStyle={this.state.pagamentoEstilo}/>
      );
    } else {
      return this.mostrarCheckboxesPagamento();
    }
  }

  onClick(descricao) {
    descricao.checked = !descricao.checked;
    var pagamentos = this.state.meiosPagamentoVendedor;
    pagamentos.push(descricao);
    this.setState({ meiosPagamentoVendedor: pagamentos });
  }

  preencherPagamentosArray() {
    fetch(constante.ENDPOINT + 'meiopagamento')
      .then((response) => response.json())
        .then((responseJson) => {
          var pagamentosBuscados = [];
          for (i in responseJson) {
              pagamentosBuscados.push(responseJson[i]);
          }
          this.setState({pagamentosArray: pagamentosBuscados});
        });
  }

  mostrarCheckboxesPagamento() {
    this.preencherPagamentosArray()    
    var views = [];
    for(i in this.state.pagamentosArray) {
      let meioPagamento = this.state.pagamentosArray[i];  
      meioPagamento.checked = false;                
      for(j in this.state.meiosPagamentoVendedor) {
        if (meioPagamento.id == this.state.meiosPagamentoVendedor[j].id) {
          meioPagamento.checked = true;
        }
      }
      views.push (
        <View key={i} style={styles.item}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(meioPagamento)}
            isChecked={meioPagamento.checked}
            leftText={meioPagamento.descricao}
            />
        </View>
      );
    }
    return views;
  }

 pagamentoEscolhido = () => {
     if (this.state.meiosPagamentos.length > 0) {
       return true;
     }
     else {
       ToastAndroid.showWithGravity('Escolha ao menos um meio de pagamento', ToastAndroid.LONG, ToastAndroid.CENTER);
       return false;
     }
 }

  openConfiguracao = () => {this.props.navigation.navigate('ConfiguracaoVendedor');}

  render () {
    return (
        <Image style={styles.headerBackground}
               source={require('./img/fundo2.png')}>
        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
            <Image
              style={styles.profilepic}
              source={this.state.imagemPerfil}/>
          </View>
        </View>

        <View style={styles.bar}>
          <View style={{alignItems: 'flex-start', width: '80%'}}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.openConfiguracao}>
              <Icon name="settings" size={25} color={'#fff'}/><Text style={styles.barText}> {this.state.confText}</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-end', width: '20%'}}>          
            <TouchableOpacity onPress={() => this.habilitaEdicao()}>
              <FontAwesomeIcon name="pencil" size={20} color={this.state.pencilColor} />
            </TouchableOpacity>    
          </View>
        </View>

        <ScrollView>
          <Fumi
            style={styles.inputDimensions}
            label={'Nome'}
            iconClass={FontAwesomeIcon}
            iconSize={20}
            iconName={'user'}
            iconColor={'darkslategrey'}
            value={this.state.nomeText}
            editable={this.state.editavel}
            inputStyle={this.state.titleTextClass}
            onChangeText={(nome) => this.setState({nomeText: nome})}/>

          <Fumi
            style={styles.inputDimensions}
            label={'CPF'}
            iconClass={FontAwesomeIcon}
            iconName={'info'}
            iconColor={'darkslategrey'}
            value={this.state.CPFText}
            editable={false}
            inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

          <Fumi
            style={styles.inputDimensions}
            label={'Data de Nascimento'}
            iconClass={FontAwesomeIcon}
            iconName={'calendar'}
            iconColor={'darkslategrey'}
            value={this.state.dataNascimentoText}
            editable={false}
            inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

          <Fumi
            style={styles.inputDimensions}
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'at'}
            iconColor={'darkslategrey'}
            value={this.state.emailText}
            editable={false}
            inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

          <Fumi
            style={styles.inputDimensions}
            label={'Celular'}
            iconClass={FontAwesomeIcon}
            iconName={'mobile'}
            iconColor={'darkslategrey'}
            value={this.state.celularText}
            editable={this.state.editavel}
            inputStyle={this.state.baseTextClass}
            maxLength={11}              
            onChangeText={(celular) => this.setState({celularText: celular})}/>

          <Fumi
            style={styles.inputDimensions}
            label={'Nome da loja'}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'darkslategrey'}
            value={this.state.nomeFantasiaText}
            editable={this.state.editavel}
            inputStyle={this.state.baseTextClass}
            onChangeText={(nomeFantasia) => this.setState({nomeFantasiaText: nomeFantasia})}/>

          {this.meiosPagamento()}
          {this.mostraBotaoSalvar()}
      </ScrollView>
      </Image>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  inputDimensions: {
    backgroundColor: 'transparent', 
    width: 375, 
    height: 70
  },
  headerBackground: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  profilepicWrap:{
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.4)',
  },
  profilepic:{
    flex: 1,
    width: null,
    alignSelf: 'stretch',
    borderRadius: 100,
    borderWidth: 4
  },
  bar:{
    width,
    padding: '5%',
    backgroundColor: 'darkslategrey',
    flexDirection: 'row'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 20,
  },
  baseTextEdit: {
    fontFamily: 'Roboto',
    color: '#333d47',
    fontSize: 20,
  },
  baseTextNaoEditavel: {
    fontFamily: 'Roboto',
    color: '#808080',
    fontStyle: 'italic',
    fontSize: 16,
  },
  listText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 16,
  },
  barText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
  titleTextEdit: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333d47',
    fontFamily: 'Roboto',
  },
  button: {
    borderRadius: 5,    
    justifyContent: 'center',
    height: 35,
    width: 200,
    backgroundColor: "darkslategrey",
    alignSelf: 'stretch',
    marginBottom: 20
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'white',
    alignSelf: 'center',
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
