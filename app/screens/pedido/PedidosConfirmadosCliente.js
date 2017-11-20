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
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

class PedidosConfirmadosCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      pedidosConfirmados: [],
      refreshing: false,
      carregou: true
    };
    this.buscaDadosPedidosCliente();
  };

  buscaDadosPedidosCliente() {
    fetch(constante.ENDPOINT+'pedido/cliente/' + this.state.clienteId + '/status/' + 'Confirmado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosConfirmados: responseJson});
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
          this.buscaDadosPedidosCliente();
          this.setState({pedidosConfirmados: []});
          this.pedidoConfirmado();
          ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {
          Alert.alert("Houve um erro ao atualizar os pedidos, tente novamente");
        }
      });
  }



  arredondaValores(num){
    return num.toFixed(2)
  };

  onPressOpenVendedor = (usuarioSelecionado, vendedorIdSelecionado) => {
    this.props.navigation.navigate('ExibeVendedor',
          {selectUserId: usuarioSelecionado,
            vendedorId: vendedorIdSelecionado,
            clienteId: this.state.clienteId
          });
  };


pedidoConfirmado(){
  var views = [];
  if(this.state.pedidosConfirmados.length > 0){
    for (i in this.state.pedidosConfirmados) {
      let imagemPrincipalV = require('./img/camera11.jpg');
      let pedidoC = this.state.pedidosConfirmados[i];

      if (pedidoC.produto.vendedor.usuario.imagemPerfil) {
        imagemPrincipalV = {uri: pedidoC.produto.vendedor.usuario.imagemPerfil};
      }

      var dataNormal = new Date(pedidoC.dataConfirmacao);
      let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
      let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
      let ano = dataNormal.getFullYear();
      let hora = dataNormal.getHours();
      let min = dataNormal.getMinutes() < 10 ? "0" + dataNormal.getMinutes() : dataNormal.getMinutes();
      let dataConfirmado = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;

      views.push(
        <View key={i} style={styles.oneResult1}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
          <View style = {{ width: '20%'}}>
          <TouchableHighlight
                onPress={() => this.onPressOpenVendedor(pedidoC.produto.vendedor.usuario.id, pedidoC.produto.vendedor.id)} >
            <Image source={imagemPrincipalV}
                  style={styles.imagemPrincipal}/>
          </TouchableHighlight>
          </View>
        <View style={{width: '65%', alignSelf:'center'}}>
           <Text style={styles.totalFont}> {pedidoC.produto.vendedor.usuario.nome}</Text>
           <Text style={{fontSize: 14}}> Confirmado em {dataConfirmado}</Text>
           <Text style={styles.oneResultfont}> Receber:
           <Text style={styles.totalFont}> {pedidoC.quantidade}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Produto:
           <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
           </Text>
           <Text style={styles.oneResultfont}> Pagar {pedidoC.pagamento.descricao}:
           <Text style={styles.totalFont}> R$  {this.arredondaValores(pedidoC.valorCompra)}</Text>
           </Text>
        </View>
        <View style={{width: '5%',justifyContent: 'center'}}>
        <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
        </View>
    </View>
        } content={
          <View style={{margin: 15, alignItems:'center'}}>
          <View style = {{ alignItems: 'center'}}>
          <QRCode
            value={pedidoC.token}
            size={200}
            bgColor='black'
            fgColor='white'/>
            </View>
          <Text style={styles.tokenfont}> {pedidoC.token}</Text>

          <View style={{width:'98%'}}>
            <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding:10, margin: 10}}
                onPress={() =>
                          {
                            this.props.navigation.navigate('Chat', {
                              userId: this.state.userId,
                              otherUserId: pedidoC.produto.vendedor.usuario.id,
                              otherUserName: pedidoC.produto.vendedor.usuario.nome,
                              pedidoId: pedidoC.id});
                          }}>
              <Icon name="comments-o" size={25} 
                    color={'#4A4A4A'} 
                    type='font-awesome'
                    style={{margin: 10}}/><Text style={{color: '#4A4A4A'}}>Entrar em contato</Text>
            </TouchableOpacity>
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
       Nenhum pedido confirmado.
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
          <Text style={{marginTop: 8, fontSize: 16, justifyContent: 'center', color: '#6E6362', fontWeight: 'bold'}}>
            Pedidos Confirmados
          </Text>
        </View>
        <Spinner visible={this.state.carregou}/>
        {this.pedidoConfirmado()}
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
  imagemPrincipal:{
    width: '98%',
    height: 80,
    borderRadius: 10
  }
});

PedidosConfirmadosCliente.defaultProps = { ...PedidosConfirmadosCliente };

export default PedidosConfirmadosCliente;
