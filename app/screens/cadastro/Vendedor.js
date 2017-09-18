/**
* Campos da tela de cadastro específico de Vendedor:
* Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/
import React, { Component } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Alert, ToastAndroid, Text, Dimensions } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import { Fumi } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';

const { width, height } = Dimensions.get("window");

class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId: this.props.navigation.state.params.userId,
        pagamentosArray: [],
        nomeLoja: '',
        meiosPagamentos: []
    }
    this.preencherPagamentosArray();
  }

  preencherPagamentosArray() {
    fetch('http://10.0.3.2:8080/meiopagamento')
      .then((response) => response.json())
        .then((responseJson) => {
          var pagamentosBuscados = [];
          for (i in responseJson) {
              pagamentosBuscados.push(responseJson[i]);
          }
          this.setState({pagamentosArray: pagamentosBuscados});
        });
  }

 pagamentoEscolhido = () => {
     if (this.state.meiosPagamentos.length > 0) {
       return true;
     }
     else {
       ToastAndroid.showWithGravity('Escolha ao menos um meio de pagamento', ToastAndroid.LONG, ToastAndroid.CENTER);
       return false;
     }

 }


  handleFinalizarPress = () => {
    var pagamento = this.pagamentoEscolhido();

    if (pagamento) {
      const {
        state: {
          userId,
          nomeLoja,
          meiosPagamentos
        }
      } = this;

      vendedor = {
        "usuario": userId,
        "nomeFantasia": nomeLoja,
        "meiosPagamentos": meiosPagamentos
      }

      //  TODO: restante dos parametros. alterar url abaixo para o servidor (enfiar essa constante em algum buraco)
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
              if (!responseJson.errorMessage) {
                ToastAndroid.showWithGravity('Cadastro finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
                this.props.navigation.navigate('TabsVendedor', {userId: responseJson.usuario.id, vendedorId: responseJson.id });
              } else {
                Alert.alert("Houve um erro ao efetuar o cadastro, tente novamente");
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }
  };
  onClick(descricao) {
    descricao.checked = !descricao.checked;
    var pagamentos = this.state.meiosPagamentos;
    pagamentos.push(descricao);
    this.setState({ meiosPagamentos: pagamentos });
  }

  mostrarCheckboxesPagamento() {
    var views = [];
    for(i in this.state.pagamentosArray) {
      let descricao = this.state.pagamentosArray[i];
      views.push (
        <View key={i} style={styles.item}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.onClick(descricao)}
            isChecked={descricao.checked}
            leftText={descricao.descricao}
            />
        </View>
      );
    }
    return views;
  }

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'ex: vegetariano, doce, salgado',
      placeholderTextColor: '#402B2E'
    };

    return (
      <View style={{flex: 1}}>
          <NavigationBar
            title={titleConfig}
            tintColor="aquamarine"
          />
        <View style={styles.container}>
          <ScrollView style={{ backgroundColor: '#fff' }}>
              <Fumi
                style={{ width: 375, height: 70 }}
                label={'Nome da sua loja'}
                iconClass={MaterialsIcon}
                iconName={'store'}
                iconColor={'#658091'}
                labelStyle={{ color: '#402B2E', fontSize: 20, fontFamily: 'Roboto' }}
                inputStyle={{ color: '#B27A81', fontSize: 20, fontFamily: 'Roboto' }}
                maxLength={30}
                onChangeText={(nomeLoja) => this.setState({nomeLoja})}
                value={this.state.nomeLoja}
                returnKeyType="next"
              />
              <Text style={{ paddingTop: 16, paddingLeft: 16, color: '#402B2E', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold' }}>
                  Meios de pagamento aceitos
              </Text>
              <View style={styles.container}>
                  <ScrollView>
                      {this.mostrarCheckboxesPagamento()}
                  </ScrollView>
              </View>
              <View style={{ flexDirection: 'column', flex: 1, height: 130, padding: 10 }}>
              </View>
            <Button
              title="Finalizar"
              buttonStyle={{ padding: 16, marginBottom: 3 }}
              onPress={this.handleFinalizarPress}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const titleConfig = {
  title: 'Cadastro do Vendedor',
  tintColor: "darkblue",
  fontFamily: 'Roboto',
};

var styles = StyleSheet.create({
  multiline: {
    height: 60,
    fontSize: 16,
    padding: 4,
    marginBottom: 10,
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
    height: 45,
  },
  container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 15
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
