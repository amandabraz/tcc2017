import Vendedor from '../cadastro/Vendedor';
import React, { Component } from 'react';
import { TextInput, Dimensions, AppRegistry, Text, StyleSheet, TouchableOpacity, View, Image, ToastAndroid, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import NavigationBar from 'react-native-navbar';
import * as constante from '../../constantes';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import Accordion from 'react-native-accordion';

const { width, height } = Dimensions.get("window");


export default class ExibeVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      selectUserId: this.props.navigation.state.params.selectUserId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      nomeText: '',
      nomeFantasiaText: '----',
      meiosPagamentoText: '',
      pagamentoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      celularText: '',
      resultadoProduto: [],
      imagemPerfil: require('./img/camera11.jpg'),
      favoritoColor: 'gray',
      carregou: true,
      motivoDenuncia: '',
      isModalVisible: false,
      avaliarVisible: false,
      starCount: 0,
      comentario: '',
      resultadoAvaliacao: []
    };
    this.buscaDadosVendedor();
    this.buscaProdutos();
    this.buscaAvaliacoes();
  }

  buscaDadosVendedor() {
    fetch(constante.ENDPOINT + 'vendedor/' + this.state.vendedorId + '/cliente/' + this.state.clienteId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            if (responseJson.usuario.imagemPerfil) {
              this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
            }
          this.setState({nomeText: responseJson.usuario.nome});
          this.setState({nomeFantasiaText: responseJson.nomeFantasia});
          this.setState({celularText: "(" + responseJson.usuario.ddd + ") " + responseJson.usuario.telefone});

          if (responseJson.meiosPagamentos.length > 0) {
            this.setState({pagamentoEstilo: styles.listText})
            var pagamentos = "";
            for(i in responseJson.meiosPagamentos) {
              pagamentos += responseJson.meiosPagamentos[i].descricao + " - ";
            }
            pagamentos = pagamentos.slice(0, -3);
            this.setState({meiosPagamentoText: pagamentos});
            if (responseJson.favoritoDoCliente) {
              this.setState({favoritoColor: '#990000'});
            }
          }
        }
      });
  };

  buscaProdutos() {
    fetch(constante.ENDPOINT + "vendedor/" + this.state.vendedorId + "/produto", {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({resultadoProduto: responseJson});
      }
    });
  };

  buscaAvaliacoes() {
    fetch(constante.ENDPOINT + "avaliacao/usuario/" + this.state.selectUserId, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({resultadoAvaliacao: responseJson});
      }
      this.setState({carregou: false});
    });
  };

  mostraProduto() {
    var views = [];
    if(this.state.resultadoProduto.length > 0){
    for(i in this.state.resultadoProduto) {
      let produto = this.state.resultadoProduto[i];
      let imagemPrincipalP = require('./img/camera11.jpg');
      if (produto.imagemPrincipal) {
        imagemPrincipalP = { uri: produto.imagemPrincipal };
      }
      views.push (
        <View key={i}>
        <TouchableOpacity onPress={() => this.onButtonOpenProduct(produto)}>
          <View style={styles.oneResult}>
              <Image source={imagemPrincipalP}
                     style={styles.imageResultSearch}
                     justifyContent='flex-start'/>

                <Text style={styles.oneResultfontTitle} justifyContent='center'>{produto.nome}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>{produto.categoria.descricao}</Text>
                <Text style={styles.oneResultfont} justifyContent='center'>Preço: {produto.preco}</Text>

          </View>
            <Text>{'\n'}</Text>
        </TouchableOpacity>
        </View>
        );
    }
  } else {
    views.push(
      <View key={0} style={{alignItems: 'center'}}>
      <Text style={{marginTop: 12,fontSize: 18, justifyContent: 'center'}}>
        Esse vendedor não tem produtos cadastrados!
      </Text>
      </View>
    )
  }
      return views;
}

