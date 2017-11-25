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
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

class PedidosConfirmadosVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      pedidosConfirmados: [],
      refreshing: false,
      carregou: true,
      dicaSegurancaVisible:true
    };
    this.buscaDadosPedidosVendedor();
  };

  buscaDadosPedidosVendedor() {
    fetch(constante.ENDPOINT+'pedido/vendedor/' + this.state.vendedorId + '/status/' + 'Confirmado')
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
              this.setState({pedidosConfirmados: responseJson});
        }
        this.setState({refreshing: false});
        this.setState({carregou: false});
      });
  };

  arredondaValores(num){
    return num.toFixed(2)
  };

  openCliente(cliente) {
    this.props.navigation.navigate('ExibeCliente', {clienteId: cliente, userId: this.state.userId});
  }

  pedidoConfirmado(){
    var views = [];
    if(this.state.pedidosConfirmados.length > 0){
      for (i in this.state.pedidosConfirmados) {
        let imagemPrincipalC = require('./img/camera11.jpg');
        let pedidoC = this.state.pedidosConfirmados[i];

        if (pedidoC.cliente.usuario.imagemPerfil) {
          imagemPrincipalC = {uri: pedidoC.cliente.usuario.imagemPerfil};
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
              <TouchableHighlight onPress={() => this.openCliente(pedidoC.cliente.id)}>            
                <Image source={imagemPrincipalC}
                    style={styles.imagemPrincipal}/>
              </TouchableHighlight>
              </View>
              <View style={{width: '65%', alignSelf:'center'}}>
                <TouchableHighlight onPress={() => this.openCliente(pedidoC.cliente.id)}>                        
                  <Text style={styles.totalFont}> {pedidoC.cliente.usuario.nome}</Text>
                </TouchableHighlight>
                <Text style={{fontSize: 14}}> Confirmado em {dataConfirmado}</Text>
                <Text style={styles.oneResultfont}> Entregar:
                <Text style={styles.totalFont}> {pedidoC.quantidade}</Text>
                </Text>
                <Text style={styles.oneResultfont}> Produto:
                <Text style={styles.totalFont}> {pedidoC.produto.nome}</Text>
                </Text>
                <Text style={styles.oneResultfont}> Receber {pedidoC.pagamento.descricao}:
                <Text style={styles.totalFont}> R$  {this.arredondaValores(pedidoC.valorCompra)}</Text>
                </Text>
              </View>
              <View style={{width: '5%',justifyContent: 'center'}}>
                <Icon name="chevron-down" size={16} color={'lightgray'} type='font-awesome'/>
              </View>
            </View>
            } content={
              <View style={{margin: 15, alignItems:'center'}}>
                <Button buttonStyle={{width: 150}}
                    title="Validar Token"
                    color="#fff"
                    backgroundColor="#885581"
                    borderRadius={10}
                    onPress={() =>
                      {
                        this.props.navigation.navigate('LerToken', {
                          userId: this.state.userId,
                          vendedorId: this.state.vendedorId,
                          token: pedidoC.token,
                          pedidoId: pedidoC.id});
                      }}/>
                <TouchableOpacity 
                      style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding:10, margin: 10}}
                      onPress={() =>
                                {
                                  this.props.navigation.navigate('Chat', {
                                    userId: this.state.userId,
                                    otherUserId: pedidoC.cliente.usuario.id,
                                    otherUserName: pedidoC.cliente.usuario.nome,                                  
                                    pedidoId: pedidoC.id});
                                }}>
                    <Icon name="comments-o" size={25} 
                          color={'#4A4A4A'} 
                          type='font-awesome'
                          style={{margin: 10}}/><Text style={{color: '#4A4A4A'}}>Entrar em contato</Text>
                </TouchableOpacity>
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
          Nenhum pedido confirmado
        </Text>
        </View>
      )
    }
    return views;
  }

  hideDica(){
    this.setState({ dicaSegurancaVisible: false })
  };

  dicaSeguranca(){
    return (
      this.state.dicaSegurancaVisible &&
        <View style={styles.dica}>
          <View style={{width:'90%'}}>
            <Text style={styles.totalFont}> Dicas de segurança!</Text>
            <Text style={{fontSize: 14}}>Se encontre com o vendedor em local público e movimentado</Text>
            <Text style={{fontSize: 14}}>Desconfie de produtos extremamente baratos</Text>
            <Text style={{fontSize: 14}}>Leia os comentários e avaliações para saber sobre sua compra e seu vendedor</Text>
          </View>
          <View 
            onPress={() => this.hideDica()}
            style={{
              alignItems:'center',
              width:'10%'
            }}
          >
            <Icon
              name='clear'
              type=' material-community'
              color='#3f4f66'
              onPress={() => this.hideDica()}
              style={styles.imageResultSearch} />
          </View>
      </View>
    )  
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
          <Text style={{marginTop: 8, fontSize: 18, justifyContent: 'center', color: '#6E6362', fontWeight: 'bold'}}>
            Pedidos Confirmados
          </Text>
        </View>
        <Spinner visible={this.state.carregou}/>
        {this.dicaSeguranca()}
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
  dica:{
    flexDirection: 'row',
    backgroundColor: '#b6deea',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#69acce',
    padding: 10,
    margin: 10,
    width: '95%',
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

PedidosConfirmadosVendedor.defaultProps = { ...PedidosConfirmadosVendedor };

export default PedidosConfirmadosVendedor;
