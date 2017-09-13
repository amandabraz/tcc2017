
function verificaLocalizacao(localizacao, userId) {

    if (!localizacao) {
        Alert.alert(
          'Ative uso de localização!',
          'Para utilizar este aplicativo, é necessário permitir o uso do GPS.',
          [
            {text: 'Não permitir', onPress: () => {return false;}, style: 'cancel'},
            {text: 'Permitir', onPress: () => {
              // Chamando posição para triggar o permitir do dispositivo
              this.getPosition();
              fetch("http://10.0.2.2:8080/usuario/" + userId + "/localizacao", {method: 'PUT'})
                .then((response) => response.json())
                .then((responseJson) => {
                  if (!responseJson.errorMessage) {
                    Alert.alert("Localização ativada com sucesso!");
                    return true;
                  } 
                });
              }
            },
          ],
          { cancelable: false }
        )
      } else {
        var position = this.getPosition();
        if (!position) {
            // Se a posição for nula, o GPS está desligado
            Alert.alert("Para utilizar este aplicativo, é necessário o uso do seu GPS. Tenha certeza de que ele está ativo no seu celular.");
            return false;
        } else {
            return true;
        }
    }
}

function getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
            position: position
        });
        return position;
    }, (error) => {
        return null;
    }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
};
