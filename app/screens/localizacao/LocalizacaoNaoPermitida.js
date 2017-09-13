
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

class LocalizacaoNaoPermitida extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <MaterialsIcon name="location-off" size={120} color={'#8B636C'}  />                
                <Text style={{fontStyle: 'italic'}}> Ative seu GPS para utilizar o aplicativo!</Text> 
            </View>
        );
    }
}

export default LocalizacaoNaoPermitida;