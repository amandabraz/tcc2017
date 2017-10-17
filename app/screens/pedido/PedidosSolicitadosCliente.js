import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {Icon,Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class PedidosSolicitadosCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      pedidosSolicitados: [],
      refreshing: false,      
    };
    this.buscaDadosPedidosCliente();
  };

  buscaDadosPedidosCliente() {
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Solicitado')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
            this.setState({pedidosSolicitados: responseJson});
        }
        this.setState({refreshing: false});
      });
  };

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosCliente();
          this.setState({pedidosSolicitados: []});
          this.pedidoSolicitado();
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }



    cancelarPedido(pedido) {
        this.popup.confirm({
            title: 'Recusar Pedido',
            content: ['Deseja realmente cancelar esse pedido?'],
            ok: {
                text: 'Confirmar',
                style: {
                    color: 'green',
                    fontWeight: 'bold'
                },
                callback: () => {
                  pedido.status = "Cancelado";
                  this.atualizaStatus(pedido);
                  }
            },
            cancel: {
                text: 'Cancelar',
                style: {
                    color: 'red'
                }
            }
        });
  }


pedidoSolicitado(){
  var views = [];
  if(this.state.pedidosSolicitados.length > 0){
    for (i in this.state.pedidosSolicitados){
      let pedidoS = this.state.pedidosSolicitados[i];
      let data = new Date(pedidoS.dataSolicitada);
      let dataSolicitada = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
      views.push(
        <View key={i} style={styles.oneResult1}>
          <Accordion header={
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '25%'}}>
              <Image source={{uri: pedidoS.produto.vendedor.usuario.imagemPerfil}}
                  style={styles.imagemPrincipal}/>
            </View>
          <View style={{width: '60%', alignSelf:'center'}}>
            <Text style={styles.totalFont}> {pedidoS.produto.vendedor.usuario.nome}</Text>
            <Text style={styles.oneResultfont}> Pedido feito!</Text>
            <Text style={{fontSize: 14}}> {dataSolicitada}</Text>
          </View>
            <View style={{width: '5%',justifyContent: 'center'}}>
            <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
          </View>
        </View>
        } content={
          <View style={{paddingTop: 15}}>
          <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
          <View style = {{ width: '20%'}}>
          <Image source={{uri: pedidoS.produto.imagemPrincipal}}
                 style={styles.imagemVendedor}/>
          </View>
          <View style={{width: '80%', paddingLeft: 6}}>
            <Text style={styles.totalFont}> {pedidoS.produto.nome}{'\n'}</Text>
            <Text style={styles.oneResultfont}>Quantidade:
              <Text style={styles.totalFont}> {pedidoS.quantidade}{'\n'}</Text>
            </Text>
            <Text style={styles.oneResultfont}>Total a pagar {pedidoS.pagamento.descricao}:</Text>
            <Text style={styles.totalFont}> R$ {pedidoS.valorCompra}{'\n'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button buttonStyle={{width: '40%'}}
                    title ="Cancelar"
                    color="#fff"
                    backgroundColor="#88557B"
                    borderRadius={10}
                    onPress={() =>this.cancelarPedido(pedidoS)}
                    />
          </View>
        </View>
        }
        underlayColor="white"
        easing="easeOutCubic"/>
        </View>
    )}
  } else {
    views.push(
      <View key={0} style={{alignItems: 'center'}}>
      <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: 'darkslategrey'}}>
        Nenhum pedido solicitado.
      </Text>
      </View>
    )
  }
  return views;
}

  render() {
    return(
      <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaDadosPedidosCliente();
            }}
          />
        }>
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color:'#A1453E', fontWeight: 'bold'}}>
          Pedidos Solicitados
        </Text>
        </View>
        {this.pedidoSolicitado()}
      </ScrollView>
      <Popup ref={popup => this.popup = popup }/>
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
  },
  oneResultfont:{
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imagemVendedor:{
    width: 60,
    height: 60,
    borderRadius: 100
  },
  imagemProduto:{
    width: '98%',
    height: 100,
    borderRadius: 10
  },
  imagemPrincipal:{
    width: '98%',
    height: 80,
    borderRadius: 10
  }
});

PedidosSolicitadosCliente.defaultProps = { ...PedidosSolicitadosCliente };

export default PedidosSolicitadosCliente;
