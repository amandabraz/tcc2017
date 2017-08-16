import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Dimensions,
  ToastAndroid,
  ScrollView
} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import TagInput from 'react-native-tag-input';
import CheckBox from 'react-native-check-box';

const {width, height} = Dimensions.get("window");

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dietasArray: [],
        restricoesDieteticas: [],
        tags: []
    }
    this.preencherDietasArray();
  };

  preencherDietasArray() {
    fetch('http://10.0.2.2:8080/restricaodietetica')
      .then((response) => response.json())
        .then((responseJson) => {
          var dietasBuscadas = [];
            for (i in responseJson) {
              dietasBuscadas.push(responseJson[i]);
            }
        this.setState({dietasArray: dietasBuscadas});
        });
  };

  salvarTags(tags) {
    var tagsOrganizadas = [];
    for(i in tags) {
    fetch('http://10.0.2.2:8080/tag', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tags[i])
    })
      .then((response) => response.json())
      .then((responseJson) => {
          tagsOrganizadas.push(responseJson);

      });
    }
    Alert.alert(JSON.stringify(tagsOrganizadas[0]));
    return tagsOrganizadas;
  }

  handleFinalizarPress = () => {
      const {
        state: {
          tags,
          restricoesDieteticas
      }
    } = this;

    var tagsSalvas = this.salvarTags(tags);
    Alert.alert(JSON.stringify(tagsSalvas[0]));
    return;
    cliente = {
      "usuario": 1,
      "tags": tagsSalvas,
      "restricoesDieteticas": restricoesDieteticas
    }
      fetch('http://10.0.2.2:8080/cliente', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
      })
        .then((response) => response.json())
        .then((reponseJson) => {
          if (!responseJson.errorMessage) {
            ToastAndroid.showWithGravity('Cadastro finalizado!', ToastAndroid.LONG, ToastAndroid.CENTER);
            this.props.navigation.navigate('TabsCliente');
          } else {
            Alert.alert("Houve um erro ao efetuar o cadastro, tente novamente");
          }
        })
        .catch((error) => {
          Alert.alert("error Response", JSON.stringify(error));
          console.error(error);
        });
  };

  onClick(descricao) {
    descricao.checked = !descricao.checked;
    var restricoes = this.state.restricoesDieteticas;
    restricoes.push(descricao);
    this.setState({restricoesDieteticas: restricoes});
  };

  mostrarCheckboxesDieta() {
    var views = [];
    for(i in this.state.dietasArray) {
      var descricao = this.state.dietasArray[i];
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
  };

  render() {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'ex: brigadeiro, doce, paçoca',
      placeholderTextColor: '#dc143c',
      height:300
    };

    return (
      <View style={{flex: 1}}>
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <View style={styles.container}>

              <Text style={{ paddingTop: 16, paddingLeft: 16, color: '#402B2E', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold' }}>
                  Selecione sua dieta:
              </Text>
              <View style={styles.container}>
                  <ScrollView>
                      {this.mostrarCheckboxesDieta()}
                  </ScrollView>
              </View>
              <Text style={{ paddingTop: 16, paddingLeft: 16, color: '#402B2E', fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold' }}>
                Adicione suas tags:
              </Text>
          <View style={{ flexDirection: 'column', flex: 1}}>

          <TagInput
            value={this.state.tags}
            onChange={(tags) => this.setState({tags,})}
            tagColor="pink"
            tagTextColor="white"
            inputProps={inputProps}
            numberOfLines={15}
          />
          </View>
          <Button onPress={this.handleFinalizarPress} title="Finalizar" color="#dc143c" />
        </View>
      </View>
    );
  }
}

const titleConfig = {
  title: 'Cadastro Cliente',
  tintColor: "#dc143c",
  fontFamily: 'Roboto',
};

const styles = StyleSheet.create({
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

Cliente.defaultProps = { ...Cliente };

export default Cliente;
