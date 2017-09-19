import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

export default class PerfilCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      nomeText: '',
      dataNascimentoText: '',
      emailText: '',
      imagemPerfil: require('./img/camera2.jpg'),
      tagsText: "Nenhuma tag inserida",
      tagEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      restricoesDieteticasText: "Nenhuma restrição escolhida",
      restricaoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      CPFText: '',
      celularText: '',
      confText: '  Configuração'
    };
    this.buscaDadosCliente();
  }

  buscaDadosCliente() {
    fetch('http://10.0.2.2:8080/cliente/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson.usuario.imagemPerfil) {
              this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
            }
            this.setState({nomeText: responseJson.usuario.nome});
            this.setState({})
            var dataNormal = new Date(responseJson.usuario.dataNasc);
            var dataNasc = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
            this.setState({dataNascimentoText: dataNasc});
            this.setState({emailText: responseJson.usuario.email});
            this.setState({CPFText: responseJson.usuario.cpf});
            this.setState({celularText: responseJson.usuario.ddd + responseJson.usuario.telefone});
            if (responseJson.tags.length > 0) {
              this.setState({tagEstilo: styles.listText})
              var tags = "";
              for(i in responseJson.tags) {
                tags += "#" + responseJson.tags[i].descricao + "  ";
              }
              tags = tags.slice(0, -2);
              this.setState({tagsText: tags});
            }
            if (responseJson.restricoesDieteticas.length > 0) {
              this.setState({restricaoEstilo: styles.listText})
              var restricoes = "";
              for(i in responseJson.restricoesDieteticas) {
                restricoes += responseJson.restricoesDieteticas[i].descricao + " - ";
              }
              restricoes = restricoes.slice(0, -3);
              this.setState({restricoesDieteticasText: restricoes});
            }
          }
      });
  };

  openConfiguracao = () => {this.props.navigation.navigate('ConfiguracaoCliente');}

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
              style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
              label={'Tags'}
              iconClass={FontAwesomeIcon}
              iconName={'hashtag'}
              iconColor={'darkslategrey'}
              value={this.state.tagsText}
              editable={false}
              multiline={true}
              inputStyle={this.state.tagEstilo}/>
          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
              label={'Restrições dietéticas'}
              iconClass={FontAwesomeIcon}
              iconName={'asterisk'}
              iconColor={'darkslategrey'}
              value={this.state.restricoesDieteticasText}
              multiline={true}
              editable={false}
              inputStyle={this.state.restricaoEstilo}/>
      </ScrollView>
      </Image>
    );
  }
}


  //CSS
  const titleConfig = {
    title: 'Perfil Cliente',
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
    fontSize: 14,
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
