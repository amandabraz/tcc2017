import TimerMixin from 'react-timer-mixin';
import Alert from 'react-native';

var timer = require('react-timer-mixin')

const startTimerLocation = {

 	start: (seconds, message, times) => {

		for(let i = 0; i < times; i++){
			timer = setTimeout(() => {
				alert(message)
			}, seconds);
		}
	},

	stop: () => {
		clearTimeout(timer);
	},

	alert: (message) => {
		Alert.alert(message);
	}
}

export default startTimerLocation;