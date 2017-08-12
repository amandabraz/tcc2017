/**
* Interface de Busca de Produtos.
* by https://github.com/maiarar
*/

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

//TextInput utilizado nessa textAlign
class CampinhoTexto extends Component{
  constructor(props) {
   super(props);
   this.state = { text: 'Ex: Paçoquinha'};
 }
  render() {
   return (
      <TextInput
        style={styles.input}
        underlineColorAndroid={'#91d8ab'}
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
      />
   );
 }
}

//dimensão da janela
const { width, height } = Dimensions.get("window");


//Retornando as fotos das comidas
//TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde
  
// getFoods = (foods) => {
//   foods.map(  
//     food => <View><Image source={{ uri: './img/'+food.name+'.jpg' }}/></View>
//   );
// }
// const foodsList = getFoods([
//   {name: 'paçoca'},
//   {name: 'salgadinho'},
//   {name: 'brigadeiro'}, 
//   {name: 'pudim'}
// ]);

//Exporto essa classe pra que na minha "Main"
export default class BuscaProduto extends Component {
  constructor(props) {
    super(props);
    //TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde
    // this.state = {
    //   result: [<View></View>],
    // };
    // this.search = this.search.bind(this);
  }
  search = () => {    
    Alert.alert("Pesquisa!");

    //TODO: EU TENTEI MORES :( deixei comentado porque quero continuar +tarde  
    // this.setState({
    //   result:{foodsList}
    // });
  }

  render() {
    return (
       <View style={styles.container}>
        <Image source={require('./img/comidinhas.jpg')} style={styles.background}>
            <View style={styles.centralView}>
              <Text style={styles.font}>Busca de Produtos</Text>
              <View style={styles.search}>
                <CampinhoTexto/> 
                <Icon
                  raised
                  name='search'
                  type=' material-community'
                  color='#91d8ab'
                  onPress={this.search} />
              </View>
              <View style={styles.results}>
                <View style={styles.oneResult}>
                  <Image source={require('./img/paçoca.jpg')} style={styles.imageResultSearch} justifyContent='flex-start'/>
                  <Text  style={styles.oneResultfont} justifyContent='center'>Paçocas do Vieira</Text>
                  <Icon
                  name='arrow-forward'
                  type=' material-community'
                  color='#4f774d'
                  style={styles.imageResultSearch}
                  left='25'
                  onPress={this.search} />
                </View>
                <View style={styles.oneResult}>
                  <Image source={require('./img/pudim.jpg')} style={styles.imageResultSearch} justifyContent='flex-start'/>
                  <Text  style={styles.oneResultfont} justifyContent='center'>Pudim da Ana</Text>
                  <Icon
                  name='arrow-forward'
                  type=' material-community'
                  color='#4f774d'
                  style={styles.imageResultSearch}
                  left='25'
                  onPress={this.search} />
                </View>
                <View style={styles.oneResult}>
                  <Image source={require('./img/salgadinho.jpg')} style={styles.imageResultSearch} justifyContent='flex-start'/>
                  <Text  style={styles.oneResultfont} justifyContent='center'>Serjão Salgados</Text>
                  <Icon
                  name='arrow-forward'
                  type=' material-community'
                  color='#4f774d'
                  style={styles.imageResultSearch}
                  left='25'
                  onPress={this.search} />
                </View>
              </View>              
            </View>
        </Image>
      </View>
    );
  }
}

//css
const styles = StyleSheet.create({
  oneResult:{
     width: 300,
     backgroundColor: 'rgba(156, 178, 155, 0.7)',
     flexDirection: 'row',
     alignItems:'center',
  },
  oneResultfont:{
    color: '#4f774d',
    fontWeight: 'bold',
    fontSize: 18,
    left: 5,
  },
  results:{
    top:70,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  search:{
    top: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  background: { //tornando a imagem do tamanho da tela
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  centralView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 108, 122, 0.7)',
  },
  input:{
    width: 250,
    height: 60,
    borderColor: 'gray',
    fontFamily: 'Roboto',
    color: '#91d8ab',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  button: {
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#50a1e0",
    alignSelf: 'stretch',
  },
  font: {
    top: 50,
    fontWeight: 'bold',
    fontSize: 25,
    color:'#95c9db',
    textAlign:'center',
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
  },
});
