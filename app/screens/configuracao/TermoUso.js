import React, {
  Component
} from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  Button,
  Icon
} from 'react-native-elements';
import NavigationBar from 'react-native-navbar';

class TermoUso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      };
    };


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.oneResult1}>
          <View style={{borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        padding: 10,
                        margin: 10}}>
            <Text style={{fontSize: 20,
                          padding: 5,
                          color: '#88557B',
                          alignSelf: 'center'}}>
                          Termos de Uso
            </Text>
          </View>

          <View style={{width: '80%', paddingLeft: 6}}>
          <Text > {'\n'}</Text>
          <Text >Quantidade:
            <Text > {'\n'}</Text>
          </Text>
          <Text >Total a pagar :</Text>
          <Text > R$ {'\n'}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button buttonStyle={{width: '75%'}}
                    title ="Não aceito"
                    color="#fff"
                    backgroundColor="#768888"
                    borderRadius={10}
            />

            <Button buttonStyle={{width: '75%'}}
                    title="Aceito"
                    color="#fff"
                    backgroundColor="#88557B"
                    borderRadius={10}
            />
          </View>
        </View>
      </View>
    )
  }
}

const titleConfig = {
  title: 'Termos de Uso',
  tintColor: "#DCDCDC",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  oneResult1:{
     backgroundColor: 'rgba(255, 255, 255, 0.55)',
     borderWidth: 1,
     borderRadius: 10,
     borderColor: '#fff',
     padding: 10,
     margin: 10,
     width: '95%'
  }
});

export default TermoUso;
