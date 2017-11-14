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
import ImagePicker from 'react-native-image-picker';
import Popup from 'react-native-popup';

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
      meiosPagamento: [],
      escolhido: ''
    };
    this.buscaDadosVendedor();
    this.buscaMeiosPagamento();
  }

  buscaDadosVendedor() {
    fetch(constante.ENDPOINT + 'vendedor/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMssage) {
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
    var dataNasc = (dataNormal.getDate()<10?"0"+dataNormal.getDate():dataNormal.getDate()) + "/" + (dataNormal.getMonth()+1<10?"0"+dataNormal.getMonth()+1:dataNormal.getMonth()+1) + "/" + dataNormal.getFullYear();
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
    } else {
      pagamentos = "Nenhum pagamento escolhido.";
      this.setState({meiosPagamentoText: pagamentos});
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
            onPress={() => this.pagamentoEscolhido()}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>


        </View>
      );
    }
  }

  salvaEdicaoVendedor() {
    const {
      state: {
        vendedorId,
        userId,
        nomeText,
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
          "perfil": vendedor.usuario.perfil,
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
        iconColor={'#7A8887'}
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
      this.setState({ meiosPagamentoVendedor: pagamentos });
    } else {
      pagamentos.pop(objMeioPag);
      this.setState({ meiosPagamentoVendedor: pagamentos });
    }

  }

  mostrarCheckboxesPagamento() {
    var pagamentosVendedor = this.state.meiosPagamento;
    if (pagamentosVendedor) {
      var views = [];
      views.push(
        <View key={-1} style={{margin: 15, flexDirection: 'row'}}>
          <FontAwesomeIcon name="asterisk" size={17} color={'#9fa1a3'} />
          <Text style={{fontFamily: 'Roboto', color: '#7A8887', fontSize: 16, fontWeight: "bold"}}>  Meios de pagamento</Text>
        </View>
      );
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
     if (this.state.meiosPagamentoVendedor.length > 0) {
       this.salvaEdicaoVendedor();
     }
     else {
       ToastAndroid.showWithGravity('Escolha ao menos um meio de pagamento', ToastAndroid.LONG, ToastAndroid.CENTER);
     }
 }



  trocaImagemPerfil() {
    var options = {
      title: 'Selecione sua foto',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Selecionar uma foto da biblioteca',
      cancelButtonTitle: 'Cancelar',
      storageOptions: {
        skipBackup: false,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        //do nothing
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          image: {uri: response.uri, width: 200, height: 200, changed: true}
        });
        this.setState({imagemPerfil: source});
      }
    });
  }

  desejaSair() {
    this.popup.confirm({
      title: 'Logout',
      content: ['Tem certeza que deseja sair?'],
      ok: {
        text: 'Sim',
        style: {
          color: 'gray',
          fontWeight: 'bold'
        },
        callback: () => {
          {this.logout()}
        }
      },
      cancel: {
        text: 'Não',
        style: {
          color: 'gray',
          fontWeight: 'bold'
        }
      }
    });
  }

  handleFinalizarPress = () => {
    fetch(constante.ENDPOINT + 'usuario/deletar/' + this.state.userId, {method: 'DELETE'})
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.errorMessage) {
        {this.logout()}
      }
    });
};

  excluirUsuario() {
    this.popup.confirm({
        title: 'Desativar Conta',
        content: ['Tem certeza que deseja desativar sua conta?'],
        ok: {
            text: 'Sim',
            style: {
                color: 'gray',
                fontWeight: 'bold'
            },
            callback: () => {
              {this.handleFinalizarPress()}
            }
        },
        cancel: {
            text: 'Não',
            style: {
                color: 'gray'
            }
        }
    });
}


  logout() {
    ToastAndroid.showWithGravity('Até logo!', ToastAndroid.LONG, ToastAndroid.CENTER);
    this.props.navigation.navigate('Login');
  }

  sobreColaboradores() {
    this.popup.tip({
      title: 'Trabalho de Conclusão de Curso',
         content: [' ', 'Aline Bender Dias', 'Amanda Barbosa Braz', 'Larissa Sitta Espinosa', 'Maiara de Oliveira Rodrigues', ' ', 'amoratcc@gmail.com', ' ', 'PUC - CAMPINAS', '2017'],
    });
  }

  abrirTermos() {
    this.props.navigation.navigate('TermoUso');
  }

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
          renderHeader={() =>
              <Image source={this.state.imagemPerfil} style={styles.image}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 13}}
                    onPress={this.trocaImagemPerfil.bind(this)}>
                  <FontAwesomeIcon name="camera" size={22} color={'#fff'}/>
                </TouchableOpacity>
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


            <ScrollView >
              <Fumi
                style={styles.inputDimensions}
                label={'Nome'}
                iconClass={FontAwesomeIcon}
                iconSize={20}
                iconName={'user'}
                iconColor={'#7A8887'}
                value={this.state.nomeText}
                editable={this.state.editavel}
                inputStyle={this.state.titleTextClass}
                onChangeText={(nome) => this.setState({nomeText: nome})}/>

              <Fumi
                style={styles.inputDimensions}
                label={'CPF'}
                iconClass={FontAwesomeIcon}
                iconName={'info'}
                iconColor={'#7A8887'}
                value={this.state.CPFText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Data de Nascimento'}
                iconClass={FontAwesomeIcon}
                iconName={'calendar'}
                iconColor={'#7A8887'}
                value={this.state.dataNascimentoText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Email'}
                iconClass={FontAwesomeIcon}
                iconName={'at'}
                iconColor={'#7A8887'}
                value={this.state.emailText}
                editable={false}
                inputStyle={this.state.editavel ? styles.baseTextNaoEditavel : styles.baseText}/>

              <Fumi
                style={styles.inputDimensions}
                label={'Celular'}
                iconClass={FontAwesomeIcon}
                iconName={'mobile'}
                iconColor={'#7A8887'}
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
                iconColor={'#7A8887'}
                value={this.state.nomeFantasiaText}
                editable={this.state.editavel}
                inputStyle={this.state.baseTextClass}
                onChangeText={(nomeFantasia) => this.setState({nomeFantasiaText: nomeFantasia})}/>

              {this.meiosPagamento()}
              {this.mostraBotaoSalvar()}
              <View style={{width:'98%'}}>
                <TouchableOpacity 
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding:10, margin: 10}}
                    onPress={this.excluirUsuario.bind(this)}>
                  <Icon name="trash" size={25} 
                        color={'#7A8887'} 
                        type='font-awesome'
                        style={{margin: 10}}/><Text style={{color: '#7A8887'}}>Desativar conta</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </HeaderImageScrollView>
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
  EvenBtnText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  EvenBtn: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#88557B'
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
    backgroundColor: '#7A8887',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  baseText: {
    fontFamily: 'Roboto',
    color: '#7A8887',
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
    color: '#7A8887',
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
    color: '#7A8887',
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
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
