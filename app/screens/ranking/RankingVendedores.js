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
      imagemPremiacao: require('./img/camera.jpg')
    };
    this.buscaMaioresVendedores();
    this.buscaVendedores();
  };

  buscaMaioresVendedores(){
    fetch(constante.ENDPOINT + 'pedido/ranking/vendedor/' + this.state.filtroMensal, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        this.setState({maioresVendedores: responseJson});
        this.setState({refreshing:false});
      }});
  }

  buscaVendedores() {
    var views = [];
    if (this.state.maioresVendedores.length > 0) {
      let imagemPerfil = require('./img/camera.jpg');
      for(i in this.state.maioresVendedores) {
        let vendedorOuro = this.state.maioresVendedores[0];
        let vendedorPrata = this.state.maioresVendedores[1];
        let vendedorBronze = this.state.maioresVendedores[2];
        let vendedor = this.state.maioresVendedores[i];

        if(vendedorOuro[2]){
          imagemPerfilOuro = {uri: vendedorOuro[2]};
        }
        if(vendedorPrata[2]){
          imagemPerfilPrata = {uri: vendedorPrata[2]};
        }
        if(vendedorBronze[2]){
          imagemPerfilBronze = {uri: vendedorBronze[2]};
        }
        if(vendedor[2]){
          imagemPerfil = {uri: vendedor[2]};
        }
        else {
          imagemPerfil = require('./img/camera.jpg');
        }


        views.push (
          <View key={i}>
          <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.oneResult1}>
              <Accordion header={
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "30%"}}>
                    <Image source={imagemPerfilPrata}
                          style={styles.imageResultSearchMenor}
                          justifyContent='flex-start'/>
                    <Text style={styles.totalFont}>{vendedorPrata[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedorPrata[1]} vendas</Text>
                  </View>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "40%"}}>
                    <Image source={imagemPerfilOuro}
                          style={styles.imageResultSearchPrincipal}
                          justifyContent='flex-start'/>
                    <Text style={styles.totalFont}>{vendedorOuro[0]}</Text>
                    <Text style={styles.oneResultfont}>{vendedorOuro[1]} vendas</Text>
                  </View>
                  <View style={{alignSelf:'center', flexDirection: 'column', justifyContent: 'center', width: "30%"}}>
                    <Image source={imagemPerfilBronze}
                          style={styles.imageResultSearchMenor}
                          justifyContent='flex-start'/>
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
          <Text>{'\n'}</Text>
              <View>
                <View style={styles.oneResult}>
                  <View style={{width: "30%"}}>
                    <Image source={imagemPerfil}
                          style={styles.imageResultSearch}
                          justifyContent='flex-start'/>
                  </View>
                  <View style={{width: "50%"}}>
                    <Text style={styles.oneResultfontTitle} justifyContent='center'>{vendedor[0]}</Text>
                    <Text style={styles.oneResultfont} justifyContent='center'>{vendedor[1]} produtos vendidos</Text>
                  </View>
                  <View style={{width: "20%"}}>
                  <Image source={imagemPerfil}
                        style={styles.imageResultSearch}
                        justifyContent='flex-end'/>
                  </View>
                </View>
              </View>
          </View>
        );
      }
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
    justifyContent: 'center',
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  imageResultSearchMenor:{
    width: 50,
    height: 50,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  imageResultSearchPrincipal:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
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
