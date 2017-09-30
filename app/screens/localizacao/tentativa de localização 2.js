var timer

var location_ = {
	latitude: "la",
	longitude: "lo",
	error: "e"
}

var position

const startTimerLocation = {

	geolocation: function (location_) {
		this.pos = navigator.geolocation.watchPosition(
			function (position) {
				console.log(position);
				let { latitude, longitude } = position.coords;
				this.obj = {
					latitude: latitude,
					longitude: longitude
				};
				console.log(this.obj);
			},
			function (error) {
				console.log(error)
// location_.latitude = "Erro na localização";
// location_.longitude = "Erro na localização";
// location_.error = error.message;
			return null;
		},
		{
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 1000,
			distanceFilter: 10
		},
		);
	},

	start: (seconds) => {
		timer = setInterval(() => {
			console.log(location_.latitude)
		}, seconds);
	},

	stop: () => {
		clearInterval(timer);
	}

}

let ob = startTimerLocation;
ob.init(1);