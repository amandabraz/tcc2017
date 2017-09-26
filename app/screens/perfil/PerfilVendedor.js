import React, { Component } from 'react';
import { AppRegistry, 
  Button, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity, 
  View, 
  Image, 
  ScrollView, 
  Dimensions,
  ToastAndroid } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import * as constante from '../../constantes';
import CheckBox from 'react-native-check-box';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 250;

export default class PerfilVendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      nomeText: '',
      nomeFantasiaText: '',
      dataNascimentoText: '',
      emailText: '',
      imagemPerfil: require('./img/camera2.jpg'),
      meiosPagamentoText: "Nenhum meio de pagamento escolhido",
      pagamentoEstilo: {
        color: '#CCCCCC',
        fontStyle: 'italic'
      },
      CPFText: '',
      celularText: '',
      confText: '  Configuração',
      editavel: false,
      meiosPagamentoVendedor: [],
      vendedor: {},
      titleTextClass: styles.titleText,
      baseTextClass: styles.baseText,
      pencilColor: '#fff',
      meiosPagamento: [] 
    };
    this.buscaDadosVendedor();
    this.buscaMeiosPagamento();
  }

  buscaDadosVendedor() {
    fetch(constante.ENDPOINT + 'vendedor/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.prepararVendedor(responseJson);
        }
      });
  };

  buscaMeiosPagamento() {
    fetch(constante.ENDPOINT + 'meiopagamento')
    .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({meiosPagamento: responseJson});
        }
      });
  }
  prepararVendedor(responseJson) {
    this.setState({vendedor: responseJson});
    if (responseJson.usuario.imagemPerfil) {
      this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
    }
    this.setState({nomeText: responseJson.usuario.nome});
    this.setState({nomeFantasiaText: responseJson.nomeFantasia});
    var dataNormal = new Date(responseJson.usuario.dataNasc);
    var dataNasc = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
    this.setState({dataNascimentoText: dataNasc});
    this.setState({emailText: responseJson.usuario.email});
    this.setState({CPFText: responseJson.usuario.cpf});
    this.setState({celularText: responseJson.usuario.ddd + responseJson.usuario.telefone});
    if (responseJson.meiosPagamentos.length > 0) {
      this.setState({pagamentoEstilo: styles.listText})
      var pagamentos = "";
      for(i in responseJson.meiosPagamentos) {
        pagamentos += responseJson.meiosPagamentos[i].descricao + " - ";
      }
      pagamentos = pagamentos.slice(0, -3);
      this.setState({meiosPagamentoText: pagamentos});
      var meioPagVendedor = [];
      for (j in responseJson.meiosPagamentos) {
        meioPagVendedor.push(responseJson.meiosPagamentos[j]);
      }
      this.setState({meiosPagamentoVendedor: meioPagVendedor});            
    }
  }
  
  habilitaEdicao() {
    if (this.state.editavel == false) {
      this.setState({editavel: true, 
        titleTextClass: styles.titleTextEdit, 
        baseTextClass: styles.baseTextEdit,
        pencilColor: '#ccc'});
    } else {
      this.setState({editavel: false, 
        titleTextClass: styles.titleText, 
        baseTextClass: styles.baseText,
        pencilColor: '#fff'});
    }
    
  }

  mostraBotaoSalvar() {
    if (this.state.editavel == true) {
      return(
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.button}          
            onPress={() => this.salvaEdicaoVendedor()}>
            <Text style={styles.buttonText}>SALVAR</Text> 
          </TouchableOpacity>


        </View>
      );
    }
  }

  salvaEdicaoVendedor() {
    this.pagamentoEscolhido;

    const {
      state: {
        vendedorId,
        userId,
        nomeText,
        meiosPagamentos,
        vendedor,
        celularText,
        nomeFantasiaText,
        imagemPerfil,
        meiosPagamentoVendedor
      }
    } = this;

    vendedorEditado = {
      "id": vendedorId,
      "usuario": {
          "id": userId,
          "senha": vendedor.usuario.senha,
          "deletado": false,
          "perfil": "V",
          "nome": nomeText,
          "email": vendedor.usuario.email,
          "dataNasc": vendedor.usuario.dataNasc,
          "cpf": vendedor.usuario.cpf,
          "ddd": celularText.substr(0,2),
          "telefone": celularText.substr(2,10),
          "notificacao": false,
          "bloqueado": false,
          "imagemPerfil": imagemPerfil.uri
      },
      "nomeFantasia": nomeFantasiaText,
      "meiosPagamentos": meiosPagamentoVendedor
    }

    fetch(constante.ENDPOINT + 'vendedor', {
      method: 'PUT',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendedorEditado)})
      .then((response) => response.json())
      .then((rJson) => {
        if (!rJson.errorMessage) {
          this.prepararVendedor(rJson);
          this.setState({editavel: false});
          ToastAndroid.showWithGravity('Cadastro atualizado com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);          
        }
      });
  }

  meiosPagamento() {
    if (this.state.editavel == false) {
      return (<Fumi
        style={styles.inputDimensions}
        label={'Meios de Pagamento'}
        iconClass={FontAwesomeIcon}
        iconName={'asterisk'}
        iconColor={'darkslategrey'}
        value={this.state.meiosPagamentoText}
        multiline={true}
        editable={false}
        inputStyle={this.state.pagamentoEstilo}/>
      );
    } else {
      return this.mostrarCheckboxesPagamento();
    }
  }

  onCheckMeioPagamento(meioPag) {
    meioPag.checked = !meioPag.checked;    
    var objMeioPag = {
      "id": meioPag.id,
      "descricao": meioPag.descricao
    };
    var pagamentos = this.state.meiosPagamentoVendedor;    
    if (meioPag.checked) {
      pagamentos.push(objMeioPag);
    } else {
      pagamentos.pop(objMeioPag);
    }
    this.setState({ meiosPagamentoVendedor: pagamentos });
  }

  mostrarCheckboxesPagamento() {
    var pagamentosVendedor = this.state.meiosPagamento;
    if (pagamentosVendedor) {
      var views = [];
      for (i in pagamentosVendedor) {
        let meioPagamento = pagamentosVendedor[i];  
        meioPagamento.checked = false;                
        for (j in this.state.meiosPagamentoVendedor) {
          if (meioPagamento.id === this.state.meiosPagamentoVendedor[j].id) {
            meioPagamento.checked = true;
          }
        }
        views.push (
          <View key={i} style={styles.item}>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={() => this.onCheckMeioPagamento(meioPagamento)}
              isChecked={meioPagamento.checked}
              leftText={meioPagamento.descricao}
              />
          </View>
        );
      }
      return views;  
    } 
  }

 pagamentoEscolhido = () => {
     if (this.state.meiosPagamentos.length > 0) {
       return true;
     }
     else {
       ToastAndroid.showWithGravity('Escolha ao menos um meio de pagamento', ToastAndroid.LONG, ToastAndroid.CENTER);
       return false;
     }
 }

  openConfiguracao = () => {this.props.navigation.navigate('ConfiguracaoVendedor');}

  render () {
    return (
      <View style={{ flex: 1 }}>      
        <StatusBar barStyle="light-content" />
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={1}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <Image source={this.state.imagemPerfil} style={styles.image} />}

          renderForeground={() =>
            <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView => {
              this.navTitleView = navTitleView;
            }}>
            <View style={styles.bar}>
            <View style={{alignItems: 'flex-start', width: '80%'}}>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.openConfiguracao}>
                <Icon name="settings" size={25} color={'#fff'}/><Text style={styles.barText}> {this.state.confText}</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'flex-end', width: '20%'}}>          
              <TouchableOpacity onPress={() => this.habilitaEdicao()}>
                <FontAwesomeIcon name="pencil" size={20} color={this.state.pencilColor} />
              </TouchableOpacity>    
            </View>
          </View>
          </Animatable.View>
          }>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)
            }>
            <View style={styles.bar}>
              <View style={{alignItems: 'flex-start', width: '80%'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.openConfiguracao}>
                  <Icon name="settings" size={25} color={'#fff'}/><Text style={styles.barText}> {this.state.confText}</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'flex-end', width: '20%'}}>          
                <TouchableOpacity onPress={() => this.habilitaEdicao()}>
                  <FontAwesomeIcon name="pencil" size={20} color={this.state.pencilColor} />
                </TouchableOpacity>    
              </View>
            </View>
          </TriggeringView>


            <ScrollView >
              <Fumi
                style={styles.inputDimensions}
                label={'Nome'}
                iconClass={FontAwesomeIcon}
                iconSize={20}
                iconName={'user'}
                iconColor={'darkslategrey'}
                value={this.state.nomeText}
                editable={this.state.editavel}
                inputStyle={this.state.titleTextClass}
                onChangeText={(nome) => this.setState({nomeText: nome})}/>

              <Fumi
                style={styles.inputDimensions}
                label={'CPF'}
                iconClass={FontAwesomeIcon}
                iconName={'info'}
                iconColor={'darkslategrey'}
                value={this.state.CPFText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Data de Nascimento'}
                iconClass={FontAwesomeIcon}
                iconName={'calendar'}
                iconColor={'darkslategrey'}
                value={this.state.dataNascimentoText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Email'}
                iconClass={FontAwesomeIcon}
                iconName={'at'}
                iconColor={'darkslategrey'}
                value={this.state.emailText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Celular'}
                iconClass={FontAwesomeIcon}
                iconName={'mobile'}
                iconColor={'darkslategrey'}
                value={this.state.celularText}
                editable={this.state.editavel}
                inputStyle={this.state.baseTextClass}
                maxLength={11}              
                onChangeText={(celular) => this.setState({celularText: celular})}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Nome da loja'}
                iconClass={MaterialsIcon}
                iconName={'store'}
                iconColor={'darkslategrey'}
                value={this.state.nomeFantasiaText}
                editable={this.state.editavel}
                inputStyle={this.state.baseTextClass}
                onChangeText={(nomeFantasia) => this.setState({nomeFantasiaText: nomeFantasia})}/>

              {this.meiosPagamento()}
              {this.mostraBotaoSalvar()}
          </ScrollView>
        </HeaderImageScrollView>
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
  inputDimensions: {
    backgroundColor: 'transparent', 
    width: 375, 
    height: 70
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
    backgroundColor: 'darkslategrey',
    flexDirection: 'row'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
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
    color: 'darkslategrey',
    fontSize: 16,
  },
  barText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 18,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkslategrey',
    fontFamily: 'Roboto',
  },
  titleTextEdit: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333d47',
    fontFamily: 'Roboto',
  },
  button: {
    borderRadius: 5,    
    justifyContent: 'center',
    height: 35,
    width: 200,
    backgroundColor: "darkslategrey",
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
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
