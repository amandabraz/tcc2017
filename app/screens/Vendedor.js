/**
* Campos da tela de cadastro específico de Vendedor:
* Horário e Dias de Funcionamento, CPF, Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/
import React, { Component } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Alert, ToastAndroid } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box'
//import { me } from '../config/data';

class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        diasArray: ["Dinheiro", "Cartão de crédito", "Transferência", "Paypal"],
        cpf: '',
        nomeLoja: ''
    }
  }
  handleFinalizarPress = () => {
    const {
      state: {
        cpf, nomeLoja
      }
    } = this;
    // TODO: receber o parametro usuario da tela CADASTRO basico, ainda em desenvolvimento
    vendedor = {
      "usuario": 1,
      "nomeFantasia": nomeLoja,
      "cpf": cpf
    }
    // TODO: restante dos paramentos. alterar url abaixo para o servidor (enfiar essa constante em algum buraco)
     fetch('http://10.0.2.2:8080/vendedor', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendedor)
      })
          .then((response) => response.json())
          .then((responseJson) => {
            ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
            // TODO: acertar a navegação para a próxima tela, a ser criada
            //this.props.navigation.navigate('Finalizar');
          })
          .catch((error) => {
            // TODO: melhorar erro? combinar padrão de erro no app!
            Alert.alert("error Response", JSON.stringify(error));
            console.error(error);
          });

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
            onChangeText={(cpf) => this.setState({cpf})}
            value={this.state.cpf}
          />
          <ListItem
            title="Nome da loja"
            hideChevron
          />
          <TextInput
            style={styles.singleLine}
            returnKeyType="next"
            onChangeText={(nomeLoja) => this.setState({nomeLoja})}
            value={this.state.nomeLoja}
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