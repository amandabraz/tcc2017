/**
* Campos da tela de cadastro específico de Vendedor:
* Horário e Dias de Funcionamento, CPF, Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/
import React, { Component } from 'react';
import { TextInput, ScrollView, StyleSheet, View } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box'
//import { me } from '../config/data';

class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        diasArray: ["Dinheiro", "Cartão de crédito", "Transferência", "Paypal"],
    }
    this.vendedor = {
      cpf: "123",
      nomeLoja: ""
    }
  }
  handleFinalizarPress = () => {
    console.log(this.vendedor);
    //this.props.navigation.navigate('Finalizar');
  };
  onClick(data) {
    data.checked = !data.checked;
  }
  renderView() {
    var len = this.state.diasArray.length;
    var views = [];
    for (var i = 0, l = len - 2; i < l; i += 2) {
        views.push(
            <View key={i}>
                <View style={styles.item}>
                    {this.renderCheckBox(this.state.diasArray[i])}
                    {this.renderCheckBox(this.state.diasArray[i + 1])}
                </View>
                <View style={styles.line}/>
            </View>
        )
    }
    views.push(
        <View key={len - 1}>
            <View style={styles.item}>
                {len % 2 === 0 ? this.renderCheckBox(this.state.diasArray[len - 2]) : null}
                {this.renderCheckBox(this.state.diasArray[len - 1])}
            </View>
        </View>
    )
    return views;
  }

  renderCheckBox(data) {
      return (
          <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>this.onClick(data)}
              isChecked={data.checked}
              leftText={data}
          />);
  }

  render() {
    return (
      <ScrollView>
        <List>
          <ListItem
            title="CPF"
            hideChevron
          />
          <TextInput
            style={styles.singleLine}
            keyboardType="phone-pad"
            returnKeyType="next"
            onChangeText={(cpf_input) => this.setState({
                cpf: cpf_input
            })}
          />
          <ListItem
            title="Nome da loja"
            hideChevron
          />
          <TextInput
            style={styles.singleLine}
            returnKeyType="next"
            onChangeText={(nomeLoja_input) => this.setState({
                nomeLoja: nomeLoja_input
            })}
          />
          <ListItem
            title="Meios de pagamento aceitos"
            hideChevron
          />
          <View style={styles.container}>
              <ScrollView>
                  {this.renderView()}
              </ScrollView>
          </View>
          <ListItem
            title="Tags para seus produtos"
            hideChevron
          />
          <TextInput
            style={styles.singleLine}
            returnKeyType="next"
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
var styles = StyleSheet.create({
  multiline: {
    height: 60,
    fontSize: 16,
    padding: 4,
    marginBottom: 10,
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
    height: 45,
  },
  singleLineWithHeightTextInput: {
    height: 30,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
  container: {
      flex: 1,
      backgroundColor: '#f3f2f2',
      marginTop:30
  },
  item: {
      flexDirection: 'row',
  },
    line: {
      flex: 1,
      height: 0.3,
      backgroundColor: 'darkgray',
  },
});


Vendedor.defaultProps = { ...Vendedor };

export default Vendedor;
