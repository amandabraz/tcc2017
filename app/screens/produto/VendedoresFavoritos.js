import React, { Component } from 'react';
import {
  Dimensions, 
  AppRegistry, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  View, 
  Image, 
  ToastAndroid, 
  ScrollView,
  RefreshControl
} from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

class VendedoresFavoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      vendedoresFavoritos: [],
      refreshing: false,
      carregou: true
    }
    this.buscaVendedoresFavoritos();
  }
  

  buscaVendedoresFavoritos() {
    fetch(constante.ENDPOINT + "cliente/" + this.state.clienteId + "/favoritos", {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({vendedoresFavoritos: responseJson});
      }
      this.setState({refreshing: false});
      this.setState({carregou: false});
    });
  };

  onButtonOpenVendedor = (usuarioSelecionado, vendedorIdSelecionado) => {
    this.props.navigation.navigate('ExibeVendedor',
          {
            userId: this.state.userId,
            selectUserId: usuarioSelecionado,
            vendedorId: vendedorIdSelecionado,
            clienteId: this.state.clienteId
          });
  };

  buscaVendedor() {
    var views = [];
    if (this.state.vendedoresFavoritos.length > 0) {
      for(i in this.state.vendedoresFavoritos) {
        let imagemPerfil = require('./img/camera11.jpg');
        let vendedor = this.state.vendedoresFavoritos[i];
        if(vendedor.usuario.imagemPerfil){
          imagemPerfil = {uri: vendedor.usuario.imagemPerfil};
        }
        views.push (
          <View key={i}>
            <TouchableHighlight
              onPress={() => this.onButtonOpenVendedor(vendedor.usuario.id, vendedor.id)}
              underlayColor = 'backgroundColor: "rgba(255, 255, 255, 0.55)"'
            >
              <View>
                <View style={styles.oneResult}>
                  <View style={{width:'25%'}}>
                  <Image source={imagemPerfil}
                        style={styles.imageResultSearch}
                        justifyContent='flex-start'/>
                  </View>
                  <View style={{width: '55%'}}>
                    <Text style={styles.oneResultfontTitle} justifyContent='center'>{vendedor.usuario.nome}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{vendedor.nomeFantasia}</Text>
                  </View>
                  <View style={{width:'20%'}}>
                    <Icon name='heart'
                        raised
                        type='font-awesome' 
                        color='#990000'/>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        );
    }
  } else {
    views.push(
      <View key={0} style={{alignItems: 'center'}}>
      <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: 'darkslategrey'}}>
        Nenhum vendedor favorito!
      </Text>
      </View>
    )}
  return views;
}

  render() {
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        title={titleConfig}
        tintColor="#624063"
      />
      <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaVendedoresFavoritos();
            }}
          />
        }>
            <View style={styles.centralView}>
              <View style={styles.results}>
              <Spinner visible={this.state.carregou}/>
                {this.buscaVendedor()}
              </View>
            </View>
        </ScrollView>
      </View>
    );
  }

}

const titleConfig = {
  title: 'Vendedores Favoritos',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  oneResult:{
    width: '97%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    padding: 10,
    margin: 3,
 },
  oneResultfontTitle:{
    color: '#4A4A4A',
    fontWeight: 'bold',
    fontSize: 18,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralView: {
    alignItems: 'center'
  }
})

VendedoresFavoritos.defaultProps = { ...VendedoresFavoritos };

export default VendedoresFavoritos;
