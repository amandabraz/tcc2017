import React, {
  Component
} from 'react';
import {
  Animated,
  AppRegistry,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import * as constante from '../../constantes';
import Chart from 'react-native-chart';
import NavigationBar from 'react-native-navbar';

const { width, height } = Dimensions.get("window");

class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gps: 0,
        userId: this.props.navigation.state.params.userId,
        vendedorId: this.props.navigation.state.params.vendedorId,
        quantidadeVendida: [],
        produtoVendido: [],
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
          this.setState({produtoVendido: responseJson})
        }
        this.setState({refreshing:false});
    });
  };


  produtosVendidosVendedor(){
    if(this.state.quantidadeVendida.length > 0){
      return(
      <View key={i} style={styles.container}>
        <View style={[styles.bar, styles.points, {width: this.state.quantidadeVendida.length}]}/>
        <Chart
          style = {styles.chart}
          data = {
              this.state.quantidadeVendida
          }
          type = "bar"
          verticalGridStep={4}
          widthPercent = {0.5}
          heightPercent = {0.5}
          showDataPoint={true}
          visibleYRange={[0,30]}
        />
      </View>
      )
    } else {
      return(
        <View key={0} style={{alignItems: 'center'}}>
        <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
          Não há produtos vendidos para estatísticas.
        </Text>
        </View>
      )
    }
  }


  render() {
    const titleConfig = {
      title: 'Estatísticas',
      tintColor: "#fff",
      fontFamily: 'Roboto',
    }
    return(
      <View style={{flex: 1}}>
        <NavigationBar
          title={titleConfig}
          tintColor="#768888"
        />
          <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({refreshing:true});
                  this.buscaQuantidadeVendida();
                  this.produtosVendidosVendedor();
                }}
              />
            }>
            <View style = {{margin: 10, flexDirection: 'column', marginTop: 15}}>
              <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#0000CD', fontWeight: 'bold'}}>
                Produtos mais vendidos do mês
              </Text>
              {this.produtosVendidosVendedor()}
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    chart: {
        width: 350,
        height: 350,
        flex:1,
    },
    produtosV:{
      margin: 6,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#fff',
      width: '98%'
    },
});

Estatisticas.defaultProps = { ...Estatisticas };

export default Estatisticas;
