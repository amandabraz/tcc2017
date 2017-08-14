/**
* Campos da tela de cadastro específico de Vendedor:
* Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/
import React, { Component } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Alert, ToastAndroid, Text, Dimensions } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import { Kohana } from 'react-native-textinput-effects';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';

const { width, height } = Dimensions.get("window");

class Vendedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pagamentosArray: [],
        nomeLoja: '',
        meiosPagamento: []
    }
  }

  componentWillMount() {
    fetch('http://10.0.2.2:8080/pagamento').then(function(response) => {
      Alert.alert(response);
    })
  }

 pagamentoEscolhido = () => {
     if (this.state.meiosPagamento.length > 0) {
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
          nomeLoja,
          meiosPagamento
        }
      } = this;
      // TODO: receber o parametro usuario da tela CADASTRO basico, ainda em desenvolvimento
      vendedor = {
        "usuario": 1,
        "nomeFantasia": nomeLoja,
        "meiosPagamento": meiosPagamento
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
              ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
              // TODO: acertar a navegação para a próxima tela, a ser criada
              this.props.navigation.navigate('TabsVendedor');
            })
            .catch((error) => {
              // TODO: melhorar erro? combinar padrão de erro no app!
              Alert.alert("error Response", JSON.stringify(error));
              console.error(error);
            });
    }
  };
  onClick(meiosPagamento) {
    meiosPagamento.checked = !meiosPagamento.checked;
    this.setState({
      meiosPagamento,
    });
  }
  renderView() {
    var len = this.state.pagamentosArray.length;
    var views = [];
    for (var i = 0, l = len - 2; i < l; i += 2) {
        views.push(
            <View key={i}>
                <View style={styles.item}>
                    {this.renderCheckBox(this.state.pagamentosArray[i])}
                    {this.renderCheckBox(this.state.pagamentosArray[i + 1])}
                </View>
                <View style={styles.line}/>
            </View>
        )
    }
    views.push(
        <View key={len - 1}>
            <View style={styles.item}>
                {len % 2 === 0 ? this.renderCheckBox(this.state.pagamentosArray[len - 2]) : null}
                {this.renderCheckBox(this.state.pagamentosArray[len - 1])}
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
              <Kohana
                style={{ height: 45 }}
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
                      {this.renderView()}
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
