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
import QRCodeScanner from 'react-native-qrcode-scanner';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';
import Camera from 'react-native-camera';

const { width, height } = Dimensions.get("window");

class PedidosFinalizadosVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      pedidosFinalizados: [],
      pedidosRecusados: [],
      pedidosCancelados: [],
      refreshing: false,
    };
    this.buscaDadosPedidosVendedor();
  };

  buscaDadosPedidosVendedor() {
    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId + '/status/' + 'Finalizado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosFinalizados: responseJson});
        }
      });

    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId + '/status/' + 'Recusado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosRecusados: responseJson});
        }
      });

    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId + '/status/' + 'Cancelado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosCancelados: responseJson});
        }
        this.setState({refreshing: false});
      });
  };

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosVendedor();
          this.setState({pedidosFinalizados: []});
          this.pedidoFinalizado();
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }


pedidoFinalizado(){
  var views = [];
  if(this.state.pedidosFinalizados.length > 0){
    for (i in this.state.pedidosFinalizados) {
      let imagemPrincipalP = require('./img/camera11.jpg');      
      let imagemPrincipalC = require('./img/camera11.jpg');            
      let pedidoF = this.state.pedidosFinalizados[i];
      if (pedidoF.produto.imagemPrincipal) {
        imagemPrincipalP = {uri: pedidoF.produto.imagemPrincipal};
      }
      if (pedidoF.cliente.usuario.imagemPerfil) {
        imagemPrincipalC = {uri: pedidoF.cliente.usuario.imagemPerfil};
      }
      var dataNormal = new Date(pedidoF.dataFinalizacao);
      var dataFinalizacao = (dataNormal.getDate()<10?"0"+dataNormal.getDate():dataNormal.getDate()) + "/" + (dataNormal.getMonth()+1<10?"0"+dataNormal.getMonth()+1:dataNormal.getMonth()+1) + "/" + dataNormal.getFullYear() + 
      " - "+dataNormal.getHours() + ":" + (dataNormal.getMinutes()<10?"0"+dataNormal.getMinutes():dataNormal.getMinutes());
      views.push(
        <View key={i} style={styles.oneResult1}>
          <Accordion header={
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '25%'}}>
             <Image source={imagemPrincipalP}
                     style={styles.imagemPrincipal}/>
            </View>
          <View style={{width: '60%', alignSelf:'center'}}>
           <Text style={styles.totalFont}> {pedidoF.produto.nome}</Text>
           <Text style={{fontSize: 16}}> {dataFinalizacao}</Text>
          </View>
          <View style={{width: '5%',justifyContent: 'center'}}>
          <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
          </View>
      </View>
          } 
          content={
            <View style={{paddingTop: 15}}>
            <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
            <View style = {{ width: '20%'}}>
              <Image source={imagemPrincipalC}
                     style={styles.imagemCliente}/>
            </View>
          <View style={{width: '80%', paddingLeft: 6}}>
            <Text style={styles.totalFont}> {pedidoF.cliente.usuario.nome}</Text>
            <Text style={styles.oneResultfont}>Quantidade vendida:
            <Text style={styles.totalFont}> {pedidoF.quantidade}{'\n'}</Text>
            </Text>
            <Text style={styles.oneResultfont}>Total pago {pedidoF.pagamento.descricao}:
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
          <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: 'darkslategrey'}}>
            Nenhum pedido finalizado
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
        let imagemPrincipalP = require('./img/camera11.jpg');      
        let imagemPrincipalC = require('./img/camera11.jpg');            
        let pedidoR = this.state.pedidosRecusados[i];
        if (pedidoR.produto.imagemPrincipal) {
          imagemPrincipalP = {uri: pedidoR.produto.imagemPrincipal};
        }
        if (pedidoR.cliente.usuario.imagemPerfil) {
          imagemPrincipalC = {uri: pedidoR.cliente.usuario.imagemPerfil};
        }
        views.push(
          <View key={i} style={styles.oneResult1}>
            <Accordion header={
              <View style={{flexDirection: 'row'}}>
              <View style = {{ width: '25%'}}>
               <Image source={imagemPrincipalP}
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
                <Image source={imagemPrincipalC}
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
            <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: 'darkslategrey'}}>
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
          let imagemPrincipalP = require('./img/camera11.jpg');      
          let imagemPrincipalC = require('./img/camera11.jpg');            
          let pedidoC = this.state.pedidosCancelados[i];
          if (pedidoC.produto.imagemPrincipal) {
            imagemPrincipalP = {uri: pedidoC.produto.imagemPrincipal};
          }
          if (pedidoC.cliente.usuario.imagemPerfil) {
            imagemPrincipalC = {uri: pedidoC.cliente.usuario.imagemPerfil};
          }
          views.push(
            <View key={i} style={styles.oneResult1}>
              <Accordion header={
                <View style={{flexDirection: 'row'}}>
                <View style = {{ width: '25%'}}>
                 <Image source={imagemPrincipalP}
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
                  <Image source={imagemPrincipalC}
                         style={styles.imagemCliente}/>
                </View>
              <View style={{width: '80%', paddingLeft: 6}}>
                <Text style={styles.totalFont}> {pedidoC.cliente.usuario.nome}</Text>
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
              <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: 'darkslategrey'}}>
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
              this.buscaDadosPedidosVendedor();
            }}
          />
        }>
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#67A13F', fontWeight: 'bold'}}>
          Pedidos Finalizados
        </Text>
        </View>
        {this.pedidoFinalizado()}
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#A1453E', fontWeight: 'bold'}}>
          Pedidos Recusados
        </Text>
        </View>
        {this.pedidoRecusado()}
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', fontWeight: 'bold'}}>
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

PedidosFinalizadosVendedor.defaultProps = { ...PedidosFinalizadosVendedor };

export default PedidosFinalizadosVendedor;
