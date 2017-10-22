import React, { Component } from 'react';
import {
  AppRegistry,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import LocalizacaoNaoPermitida from '../localizacao/LocalizacaoNaoPermitida';
import BuscaProduto from '../produto/BuscaProduto';
import Rating from 'react-native-rating';

class ExibeAvaliacaoProduto extends Component {


  render() {

    const images = {
    starFilled: require('./img/star_filled.png'),
    starUnfilled: require('./img/star_unfilled.png')
  }

      return(<Rating
    onChange={rating => console.log(rating)}
    selectedStar={images.starFilled}
    unselectedStar={images.starUnfilled}
    config={{
      easing: Easing.inOut(Easing.ease),
      duration: 350
    }}
    stagger={80}
    maxScale={1.4}
    starStyle={{
      width: 40,
      height: 40
    }}
  />
      );
  }
}

ExibeAvaliacaoProduto.defaultProps = { ...ExibeAvaliacaoProduto };

export default ExibeAvaliacaoProduto;
