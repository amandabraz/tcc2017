import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

//TODO: Pegar dados do vendedor certo, o que o clique foi feito

export default class ExibeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeText: '',
      nomeFantasiaText: '',
      meiosPagamentoText: "Nenhum Meio de Pagamento Escolhido",
      pagamentoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      celularText: '',
      resultadoProduto: [1,2,3,4]
    };
    this.buscaDadosVendedor();
  }

  buscaDadosVendedor() {
    fetch('http://10.0.2.2:8080/vendedor/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMssage) {
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

  mostraProduto() {
    var views = [];
    for(i in this.state.resultadoProduto) {
      let produto = this.state.resultadoProduto[i];
      views.push (
        <View key={i}>
          <View style={styles.oneResult}>
              <Image source={require('./img/fundo2.png')}
                     style={styles.imageResultSearch}
                     justifyContent='flex-start'/>

                <Text style={styles.oneResultfontTitle} justifyContent='center'>Nome Produto</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>Categoria</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>preco</Text>

            </View>
            <Text>{'\n'}</Text>
          </View>
        );
    }
      return views;
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            source={require('./img/sabrina-copy.jpg')}/>
          </View>
          <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>
          Nome {this.state.nomeText}
          </Text>
          </View>
          </View>

        <ScrollView>
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
              label={'Contato'}
              iconClass={FontAwesomeIcon}
              iconName={'mobile'}
              iconColor={'darkslategrey'}
              value={this.state.celularText}
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


      <View style={styles.results}>
      <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={true}>
                {this.mostraProduto()}
      </ScrollView>
      </View>
      </ScrollView>
      </View>
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
      flex: 1
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
    backgroundColor: 'rgba(202, 203, 247, 0.58)',
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
  oneResultfontTitle:{
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 18,
  },
  oneResultfont:{
    color: '#1C1C1C',
    fontSize: 15,
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  results:{
    flexDirection: 'row',
    margin: 5
  },
  oneResult:{
     height: 200,
     alignItems:  'center',
     justifyContent: 'center',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
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
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
