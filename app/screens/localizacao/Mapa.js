import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  View
} from 'react-native'
import MapView from 'react-native-maps'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import NavigationBar from 'react-native-navbar'

const { width, height } = Dimensions.get('window')

class Mapa extends Component {

  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: -22.9175807,
        longitude: -47.053437,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers:[
        {
          latlng:{
            latitude: -22.9175807,
            longitude: -47.053437
          },
          title: 'eu',
          description: 'minha posição'
        },
        {
          latlng:{
            latitude: -22.911265, 
            longitude: -47.045484
          },
          title: 'vendedor',
          description: 'posição vendedor'
        }
      ],
      refreshing: false,   
      carregou: true
    }
  }

  render() {
    const {goBack} = this.props.navigation
    const titleConfig = {
      title: 'Mapa de Localização',
      tintColor: '#4A4A4A',
      fontFamily: 'Roboto',
    }
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          leftButton={
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialsIcon name='chevron-left' size={40} color={'#4A4A4A'}  style={{ padding: 3 }} />
            </TouchableOpacity>
          }
          title={titleConfig}
          style={{backgroundColor:''}}
        />
        <View style={{height: '95%'}}>
          {this.loadMap()}
        </View>
      </View>
    )
  }

  loadMap() {
    return <View style={styles.containerMapa}>
      <MapView style={styles.mapa} 
      region={this.state.region}>
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  }
}

const styles = StyleSheet.create({
  containerMapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

Mapa.defaultProps = { ...Mapa }

export default Mapa