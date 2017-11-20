import React, { Component } from 'react';
import { Dimensions, AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ToastAndroid, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");


export default class ExibeCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteId: this.props.navigation.state.params.clienteId,
      userId: this.props.navigation.state.params.userId,
      imagemPerfil: require('./img/camera11.jpg'),
      carregou: true,
      cliente: {
        usuario: {nome: ''},
      },
      tags: "Nenhuma tag inserida",
      tagEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      restricoesDieteticas: "Nenhuma restrição escolhida",
      restricaoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      qtdPedidos: '',
      qtdAvaliados: '',
      comprasEfetuadas: "Nenhuma compra efetuada",
      pedidosAvaliados: "Nenhum pedido avaliado"
    };
    this.buscaDadosCliente();
  }

  buscaDadosCliente() {
    fetch(constante.ENDPOINT + 'cliente/' + this.state.clienteId)
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          if (responseJson.usuario.imagemPerfil) {
            this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
          }
          this.setState({cliente: responseJson});

          if (responseJson.tags.length > 0) {
            this.setState({tagEstilo: styles.listText})
            var tagsCliente = "";
            for(i in responseJson.tags) {
              tagsCliente += "#" + responseJson.tags[i].descricao + "  ";
            }
            tagsCliente = tagsCliente.slice(0, -2);
            this.setState({tags: tagsCliente});
          }
          if (responseJson.restricoesDieteticas.length > 0) {
            this.setState({restricaoEstilo: styles.listText})
            var restricoes = "";
            for(i in responseJson.restricoesDieteticas) {
              restricoes += responseJson.restricoesDieteticas[i].descricao + " - ";
            }
            restricoes = restricoes.slice(0, -3);
            this.setState({restricoesDieteticas: restricoes});
          }

          if (responseJson.qtdPedidos) {
            this.setState({qtdPedidos: responseJson.qtdPedidos,
                          comprasEfetuadas: " compra efetuada"});
            if (responseJson.qtdPedidos > 1) {
              this.setState({comprasEfetuadas: " compras efetuadas"});
            }
          }
          if (responseJson.qtdAvaliados) {
            this.setState({qtdAvaliados: responseJson.qtdAvaliados,
                          pedidosAvaliados: " pedido avaliado"});
            if (responseJson.qtdAvaliados > 1) {
              this.setState({pedidosAvaliados: " pedidos avaliados"});
            }
          }
          this.setState({carregou: false});
        }
      });
  };

  render () {
    const {goBack} = this.props.navigation;    
    return (
      <View style={styles.container}>
      <NavigationBar
       tintColor="transparent"
       style={{marginBottom: 20}}
      leftButton={
        <TouchableOpacity onPress={() => goBack()}>
          <MaterialsIcon name="chevron-left" size={40} color={'#624063'}  style={{ padding: 3 }} />
        </TouchableOpacity>
      }/>
        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            source={this.state.imagemPerfil}/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor:  '#7A8887', alignItems: 'center', justifyContent: 'center', width, padding: 10}}>
              <Text style={styles.titleText}>
                {this.state.cliente.usuario.nome}
              </Text>
            </View>
          </View>
        </View>
        <Spinner visible={this.state.carregou}/>
        <ScrollView style={{marginTop: 15}}>
        <View style={{ backgroundColor: "#ccc", marginTop: 20, padding: 7, borderRadius: 10}}>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
          <Image style={{width: 50, height: 50, margin: 5}}
            source={require('./img/money.png')} />
            <Text style={{color: '#4A4A4A', fontSize: 20, margin: 5}}>
              {this.state.qtdPedidos}
            </Text>
            <Text style={{fontSize: 18}}> 
              {this.state.comprasEfetuadas}
            </Text>
          </View>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
            <Image style={{width: 55, height: 55, margin: 4}}
              source={require('./img/love.png')} />
            <Text style={{color: '#4A4A4A', fontSize: 20, margin: 5}}>
              {this.state.qtdAvaliados}
            </Text>
            <Text style={{fontSize: 18}}> 
              {this.state.pedidosAvaliados}
            </Text>
          </View>
        </View>        
        <Fumi
            style={{ backgroundColor: 'transparent', width: "80%", height: 110 }}
            label={'Tags'}
            iconClass={FontAwesomeIcon}
            iconName={'hashtag'}
            iconColor={'#4A4A4A'}
            value={this.state.tags}
            editable={false}
            multiline={true}
            inputStyle={this.state.tagEstilo}/>
        <Fumi
            style={{ backgroundColor: 'transparent', width: "80%", height: 110 }}
            label={'Restrições dietéticas'}
            iconClass={FontAwesomeIcon}
            iconName={'asterisk'}
            iconColor={'#4A4A4A'}
            value={this.state.restricoesDieteticas}
            multiline={true}
            editable={false}
            inputStyle={this.state.restricaoEstilo}/>
      </ScrollView>
      </View>
    );
  }
}


  //CSS
  const styles = StyleSheet.create({
    container: {
      flex: 1
  },
  headerBackground: {
    alignSelf: 'stretch',
  },
  header:{
    width,
    height: "35%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicWrap:{
    width,
    height: "85%"
  },
  profilepic:{
    flex: 1,
    alignSelf: 'stretch'
  },
  oneResultfontTitle:{
    color: '#4A4A4A',
    fontWeight: 'bold',
    fontSize: 17,
  },
  oneResultfont:{
    color: '#4A4A4A',
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
     width: 180,
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
    color: '#4A4A4A',
    fontSize: 20,
  },
  listText: {
    fontFamily: 'Roboto',
    color: '#4A4A4A',
    fontSize: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Roboto',
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
