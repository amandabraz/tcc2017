import React, { Component } from 'react';
import { AppRegistry, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Image, 
  ScrollView,
  Dimensions,
  ToastAndroid,
  StatusBar 
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Icon } from 'react-native-elements';
import * as constante from '../../constantes';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';
import CheckBox from 'react-native-check-box';
import TagInput from 'react-native-tag-input';

const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = 250;

export default class PerfilCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      clienteId: this.props.navigation.state.params.clienteId,      
      dataNascimentoText: '',
      imagemPerfil: require('./img/camera2.jpg'),
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
    this.buscaDadosCliente();
    this.preencherDietasArray();  
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

  buscaDadosCliente() {
    fetch(constante.ENDPOINT + 'cliente/usuario/' + this.state.userId)
    .then((response) => response.json())
      .then((responseJson) => {
          if (!responseJson.errorMessage) {
            this.preparaCliente(responseJson);
          }
      });
  };

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

  mostraTags() { 
    if (this.state.editavel == false) {
      return (
        <Fumi
        style={{ backgroundColor: 'transparent', width: 375, height: 110 }}
        label={'Tags'}
        iconClass={FontAwesomeIcon}
        iconName={'hashtag'}
        iconColor={'darkslategrey'}
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
            <Text style={{fontFamily: 'Roboto', color: 'darkslategrey', fontSize: 16, fontWeight: "bold"}}>  Tags</Text>
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
        iconColor={'darkslategrey'}
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
            <Text style={{fontFamily: 'Roboto', color: 'darkslategrey', fontSize: 16, fontWeight: "bold"}}>  Restrições dietéticas</Text>
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
    var dataNasc = dataNormal.getDate() + "/" + (dataNormal.getMonth() + 1) + "/" + dataNormal.getFullYear();
    this.setState({nomeText: responseJson.usuario.nome,
                  dataNascimentoText: dataNasc,
                  celularText: responseJson.usuario.ddd + responseJson.usuario.telefone});
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
    const {
      state: {
        clienteId,
        userId,
        cliente,
        nomeText,
        celularText,
        imagemPerfil,
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
        "imagemPerfil": imagemPerfil.uri
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
          this.setState({editavel: false});
          ToastAndroid.showWithGravity('Cadastro atualizado com sucesso!', ToastAndroid.LONG, ToastAndroid.CENTER);          
        }
      });
  }

  openConfiguracao = () => {this.props.navigation.navigate('ConfiguracaoCliente');}

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

            <ScrollView>
              <Fumi
                style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                label={'Nome'}
                iconClass={FontAwesomeIcon}
                iconSize={20}
                iconName={'user'}
                iconColor={'darkslategrey'}
                value={this.state.nomeText}
                onChangeText={(nome) => this.setState({nomeText: nome})}
                editable={this.state.editavel}
                inputStyle={this.state.titleTextClass}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'CPF'}
                  iconClass={FontAwesomeIcon}
                  iconName={'info'}
                  iconColor={'darkslategrey'}
                  value={this.state.cliente.usuario.cpf}
                  editable={false}
                  inputStyle={styles.baseText}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Celular'}
                  iconClass={FontAwesomeIcon}
                  iconName={'mobile'}
                  iconColor={'darkslategrey'}
                  value={this.state.celularText}
                  onChange={(celular) => this.setState({celularText: celular})}                  
                  editable={this.state.editavel}
                  inputStyle={this.state.baseTextClass}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Data de Nascimento'}
                  iconClass={FontAwesomeIcon}
                  iconName={'calendar'}
                  iconColor={'darkslategrey'}
                  value={this.state.dataNascimentoText}
                  editable={false}
                  inputStyle={styles.baseText}/>

              <Fumi
                  style={{ backgroundColor: 'transparent', width: 375, height: 70 }}
                  label={'Email'}
                  iconClass={FontAwesomeIcon}
                  iconName={'at'}
                  iconColor={'darkslategrey'}
                  value={this.state.cliente.usuario.email}
                  editable={false}
                  inputStyle={styles.baseText}/>

              {this.mostraTags()}
              {this.mostraRestricaoDietetica()}

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
  barItem:{
    padding: 18,
    alignItems: 'center'
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
    color: 'darkslategrey',
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
    color: 'darkslategrey',
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
