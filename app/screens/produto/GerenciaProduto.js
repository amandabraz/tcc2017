import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
<<<<<<< HEAD
import { Tile, Button } from 'react-native-elements';

=======
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223
import NavigationBar from 'react-native-navbar';
import ActionButton from 'react-native-action-button';



class GerenciaProduto extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
<<<<<<< HEAD
      dataSource: ds.cloneWithRows([]),
=======
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223
    };
  }

// ListView carregando os itens do banco
// se nenhum item: msg dizendo nada aqui! cadastre seu primeiro produto
<<<<<<< HEAD
//  se algum item: exibir x (para deletar, com confirmação), nome produto, + qtd - , lapis pra editar
=======
//  se algum item: exibir nome produto, + qtd - , lapis pra editar
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223

  adicionarProduto = () => {
    this.props.navigation.navigate('CadastroProduto');
  };

  render() {
    const titleConfig = {
      title: 'Gerência de Produtos',
      tintColor: "#fff",
      fontFamily: 'Roboto',
    };

<<<<<<< HEAD
    // _refreshData: function() {
    //   fetch(ENDPOINT)
    //     .then((response) => response.json())
    //     .then((rjson) => {
    //       this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(rjson.results.produtos)
    //     });
    //   });
    // },
=======
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223
    return(

        <View style={{flex: 1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="darkblue"
          />
          <View style={styles.container}>
<<<<<<< HEAD
            <Text>Blablabla</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data) => <RowProduto {...data} />}
            />
=======
          <Text>Blablabla</Text>
        
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223
          </View>
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={this.adicionarProduto}
          />
<<<<<<< HEAD
          <Button
            onPress={() => this.props.navigation.navigate('CadastroProduto')}
            title="Go to notifications"
          />
=======
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223
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
<<<<<<< HEAD

const RowProduto = (data) => {
  return (
    <View style={styleProduto.container}>
      <Text style={styleProduto.text}>
        {data}
      </Text>
    </View>
  )
};

GerenciaProduto.defaultProps = { ...GerenciaProduto };
=======
>>>>>>> 30f9cede49e329e50468dad5c4fa9fbc2bac3223

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
