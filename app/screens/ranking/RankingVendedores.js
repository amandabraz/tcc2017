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
  TouchableHighlight,
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
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-accordion';
import Spinner from 'react-native-loading-spinner-overlay';


const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 200;

class RankingVendedores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtroMensal: true,
      alturaPedido: '100%',
      alturaResumo: '100%',
      maioresVendedores: [],
      imagemHeader: require('./img/vendedores.png'),
      imagemPerfil: require('./img/camera.jpg'),
      imagemPerfilOuro: require('./img/camera.jpg'),
      imagemPerfilPrata: require('./img/camera.jpg'),
      imagemPerfilBronze: require('./img/camera.jpg'),
      imagemPremiacao: require('./img/camera.jpg'),
      vendedorPrata: [],
      carregou: true,
      refreshing: false,      
    };
    this.buscaMaioresVendedores();
  };

  buscaMaioresVendedores(){
    fetch(constante.ENDPOINT + 'pedido/ranking/vendedor/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({maioresVendedores: responseJson});
        this.setState({refreshing:false});
        this.setState({carregou: false});
      }});
  }


  buscaVendedores() {
    var views = [];

    var dadosVendedores = this.state.maioresVendedores;
    if (dadosVendedores.length > 0) {
      let imagemPerfil = require('./img/camera.jpg');
      let vendedorOuro = dadosVendedores[0];
      let vendedorPrata = dadosVendedores[1];
      let vendedorBronze = dadosVendedores[2];

        if(vendedorOuro[2]){
          imagemPerfilOuro = {uri: vendedorOuro[2], cache: "reload"};
        } else {
          imagemPerfilOuro = imagemPerfil;
        }

        if(vendedorPrata[2]){
          imagemPerfilPrata = {uri: vendedorPrata[2], cache: "reload"};
        } else {
          imagemPerfilPrata = imagemPerfil;
        }

        if(vendedorBronze[2]){
          imagemPerfilBronze = {uri: vendedorBronze[2], cache: "reload"};
        } else {
          imagemPerfilBronze = imagemPerfil;
        }

        views.push (
          <View key={-1}>
          <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.oneResult1}>
              <Accordion header={
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "30%"}}>
                    <Image source={imagemPerfilPrata}
                          style={styles.imageResultSearchMenor}
                          justifyContent='center'/>
                    <Text style={styles.totalFont}>{vendedorPrata[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedorPrata[1]} vendas</Text>
                  </View>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "40%"}}>
                    <Image source={imagemPerfilOuro}
                          style={styles.imageResultSearchPrincipal}
                          justifyContent='center'/>
                    <Text style={styles.totalFont}>{vendedorOuro[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedorOuro[1]} vendas</Text>
                  </View>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "30%"}}>
                    <Image source={imagemPerfilBronze}
                          style={styles.imageResultSearchMenor}
                          justifyContent='center'/>
                    <Text style={styles.totalFont}>{vendedorBronze[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedorBronze[1]} vendas</Text>
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
        </View>
      );

      for(i in dadosVendedores) {
        let vendedor = dadosVendedores[i];
        let imagemPremiacao = require('./img/camera.jpg');

        if(vendedor[2]){
          imagemPerfil = {uri: vendedor[2], cache: "reload"};
        }

        if (i == 0){
          imagemPremiacao = require('./img/gold.png');
        }
        if (i == 1){
          imagemPremiacao = require('./img/silver.png');
        }
        if (i == 2){
          imagemPremiacao = require('./img/bronze.png');
        }
        if (i > 2){
          imagemPremiacao = require('./img/branco.png');
        }

        views.push (
          <View key={i}>
                <View style={styles.oneResults}>
                  <View style={{width: "30%"}}>
                    <Image source={imagemPerfil}
                          style={styles.imageResultSearch}
                          justifyContent='flex-start'/>
                  </View>
                  <View style={{width: "50%"}}>
                    <Text style={styles.totalFont}>{vendedor[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedor[1]} produtos vendidos</Text>
                  </View>
                  <View style={{width: "20%"}}>
                  <Image source={imagemPremiacao}
                        style={styles.imageResultSearchPremiacao}
                        justifyContent='flex-end'/>
                  </View>
                </View>
                <Text>{'\n'}</Text>
          </View>
        );
      }

    }
    return views;
  }

  render() {
    return(
      <View style = {{ flex: 1 }}>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({refreshing:true});
              this.buscaMaioresVendedores();
              this.buscaVendedores();
            }}/>
            }>
          <StatusBar barStyle="light-content"/>
            <HeaderImageScrollView
              maxHeight = {MAX_HEIGHT}
              minHeight = {1}
              maxOverlayOpacity = {0.6}
              minOverlayOpacity = {0.3}
              fadeOutForeground
              renderHeader = { () =>
                <Image source={this.state.imagemHeader} style={styles.image}>
                  <View style = {{alignItems: 'center'}}>
                    <Text style={{marginTop: 8, fontSize: 27, justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>
                      {'\n'}{'\n'} Vendedores em Destaque {'\n'} {'\n'}
                    </Text>
                  </View>
                </Image>
              }
              renderForeground = {() =>
                <Animatable.View
                  style = {styles.navTitleView}
                  ref = {navTitleView => {
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
            </View>
          </TriggeringView>
        </HeaderImageScrollView>
        <View style={styles.centralView}>
          <View style={styles.results}>
          <Spinner visible={this.state.carregou}/>
            {this.buscaVendedores()}
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
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
  oneResult:{
     width: '95%',
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 10,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  oneResults:{
     width: '95%',
     flexDirection: 'row',
     backgroundColor: 'white',
     borderWidth: 10,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  oneResultfont:{
    fontSize: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  totalFont:{
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  imageResultSearchPremiacao:{
    width: 50,
    height: 60,
    alignItems:  'center',
    justifyContent: 'center'
  },
  imageResultSearchMenor:{
    width: 50,
    height: 50,
    alignItems:  'center',
    justifyContent: 'center',
    alignSelf:'center',
    flexDirection: 'column',
    borderRadius: 100,
  },
  imageResultSearchPrincipal:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    alignSelf:'center',
    flexDirection: 'column',
    borderRadius: 100,
  },
  results:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralView: {
    alignItems: 'center'
  },
});

RankingVendedores.defaultProps = { ...RankingVendedores };

export default RankingVendedores;