mostraAvaliacoes() {
  var views = [];
  if(this.state.resultadoAvaliacao.length > 0){
  for(i in this.state.resultadoAvaliacao) {
    let avaliacao = this.state.resultadoAvaliacao[i];
    let dataNormal = new Date(avaliacao.dataAvaliacao);
    let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
    let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
    let ano = dataNormal.getFullYear();
    let hora = dataNormal.getHours();
    let min = dataNormal.getMinutes() < 10 ? "0" + dataNormal.getMinutes() : dataNormal.getMinutes();
    let dataAv = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;
    views.push (
      <View key={i}>
        <View style={{alignItems:  'flex-start', justifyContent: 'flex-start', padding: 10, margin: 3}}>
        <Text style={{fontSize: 14, color: '#ccc'}}>{dataAv}</Text>
        <StarRating
            disabled={true}
            maxStars={5}
            rating={avaliacao.nota}
            starSize={12}
            starColor={'#e6b800'}/>
        <Text style={styles.oneResultfont} justifyContent='center'>{avaliacao.comentario}</Text>
       
        </View>
      </View>
      );
  }
} else {
  views.push(
    <View key={0} style={{alignItems: 'center'}}>
    <Text style={{marginTop: 12,fontSize: 18, justifyContent: 'center'}}>
      Esse vendedor ainda não foi avaliado!
    </Text>
    </View>
  )
}
    return views;
}

onButtonOpenProduct = (produto) => {
  this.props.navigation.navigate('ExibeProduto', {produtoId: produto.id, clienteId: this.state.clienteId});
};

favoritaVendedor(){
  if(this.state.favoritoColor == 'gray'){
    this.setState({favoritoColor: '#990000'});
    fetch(constante.ENDPOINT + 'cliente/' + this.state.clienteId + '/favoritos/' + this.state.vendedorId,
          {method: 'PUT'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        ToastAndroid.showWithGravity('Vendedor favoritado <3', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        this.setState({favoritoColor: 'gray'});
      }
    });
  } else {
    this.setState({favoritoColor: 'gray'});
    fetch(constante.ENDPOINT + 'cliente/' + this.state.clienteId + '/favoritos/' + this.state.vendedorId,
           {method: 'DELETE'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        ToastAndroid.showWithGravity('Vendedor desfavoritado </3', ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        this.setState({favoritoColor: '#990000'});
      }
    });
  }
}


_showModal = () => this.setState({ isModalVisible: true })
_hideModal = () => this.setState({ isModalVisible: false })

denunciaUsuario() {
  this.setState({carregou: true});
  
  const {
    state: {
      motivoDenuncia,
      userId,
      selectUserId
    }
  } = this;
  
  denuncia = {
    "motivo": motivoDenuncia,
    "dataDenuncia": new Date(),
    "reportado": selectUserId,
    "denunciador": userId
  }
  
  fetch(constante.ENDPOINT + 'denuncia/', {method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(denuncia)
})
.then((response) => response.json())
.then((responseJson) => {
  if (!responseJson.errorMessage) {
    this._hideModal();
    ToastAndroid.showWithGravity('Denúncia registrada. Assim que possível, entraremos em contato com o status da sua denúncia. Obrigada!', ToastAndroid.LONG, ToastAndroid.CENTER);
    this.setState({carregou: false});
  }
});
}

avaliar = () => this.setState({ avaliarVisible: true })
esconder = () => this.setState({ avaliarVisible: false })

