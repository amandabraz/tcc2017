import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class RankingProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      clienteId: this.props.navigation.state.params.clienteId,
      refreshing: false,
      informacoes: '',
      clientesMantidos: '',
      produtoVendido: '',
      filtroMensal: true,
      alturaPedido: '1%',
      alturaResumo: '100%'
    };
    this.buscaInformacoes();
  };


  buscaInformacoes(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({informacoes: responseJson});
          if (responseJson.quantidadeVendida > 0) {
            var qnt = "";
              qnt = "Produtos vendidos";
            this.setState({produtoVendido: qnt});
          } else {
              qnt = "Produto vendido";
            this.setState({produtoVendido: qnt});
          }
          this.setState({refreshing:false});
      }});
  }

  render() {
    return(
      <View>
        <Text>Mock - Ranking</Text>
      </View>
    );
  }

}

RankingProdutos.defaultProps = { ...RankingProdutos };

export default RankingProdutos;
