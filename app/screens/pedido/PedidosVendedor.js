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
  TouchableOpacity
} from 'react-native';
import StartTimerLocation from '../localizacao/TimerGeolocation.js';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import {Icon,Button} from 'react-native-elements';
import Popup from 'react-native-popup';
import NavigationBar from 'react-native-navbar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';

const { width, height } = Dimensions.get("window");

class PedidosVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendedorId: 22,
      listaPedidos:[],
      pedidosSolicitados: [],
      pedidosConfirmados: [],
      pedidosFinalizados: []
    };
    this.buscaDadosPedidosVendedor();
  };

  buscaDadosPedidosVendedor() {
    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({listaPedidos: responseJson});
        }
      });
  };

  atualizaStatus(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + pedido.id + '/status/' + pedido.status, {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.buscaDadosPedidosVendedor();
          this.pedidos();
          this.pedidoSolicitado();
          this.pedidoConfirmado();
          this.pedidoFinalizado();
        }
      });
  }

pedidos(){
  var views = [];
  if(this.state.listaPedidos.length > 0){
    for (i in this.state.listaPedidos) {
    let pedido = this.state.listaPedidos[i];
      if(pedido.status == "Solicitado"){
        this.state.pedidosSolicitados[i] = pedido;
      }
      if(pedido.status == "Confirmado"){
        this.state.pedidosConfirmados[i] = pedido;
      }
      if(pedido.status == "Finalizado"){
        this.state.pedidosFinalizados[i] = pedido;
      }
    }
  } else {
    views.push(
      <View key={0} style={{alignItems: 'center'}}>
      <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center'}}>
        Você não tem pedidos! :(
      </Text>
      </View>
    )
    return views;
  }
}

pedidoSolicitado(){
  var views = [];
  if(this.state.pedidosSolicitados.length > 0){
    for (i in this.state.pedidosSolicitados){
      let pedidoS = this.state.pedidosSolicitados[i];
      var data = new Date(pedidoS.dataSolicitada);
      var dataSolicitado = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
      pedidoS.dataSolicitada = dataSolicitado;
      views.push(
        <View key={i} style={styles.oneResult1}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
          <View style = {{ width: '25%'}}>
          <Image source={{uri: pedidoS.cliente.usuario.imagemPerfil}}
                 style={styles.imagemPrincipal}/>
          </View>
        <View style={{width: '60%', alignSelf:'center'}}>
          <Text style={styles.totalFont}> {pedidoS.cliente.usuario.nome}</Text>
          <Text style={styles.oneResultfont}>Fez um pedido!</Text>
          <Text style={{fontSize: 18}}> {pedidoS.dataSolicitada}</Text>
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
                 style={styles.imagemCliente}/>
          </View>
        <View style={{width: '80%'}}>
        <Text style={styles.totalFont}> {pedidoS.produto.nome}{'\n'}</Text>
        <Text style={styles.oneResultfont}>Quantidade:
        <Text style={styles.totalFont}> {pedidoS.quantidade}{'\n'}</Text>
        </Text>
        <Text style={styles.oneResultfont}>Total a pagar {pedidoS.pagamento.descricao}:</Text>
        <Text style={styles.totalFont}> R$ {pedidoS.valorCompra}{'\n'}</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button buttonStyle={{width: 80}}
                  title ="Cancelar"
                  color="#fff"
                  backgroundColor="#88557B"
                  borderRadius={10}
                  onPress={() => {
                    pedidoS.status = "Recusado";
                    this.atualizaStatus(pedidoS);
                  }}/>

          <Button buttonStyle={{width: 80}}
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
      <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center'}}>
        Você não tem pedidos Solicitados!
      </Text>
      </View>
    )
  }
  return views;
}

pedidoConfirmado(){
  var views = [];
  if(this.state.pedidosConfirmados.length > 0){
    for (i in this.state.pedidosConfirmados){
      let pedidoC = this.state.pedidosConfirmados[i];
      views.push(
        <View key={i} style={styles.oneResult1}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
          <View style = {{ width: '20%'}}>
          <Image source={{uri: pedidoC.cliente.usuario.imagemPerfil}}
                 style={styles.imagemPrincipal}/>
          </View>
        <View style={{width: '65%', alignSelf:'center'}}>
          <Text style={styles.totalFont}> {pedidoC.cliente.usuario.nome}</Text>
           <Text style={styles.oneResultfont}> Entregar:
           <Text style={styles.totalFont}> {pedidoC.quantidade}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Produto:
           <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Receber {pedidoC.pagamento.descricao}:
           <Text style={styles.totalFont}> R$  {pedidoC.valorCompra}</Text>
           </Text>
        </View>
        <View style={{width: '5%',justifyContent: 'center'}}>
        <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
        </View>
    </View>
        } content={
          <View style={{margin: 15, alignItems:'center'}}>
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            cameraStyle={{width: '90%', alignSelf:'center'}}
            onRead = {(tokenLido) => {
                if(tokenLido === pedidoC.token){
                  pedidoC.status = "Finalizado";
                  this.atualizaStatus(pedidoC);
                } else {
                  <Text style={{fontSize: 18, justifyContent: 'center'}}>
                    Token Inválido!</Text>
                }
              }}
          topContent={(
              <Text style={{fontSize: 18, justifyContent: 'center'}}>
                Leia o token para finalizar o pedido</Text>)}
                />
        </View>
        }
        underlayColor="white"
        easing="easeOutCubic"/>
    </View>
    )}
 } else {
   views.push(
     <View key={0} style={{alignItems: 'center'}}>
     <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center'}}>
       Você não tem pedidos Confirmados!
     </Text>
     </View>
   )
 }
 return views;
}

pedidoFinalizado(){
  var views = [];
  if(this.state.pedidosFinalizados.length > 0){
    for (i in this.state.pedidosFinalizados){
      let pedidoF = this.state.pedidosFinalizados[i];
      var dataNormal = new Date(pedidoF.dataFinalizacao);
      var dataFinalizacao = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
      pedidoF.dataFinalizacao = dataFinalizacao;
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
           <Text style={{fontSize: 18}}> {pedidoF.dataFinalizacao}</Text>
          </View>
          <View style={{width: '5%',justifyContent: 'center'}}>
          <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
          </View>
      </View>
          } content={
            <View style={{paddingTop: 15}}>
            <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
            <View style = {{ width: '20%'}}>
              <Image source={{uri: pedidoF.cliente.usuario.imagemPerfil}}
                     style={styles.imagemCliente}/>
            </View>
          <View style={{width: '80%'}}>
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
          <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center'}}>
            Você não tem pedidos Finalizados!
          </Text>
          </View>
        )
      }
      return views;
  }

  render() {
    return(
      <View style={styles.container}>
      {this.pedidos()}
      <ScrollView>
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color:'#A1453E', fontWeight: 'bold'}}>
          Pedidos Solicitados
        </Text>
        </View>
        {this.pedidoSolicitado()}
        <View style = {{margin: 5}}>
          <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#6E6362', fontWeight: 'bold'}}>
            Pedidos Confirmados
          </Text>
        </View>
        {this.pedidoConfirmado()}
        <View style = {{margin: 5}}>
        <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#67A13F', fontWeight: 'bold'}}>
          Pedidos Finalizados
        </Text>
        </View>
        {this.pedidoFinalizado()}
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
    fontSize: 18,
    textAlign: 'left',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 18,
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

PedidosVendedor.defaultProps = { ...PedidosVendedor };

export default PedidosVendedor;
