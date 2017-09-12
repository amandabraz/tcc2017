
import React, { Component } from 'react';
import { Text } from 'react-native';

class LocationAllowedCheck extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     this._setPosition();
    // }

    getPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                position: position
            });
        }, (error) => {
            alert(error)
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    verificaLocalizacaoFlag(localizacao) {
        if (localizacao) {
          Alert.alert(
            'Ative uso de localização!',
            'Para utilizar este aplicativo, é necessário permitir o uso do GPS.',
            [
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Permitir', onPress: () => {
                this.getPosition();
                fetch("", {method: 'PUT'})
                  .then((response) => response.json())
                  .then((responseJson) => {
                    if (!responseJson.errorMessage) {
                      // implement stuff here
                    }
                  });
                }
              },
            ],
            { cancelable: false }
          )
        }
      }
    

}

export default LocationAllowedCheck;