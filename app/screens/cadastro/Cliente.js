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
        dietasArray: ["Nenhuma", "Low Carb", "Vegetariana", "Vegana", "Frugívora", "Paleolítica", "Mediterrânea", "Detox", "Celíaca", "Outras…" ],
        restricoesDieteticas: [],
        tags: []
    }
  }

handleFinalizarPress = () => {
  if (dieta) {
    const {
      state: {
        tags,
        restricoesDieteticas
    }
  } = this;

  cliente = {
    "usuario": 1,
    "tags": tags,
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
      ToastAndroid.showWithGravity('Success!!', ToastAndroid.LONG, ToastAndroid.CENTER);
      this.props.navigation.navigate('TabsCliente');
    })
    .catch((error) => {
      Alert.alert("error Response", JSON.stringify(error));
      console.error(error);
    });
}
};

onClick(restricoesDieteticas) {
  restricoesDieteticas.checked = !restricoesDieteticas.checked;
  this.setState({
    restricoesDieteticas,
  });
}
renderView() {
  var len = this.state.dietasArray.length;
  var views = [];
  for (var i = 0, l = len - 2; i < l; i += 2) {
      views.push(
          <View key={i}>
              <View style={styles.item}>
                  {this.renderCheckBox(this.state.dietasArray[i])}
                  {this.renderCheckBox(this.state.dietasArray[i + 1])}
              </View>
              <View style={styles.line}/>
          </View>
      )
  }

  views.push(
      <View key={len - 1}>
          <View style={styles.item}>
              {len % 2 === 0 ? this.renderCheckBox(this.state.dietasArray[len - 2]) : null}
              {this.renderCheckBox(this.state.dietasArray[len - 1])}
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

  onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

  botaoFinalizar = () => {
    this.props.navigation.navigate('TabsCliente');
  }

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
                      {this.renderView()}
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
          <Button onPress={this.botaoFinalizar} title="Finalizar" color="#dc143c" />
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
