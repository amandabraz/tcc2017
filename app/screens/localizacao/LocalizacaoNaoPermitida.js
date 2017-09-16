
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

class LocalizacaoNaoPermitida extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenName: props.screenName,
            navigation: props.navigation,
            userId: props.userId
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <MaterialsIcon name="location-off" size={120} color={'#8B636C'}  />
                <Text style={styles.titulo}> Ative sua localização</Text>                 
                <Text style={styles.texto}> Para utilizar este aplicativo, é necessário permitir o uso do GPS.</Text> 
                <Button style={styles.button} color={'#8B636C'}
                    onPress={() => this.state.navigation.navigate(this.state.screenName, {userId: this.state.userId})} 
                    title='Tentar novamente'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40
    },
    titulo: {
        fontWeight: 'bold', 
        fontSize: 20, 
        textAlign: 'center'
    },
    texto: {
        fontStyle: 'italic', 
        textAlign: 'center'
    },
    button: {
        margin: 20,
        justifyContent: 'center',
        height: 20,
        alignSelf: 'stretch',
    },
    font: {
        fontWeight: 'bold',
        color:'white',
        alignSelf: 'center',
    }
  });

export default LocalizacaoNaoPermitida;