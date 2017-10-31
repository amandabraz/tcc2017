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
import PieChart from 'react-native-pie-chart';

const { width, height } = Dimensions.get("window");

const keyOfPieChart = "pieChart_";

class Estatisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        gps: 0,
        userId: this.props.navigation.state.params.userId,
        vendedorId: this.props.navigation.state.params.vendedorId,
        quantidadeVendida: [],
        produtoVendido: [],
        valorTotalArrecadadoPorProduto: [],
        nomeProduto: [],
        refreshing: false,
    };
    this.buscaQuantidadeVendida();
    this.buscaValorArrecadadoPorProduto();
  };

  //BUSCA POR UNIDADES VENDIDAS - BAR CHART E LISTA DE PRODUTOS
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

  buscaProdutosVendidosVendedor(){
    if(this.state.quantidadeVendida.length > 0){
      return(
      <View style={styles.container}>
        <View style={{width: this.state.quantidadeVendida.length}}/>
        <Chart
          style = {styles.chart}
          data = {
              this.state.quantidadeVendida
          }
          type = "bar"
          verticalGridStep = {1}
        />
      </View>
      )
    } else {
      return(
        <View key={0} style={{alignItems: 'center', marginRight: 5}}>
        <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
          Não há produtos vendidos para estatísticas.
        </Text>
        </View>
      )
    }
  }

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

  //BUSCA POR VALOR ARRECADADO - PIE CHART

  buscaValorArrecadadoPorProduto(){
    fetch(constante.ENDPOINT+'pedido/valorTotal/vendedor/' + this.state.vendedorId + '?lastDays=30&maxCount=5', {method: 'GET'})
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          let valorTotalArrecadadoPorProdutoResponse = []
          let nomeProdutoVendidoResponse = []
          for (let i=0; i<responseJson.length; i++){
            nomeProdutoVendidoResponse.push(responseJson[i][0])
            valorTotalArrecadadoPorProdutoResponse.push(responseJson[i][1])
          }
          this.setState({valorTotalArrecadadoPorProduto: valorTotalArrecadadoPorProdutoResponse})
          this.setState({nomeProduto: nomeProdutoVendidoResponse})
        }
        this.setState({refreshing:false})
    });
  }

  exibeValorArrecadadoPorProduto(){
    if(this.state.valorTotalArrecadadoPorProduto.length > 0){
      var textDescriptions = []
      for(let i = 0; i<this.state.nomeProduto.length; i++){
        textDescriptions.push(
          <Text key={keyOfPieChart+"_desc_"+i} style={styles.pieChart_description}>
            <Text style={{color: colorsForPieChart[i], fontSize: 25, fontWeight: 'bold'}}>+</Text> {this.state.nomeProduto[i]+" (R$ "+this.state.valorTotalArrecadadoPorProduto[i]+") "}
          </Text>
        )
      }
      return(
      <View key={keyOfPieChart} style={styles.container}>
        <PieChart
          chart_wh={250}
          series={this.state.valorTotalArrecadadoPorProduto}
          sliceColor={colorsForPieChart}
          doughnut={true}
          coverRadius={0.45}
          coverFill={'#D9DBDB'}
        />
        <View style={styles.pieChart_textAlign}>
          {textDescriptions}
        </View>
      </View>
      )
    } else {
      return(
        <View key={keyOfPieChart+0} style={{alignItems: 'center'}}>
        <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
          Não há valor total de venda para estatísticas.
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
                  this.buscaValorArrecadadoPorProduto();
                }}
              />
            }>
            <View style={{paddingTop: 25, marginRight: 5}}>
              <Text style={{marginLeft: 10, marginRight: 10, fontSize: 16}}>
                Seus Produtos Vendidos:
              </Text>
              {this.produtosVendidos()}
            </View>
            <View style = {{margin: 10, flexDirection: 'column', marginTop: 15, marginRight: 15}}>
              <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', marginRight: 5, color: '#0000CD', fontWeight: 'bold'}}>
                Representação gráfica:
              </Text>
              {this.buscaProdutosVendidosVendedor()}
            </View>
            <View style = {styles.pieChart_viewStyle}>
              <Text style={styles.pieChart_text}>
                Valor total arrecadado por produto no mês
              </Text>
              {this.exibeValorArrecadadoPorProduto()}
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
        backgroundColor: '#D9DBDB',
        marginRight: 5
    },
    chart: {
        width: 350,
        height: 350,
        flex:1,
        marginRight: 5,
    },
    produtosV:{
      margin: 6,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#fff',
      width: '98%',
      marginRight: 5
    },
    pieChart_text:{
      marginTop: 8,
      fontSize: 16,
      justifyContent: 'center',
      color: '#406161',
      fontWeight: 'bold',
      marginRight: 5
    },
    pieChart_viewStyle:{
      margin: 10,
      marginTop: 15,
      marginRight: 5
      fontWeight: 'bold'
    },
    pieChart_viewStyle:{
      margin: 10,
      marginTop: 15
    },
    pieChart_description:{
      marginTop: 8,
      fontSize: 14,
      justifyContent: 'center'
    },
    pieChart_textAlign:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }
});

const colorsForPieChart = ['#F44336','#2196F3','#d1bc0c', '#4CAF50', '#Fd720f', '#776567'];

Estatisticas.defaultProps = { ...Estatisticas };

export default Estatisticas;
