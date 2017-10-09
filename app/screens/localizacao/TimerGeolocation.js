import * as constante from '../../constantes';

var timer

var position

const startTimerLocation = {
	start: (seconds, userId) => {
		timer = setInterval( 
			function () {
				navigator.geolocation.getCurrentPosition((position) => {
					console.log(position);
					var localizacao = {
						"usuario": userId,
						"latitude": position.coords.latitude,
						"longitude": position.coords.longitude,
						"altitude": position.coords.altitude,
						"precisao_mts": position.coords.accuracy
					};
					fetch(constante.ENDPOINT + '/localizacoes/', {
						method: 'POST',
						headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						},
						body: JSON.stringify(localizacao)
					  }).then((response) => response.json())
					  .then((responseJson) => {
						  if (!responseJson.errorMessage) {
							  console.log("Localizacao atualizada com sucesso");
						  }
					  });
				  }, (error) => {
					  //do nothing
				  });
			}, 
			seconds, userId);
	},

	stop: () => {
		clearInterval(timer);
	}

}
export default startTimerLocation;