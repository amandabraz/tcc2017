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
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

class PedidosSolicitadosVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      pedidosSolicitados: [],
      refreshing: false,
      carregou: true
    };
    this.buscaDadosPedidosVendedor();
  };

  arredondaValores(num){
    return num.toFixed(2)
  };

  buscaDadosPedidosVendedor() {
    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId + '/status/' + 'Solicitado')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
            this.setState({pedidosSolicitados: responseJson});
        }
        this.setState({refreshing: false});
        this.setState({carregou: false});
      });
  };


  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosVendedor();
          this.setState({pedidosSolicitados: []});
          this.pedidoSolicitado();
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }
  openCliente(cliente) {
    this.props.navigation.navigate('ExibeCliente', {clienteId: cliente, userId: this.state.userId});
  }

pedidoSolicitado(){
  var views = [];
  if(this.state.pedidosSolicitados.length > 0){
    for (i in this.state.pedidosSolicitados) {
      let imagemPrincipalC = require('./img/camera11.jpg');
      let imagemPrincipalP = require('./img/camera11.jpg');
      let pedidoS = this.state.pedidosSolicitados[i];

      if (pedidoS.cliente.usuario.imagemPerfil) {
        imagemPrincipalC = {uri: pedidoS.cliente.usuario.imagemPerfil};
      }
      if (pedidoS.produto.imagemPrincipal) {
        imagemPrincipalP = {uri: pedidoS.produto.imagemPrincipal};
      }
      var dataNormal = new Date(pedidoS.dataSolicitada);
      let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
      let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
      let ano = dataNormal.getFullYear();
      let hora = dataNormal.getHours();
      let min = dataNormal.getMinutes() < 10 ? "0" + dataNormal.getMinutes() : dataNormal.getMinutes();
      let dataSolicitado = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;
      
      views.push(
        <View key={i} style={styles.oneResult1}>
          <Accordion header={
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '25%'}}>
            <TouchableHighlight onPress={() => this.openCliente(pedidoS.cliente.id)}>
              <Image source={imagemPrincipalC}
                  style={styles.imagemPrincipal}/>
            </TouchableHighlight>
            </View>
          <View style={{width: '60%', alignSelf:'center'}}>
            <TouchableHighlight onPress={() => this.openCliente(pedidoS.cliente.id)}>          
              <Text style={styles.totalFont}> {pedidoS.cliente.usuario.nome}</Text>
            </TouchableHighlight>
            <Text style={styles.oneResultfont}> fez um pedido!</Text>
            <Text style={{fontSize: 14}}> {dataSolicitado}</Text>
          </View>
            <View style={{width: '5%',justifyContent: 'center'}}>
            <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
          </View>
        </View>
        } content={
          <View style={{paddingTop: 15}}>
          <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
          <View style = {{ width: '20%'}}>
          <Image source={imagemPrincipalP}
                 style={styles.imagemProduto}/>
          </View>
          <View style={{width: '80%', paddingLeft: 6}}>
            <Text style={styles.totalFont}> {pedidoS.produto.nome}{'\n'}</Text>
            <Text style={styles.oneResultfont}>Quantidade:
              <Text style={styles.totalFont}> {pedidoS.quantidade}{'\n'}</Text>
            </Text>
            <Text style={styles.oneResultfont}>Total a pagar: {pedidoS.pagamento.descricao}</Text>
            <Text style={styles.totalFont}> R$ {this.arredondaValores(pedidoS.valorCompra)}{'\n'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button buttonStyle={{width: '75%'}}
                    title ="Recusar"
                    color="#fff"
                    backgroundColor="#88557B"
                    borderRadius={10}
                    onPress={() => this.cancelarPedido(pedidoS)}/>

            <Button buttonStyle={{width: '75%'}}
                    title="Aceitar"
                    color="#fff"
                    backgroundColor="#768888"
                    borderRadius={10}
                    onPress={() => {
                      pedidoS.status = "Confirmado";
                      this.atualizaStatus(pedidoS);
                    }}/>
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
      <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: 'darkslategrey'}}>
        Nenhum pedido solicitado
      </Text>
      </View>
    )
  }
  return views;
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
              pedido.status = "Recusado";
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


  render() {
    return(
      <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaDadosPedidosVendedor();
            }}
          />
        }>
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color:'#A1453E', fontWeight: 'bold'}}>
          Pedidos Solicitados
        </Text>
        </View>
        <Spinner visible={this.state.carregou}/>
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
  imagemProduto:{
    width: 60,
    height: 60,
    borderRadius: 100
  },
  imagemPrincipal:{
    width: '98%',
    height: 80,
    borderRadius: 10
  }
});

PedidosSolicitadosVendedor.defaultProps = { ...PedidosSolicitadosVendedor };

export default PedidosSolicitadosVendedor;