avaliaUsuario() {
  this.setState({carregou: true});

  const {
    state: {
      userId,
      selectUserId,
      comentario,
      starCount
    }
  } = this;

  avaliacao = {
    "comentario": comentario,
    "dataAvaliacao": new Date(),
    "receiver": selectUserId,
    "sender": userId,
    "nota": starCount,
  }

  fetch(constante.ENDPOINT + 'avaliacao', {method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(avaliacao)
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (!responseJson.errorMessage) {
      this.esconder();
      ToastAndroid.showWithGravity('Avaliação registrada, obrigada!', ToastAndroid.LONG, ToastAndroid.CENTER);
      this.setState({carregou: false});
      this.buscaAvaliacoes();
    }
  });
}


  render () {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      <NavigationBar
       tintColor="transparent"
       style={{marginBottom: 20}}
      leftButton={
        <TouchableOpacity onPress={() => goBack()}>
          <MaterialsIcon name="chevron-left" size={40} color={'#624063'}  style={{ padding: 3 }} />
        </TouchableOpacity>
      }/>
        <View style={styles.header}>
          <View style={styles.profilepicWrap}>
          <Image
            style={styles.profilepic}
            source={this.state.imagemPerfil}/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
              <Text style={styles.titleText}>
                {this.state.nomeText}
              </Text>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
                <Icon name='heart'
                      size={25}
                      raised
                      type='font-awesome'
                      color={this.state.favoritoColor}
                      onPress={() => this.favoritaVendedor()}/>
            </View>
          </View>
        </View>
        <Spinner visible={this.state.carregou}/>
        <ScrollView>
        <Fumi
            style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
            label={'Nome da loja'}
            iconClass={MaterialsIcon}
            iconName={'store'}
            iconColor={'#4A4A4A'}
            value={this.state.nomeFantasiaText}
            editable={false}
            inputStyle={styles.baseText}/>

          <Fumi
              style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
              label={'Meios de Pagamento'}
              iconClass={FontAwesomeIcon}
              iconName={'asterisk'}
              iconColor={'#4A4A4A'}
              value={this.state.meiosPagamentoText}
              multiline={true}
              editable={false}
              inputStyle={this.state.pagamentoEstilo}/>

      <View style={styles.results}>
      <ScrollView horizontal={true}
                  showsHorizontalScrollIndicator={true}>
          {this.mostraProduto()}
      </ScrollView>
      </View>
      <View style={{ margin: 10}}>
        <Accordion header={
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '75%'}}>
                <Text style={{color: '#4A4A4A', fontSize: 20}}>Avaliações</Text>
              </View>
              <View style={{width: '25%'}}>
                <Icon name="chevron-down" size={18} color={'gray'} type='font-awesome'/>
              </View>
            </View>
          } content={
            <View>
              {this.mostraAvaliacoes()}
            </View>
          }
          underlayColor="white"
          easing="easeOutCubic"/>
    </View>
      <View style={{margin: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => this._showModal()} style={{flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
          <MaterialsIcon name="block" size={20} color={'#624063'}  style={{ padding: 3 }} />
          <Text style={{fontWeight: "bold"}}>Denunciar usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.avaliar()} style={{flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
          <FontAwesomeIcon name="smile-o" size={20} color={'#624063'}  style={{ padding: 5 }}/>
          <Text style={{fontWeight: "bold"}}>Avaliar Vendedor</Text>
        </TouchableOpacity>
      </View>
        <Modal
        isVisible={this.state.isModalVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.3}>
        <View style={styles.modalContent}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}> Por favor, descreva o motivo da sua denúncia, avaliaremos e entraremos em contato assim que possível! </Text>
          <View style={{width: '90%', margin: 10}}>
          <TextInput
              style={{ borderRadius: 6, borderColor: "#ccc", borderWidth: 2, backgroundColor: 'transparent', height: 100 }}
              multiline={true}
              maxLength={255}
              onChangeText={(motivo) => this.setState({motivoDenuncia: motivo})}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this._hideModal()}>
              <View style={styles.button}>
                <Text style={{color: "#fff"}}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.denunciaUsuario()}>
                <View style={styles.button}>
                  <Text style={{color: "#fff"}}>Denunciar</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={this.state.avaliarVisible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.3}>
        <View style={styles.modalContent}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}> Sua nota para o vendedor: </Text>
          <View style={{width: '60%'}}>
            <StarRating
              maxStars={5}
              starSize={25}
              starColor={'#e6b800'}
              rating={this.state.starCount}
              selectedStar={(rating) => this.setState({starCount: rating})}
              />
          </View>
        </View>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}> Insira um comentário: </Text>
          <View style={{width: '90%', margin: 10}}>
          <TextInput
              style={{ borderRadius: 6, borderColor: "#ccc", borderWidth: 2, backgroundColor: 'transparent', height: 100 }}
              multiline={true}
              maxLength={255}
              onChangeText={(comentario) => this.setState({comentario: comentario})}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this.esconder()}>
              <View style={styles.button}>
                <Text style={{color: "#fff"}}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.avaliaUsuario()}>
                <View style={styles.button}>
                  <Text style={{color: "#fff"}}>Avaliar</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
      </ScrollView>
      </View>
    );
  }
}


  //CSS
  const styles = StyleSheet.create({
    container: {
      flex: 1
  },
  headerBackground: {
    alignSelf: 'stretch',
  },
  header:{
    width,
    height: "40%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicWrap:{
    width,
    height: "85%"
  },
  profilepic:{
    flex: 1,
    width,
    alignSelf: 'stretch'
  },
  oneResultfontTitle:{
    color: '#4A4A4A',
    fontWeight: 'bold',
    fontSize: 17,
  },
  oneResultfont:{
    color: '#4A4A4A',
    fontSize: 15,
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  results:{
    flexDirection: 'row',
    margin: 5
  },
  oneResult:{
     height: 200,
     width: 180,
     alignItems:  'center',
     justifyContent: 'center',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#4A4A4A',
    fontSize: 20,
  },
  listText: {
    fontFamily: 'Roboto',
    color: '#4A4A4A',
    fontSize: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    fontFamily: 'Roboto',
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
    backgroundColor: 'gray',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
