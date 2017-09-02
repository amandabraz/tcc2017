import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");

class GerenciaProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      vendedorId: this.props.navigation.state.params.vendedorId,
      listaProdutos: [{
          "id": 22,
          "nome": "Suco detox",
          "quantidade": 3
        },
        {
          "id": 23,
          "nome": "Cookie",
          "quantidade": 10
        }
      ],
      imagemProduto: require('./img/pacoca.jpg')
    };
    //this.refreshData();
  }

  adicionarProduto = () => {
    this.props.navigation.navigate('CadastroProduto', {userId: this.state.userId, vendedorId: this.state.vendedorId });
  };

  deletarProduto() {
   // alerta: deseja deletar o produto? confirmando: fetch() pra fazer o deletado no banco ser 1 e não 0
  }
  editarProduto() {
   // navigate pra tela de edição do produto
  }
  aumentaQuantidade() {
   //fetch pra aumentar quantidade no banco. seta o valor da tela como ele + 1
  }
  diminuiQuantidade() {
   //fetch pra diminuir quantidade. seta o valor da tela como ele - 1
  }
  refreshData() {
    var produtos = [{
        "id": 22,
        "nome": "Suco detox",
        "quantidade": 3
      },
      {
        "id": 23,
        "nome": "Cookie",
        "quantidade": 10
      }
    ];
    this.setState({listaProdutos: produtos});
  };

  mostraProdutos() {
    var views = [];
    for (i in this.state.listaProdutos) {
      let produto = this.state.listaProdutos[i];
      views.push(
        <View key={i} style={styles.oneResult}>
          <View style={styles.half}>
          <TouchableOpacity onPress={() => this.deletarProduto()}>
            <FontAwesomeIcon name="trash" size={20} color={'#ccc'} />
          </TouchableOpacity>
            <Image source={this.state.imagemProduto}
                 style={styles.photo}
                 justifyContent='flex-start'/>
            <Text style={styles.text}> {produto.nome} </Text>
          </View>
          <View style={styles.half}>
            <View style={styles.qtd}>
              <TouchableOpacity onPress={() => this.aumentaQuantidade()}>
                <FontAwesomeIcon name="plus" size={20} color={'darkblue'}/>
              </TouchableOpacity>
              <Text style={styles.text}> {produto.quantidade} </Text>
              <TouchableOpacity onPress={() => this.diminuiQuantidade()}>
                <FontAwesomeIcon name="minus" size={20} color={'darkblue'}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.editarProduto()}>
              <FontAwesomeIcon name="pencil" size={20} color={'#ccc'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return views;
  }

  render() {
    const titleConfig = {
      title: 'Gerência de Produtos',
      tintColor: "#fff",
      fontFamily: 'Roboto',
    };

    return(
        <View style={{flex: 1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="darkblue"
          />
          <View style={styles.container}>
            <ScrollView>
              {this.mostraProdutos()}
            </ScrollView>
          </View>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.adicionarProduto}
          />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oneResult: {
     width: this.width - 10,
     flexDirection: 'row',
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 3,
  },
  half: {
    width: '50%',
    flexDirection: 'row',
    alignItems:  'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    justifyContent: 'flex-start',
  },
  qtd: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  photo: {
    height: 30,
    width: 30,
    marginLeft: 10,
    borderRadius: 20
  },
});

GerenciaProduto.defaultProps = { ...GerenciaProduto };
export default GerenciaProduto;
