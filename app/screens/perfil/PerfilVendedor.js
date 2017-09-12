import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

export default class PerfilVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
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
      confText: '  Configuração'
    };
    this.buscaDadosVendedor();
  }

  buscaDadosVendedor() {
    fetch('http://10.0.3.2:8080/vendedor/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMssage) {
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
          }
        }
      });
  };

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

        <TouchableOpacity onPress={this.openConfiguracao}>
          <View style={[styles.bar, styles.barItem]}>
          <Icon name="settings" size={25} color={'#fff'}/>
          <Text style={styles.barText}>
            {this.state.confText}
          </Text>

          </View>
        </TouchableOpacity>

        <ScrollView>
          <Fumi
            style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
            label={'Nome'}
            iconClass={FontAwesomeIcon}
            iconSize={20}
            iconName={'user'}
            iconColor={'darkslategrey'}
            value={this.state.nomeText}
            editable={false}
            inputStyle={styles.titleText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'CPF'}
              iconClass={FontAwesomeIcon}
              iconName={'info'}
              iconColor={'darkslategrey'}
              value={this.state.CPFText}
              editable={false}
              inputStyle={styles.baseText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Celular'}
              iconClass={FontAwesomeIcon}
              iconName={'mobile'}
              iconColor={'darkslategrey'}
              value={this.state.celularText}
              editable={false}
              inputStyle={styles.baseText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Data de Nascimento'}
              iconClass={FontAwesomeIcon}
              iconName={'calendar'}
              iconColor={'darkslategrey'}
              value={this.state.dataNascimentoText}
              editable={false}
              inputStyle={styles.baseText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Email'}
              iconClass={FontAwesomeIcon}
              iconName={'at'}
              iconColor={'darkslategrey'}
              value={this.state.emailText}
              editable={false}
              inputStyle={styles.baseText}/>

              <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Nome da loja'}
                iconClass={MaterialsIcon}
                iconName={'store'}
                iconColor={'darkslategrey'}
                value={this.state.nomeFantasiaText}
                editable={false}
                inputStyle={styles.baseText}/>


          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Meios de Pagamento'}
              iconClass={FontAwesomeIcon}
              iconName={'asterisk'}
              iconColor={'darkslategrey'}
              value={this.state.meiosPagamentoText}
              multiline={true}
              editable={false}
              inputStyle={this.state.pagamentoEstilo}/>
      </ScrollView>
      </Image>
    );
  }
}


  //CSS
  const titleConfig = {
    title: 'Perfil Vendedor',
    tintColor: "#dc143c",
    fontFamily: 'Roboto',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    borderTopColor: '#fff',
    borderTopWidth: 4,
    backgroundColor: 'darkslategrey',
    flexDirection: 'row'
  },
  barItem:{
    padding: 18,
    alignItems: 'center'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 20,
  },
  listText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 16,
  },
  barText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
