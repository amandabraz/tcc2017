import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';



class GerenciaProduto extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

// ListView carregando os itens do banco
// se nenhum item: msg dizendo nada aqui! cadastre seu primeiro produto
//  se algum item: exibir nome produto, + qtd - , lapis pra editar

  adicionarProduto = () => {
    this.props.navigation.navigate('CadastroProduto');
  };

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
          <Text>Blablabla</Text>
          <ListView
                  style={styles.container}
                  dataSource={this.state.dataSource}
                  renderRow={(data) => <RowProduto {...data} />}
                />
          </View>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.adicionarProduto}
          />
        </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 15
  },
});

const styleProduto = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const RowProduto = (props) => (
  <View style={styleProduto.container}>
//    <Image source={{ uri: props.picture.large}} style={styleProduto.photo} />
    <Text style={styleProduto.text}>
      {`${props.name}`}
    </Text>
  </View>
);

GerenciaProduto.defaultProps = { ...GerenciaProduto };

export default GerenciaProduto;
