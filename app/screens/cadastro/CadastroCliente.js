import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';

export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  render () {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor="#95c9db"
        />
        <TouchableOpacity onPress={this._showModal}>
          <Text>Tela onde ficara edicao</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Edicao de cadastro!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

  //CSS
  const titleConfig = {
    title: 'Cadastro Cliente',
    tintColor: "#dc143c",
    fontFamily: 'Roboto',
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
  },
});

AppRegistry.registerComponent('tcc2017', () => tcc2017);
