import React, {
    Component
  } from 'react';
  import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ToastAndroid,
    Alert
} from 'react-native';
import Popup from 'react-native-popup';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as constante from '../../constantes';
import NavigationBar from 'react-native-navbar';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

const { width, height } = Dimensions.get("window");

export default class ExibeComprar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            produtoId: this.props.navigation.state.params.produtoId,
            clienteId: this.props.navigation.state.params.clienteId,
            userId: this.props.navigation.state.params.userId,
            imagemPrincipal: require('./img/camera11.jpg'),
            imagemVendedor: require('./img/camera11.jpg'),
            quantidadeSelecionada: 1,
            quantidadeDis: '',
            produto: {
              nome: '',
              preco: '',
              quantidade: '',
              vendedor:{
                usuario:{
                  nome: ''
                }
              }
            },
            pagamentosArray: [],
            meiosPagamentos: [],
            meioPagamentoEscolhido: '',
            precoTotalText: ''
        }
        this.buscaProduto();
    }

    mostrarCheckboxesPagamento() {
      var views = [];
      for(i in this.state.pagamentosArray) {
        let pagamento = this.state.pagamentosArray[i];
        views.push (
            <RadioButton key = {i}
                         value = {pagamento}
                         color = 'cadetblue'>
              <Text style={styles.meiopagText}>
                {pagamento.descricao}
              </Text>
            </RadioButton>
        );
      }
      return views;
    }

    buscaProduto() {
      if (this.state.produtoId > 0) {
        fetch(constante.ENDPOINT+'produto/' + this.state.produtoId)
        .then((response) => response.json())
        .then((rJson) => {
          if (!rJson.errorMessage) {
            this.setState({produto: rJson});
            if (rJson.imagemPrincipal) {
              this.setState({imagemPrincipal: { uri: rJson.imagemPrincipal }});
            }
            if (rJson.vendedor.usuario.imagemPerfil) {
              this.setState({imagemVendedor: { uri: rJson.vendedor.usuario.imagemPerfil }});
            }
            if (rJson.quantidade > 1) {
              var qnt = "";
                qnt = rJson.quantidade + " disponíveis";
              this.setState({quantidadeDis: qnt});
            } else {
                qnt = rJson.quantidade + " disponível";
              this.setState({quantidadeDis: qnt});
            }
            this.setState({precoTotalText: rJson.preco});
            var pagamentosBuscados = [];
            for (i in rJson.vendedor.meiosPagamentos) {
              pagamentosBuscados.push(rJson.vendedor.meiosPagamentos[i]);
            }
            this.setState({pagamentosArray: pagamentosBuscados});
          }
        });
      }
    }

    handleFinalizarPress = () => {
        const {
          state: {
            clienteId,
            quantidadeSelecionada,
            meioPagamentoEscolhido,
            precoTotalText,
            produtoId
          }
        } = this;

        pedido = {
          "produto": produtoId,
          "cliente": clienteId,
          "quantidade": quantidadeSelecionada,
          "status": 'Solicitado',
          "valorCompra": precoTotalText,
          "pagamento": meioPagamentoEscolhido
        }

         fetch(constante.ENDPOINT + 'pedido', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido)
          })
              .then((response) => response.json())
              .then((responseJson) => {
                if (!responseJson.errorMessage) {
                  ToastAndroid.showWithGravity('Pedido finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
                  this.props.navigation.navigate('ExibeComprovante', 
                  {pedidoId: responseJson.id,          
                  userId: this.state.userId,
                  clienteId: this.state.clienteId});
                } else {
                  Alert.alert("Houve um erro ao finalizar o pedido, tente novamente");
                }
              })
              .catch((error) => {
                console.error(error);
              });
    };

    _confirmTest() {
        this.popup.confirm({
            title: 'Confirmar Compra',
            content: ['Deseja efetuar a compra deste produto?'],
            ok: {
                text: 'Confirmar',
                style: {
                    color: 'green',
                    fontWeight: 'bold'
                },
                callback: () => {
                  {this.handleFinalizarPress()}
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
      const {goBack} = this.props.navigation;
        return(
            <View style={styles.container}>

            <NavigationBar
              leftButton={
                <TouchableOpacity onPress={() => goBack()}>
                  <MaterialsIcon name="chevron-left" size={40} color={'#8B636C'}  style={{ padding: 3 }} />
                </TouchableOpacity>
              }/>

              <HeaderImageScrollView
                maxHeight={200}
                minHeight ={100}

                renderHeader={() => (
                  <Image style={styles.profilepic}
                         source={this.state.imagemPrincipal}/>
              )}>
              <TriggeringView onHide={() => console.log('text hidden')}>
              <View style={{margin: 10}}>
              <View style={{ flexDirection: 'row', paddingTop: 10}}>
              <View style={{width: '25%'}}>
                <Image source={this.state.imagemVendedor}
                       style={styles.imageResultSearch}/>
              </View>
              <View style={{width: '75%'}}>
                <Text style={styles.compraText}>
                  Finalizando a compra com
                  <Text style={{color: 'cadetblue', fontWeight: 'bold'}}>
                     {' ' + this.state.produto.vendedor.usuario.nome}
                   </Text>
                </Text>
                <Text style={styles.produtoText}>
                  {this.state.produto.nome}
                </Text>
                <Text style={styles.quantidadeText}>
                  {this.state.quantidadeDis}
                </Text>
              </View>
              </View>

          <View style={{ flexDirection: 'row', paddingTop: 10}}>
              <View style={{width: '60%'}}>
              <Text style={styles.baseText}>
                Quantidade
              </Text>
              </View>
              <View style={{width: '40%'}}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => {
                  if (this.state.quantidadeSelecionada > 1) {
                          var novaQtd = this.state.quantidadeSelecionada - 1;
                          this.setState({quantidadeSelecionada: novaQtd.toString()});
                          var precoCalculado = this.state.produto.preco * novaQtd;
                          this.setState({precoTotalText: precoCalculado});
                  }
                }}>
                <FontAwesomeIcon name="minus" size={30} color={'cadetblue'}/>
              </TouchableOpacity>
              <Text style={styles.baseText}>
                {this.state.quantidadeSelecionada}
              </Text>

                <TouchableOpacity onPress={() => {
                         if (this.state.quantidadeSelecionada < this.state.produto.quantidade) {
                          var novaQtd = parseInt(this.state.quantidadeSelecionada) + 1;
                          this.setState({quantidadeSelecionada: novaQtd.toString()});
                          var precoCalculado = this.state.produto.preco * novaQtd;
                          this.setState({precoTotalText: precoCalculado});
                        }
                      }}>
                <FontAwesomeIcon name="plus" size={30} color={'cadetblue'}/>
              </TouchableOpacity>
              </View>
            </View>
            </View>


            <View style={{paddingTop:10}}>
                <Text style={styles.baseText}>
                  Meio de Pagamento
                </Text>

            <View style={{width: '70%'}}>
              <RadioGroup size={18}
                        thickness={2}
                        color='gray'
                        onSelect = {(index, value) => this.setState({meioPagamentoEscolhido: value})}>
              {this.mostrarCheckboxesPagamento()}
              </RadioGroup>
            </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop:10}}>
            <View style={{width: '75%'}}>
              <Text style={styles.baseText}>
                Total
              </Text>
              </View>
            <View style={{width: '25%', alignSelf:'flex-end'}}>
              <Text style={styles.precoText}>
                R$ {this.state.precoTotalText}
              </Text>
            </View>
            </View>
            </View>
            </TriggeringView>
            </HeaderImageScrollView>
            <TouchableOpacity style={styles.EvenBtn} onPress={this._confirmTest.bind(this)}>
              <Text style={styles.EvenBtnText}>Finalizar compra</Text>
            </TouchableOpacity>
            <Popup ref={popup => this.popup = popup }/>
          </View>
        );
    }
  }

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  profilepic:{
    width,
    height: '100%'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'grey',
    fontSize: 20,
},
quantidadeText: {
  fontFamily: 'Roboto',
  color: 'grey',
  fontSize: 15,
},
precoText: {
  fontFamily: 'Roboto',
  color: 'cadetblue',
  fontSize: 25,
},
produtoText: {
  fontFamily: 'Roboto',
  color: 'grey',
  fontSize: 25,
},
compraText: {
  fontFamily: 'Roboto',
  color: 'grey',
  fontSize: 16,
},
meiopagText: {
  fontFamily: 'Roboto',
  color: 'gray',
  fontSize: 16,
},
EvenBtn: {
  borderRadius: 5,
  padding: 5,
  marginTop: 10,
  position: 'relative',
  backgroundColor: 'lightcoral'
},
EvenBtnText: {
  fontSize: 25,
  color: 'white',
  textAlign: 'center'
},
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  item: {
      flexDirection: 'row',
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
