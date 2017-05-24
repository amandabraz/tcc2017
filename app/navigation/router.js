import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


//Coisas comentadas vieram do exemplo que utilizei,
//retirado deste link: https://hackernoon.com/getting-started-with-react-navigation-the-navigation-solution-for-react-native-ea3f4bd786a4
// Não retirei tudo pois achei que pudesse ser útil...

import Login from '../screens/login/Login';
import Cadastro from '../screens/cadastro/Cadastro';
import Vendedor from '../screens/cadastro/Vendedor';
import Cliente from '../screens/cadastro/Cliente';
import PerfilCliente from '../screens/perfil/Cliente';


// export const FeedStack = StackNavigator({
//   Feed: {
//     screen: Feed,
//     navigationOptions: {
//       title: 'Feed',
//     },
//   },
//   Details: {
//     screen: UserDetail,
//     navigationOptions: {
//       title: ({ state }) => `${state.params.name.first.toUpperCase()} ${state.params.name.last.toUpperCase()}`
//     },
//   },
// });

//TODO: definir menu em grupo
export const Tabs = TabNavigator({
  // Feed: {
  //   screen: FeedStack,
  //   navigationOptions: {
  //     tabBar: {
  //       label: 'Feed',
  //       icon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
  //     },
  //   },
  // },
  Vendedor2: {
    screen: Vendedor,
    navigationOptions: {
      tabBar: {
        label: 'Vendedor2',
        icon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
      },
    },
  },
});

// export const SettingsStack = StackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       title: 'Settings',
//     },
//   },
// });


// TODO: Creio que aqui colocamos uma logica pra dizer: se usuario está logado, carregar dashboard, senão, carregar tela de login
 // TODO: verificar se manteremos tudo aqui ou não... 
export const Root = StackNavigator({
  Login: {
    screen: Login,
  },
  Cadastro: {
    screen: Cadastro,
  },
  Vendedor: {
    screen: Vendedor,
  },
  Cliente: {
    screen: Cliente,
  },
  PerfilCliente: {
    screen: PerfilCliente,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
