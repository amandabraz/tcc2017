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
import StartTimerLocation from '../localizacao/TimerGeolocation.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import {Icon,Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import QRCode from 'react-native-qrcode';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';
import Camera from 'react-native-camera';

const { width, height } = Dimensions.get("window");

class PedidosFinalizadosCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      pedidosFinalizados: [],
      pedidosRecusados: [],
      pedidosCancelados: [],
      refreshing: false,      
    };
    this.buscaDadosPedidosCliente();
  };

  buscaDadosPedidosCliente() {
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Finalizado')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
              this.setState({pedidosFinalizados: responseJson});
        }
      });
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Recusado')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
              this.setState({pedidosRecusados: responseJson});
        }
      });
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Cancelado')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
              this.setState({pedidosCancelados: responseJson});
        }
        this.setState({refreshing: false});        
      });
  };


pedidoFinalizado(){
  var views = [];
  if(this.state.pedidosFinalizados.length > 0){
    for (i in this.state.pedidosFinalizados){
      let pedidoF = this.state.pedidosFinalizados[i];
      let dataNormal = new Date(pedidoF.dataFinalizacao);
      let dataFinalizacao = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();      
      views.push(
        <View key={i} style={styles.oneResult1}>
          <Accordion header={
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '25%'}}>
             <Image source={{uri: pedidoF.produto.imagemPrincipal}}
                     style={styles.imagemPrincipal}/>
            </View>
          <View style={{width: '60%', alignSelf:'center'}}>
           <Text style={styles.totalFont}> {pedidoF.produto.nome}</Text>
           <Text style={{fontSize: 14}}> {dataFinalizacao}</Text>
          </View>
          <View style={{width: '5%',justifyContent: 'center'}}>
          <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
          </View>
      </View>
          } content={
            <View style={{paddingTop: 15}}>
            <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
            <View style = {{ width: '20%'}}>
              <Image source={{uri: pedidoF.produto.vendedor.usuario.imagemPerfil}}
                     style={styles.imagemCliente}/>
            </View>
          <View style={{width: '80%', paddingLeft: 6}}>
            <Text style={styles.totalFont}> {pedidoF.produto.vendedor.usuario.nome}</Text>
            <Text style={styles.oneResultfont}>Quantidade comprada:
            <Text style={styles.totalFont}> {pedidoF.quantidade}{'\n'}</Text>
            </Text>
            <Text style={styles.oneResultfont}>Total pago com {pedidoF.pagamento.descricao}:
            <Text style={styles.totalFont}> R$ {pedidoF.valorCompra}{'\n'}</Text>
            </Text>
          </View>
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
            Nenhum pedido finalizado.
          </Text>
          </View>
        )
      }
      return views;
  }

  pedidoRecusado(){
    var views = [];
    if(this.state.pedidosRecusados.length > 0){
      for (i in this.state.pedidosRecusados){
        let pedidoR = this.state.pedidosRecusados[i];
        views.push(
          <View key={i} style={styles.oneResult1}>
            <Accordion header={
              <View style={{flexDirection: 'row'}}>
              <View style = {{ width: '25%'}}>
               <Image source={{uri: pedidoR.produto.imagemPrincipal}}
                       style={styles.imagemPrincipal}/>
              </View>
            <View style={{width: '60%', alignSelf:'center'}}>
             <Text style={styles.totalFont}> {pedidoR.produto.nome}</Text>
            </View>
            <View style={{width: '5%',justifyContent: 'center'}}>
            <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
            </View>
        </View>
            } content={
              <View style={{paddingTop: 15}}>
              <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
              <View style = {{ width: '20%'}}>
                <Image source={{uri: pedidoR.produto.vendedor.usuario.imagemPerfil}}
                       style={styles.imagemCliente}/>
              </View>
            <View style={{width: '80%', paddingLeft: 6}}>
              <Text style={styles.totalFont}> {pedidoR.produto.vendedor.usuario.nome}</Text>
              <Text style={styles.oneResultfont}>Quantidade solicitada:
              <Text style={styles.totalFont}> {pedidoR.quantidade}{'\n'}</Text>
              </Text>
              <Text style={styles.oneResultfont}>Valor do pedido:
              <Text style={styles.totalFont}> R$ {pedidoR.valorCompra}{'\n'}</Text>
              </Text>
            </View>
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
              Nenhum pedido recusado.
            </Text>
            </View>
          )
        }
        return views;
    }

    pedidoCancelado(){
      var views = [];
      if(this.state.pedidosCancelados.length > 0){
        for (i in this.state.pedidosCancelados){
          let pedidoC = this.state.pedidosCancelados[i];
          views.push(
            <View key={i} style={styles.oneResult1}>
              <Accordion header={
                <View style={{flexDirection: 'row'}}>
                <View style = {{ width: '25%'}}>
                 <Image source={{uri: pedidoC.produto.imagemPrincipal}}
                         style={styles.imagemPrincipal}/>
                </View>
              <View style={{width: '60%', alignSelf:'center'}}>
               <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
              </View>
              <View style={{width: '5%',justifyContent: 'center'}}>
              <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
              </View>
          </View>
              } content={
                <View style={{paddingTop: 15}}>
                <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
                <View style = {{ width: '20%'}}>
                  <Image source={{uri: pedidoC.produto.vendedor.usuario.imagemPerfil}}
                         style={styles.imagemCliente}/>
                </View>
              <View style={{width: '80%', paddingLeft: 6}}>
                <Text style={styles.totalFont}> {pedidoC.produto.vendedor.usuario.nome}</Text>
                <Text style={styles.oneResultfont}>Quantidade solicitada:
                <Text style={styles.totalFont}> {pedidoC.quantidade}{'\n'}</Text>
                </Text>
                <Text style={styles.oneResultfont}>Valor do pedido:
                <Text style={styles.totalFont}> R$ {pedidoC.valorCompra}{'\n'}</Text>
                </Text>
              </View>
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
                Nenhum pedido cancelado.
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
        <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#67A13F', fontWeight: 'bold'}}>
          Pedidos Finalizados
        </Text>
        </View>
        {this.pedidoFinalizado()}
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#A1453E', fontWeight: 'bold'}}>
          Pedidos Recusados
        </Text>
        </View>
        {this.pedidoRecusado()}
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', fontWeight: 'bold'}}>
          Pedidos Cancelados
        </Text>
        </View>
        {this.pedidoCancelado()}
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
  imagemCliente:{
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

PedidosFinalizadosCliente.defaultProps = { ...PedidosFinalizadosCliente };

export default PedidosFinalizadosCliente;
