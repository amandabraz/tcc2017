import React, {
  Component
} from 'react';
import {
  AppRegistry,
  Alert,
  Dimensions,
  Image,
  Picker,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  Fumi
} from 'react-native-textinput-effects';
import {
  Icon
} from 'react-native-elements';
import * as constante from '../../constantes';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';
import CheckBox from 'react-native-check-box';
import TagInput from 'react-native-tag-input';
import Popup from 'react-native-popup';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Modal from 'react-native-modal';
import Accordion from 'react-native-accordion';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 250;

export default class PerfilCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,
      dataNascimentoText: '',
      isModalVisible: false,
      imagemPerfil: require('./img/camera11.jpg'),
      imagemEditada: '',
      tags: [],
      nomeText: '',
      confirmaSenha: '',
      velhaSenha: '',
      novaSenha: '',
      senhaText: '',
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
      },
      cameraVisivel: 'transparent',
      carregou: true,
      resultadoAvaliacao: []
    };
    this.buscaDadosCliente();
    this.preencherDietasArray();
    this.buscaAvaliacoes();
  }

  buscaAvaliacoes() {
    fetch(constante.ENDPOINT + "avaliacao/usuario/" + this.state.userId, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.errorMessage) {
          this.setState({resultadoAvaliacao: responseJson});
      }
    });
  };

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
      <Text style={{marginTop: 12,fontSize: 16, justifyContent: 'center'}}>
        Você ainda não foi avaliado!
      </Text>
      </View>
    )
  }
      return views;
  }

  preencherDietasArray() {
    fetch(constante.ENDPOINT + 'restricaodietetica')
      .then((response) => response.json())
        .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.setState({restricoesDieteticas: responseJson});
          }
        });
   };

   _showModal = () => this.setState({ isModalVisible: true });

  _hideModal = () => this.setState({ isModalVisible: false });

  buscaDadosCliente() {
    fetch(constante.ENDPOINT + 'cliente/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.preparaCliente(responseJson);
            this.setState({carregou: false});
          }
      });
  };

  habilitaEdicao() {
    if (this.state.editavel == false) {
      this.setState({editavel: true,
        titleTextClass: styles.titleTextEdit,
        baseTextClass: styles.baseTextEdit,
        pencilColor: '#ccc',
        cameraVisivel: 'gray'});
    } else {
      this.setState({editavel: false,
        titleTextClass: styles.titleText,
        baseTextClass: styles.baseText,
        pencilColor: '#fff',
        cameraVisivel: 'transparent'});
    }
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

  mostraTags() {
    if (this.state.editavel == false) {
      return (
        <Fumi
        style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
        label={'Tags'}
        iconClass={FontAwesomeIcon}
        iconName={'hashtag'}
        iconColor={'#4A4A4A'}
        value={this.state.tagsText}
        editable={false}
        multiline={true}
        inputStyle={this.state.tagEstilo}/>
      );
    } else {
      const inputTags = {
        placeholder: 'insira mais tags',
        placeholderTextColor: '#CCCCCC',
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        height:300
      };
      return (
        <View style={{ margin: 15, height: 150}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <FontAwesomeIcon name="hashtag" size={17} color={'#9fa1a3'} />
            <Text style={{fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 16, fontWeight: "bold"}}>  Tags</Text>
          </View>
          <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            tagColor="#8B636C"
            tagTextColor="white"
            tagAlign="center"
            tagContainerStyle={{height: 24}}
            tagTextStyle = {{fontSize: 18}}
            inputProps={inputTags}
            numberOfLines={15}/>
        </View>
      );
    }
  }

  mostraRestricaoDietetica() {
    if (this.state.editavel == false) {
      return (
        <Fumi
        style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
        label={'Restrições dietéticas'}
        iconClass={FontAwesomeIcon}
        iconName={'asterisk'}
        iconColor={'#4A4A4A'}
        value={this.state.restricoesDieteticasText}
        multiline={true}
        editable={false}
        inputStyle={this.state.restricaoEstilo}/>
      );
    } else {
      var listaRestricoes = this.state.restricoesDieteticas;
      if (listaRestricoes) {
        var views = [];
        views.push(
          <View key={-1} style={{margin: 15, flexDirection: 'row'}}>
            <FontAwesomeIcon name="asterisk" size={17} color={'#9fa1a3'} />
            <Text style={{fontFamily: 'Roboto', color: '#4A4A4A', fontSize: 16, fontWeight: "bold"}}>  Restrições dietéticas</Text>
          </View>
        );
        for (i in listaRestricoes) {
          let dieta = listaRestricoes[i];
          dieta.checked = false;
          for (j in this.state.restricoesCliente) {
            if (dieta.id === this.state.restricoesCliente[j].id) {
              dieta.checked = true;
            }
          }
          views.push (
            <View key={i} style={{ marginRight: 15, marginLeft: 15 }}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClickRestricao(dieta)}
                isChecked={dieta.checked}
                leftText={dieta.descricao}
                />
            </View>
          );
        }
        return views;
      }
    }
  }

  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
 };

  onClickRestricao(restricao) {
    restricao.checked = !restricao.checked;
    var objRestricoes = {
      "id": restricao.id,
      "descricao": restricao.descricao
    }
    var restricoes = this.state.restricoesCliente;
    if (restricao.checked) {
      restricoes.push(objRestricoes);
    } else {
      restricoes.pop(objRestricoes);
    }
    this.setState({restricoesCliente: restricoes});
  };


  mostraBotaoSalvar() {
    if (this.state.editavel == true) {
      return(
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.salvaEdicaoCliente()}>
            <Text style={styles.buttonText}>SALVAR</Text>
          </TouchableOpacity>


        </View>
      );
    }
  }

  preparaCliente(responseJson) {
    this.setState({cliente: responseJson});
    if (responseJson.usuario.imagemPerfil) {
      this.setState({imagemPerfil: { uri: responseJson.usuario.imagemPerfil } })
    }

    var dataNormal = new Date(responseJson.usuario.dataNasc);
    let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
    let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
    let ano = dataNormal.getFullYear();
    let dataNasc = dia + "/" + mes + "/" + ano;

    this.setState({nomeText: responseJson.usuario.nome,
                  dataNascimentoText: dataNasc,
                  celularText: responseJson.usuario.ddd + responseJson.usuario.telefone,
                  senhaText: responseJson.usuario.senha});
    if (responseJson.tags.length > 0) {
      this.setState({tagEstilo: styles.listText})
      var tags = "";
      var tagsArray = [];
      for(i in responseJson.tags) {
        tags += "#" + responseJson.tags[i].descricao + "  ";
        tagsArray.push(responseJson.tags[i].descricao);
      }
      tags = tags.slice(0, -2);
      this.setState({tagsText: tags,
                    tags: tagsArray});
    }
    if (responseJson.restricoesDieteticas.length > 0) {
      this.setState({restricaoEstilo: styles.listText})
      var restricoes = "";
      for(i in responseJson.restricoesDieteticas) {
        restricoes += responseJson.restricoesDieteticas[i].descricao + " - ";
      }
      restricoes = restricoes.slice(0, -3);
      this.setState({restricoesDieteticasText: restricoes,
                     restricoesCliente: responseJson.restricoesDieteticas});
    }
  }

  salvaEdicaoCliente() {
    var imagem = this.state.imagemEditada;
    if (!this.state.imagemEditada) {
      imagem = this.state.imagemPerfil.uri;
    }
    const {
      state: {
        clienteId,
        userId,
        cliente,
        nomeText,
        celularText,
        tags,
        restricoesCliente
      }
    } = this;

    clienteEditado = {
      "id": clienteId,
      "usuario": {
        "id": userId,
        "senha": cliente.usuario.senha,        
        "deletado": false,
        "perfil": cliente.usuario.perfil,
        "nome": nomeText,
        "email": cliente.usuario.email,
        "dataNasc": cliente.usuario.dataNasc,
        "cpf": cliente.usuario.cpf,
        "ddd": celularText.substr(0,2),
        "telefone": celularText.substr(2,10),
        "notificacao": false,
        "bloqueado": false,
        "imagemPerfil": imagem
      },
      "restricoesDieteticas": restricoesCliente,
      "tags": tags
    };

    fetch(constante.ENDPOINT + 'cliente', {
      method: 'PUT',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteEditado)})
      .then((response) => response.json())
      .then((rJson) => {
        if (!rJson.errorMessage) {
          this.preparaCliente(rJson);
          this.setState({editavel: false,
                        cameraVisivel: 'transparent'});
          ToastAndroid.showWithGravity('Cadastro atualizado com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);
        }
      });
  }


  trocaImagemPerfil() {
    if (this.state.editavel == false) {
    } else {
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
            imagemPerfil: {uri: response.uri, width: 200, height: 200, changed: true}
          });
          this.setState({imagemEditada: source});
        }
      });
    }
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

    validaCampos = () => {
      let camposVazios = [];
      let erros = [];

      //validar senha
      if (!this.state.velhaSenha) {
        camposVazios.push("Senha Atual");
      }
      if (!this.state.novaSenha) {
        camposVazios.push("Nova Senha");
      }
      if (!this.state.confirmaSenha) {
        camposVazios.push("Confirmação de Senha");
      } else {
        if (this.state.novaSenha.length < 6) {
          erros.push("Sua senha deve ter mais que 6 caracteres.");
        }

        // validar com o Confirma Senha
        if (this.state.novaSenha != this.state.confirmaSenha) {
          erros.push("Senha e confirmação de senha não conferem.");
        }

        // validar senha atual
        if (this.state.velhaSenha != this.state.senhaText) {
          erros.push("Senha Atual informada não corresponde à cadastrada.");
        }

        if (this.state.velhaSenha == this.state.novaSenha) {
          erros.push("Nova senha deve ser diferente da cadastrada atualmente.");
        }
      }

      if (camposVazios.length) {
        ToastAndroid.showWithGravity('Os seguinte campos são obrigatórios: ' + this.quebraEmLinhas(camposVazios) + '.', ToastAndroid.LONG, ToastAndroid.CENTER);
        return false;
      }
      if (erros.length) {
        ToastAndroid.showWithGravity(this.quebraEmLinhas(erros), ToastAndroid.LONG, ToastAndroid.CENTER);
        return false;
      }
      return true;
    }

    quebraEmLinhas(lista) {
      var listaQuebrada = "";
      for(item in lista) {
        listaQuebrada += lista[item] + "\n";
      }
      return listaQuebrada.trim();
    }

    onButtonSalvarSenha = () => {
      const {
        state: {
          userId,
          novaSenha
        }
      } = this;
      usuario = {
          "id": userId,
          "senha": novaSenha
      };

      let continuar = this.validaCampos();

      if (continuar) {
        fetch(constante.ENDPOINT + 'usuario', {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
          })
            .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.errorMessage) {
                  Alert.alert(responseJson.errorMessage);
                } else {
                  this.setState({senhaText: novaSenha});
                  ToastAndroid.showWithGravity('Senha alterada com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);
                  this._hideModal();
                }
              })
              .catch((error) => {
                console.error(error);
              });
      }
      };

  render () {
    return (
      <View style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <Image source={this.state.imagemPerfil} style={styles.image}>
           <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 13}}
               onPress={this.trocaImagemPerfil.bind(this)}>
             <FontAwesomeIcon name="camera" size={22} color={this.state.cameraVisivel}/>
           </TouchableOpacity>
         </Image>
      <TriggeringView>
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
                  editable={this.state.editavel}
                  inputStyle={this.state.baseTextClass}
                  maxLength={11}
                  onChangeText={(celular) => this.setState({celularText: celular})}/>

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

              {this.mostraTags()}
              {this.mostraRestricaoDietetica()}
              <Spinner visible={this.state.carregou}/>

              {this.mostraBotaoSalvar()}
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
              <View style={{width:'98%', flexDirection: 'row', justifyContent:'space-between'}}>
                <TouchableOpacity
                    style={{alignItems: 'center', padding:10, margin: 10}}
                    onPress={this._showModal}>
                  <Icon name="lock" size={25}
                        color={'#4A4A4A'}
                        type='font-awesome'
                        style={{margin: 10}}/><Text>Alterar senha</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{alignItems: 'center', padding:10, margin: 10}}
                    onPress={this.excluirUsuario.bind(this)}>
                  <Icon name="trash" size={25}
                        color={'#4A4A4A'}
                        type='font-awesome'
                        style={{margin: 10}}/><Text>Desativar conta</Text>
                </TouchableOpacity>
              </View>
        </TriggeringView>
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <View style={styles.oneResult1}>
            <Text style={{marginTop: 8, fontSize: 20, justifyContent: 'center', color:'#A1453E', fontWeight: 'bold'}}>Insira sua nova senha</Text>
            <Text>{'\n'}</Text>
            <Fumi style={{ backgroundColor: this.state.backgroundColorSenha, width: 375, height: 70 }}
                    label={'Senha Atual'}
                    maxLength={10}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    onChangeText={(velhaSenha) => this.setState({velhaSenha: velhaSenha})}
                    iconColor={'#4A4A4A'}
                    labelStyle={styles.texto}
                    inputStyle={styles.input}
                    secureTextEntry={true}/>

          <Text>{'\n'}</Text>

           <Fumi style={{ backgroundColor: this.state.backgroundColorSenha, width: 375, height: 70 }}
                    label={'Nova Senha'}
                    maxLength={10}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    onChangeText={(novaSenha) => this.setState({novaSenha: novaSenha})}
                    iconColor={'#4A4A4A'}
                    labelStyle={styles.texto}
                    inputStyle={styles.input}
                    secureTextEntry={true}/>

            <Text>{'\n'}</Text>

            <Fumi style={{ backgroundColor: this.state.backgroundColorSenha, width: 375, height: 70 }}
                    label={'Confirmação de Senha'}
                    maxLength={10}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    onChangeText={(confirmaSenha) => this.setState({confirmaSenha: confirmaSenha})}
                    iconColor={'#4A4A4A'}
                    labelStyle={styles.texto}
                    inputStyle={styles.input}
                    secureTextEntry={true}/>

              <Text>{'\n'}</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                      <TouchableOpacity
                        style={styles.buttonsSenha}
                        onPress={this._hideModal}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonsSenha}
                        onPress={() => this.onButtonSalvarSenha()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                      </TouchableOpacity>
                    </View>
            </View>
          </View>
        </Modal>
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
  oneResult1:{
     backgroundColor: 'white',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
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
    backgroundColor: '#7A8887'
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
  buttonsSenha: {
    borderRadius: 5,
    justifyContent: 'center',
    height: 35,
    width: 100,
    backgroundColor: "#7A8887",
    alignSelf: 'center',
    marginBottom: 10,
    padding:10,
    margin: 10
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
  },
  navTitleView: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
