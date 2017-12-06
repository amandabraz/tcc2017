import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  View
} from 'react-native'
import * as constante from '../../constantes'
import MapView from 'react-native-maps'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import NavigationBar from 'react-native-navbar'
import Spinner from 'react-native-loading-spinner-overlay'

const { width, height } = Dimensions.get('window')

const vendNome = '';

class Mapa extends Component {

  constructor(props) {
    super(props)
    this.state = {
      vendedorId: this.props.navigation.state.params.vendedorUserId,
      vendedorNome: this.props.navigation.state.params.vendedorNome,
      me:{
        latlng:{
          latitude: 0,
          longitude: 0
        },
        title: '',
        description: ''
      },
      vendedor:{
        latlng:{
          latitude: 0, 
          longitude: 0
        },
        title: 'Vendedor',
        description: 'Local onde está o(a) vendedor(a)'
      },
      region:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      carregou: true
    }
    vendNome = this.props.navigation.state.params.vendedorNome
    this.atualizaMapa()
  }

  atualizaMapa() {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(constante.ENDPOINT+'localizacoes/usuario/' + this.state.vendedorId)
      .then((response) => response.json())
        .then((vendedor) => {
          if (!vendedor.errorMessage) {
             //TODO: TRATAR CASO NÃO VENHA
          }

          let latLong = [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            {
              latitude: vendedor.latitude, 
              longitude: vendedor.longitude
            }
          ]

           //latLong = array de {latitude, longitude}
          let minX, maxX, minY, maxY
          
          //primeiro ponto
          ((point) => {
            minX = point.latitude*1.0003
            maxX = point.latitude*1.0003
            minY = point.longitude*1.0003
            maxY = point.longitude*1.0003
          })(latLong[0])

          //[this.state.me.latlng, this.state.vendedor.latlng]
        
          //calcula a reta
          latLong.map((point) => {
            minX = Math.min(minX, point.latitude/1.0003)
            maxX = Math.max(maxX, point.latitude/1.0003)
            minY = Math.min(minY, point.longitude/1.0003)
            maxY = Math.max(maxY, point.longitude/1.0003)
          })
        
          const midX = (minX + maxX) / 2
          const midY = (minY + maxY) / 2
          const deltaX = (maxX - minX)
          const deltaY = (maxY - minY)

          this.setState({
            me: {
              latlng:latLong[0],
              title: 'Você :)',
              description: 'Sua posição'
            },
            vendedor:{
              latlng:latLong[1],
              title: vendNome,
              description: 'Local onde está '+vendNome
            },
            region:{
              latitude: midX,
              longitude: midY,
              latitudeDelta: deltaX,
              longitudeDelta: deltaY
            }
          })
          this.setState({carregou: false})
        })
    }, (error) => {
      this.setState({
        me:{
          latlng:{
            latitude: 0,
            longitude: 0
          }
        }
      })
    })
  }

  loadMap() {
    return <View style={styles.containerMapa}>
      <MapView style={styles.mapa} 
      region={this.state.region}
      >
        <MapView.Marker
          coordinate={this.state.me.latlng}
          title={this.state.me.title}
          description={this.state.me.description}
        />
        <MapView.Marker
          coordinate={this.state.vendedor.latlng}
          title={this.state.vendedor.title}
          description={this.state.vendedor.description}
        />
      </MapView>
    </View>
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
        />
        <Spinner visible={this.state.carregou}/>
        <View style={{height: '95%'}}>
          {this.loadMap()}
        </View>
      </View>
    )
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