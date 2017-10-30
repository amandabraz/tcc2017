import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gps: 0,
        userId: this.props.navigation.state.params.userId,
        vendedorId: this.props.navigation.state.params.vendedorId,
        quantidadeVendida: [],
        refreshing: false,
    };
    this.buscaQuantidadeVendida();
  };

  buscaQuantidadeVendida() {
    fetch(constante.ENDPOINT+'pedido/quantidade/vendedor/' + this.state.vendedorId, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({quantidadeVendida: responseJson});
        }
        this.setState({refreshing:false});
    });
  };

  produtosVendidos(){
    var views = [];
    if(this.state.quantidadeVendida.length > 0){
      for(i in this.state.quantidadeVendida){
        let prodQtdVendido = this.state.quantidadeVendida[i];
    views.push(
    <View key={i} style={styles.produtosV}>
      <Animated.View style={[styles.bar, styles.points, {width: prodQtdVendido[1]}]}/>
      <Text style={{fontSize: 7, justifyContent: 'center'}}>
        {prodQtdVendido[1]}
      </Text>
      <Text style={{fontSize: 12, justifyContent: 'center'}}>
        {prodQtdVendido[0]}
      </Text>
   </View>
  )}} else {
      views.push(
        <View key={0} style={{alignItems: 'center'}}>
        <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
          Você não tem produtos vendidos! :(
        </Text>
        </View>
      )
    }

   return views;
  }

  render() {
    return(
      <View style={styles.container}>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing:true});
                this.buscaQuantidadeVendida();
              }}
            />
          }>
          <View style={{paddingTop: 25}}>
            <Text style={{marginLeft: 10, fontSize: 16}}>
              Seus Produtos Vendidos:
            </Text>
            {this.produtosVendidos()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  bar: {
    borderRadius: 5,
    height: 7,
    marginRight: 5
  },
  points: {
    backgroundColor: '#88557B'
},
  produtosV:{
    margin: 6,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    width: '98%'
  }
});

Estatisticas.defaultProps = { ...Estatisticas };

export default Estatisticas;
