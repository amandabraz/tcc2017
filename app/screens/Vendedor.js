import React from 'react';
import {
  Button,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

/**
* Campos da tela de cadastro específico de Vendedor:
* Horário e Dias de Funcionamento, CPF, Palavras Chave de identificação do produto, Nome fantasia da Empresa, e Meios de Pagamentos aceitos na compra
*/

var Vendedor = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          CPF:
        </Text>
        <TextInput>

        </TextInput>
      </View>

      <Button type='blue' title='Finalizar'></Button>
    );
  }
});

export default Vendedor;
