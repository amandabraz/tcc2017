import Alert from 'react-native';

var timer

var position

const startTimerLocation = {
	start: (localizacao, seconds) => {
		timer = setInterval( 
			function (localizacao) {
				alert(localizacao.latitude)
			}, 
			seconds);
	},

	stop: () => {
		clearInterval(timer);
	}

}

// let ob = startTimerLocation;
// ob.init(1);

export default startTimerLocation;