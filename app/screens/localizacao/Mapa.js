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

const { width, height } = Dimensions.get('window')

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
          latitude: -22.911265, 
          longitude: -47.045484
        },
        title: this.props.navigation.state.params.vendedorNome,
        description: 'Local onde está '+this.props.navigation.state.params.vendedorNome
      },
      refreshing: false,   
      carregou: true
    }
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
          this.setState({
            me: {
              latlng:{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              },
              title: 'Você :)',
              description: 'Sua posição'
            },
            vendedor:{
              latlng:{
                latitude: vendedor.latitude, 
                longitude: vendedor.longitude
              },
              title: this.props.navigation.state.params.vendedorNome,
              description: 'Local onde está '+this.props.navigation.state.params.vendedorNome
            }
          })
          this.setState({refreshing: false})
          this.setState({carregou: false})
        })
    }, (error) => {
      this.setState({ //TODO:  tratar caso dê ruim
        me:{
          latlng:{
            latitude: 0,
            longitude: 0
          }
        }
      })
    })
  }

  calculaDelta(latLong) {
    //latLong = array de {latitude, longitude}
    let minX, maxX, minY, maxY
  
    //primeiro ponto
    ((point) => {
      minX = point.latitude*1.00002
      maxX = point.latitude*1.00002
      minY = point.longitude*1.00002
      maxY = point.longitude*1.00002
    })(latLong[0])
  
    //calcula a reta
    latLong.map((point) => {
      minX = Math.min(minX, point.latitude/1.00002)
      maxX = Math.max(maxX, point.latitude/1.00002)
      minY = Math.min(minY, point.longitude/1.00002)
      maxY = Math.max(maxY, point.longitude/1.00002)
    })
  
    const midX = (minX + maxX) / 2
    const midY = (minY + maxY) / 2
    const deltaX = (maxX - minX)
    const deltaY = (maxY - minY)
  
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    }
  }

  loadMap() {
    return <View style={styles.containerMapa}>
      <MapView style={styles.mapa} 
      region={this.calculaDelta([this.state.me.latlng, this.state.vendedor.latlng])}
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