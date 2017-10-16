import React from 'react';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

// TELAS CRIADAS (TODAS DEVEM ESTAR LISTADAS)
import Login from '../screens/login/Login';
import Cliente from '../screens/cadastro/Cliente';
import PerfilCliente from '../screens/perfil/PerfilCliente';
import PerfilVendedor from '../screens/perfil/PerfilVendedor';
import HomeVendedor from '../screens/home/HomeVendedor';
import HomeCliente from '../screens/home/HomeCliente';
import ProdutosFavoritos from '../screens/produto/ProdutosFavoritos';
import RankingProdutos from '../screens/produto/RankingProdutos';
import GerenciaProduto from '../screens/produto/GerenciaProduto';
import BuscaProduto from '../screens/produto/BuscaProduto';
import ExibeProduto from '../screens/produto/ExibeProduto';
import AlteraProduto from '../screens/produto/AlteraProduto';
import ExibeComprar from '../screens/produto/ExibeComprar';
import ExibeComprovante from '../screens/produto/ExibeComprovante';
import ExibeVendedor from '../screens/produto/ExibeVendedor';
import PedidoCliente from '../screens/pedido/PedidoCliente';
import PedidosSolicitadosVendedor from '../screens/pedido/PedidosSolicitadosVendedor';
import PedidosConfirmadosVendedor from '../screens/pedido/PedidosConfirmadosVendedor';
import PedidosFinalizadosVendedor from '../screens/pedido/PedidosFinalizadosVendedor';
import PedidosSolicitadosCliente from '../screens/pedido/PedidosSolicitadosCliente';
import PedidosConfirmadosCliente from '../screens/pedido/PedidosConfirmadosCliente';
import PedidosFinalizadosCliente from '../screens/pedido/PedidosFinalizadosCliente';
import LerTokenPedido from '../screens/pedido/LerTokenPedido';
import Estatisticas from '../screens/estatisticas/Estatisticas';
import CadastroProduto from '../screens/cadastro_produto/CadastroProduto';
import Cadastro from '../screens/cadastro/Cadastro';
import Vendedor from '../screens/cadastro/Vendedor';
import LocalizacaoNaoPermitida from '../screens/localizacao/LocalizacaoNaoPermitida';

/**
MENU SOMENTE PARA CLIENTE
**/
export const BuscaPro = StackNavigator({
  BuscaProduto: {
    screen: BuscaProduto
  },
  ExibeProduto: {
    screen: ExibeProduto
  },
  ExibeComprar: {
    screen: ExibeComprar
  },
  ExibeComprovante: {
    screen: ExibeComprovante
  },
  ExibeVendedor: {
    screen: ExibeVendedor
  },
 },
 {
  mode: 'card',
  lazy: true,
  headerMode: 'none',
});

export const GerenciaPedidosClientes = TabNavigator({
  Solicitados: {
    screen: PedidosSolicitadosCliente
  },
  Confirmados: {
    screen: PedidosConfirmadosCliente
  },
  Finalizados: {
    screen: PedidosFinalizadosCliente
  },
 },
 {
   tabBarPosition: 'top',
   lazy: true,
   swipeEnabled: false,
   animationEnabled: false,
   backBehavior: 'none',
   tabBarOptions: {
     showLabel: true,
     activeTintColor: '#333333',
     inactiveTintColor: '#fff',
     labelStyle: {
       fontSize: 12,
     },
     style: {
       backgroundColor: '#4682b4',
     },
     indicatorStyle: {
       backgroundColor: 'white',
     }
   }
});

export const TabsCliente = TabNavigator({
    PerfilCliente: {
      screen: PerfilCliente,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="account-box" size={25} color={tintColor} />
      },
    },
    PedidosCliente: {
      screen: GerenciaPedidosClientes,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="receipt" size={25} color={tintColor} />
      },
    },
    Home: {
      screen: HomeCliente,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={28} color={tintColor} />
      },
    },
    Favoritos: {
      screen: ProdutosFavoritos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="star" size={25} color={tintColor} />
      },
    },
    Ranking: {
      screen: RankingProdutos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon name="bar-chart" size={20} color={tintColor} />
      },
    }
  },{
    initialRouteName: 'Home',
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#8fbc8f',
      inactiveTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#2f4f4f',
      },
      indicatorStyle: {
        backgroundColor: 'white',
      }
    }
  });


export const GerenciaPedidos = TabNavigator({
    Solicitados: {
      screen: PedidosSolicitadosVendedor
    },
    Confirmados: {
      screen: PedidosConfirmadosVendedor
    },
    Finalizados: {
      screen: PedidosFinalizadosVendedor
    }
  }, {
    tabBarPosition: 'top',
    lazy: false,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#333333',
      inactiveTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#4682b4',
      },
      indicatorStyle: {
        backgroundColor: 'white',
      }
    }
});

export const GerenciaProdutos = StackNavigator({
  GerenciaProduto: {
      screen: GerenciaProduto,
    },
  CadastroProduto: {
      screen: CadastroProduto,
      navigationOptions: {
        title: 'Novo Produto'
      }
    },
  AlteraProduto: {
        screen: AlteraProduto,
      },
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});

/**
MENU SOMENTE PARA VENDEDORES
**/
export const TabsVendedor = TabNavigator({
    GerenciaProdutos: {
      screen: GerenciaProdutos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />
      },
    },
    Estatisticas: {
      screen: Estatisticas,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon name="bar-chart" size={20} color={tintColor} />
      },
    },
    Home: {
      screen: HomeVendedor,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={28} color={tintColor} />
      },
    },
    PerfilVendedor: {
      screen: PerfilVendedor,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="account-box" size={25} color={tintColor} />
      },
    },
    Pedidos: {
      screen: GerenciaPedidos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="receipt" size={25} color={tintColor} />
      },
    }
  },{
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#333333',
      inactiveTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#4682b4',
      },
      indicatorStyle: {
        backgroundColor: 'white',
       }
    }
});

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
  TabsCliente: {
    screen: TabsCliente,
  },
  TabsVendedor: {
    screen: TabsVendedor,
  },
  LocalizacaoNaoPermitida: {
    screen: LocalizacaoNaoPermitida,
  },
}, {
  mode: 'card',
  lazy: true,
  headerMode: 'none',
});
