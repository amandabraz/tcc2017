import React, {
    Component
  } from 'react';
  import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Popup from 'react-native-popup';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
    Fumi
} from 'react-native-textinput-effects';

export default class ExibeComprar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            produtoId: this.props.navigation.state.params.produtoId,
        }
    }

    _confirmTest() {
        this.popup.confirm({
            title: 'Confirmar Compra',
            content: ['Deseja efetuar a compra deste produto?'],
            ok: {
                text: 'Confirmar',
                style: {
                    color: 'green',
                    fontWeight: 'bold'
                },
                callback: () => {
                    this.props.navigation.navigate('ExibeComprovante', {pedidoId: this.state.pedidoId});
                }
            },
            cancel: {
                text: 'Cancelar',
                style: {
                    color: 'red'
                }
            }
        });
    }
    
    render() {
        return(
            <View>
            </View>
        );
    }
};    

AppRegistry.registerComponent('tcc2017', () => tcc2017);
