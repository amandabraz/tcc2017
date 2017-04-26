/**
* Campos da tela de cadastro específico de Vendedor:
* Horário e Dias de Funcionamento, CPF, Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/
import React, { Component } from 'react';
import { TextInput, ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
//import { me } from '../config/data';

class Vendedor extends Component {
  constructor(props) {
    super(props);
  }
  handleFinalizarPress = () => {
    this.props.navigation.navigate('Finalizar');
  };

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem
            title="CPF"
            hideChevron
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <ListItem
            title="Nome da loja"
            hideChevron
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <ListItem
            title="Dias de funcionamento"
            hideChevron
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
        </List>
        <Button
          title="Finalizar"
          buttonStyle={{ marginBottom: 20 }}
          onPress={this.handleFinalizarPress}
        />
      </ScrollView>
    );
  }
}

Vendedor.defaultProps = { ...Vendedor };

export default Vendedor;
