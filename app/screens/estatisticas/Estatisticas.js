import React, {
  Component
} from 'react';
import {
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
        refreshing: false,
    };
    this.buscaDadosPedido();
    this.buscaQuantidadeVendida();
  };

  buscaDadosPedido() {
    fetch(constante.ENDPOINT+'pedido/'+ 'Solicitado' + '/vendedor/' + this.state.vendedorId, {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.setState({pedidoSolicitado: responseJson});

            if (responseJson.cliente.usuario.imagemPerfil) {
              this.setState({imagemCliente: {uri: responseJson.cliente.usuario.imagemPerfil }})
            }
            if (responseJson.produto.imagemPrincipal) {
              this.setState({imagemProduto:{ uri: responseJson.produto.imagemPrincipal }})
            }
            var dataNormal = new Date(responseJson.dataSolicitada);
            var dataS = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
            this.setState({dataSolicitada: dataS})
      }});
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
                  this.buscaDadosPedido();
                  this.buscaQuantidadeVendida();
                }}
              />
            }>
            <View style = {{margin: 10, flexDirection: 'column', marginTop: 15}}>
              <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#0000CD', fontWeight: 'bold'}}>
                Produtos mais vendidos do mês
              </Text>
            </View>
            <View style={styles.container}>
              <Chart
                style={styles.chart}
                data={[
                    [0, 1],
                    [1, 3],
                    [3, 7],
                    [4, 9],
                ]}
                type="line"
              />
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    chart: {
        width: 200,
        height: 200,
    },
});

Estatisticas.defaultProps = { ...Estatisticas };

export default Estatisticas;
