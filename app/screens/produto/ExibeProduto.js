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
    TextInput
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Fumi } from 'react-native-textinput-effects';
import { Icon, Button } from 'react-native-elements';
import Accordion from 'react-native-accordion';
import * as constante from '../../constantes';
import NavigationBar from 'react-native-navbar';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Rating from 'react-native-rating';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get("window");

export default class ExibeProduto extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          produtoId: this.props.navigation.state.params.produtoId,
          userId: this.props.navigation.state.params.userId,
          clienteId: this.props.navigation.state.params.clienteId,
          imagemPrincipal: require('./img/camera11.jpg'),
          imagemVendedor: require('./img/camera11.jpg'),
          produto: {
            nome: '',
            preco: 0,
            categoria: {
              descricao: ''
            },
            score: 0,
            avaliacaoList: []
          },
          tagsText: "Nenhuma tag cadastrada",
          tagEstilo: {
            color: '#CCCCCC',
            fontStyle: 'italic'
          },
          quantidade: '',
          dietaProdutoText: "Nenhuma dieta cadastrada",
          restricaoEstilo: {
            color: '#CCCCCC',
            fontStyle: 'italic'
          },
          ingredientesText: "Nenhum ingrediente cadastrado",
          ingredientesEstilo: {
            color: '#CCCCCC',
            fontStyle: 'italic'
          },
          dateText: '',
          dateAvalText: '',
          carregou: true,
          carregouAval: true
        };
        this.buscaProduto();
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
          if (rJson.restricoesDieteticas.length > 0) {
            var restricoes = "";
            for(i in rJson.restricoesDieteticas) {
              restricoes += rJson.restricoesDieteticas[i].descricao + "\n";
            }
            this.setState({dietaProdutoText: restricoes});
          }
          if (rJson.quantidade > 1) {
            var qnt = "";
              qnt = rJson.quantidade + " disponíveis";
            this.setState({quantidade: qnt});
          } else {
              qnt = rJson.quantidade + " disponível";
            this.setState({quantidade: qnt});
          }
          if (rJson.tags.length > 0) {
            this.setState({tagEstilo: styles.listText})
            var tags = "";
            for(i in rJson.tags) {
              tags += "#" + rJson.tags[i].descricao + "\n";
            }
            this.setState({tagsText: tags});
          }
          if (rJson.ingredientes.length > 0) {
            this.setState({ingredientesEstilo: styles.listText})
            var ingredientes = "";
            for(i in rJson.ingredientes) {
              ingredientes += rJson.ingredientes[i].item + "\n";
            }
            this.setState({ingredientesText: ingredientes});
          }
          var dataNormal = new Date(rJson.dataPreparacao);
          let dia = dataNormal.getDate() < 10 ? "0" + dataNormal.getDate() : dataNormal.getDate();
          let mes = dataNormal.getMonth() + 1 < 10 ? "0" + (dataNormal.getMonth() + 1) : dataNormal.getMonth() + 1;
          let ano = dataNormal.getFullYear();
          let dataPrep = dia + "/" + mes + "/" + ano;
          this.setState({dateText: dataPrep});
          this.setState({carregou: false});
        }
      });
    }
  }

  exibeAvaliacao() {
    var views = [];
    if (this.state.produto.avaliacaoList.length > 0) {
      for (i in this.state.produto.avaliacaoList) {
        let avaliacao = this.state.produto.avaliacaoList[i];
        views.push (
          <View key={i}>
            <View style={{alignItems:  'flex-start', justifyContent: 'flex-start', padding: 10, margin: 3}}>
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
        Esse produto ainda não foi avaliado!
      </Text>
      </View>
      )
    }
        return views;
  }

  onButtonOpenProduct = (produtoIdSelecionado) => {
    this.props.navigation.navigate('ExibeComprar',
    {produtoId: this.state.produtoId,
      clienteId: this.state.clienteId,
      userId: this.state.userId});
  };

  arredondaValores(num){
    return num.toFixed(2)
  };

render() {
  const {goBack} = this.props.navigation;

  const images = {
  starFilled: require('./img/star_filled.png'),
  starUnfilled: require('./img/star_unfilled.png')
}

  return (
    <View style={styles.container}>
      <NavigationBar
        leftButton={
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialsIcon name="chevron-left" size={40} color={'#624063'}  style={{ padding: 3 }} />
          </TouchableOpacity>
        }/>
      <HeaderImageScrollView
        maxHeight={300}
        minHeight ={100}

     renderHeader={() => (
       <Image style={styles.profilepic}
              source={this.state.imagemPrincipal}/>
      )}>

      <TriggeringView onHide={() => console.log('text hidden')}>
        <View style={[styles.bar, styles.barItem]}>
          <View style={{width: '25%'}}>
            <Image source={this.state.imagemVendedor}
                   style={styles.imageResultSearch}/>
          </View>
          <View style={{width: '40%'}}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.state.produto.score}
            starSize={20}
            starColor={'#e6b800'}/>
            <Text style={styles.barText}>
              {this.state.produto.nome}
            </Text>
            <Text style={styles.quantidadeStyle}>
              {this.state.quantidade}
            </Text>
          </View>
          <View style={{width: '35%', justifyContent: 'flex-end'}}>
            <Text style={styles.precoStyle}>
              R$ {this.arredondaValores(this.state.produto.preco)}
            </Text>
          </View>
        </View>
        <Spinner visible={this.state.carregou}/>
        <View style={{ margin: 10 }}>
         <View style={{ margin: 10}}>
          <Text style={styles.baseText}>
              CATEGORIA
          </Text>
          <Text style={styles.respostaText}>
            {this.state.produto.categoria.descricao}
          </Text>
          </View>
          <View style={{ margin: 10}}>
          <Text style={styles.baseText}>
              DATA DE PREPARO
          </Text>
          <Text style={styles.respostaText}>
              {this.state.dateText}
          </Text>
          </View>

      <View style={{ margin: 10}}>
        <Accordion header={
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '75%'}}>
                <Text style={styles.baseText}>DIETA</Text>
              </View>
              <View style={{width: '25%'}}>
                <Icon name="chevron-down" size={25} color={'gray'} type='font-awesome'/>
              </View>
            </View>
          } content={
            <View>
              <Text style={styles.respostaText}>
                {this.state.dietaProdutoText}
              </Text>
            </View>
          }
          underlayColor="white"
          easing="easeOutCubic"/>
    </View>

      <View style={{ margin: 10}}>
        <Accordion header={
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '75%'}}>
              <Text style={styles.baseText}>TAGS</Text>
            </View>
            <View style={{width: '25%'}}>
              <Icon name="chevron-down" size={25} color={'gray'} type='font-awesome'/>
            </View>
          </View>
        } content={
        <View>
          <Text style={styles.respostaText}>
            {this.state.tagsText}
          </Text>
        </View>
      }
      underlayColor="white"
      easing="easeOutCubic"/>
  </View>

  <View style={{ margin: 10}}>
    <Accordion header={
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '75%'}}>
          <Text style={styles.baseText}>INGREDIENTES</Text>
        </View>
        <View style={{width: '25%'}}>
          <Icon name="chevron-down" size={25} color={'gray'} type='font-awesome'/>
        </View>
      </View>
    } content={
      <View>
        <Text style={styles.respostaText}>
          {this.state.ingredientesText}
        </Text>
      </View>
    }
    underlayColor="white"
    easing="easeOutCubic"/>
  </View>

    <View style={{ margin: 10}}>
    <Accordion header={
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '75%'}}>
          <Text style={styles.baseText}>OBSERVAÇÃO</Text>
        </View>
        <View style={{width: '25%'}}>
          <Icon name="chevron-down" size={25} color={'gray'} type='font-awesome'/>
        </View>
      </View>
    } content={
      <View>
        <Text style={styles.respostaText}>
          {this.state.produto.observacao}
        </Text>
      </View>
    }
    underlayColor="white"
    easing="easeOutCubic"/>
  </View>
  <View style={{width: '75%', margin: 10}}>
    <Text style={styles.baseText}>AVALIAÇÕES</Text>
  </View>
  {this.exibeAvaliacao()}

    </View>
    </TriggeringView>
    </HeaderImageScrollView>
      <TouchableOpacity style={styles.EvenBtn} onPress={this.onButtonOpenProduct.bind(this)}>
        <Text style={styles.EvenBtnText}>Comprar</Text>
      </TouchableOpacity>
  </View>
        );
    }
};

//CSS
const titleConfig = {
  title: 'Comprar produto',
  tintColor: "#fff",
  fontFamily: 'Roboto',
};
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
    },
  EvenBtn: {
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#624063'
  },
  EvenBtnText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center'
  },
  header:{
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: '50%'
  },
  profilepic:{
    width,
    height: '100%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#624063",
    alignSelf: 'stretch',
  },
  bar:{
    borderTopColor: 'white',
    borderTopWidth: 3,
    flexDirection: 'row',
    backgroundColor: 'rgba(130, 130, 130, 0.63)'
   },
  barItem:{
    padding: 18
  },
  precoStyle: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  quantidadeStyle: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 18,
  },
  barText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  baseText: {
    fontFamily: 'Roboto',
    color: 'grey',
    fontSize: 18,
    fontWeight: 'bold',
  },
  respostaText: {
    fontFamily: 'Roboto',
    color: 'gray',
    fontSize: 17,
  },
  listText: {
    fontFamily: 'Roboto',
    color: 'darkslategrey',
    fontSize: 16,
  },
  imageResultSearch:{
    width: 70,
    height: 70,
    alignItems:  'center',
    justifyContent: 'center',
    borderRadius: 100,
  }
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
