import React, { Component } from 'react';
import Alert from 'react-native';
// import startTimerLocation from 'TimerGeolocation.js';

export default class MyGeolocation {

  localizacao = {
    latitude: 'teste',
    longitude: 'teste',
    erro: 'teste',
  }

  constructor() {
    this.returnPosition = this.returnPosition.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  setPosition(obj){
    this.localizacao = {
      latitude: obj.latitude,
      longitude: obj.longitude,
      localizacao: obj.localizacao
    }
  }

  getPosition() {
     navigator.geolocation.watchPosition(
      function (position) {
        let { latitude, longitude } = position.coords;
        // this.obj = {
        //   latitude: latitude,
        //   longitude: longitude
        // };
        setPosition({
          latitude: latitude,
          longitude: longitude,
          erro: null
        });
      },
      function (error) {
        // this.obj = { 
        //   erro: error.message 
        // };
        setPosition({
          latitude: "erro",
          longitude: "erro",
          erro: error.message
        })
      },
      { 
        enableHighAccuracy: true, 
        timeout: 20000, 
        maximumAge: 1000, 
        distanceFilter: 10 
      },
    );
    // this.localizacao = {
    //   latitude: pos.latitude,
    //   longitude: pos.longitude,
    //   erro: pos.erro,
    // }
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }

  static returnPosition () {
    this.getPosition();
    alert(loc.latitude);
    // return localizacao;
  }

  // render() {
  //   return (
  //       <Text>
  //         Latitude: {this.state.latitude}
  //         | Longitude: {this.state.longitude}
  //         | Error: {this.state.error}
  //       </Text>
  //   );
  // }
}