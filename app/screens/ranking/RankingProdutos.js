import React, {
  Component
} from 'react';
import {
  Animated,
  AppRegistry,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as constante from '../../constantes';
import NavigationBar from 'react-native-navbar';
import Switch from 'react-native-customisable-switch';
import {
  Button
} from 'react-native-elements';
import Popup from 'react-native-popup';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-accordion';

const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 250;

class RankingProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      clienteId: this.props.navigation.state.params.clienteId,
      refreshing: false,
      produtosMaisVendidos: [],
      quantidadeProdutosVendidos: [],
      quantidadeVendida: '',
      filtroMensal: true,
      alturaPedido: '100%',
      alturaResumo: '100%',
      dataNascimentoText: '',
      imagemPerfil: require('./img/fundof.png'),
      tags: [],
      nomeText: '',
      tagsText: "Nenhuma tag inserida",
      tagEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      restricoesDieteticas: [],
      restricoesCliente: [],
      restricoesDieteticasText: "Nenhuma restrição escolhida",
      restricaoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      celularText: '',
      confText: '  Configuração',
      titleTextClass: styles.titleText,
      baseTextClass: styles.baseText,
      pencilColor: '#fff',
      editavel: false,
      cliente: {
        usuario: {
          nome: '',
          cpf: '',
          email: '',
        },
      }
    };
    this.buscaQuantidadeProdutosVendidos();
    this.buscaProdutosMaisVendidos();
  };

  escolherData(value) {
    value =!this.state.filtroMensal;
     this.setState({filtroMensal: value});
    this.buscaInformacoes();
  }

  buscaProdutosMaisVendidos(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({produtosMaisVendidos: responseJson});
        this.setState({refreshing:false});
      }});
  }

  buscaQuantidadeProdutosVendidos(){
    fetch(constante.ENDPOINT + 'pedido/ranking/produto/quantidade/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({quantidadeProdutosVendidos: responseJson});
        this.setState({refreshing:false});
      }});
  }

  produtosMaisVendidos() {
      var views = [];
      if (this.state.informacoes.length > 0) {
        for (i in this.state.informacoes) {
          let produtoVendido = this.state.informacoes[i];
          views.push(
            <View key={i}>
                <Text style={{fontSize: 13, justifyContent: 'space-between'}}>
                  {produtoVendido[1]} {produtoVendido[2]} {produtoVendido[0]}
                </Text>
           </View>
          )
        }
      } else {
        views.push(
          <View key={0} style={{alignItems: 'center'}}>
            <Text style={{marginTop: 12, fontSize: 18, justifyContent: 'center'}}>
              Você não tem produtos vendidos! :(
            </Text>
          </View>
        )
      }
      return views;
  }

  render() {
    return(
      <View style = {{ flex: 1 }}>
        <ScrollView>
          <StatusBar barStyle="light-content"/>
            <HeaderImageScrollView
              maxHeight = {MAX_HEIGHT}
              minHeight = {1}
              maxOverlayOpacity = {0.6}
              minOverlayOpacity = {0.3}
              fadeOutForeground
              renderHeader = { () =>
                <Image source={this.state.imagemPerfil} style={styles.image}>
                  <View style = {{alignItems: 'center'}}>
                    <Text style={{marginTop: 8, fontSize: 27, justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>
                      {'\n'}{'\n'} Ranking Produtos Vendidos {'\n'} {'\n'}
                    </Text>
                  </View>
                  <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View key={i} style={styles.oneResult1}>
                      <Accordion header={
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Produtos</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeProdutosVendidos}</Text>
                          </View>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Produtos</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeProdutosVendidos}</Text>
                          </View>
                          <View style={{alignSelf:'center', flexDirection: 'column'}}>
                            <Text style={styles.oneResultfont}>Produtos</Text>
                            <Text style={styles.totalFont}>{this.state.quantidadeProdutosVendidos}</Text>
                          </View>
                        </View>
                      } content={
                        <View style={{margin: 15, alignItems:'center'}}>
                        </View>
                      }
                      underlayColor="white"
                      easing="easeOutCubic"/>
                    </View>
                  </View>
                </Image>
              }
          renderForeground={() =>
            <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView => {
              this.navTitleView = navTitleView;
            }}>
          </Animatable.View>
          }>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)
            }>
            <View style={styles.bar}>
                <TouchableOpacity onPress={() => this.habilitaEdicao()}>
                  <FontAwesomeIcon name="pencil" size={20} color={this.state.pencilColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.abrirTermos()}>
                  <FontAwesomeIcon name="file-text" size={20} color={this.state.pencilColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sobreColaboradores()}>
                  <FontAwesomeIcon name="question" size={20} color={this.state.pencilColor} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.desejaSair()}>
                  <Icon name="exit-to-app" size={20} color={this.state.pencilColor}/>
                </TouchableOpacity>
            </View>
          </TriggeringView>
              <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Nome'}
                iconClass={FontAwesomeIcon}
                iconSize={20}
                iconName={'user'}
                iconColor={'#4A4A4A'}
                value={this.state.nomeText}
                onChangeText={(nome) => this.setState({nomeText: nome})}
                editable={this.state.editavel}
                inputStyle={this.state.titleTextClass}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'CPF'}
                  iconClass={FontAwesomeIcon}
                  iconName={'info'}
                  iconColor={'#4A4A4A'}
                  value={this.state.cliente.usuario.cpf}
                  editable={false}
                  inputStyle={styles.baseText}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Celular'}
                  iconClass={FontAwesomeIcon}
                  iconName={'mobile'}
                  iconColor={'#4A4A4A'}
                  value={this.state.celularText}
                  onChange={(celular) => this.setState({celularText: celular})}
                  editable={this.state.editavel}
                  inputStyle={this.state.baseTextClass}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Data de Nascimento'}
                  iconClass={FontAwesomeIcon}
                  iconName={'calendar'}
                  iconColor={'#4A4A4A'}
                  value={this.state.dataNascimentoText}
                  editable={false}
                  inputStyle={styles.baseText}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Email'}
                  iconClass={FontAwesomeIcon}
                  iconName={'at'}
                  iconColor={'#4A4A4A'}
                  value={this.state.cliente.usuario.email}
                  editable={false}
                  inputStyle={styles.baseText}/>

        </HeaderImageScrollView>
        </ScrollView>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
