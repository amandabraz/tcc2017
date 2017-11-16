import React, { Component } from 'react';
import {
  AppRegistry,
  Easing,
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
import NavigationBar from 'react-native-navbar';
import QRCode from 'react-native-qrcode';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';
import Camera from 'react-native-camera';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal'

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
      starCount: 0,
      isModalVisible: false,  
      pedidoParaAvaliar: 0,    
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

  avaliarPedido(pedido) {
    fetch(constante.ENDPOINT + 'pedido/' + this.state.pedidoParaAvaliar + '/produto/avaliacao/' + parseInt(this.state.starCount), {method: 'PUT'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          ToastAndroid.showWithGravity('Avaliação realizada, obrigada!', ToastAndroid.LONG, ToastAndroid.CENTER);
          this.setState({pedidoParaAvaliar: 0});
          this._hideModal();
          this.buscaDadosPedidosCliente();
        } else {
          Alert.alert("Houve um erro ao realizar a avaliação, tente novamente");
        }
    });
  }

  _showModal = () => this.setState({ isModalVisible: true })
  
  _hideModal = () => this.setState({ isModalVisible: false })

  mostrarAvaliacao(pedido) {
    if (pedido.nota) {
      return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}> Sua avaliação do produto: </Text>
          <View style={{width: '60%'}}>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={25}
              starColor={'#e6b800'}
              rating={parseInt(pedido.nota)}
              />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Button
            title ="Avaliar produto"
            color="#fff"
            backgroundColor="#88557B"
            borderRadius={10}
            onPress={() => {
              this.setState({pedidoParaAvaliar: pedido.id});
              this._showModal();
            }} />
        </View>
      );
    }
  }

arredondaValores(num){
  return num.toFixed(2)
};

pedidoFinalizado(){
  var views = [];
  if(this.state.pedidosFinalizados.length > 0){
    for (i in this.state.pedidosFinalizados){
      let imagemPrincipalP = require('./img/camera11.jpg');
      let imagemPrincipalV = require('./img/camera11.jpg');                     
      let pedidoF = this.state.pedidosFinalizados[i];
      if (pedidoF.produto.imagemPrincipal) {
        imagemPrincipalP = { uri: pedidoF.produto.imagemPrincipal };
      }
      if (pedidoF.produto.vendedor.usuario.imagemPerfil) {
        imagemPrincipalV = {uri: pedidoF.produto.vendedor.usuario.imagemPerfil};
      }
      let dataNormal = new Date(pedidoF.dataFinalizacao);
      let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
      let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
      let ano = dataNormal.getFullYear();
      let hora = dataNormal.getHours();
      let min = dataNormal.getMinutes() < 10 ? "0" + dataNormal.getMinutes() : dataNormal.getMinutes();
      let dataFinalizacao = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;
      
      views.push(
        <View key={i} style={styles.oneResult1}>
          <Accordion 
          onPress={(pedidoF) => this.setState({pedidoExpandido: pedidoF})}
          header={
            <View style={{flexDirection: 'row'}}>
              <View style = {{ width: '25%'}}>
                <Image source={imagemPrincipalP}
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
          } 
          content={
            <View style={{paddingTop: 15}}>
              <View style={{flexDirection: 'row', backgroundColor: 'rgba(0, 124, 138, 0.13)', borderRadius: 10, padding: 10, margin: 10}}>
              <View style = {{ width: '20%'}}>
                <Image source={imagemPrincipalV}
                      style={styles.imagemVendedor}/>
              </View>
              <View style={{width: '80%', paddingLeft: 6}}>
                <Text style={styles.totalFont}> {pedidoF.produto.vendedor.usuario.nome}</Text>
                <Text style={styles.oneResultfont}>Quantidade comprada:
                <Text style={styles.totalFont}> {pedidoF.quantidade}{'\n'}</Text>
                </Text>
                <Text style={styles.oneResultfont}>Total pago com {pedidoF.pagamento.descricao}:
                <Text style={styles.totalFont}> R$ {this.arredondaValores(pedidoF.valorCompra)}{'\n'}</Text>
                </Text>
              </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {this.mostrarAvaliacao(pedidoF)}
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
      for (i in this.state.pedidosRecusados) {
        let imagemPrincipalP = require('./img/camera11.jpg');
        let imagemPrincipalV = require('./img/camera11.jpg');                     
        let pedidoR = this.state.pedidosRecusados[i];
        if (pedidoR.produto.imagemPrincipal) {
          imagemPrincipalP = { uri: pedidoR.produto.imagemPrincipal };
        }
        if (pedidoR.produto.vendedor.usuario.imagemPerfil) {
          imagemPrincipalV = {uri: pedidoR.produto.vendedor.usuario.imagemPerfil};
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
                <Image source={imagemPrincipalV}
                       style={styles.imagemVendedor}/>
              </View>
            <View style={{width: '80%', paddingLeft: 6}}>
              <Text style={styles.totalFont}> {pedidoR.produto.vendedor.usuario.nome}</Text>
              <Text style={styles.oneResultfont}>Quantidade solicitada:
              <Text style={styles.totalFont}> {pedidoR.quantidade}{'\n'}</Text>
              </Text>
              <Text style={styles.oneResultfont}>Valor do pedido:
              <Text style={styles.totalFont}> R$ {this.arredondaValores(pedidoR.valorCompra)}{'\n'}</Text>
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
          let imagemPrincipalP = require('./img/camera11.jpg');
          let imagemPrincipalV = require('./img/camera11.jpg');                     
          if (pedidoC.produto.imagemPrincipal) {
            imagemPrincipalP = { uri: pedidoC.produto.imagemPrincipal };
          }
          if (pedidoC.produto.vendedor.usuario.imagemPerfil) {
            imagemPrincipalV = {uri: pedidoC.produto.vendedor.usuario.imagemPerfil};
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
                  <Image source={imagemPrincipalV}
                         style={styles.imagemVendedor}/>
                </View>
              <View style={{width: '80%', paddingLeft: 6}}>
                <Text style={styles.totalFont}> {pedidoC.produto.vendedor.usuario.nome}</Text>
                <Text style={styles.oneResultfont}>Quantidade solicitada:
                <Text style={styles.totalFont}> {pedidoC.quantidade}{'\n'}</Text>
                </Text>
                <Text style={styles.oneResultfont}>Valor do pedido:
                <Text style={styles.totalFont}> R$ {this.arredondaValores(pedidoC.valorCompra)}{'\n'}</Text>
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


        <Modal
        isVisible={this.state.isModalVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.3}>
        <View style={styles.modalContent}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}> Avalie este produto: </Text>              
          <View style={{width: '60%', margin: 10}}>
            <StarRating
              maxStars={5}
              starSize={25}
              starColor={'#e6b800'}
              rating={this.state.starCount}
              selectedStar={(rating) => this.setState({starCount: rating})}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this._hideModal()}>
              <View style={styles.button}>
                <Text>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.avaliarPedido()}>
                <View style={styles.button}>
                  <Text>Salvar</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


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
  },
  modalContent: {    
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }, 
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});

PedidosFinalizadosCliente.defaultProps = { ...PedidosFinalizadosCliente };

export default PedidosFinalizadosCliente;
