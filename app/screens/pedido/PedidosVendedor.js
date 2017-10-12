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
import {Button} from 'react-native-elements';
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
      listaPedidos:[]
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

  cancelarPedido() {
      this.popup.confirm({
          title: 'Recusar Pedido',
          content: ['Deseja realmente cancelar esse pedido?'],
          ok: {
              text: 'Confirmar',
              style: {
                  color: 'green',
                  fontWeight: 'bold'
              },
          },
          cancel: {
              text: 'Cancelar',
              style: {
                  color: 'red'
              }
          }
      });
  }

pedidos(){
  var views = [];
  if(this.state.listaPedidos.length > 0){
    for (i in this.state.listaPedidos) {
    let pedido = this.state.listaPedidos[i];
      if(pedido.status == "Solicitado"){
        views.push(
          <View key={i} style={styles.oneResult1}>
          <Accordion header={
            <View>
            <Text style={{marginTop: 5, fontSize: 18, justifyContent: 'center', color:'#A1453E'}}>
              Pedido Solicitado
            </Text>
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '25%'}}>
            <Image source={{uri: pedido.cliente.usuario.imagemPerfil}}
                   style={styles.imagemPrincipal}/>
            </View>
          <View style={{width: '65%', alignSelf:'center'}}>
            <Text style={styles.totalFont}> {pedido.cliente.usuario.nome}</Text>
            <Text style={styles.oneResultfont}>Fez um pedido!</Text>
          </View>
      </View>
      </View>
          } content={
            <View style={{paddingTop: 15}}>
            <View style={{flexDirection: 'row'}}>
            <View style = {{ width: '20%'}}>
            <Image source={{uri: pedido.produto.imagemPrincipal}}
                   style={styles.imagemCliente}/>
            </View>
          <View style={{width: '80%'}}>
          <Text style={styles.totalFont}> {pedido.produto.nome}{'\n'}</Text>
          <Text style={styles.oneResultfont}>Quantidade:
          <Text style={styles.totalFont}> {pedido.quantidade}{'\n'}</Text>
          </Text>
          <Text style={styles.oneResultfont}>Total a pagar em {pedido.pagamento.descricao}:</Text>
          <Text style={styles.totalFont}> R$ {pedido.valorCompra}{'\n'}</Text>
          </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5, paddingTop:10}}>
            <Button title ="Recusar"
                    color="#fff"
                    backgroundColor="#88557B"
                    borderRadius={10}
                    onPress={this.cancelarPedido.bind(this)}/>

            <Button title="Aceitar"
                    color="#fff"
                    backgroundColor="#768888"
                    borderRadius={10}/>
        </View>
          </View>
          }/>
</View>
)}
if(pedido.status == "Confirmado"){
  views.push(
    <View key={i} style={styles.oneResult1}>
    <Accordion header={
      <View>
      <Text style={{marginTop: 5, fontSize: 18, justifyContent: 'center', color: '#6E6362'}}>
        Pedido Confirmado
      </Text>
      <View style={{flexDirection: 'row'}}>
      <View style = {{ width: '25%'}}>
      <Image source={{uri: pedido.cliente.usuario.imagemPerfil}}
             style={styles.imagemPrincipal}/>
      </View>
    <View style={{width: '65%', alignSelf:'center'}}>
      <Text style={styles.totalFont}> {pedido.cliente.usuario.nome}</Text>
       <Text style={styles.totalFont}> {pedido.produto.nome}</Text>
    </View>
</View>
</View>
    } content={
      <View style={{paddingTop: 15}}>
      <QRCodeScanner
      onRead = {() => {(console.log('QR code scanned!'))}}/>
    </View>
    }/>
</View>

        )}
        if(pedido.status == "Finalizado"){
          var dataNormal = new Date(pedido.dataFinalizacao);
          var dataFinalizacao = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
          pedido.dataFinalizacao = dataFinalizacao;
          views.push(
            <View key={i} style={styles.oneResult1}>
              <Accordion header={
                <View>
                <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#67A13F'}}>
                  Pedido Finalizado
                </Text>
                <View style={{flexDirection: 'row'}}>
                <View style = {{ width: '25%'}}>
                 <Image source={{uri: pedido.produto.imagemPrincipal}}
                         style={styles.imagemPrincipal}/>
                </View>
              <View style={{width: '65%', alignSelf:'center'}}>
               <Text style={styles.totalFont}> {pedido.produto.nome}</Text>
               <Text style={{fontSize: 18}}> {pedido.dataFinalizacao}</Text>
              </View>
          </View>
          </View>
              } content={
                <View style={{paddingTop: 15}}>
                <View style={{flexDirection: 'row'}}>
                <View style = {{ width: '20%'}}>
                  <Image source={{uri: pedido.cliente.usuario.imagemPerfil}}
                         style={styles.imagemCliente}/>
                </View>
              <View style={{width: '80%'}}>
                <Text style={styles.totalFont}> {pedido.cliente.usuario.nome}</Text>
                <Text style={styles.oneResultfont}>Quantidade vendida:
                <Text style={styles.totalFont}> {pedido.quantidade}{'\n'}</Text>
                </Text>
                <Text style={styles.oneResultfont}>Total pago em {pedido.pagamento.descricao}:
                <Text style={styles.totalFont}> R$ {pedido.valorCompra}{'\n'}</Text>
                </Text>
              </View>
              </View>
              </View>
              }/>
            </View>
          )}
        }
      }
        return views;
    }



  render() {
    return(
      <View style={styles.container}>
      <ScrollView>
        {this.pedidos()}
      </ScrollView>
      <Popup ref={popup => this.popup = popup }/>
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '98%'
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