headerBackground: {
  flex: 1,
  width: null,
  alignSelf: 'stretch',
},
header:{
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: 'rgba(0,0,0,0.2)',
},
profilepicWrap:{
  width: 180,
  height: 180,
  borderRadius: 100,
  borderColor: 'rgba(0,0,0,0.4)',
},
profilepic:{
  flex: 1,
  width: null,
  alignSelf: 'stretch',
  borderRadius: 100,
  borderWidth: 4
},
bar:{
  width,
  padding: '5%',
  backgroundColor: '#624063',
  flexDirection: 'row',
  justifyContent: 'space-between'
},
barItem:{
  padding: 18,
  alignItems: 'center'
},
baseText: {
  fontFamily: 'Roboto',
  color: '#4A4A4A',
  fontSize: 20,
},
baseTextEdit: {
  fontFamily: 'Roboto',
  color: '#333d47',
  fontSize: 20,
},
baseTextNaoEditavel: {
  fontFamily: 'Roboto',
  color: '#808080',
  fontStyle: 'italic',
  fontSize: 16,
},
listText: {
  fontFamily: 'Roboto',
  color: '#4A4A4A',
  fontSize: 14,
},
barText: {
  fontFamily: 'Roboto',
  color: '#fff',
  fontSize: 18,
},
titleText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#4A4A4A',
  fontFamily: 'Roboto',
},
titleTextEdit: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#333d47',
  fontFamily: 'Roboto',
},
titleText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#4A4A4A',
  fontFamily: 'Roboto',
},
button: {
  borderRadius: 5,
  justifyContent: 'center',
  height: 35,
  width: 200,
  backgroundColor: "#7A8887",
  alignSelf: 'stretch',
  marginBottom: 20
},
buttonText: {
  fontWeight: 'bold',
  fontSize: 16,
  color:'white',
  alignSelf: 'center',
},
image: {
  height: MAX_HEIGHT,
  width,
  alignSelf: 'stretch',
  resizeMode: 'cover',
},navTitleView: {
  height: 10,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 16,
  opacity: 0,
},section: {
  borderBottomWidth: 1,
  borderBottomColor: '#cccccc',
  backgroundColor: 'white',
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
  fontSize: 14,
  textAlign: 'center',
},
totalFont:{
  color: '#1C1C1C',
  fontSize: 20,
  textAlign: 'center',
  fontWeight: 'bold',
}
});

RankingProdutos.defaultProps = { ...RankingProdutos };

export default RankingProdutos;
