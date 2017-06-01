import React from 'react';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


//Coisas comentadas vieram do exemplo que utilizei,
//retirado deste link: https://hackernoon.com/getting-started-with-react-navigation-the-navigation-solution-for-react-native-ea3f4bd786a4
// Não retirei tudo pois achei que pudesse ser útil...

import Login from '../screens/login/Login';
import Cadastro from '../screens/cadastro/Cadastro';
import Vendedor from '../screens/cadastro/Vendedor';
import Cliente from '../screens/cadastro/Cliente';
import PerfilCliente from '../screens/perfil/PerfilCliente';
import PerfilVendedor from '../screens/perfilVendedor/PerfilVendedor';
import HomeVendedor from '../screens/home/HomeVendedor';
import HomeCliente from '../screens/home/HomeCliente';


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

/**
MENU SOMENTE PARA VENDEDORES
**/
export const TabsVendedor = TabNavigator({
  Loja: {
    screen: HomeVendedor,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />
      },
    },
  },
  Estatísticas: {
    screen: HomeVendedor,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor }) => <FontAwesomeIcon name="bar-chart" size={20} color={tintColor} />
      },
    },
  },
  Home: {
    screen: HomeVendedor,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />
      },
    },
  },
  Perfil: {
    screen: PerfilVendedor,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor }) => <Icon name="account-box" size={25} color={tintColor} />
      },
    },
  },
  Configuração: {
    screen: HomeVendedor,
    navigationOptions: {
      tabBar: {
        icon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />
      },
    },
  }
},{
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#8fbc8f',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#2f4f4f',
    },
  }
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
  TabsVendedor: {
    screen: TabsVendedor
  }
}, {
  mode: 'card',
  headerMode: 'none',
});
