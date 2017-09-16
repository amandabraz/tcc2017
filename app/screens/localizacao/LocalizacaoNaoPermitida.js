
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

class LocalizacaoNaoPermitida extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 40}}>
                
                <MaterialsIcon name="location-off" size={120} color={'#8B636C'}  />
                <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}> Ative sua localização</Text>                 
                <Text style={{fontStyle: 'italic', textAlign: 'center'}}> Para utilizar este aplicativo, é necessário permitir o uso do GPS.</Text> 
                </View>
        );
    }
}

export default LocalizacaoNaoPermitida;