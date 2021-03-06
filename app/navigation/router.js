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
import RankingProdutos from '../screens/ranking/RankingProdutos';
import RankingVendedores from '../screens/ranking/RankingVendedores';
import VendedoresFavoritos from '../screens/produto/VendedoresFavoritos';
import GerenciaProduto from '../screens/produto/GerenciaProduto';
import BuscaProduto from '../screens/produto/BuscaProduto';
import ExibeProduto from '../screens/produto/ExibeProduto';
import AlteraProduto from '../screens/produto/AlteraProduto';
import ExibeComprar from '../screens/produto/ExibeComprar';
import ExibeComprovante from '../screens/produto/ExibeComprovante';
import ExibeVendedor from '../screens/produto/ExibeVendedor';
import ExibeCliente from '../screens/pedido/ExibeCliente';
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
import TermoUso from '../screens/configuracao/TermoUso';
import AceiteTermoUso from '../screens/configuracao/AceiteTermoUso';
import Chat from '../screens/pedido/Chat';
import Mapa from '../screens/localizacao/Mapa';


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

export const Favoritos = StackNavigator({
  VendedoresFavoritos:{
    screen: VendedoresFavoritos
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


export const GerenciaPedidosConfirmadosCliente = StackNavigator({
  Confirmados: {
    screen: PedidosConfirmadosCliente
  },
  Chat:{
    screen: Chat
  },
  Mapa:{
    screen: Mapa
  },
  ExibeVendedor:{
    screen: ExibeVendedor
  },
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});

export const GerenciaPedidosSolicitadosCliente = StackNavigator({
  Solicitados: {
    screen: PedidosSolicitadosCliente
  },
  ExibeVendedor:{
    screen: ExibeVendedor
  },
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});

export const GerenciaPedidosFinalizadosCliente = StackNavigator({
  Finalizados: {
    screen: PedidosFinalizadosCliente
  },
  ExibeVendedor:{
    screen: ExibeVendedor
  },
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});


export const GerenciaPedidosClientes = TabNavigator({
  Solicitados: {
    screen: GerenciaPedidosSolicitadosCliente
  },
  Confirmados: {
    screen: GerenciaPedidosConfirmadosCliente,
  },
  Finalizados: {
    screen: GerenciaPedidosFinalizadosCliente
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
     activeTintColor: 'white',
     inactiveTintColor: 'white',
     labelStyle: {
       fontSize: 12,
     },
     style: {
       backgroundColor: '#624063',
     },
     indicatorStyle: {
       backgroundColor: 'white',
     }
   }
});

export const GerenciaRankingClientes = TabNavigator({
  Produtos: {
    screen: RankingProdutos
  },
  Vendedores: {
    screen: RankingVendedores
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
     activeTintColor: 'white',
     inactiveTintColor: 'white',
     labelStyle: {
       fontSize: 12,
     },
     style: {
       backgroundColor: '#624063',
     },
     indicatorStyle: {
       backgroundColor: 'white',
     }
   }
});

export const GerenciaRankingVendedores = TabNavigator({
  Estatisticas: {
    screen: Estatisticas
  },
  Produtos: {
    screen: RankingProdutos
  },
  Vendedores: {
    screen: RankingVendedores
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
       backgroundColor: '#7A8887',
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
      screen: BuscaPro,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={28} color={tintColor} />
      },
    },
    Favoritos: {
      screen: Favoritos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon name="heart" size={22} color={tintColor} />
      },
    },
    Ranking: {
      screen: GerenciaRankingClientes,
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
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#7F607B',
      },
      indicatorStyle: {
        backgroundColor: 'white',
       }
    }
  });

export const GerenciaPedidosConfirmadosV = StackNavigator({
    Confirmados: {
      screen: PedidosConfirmadosVendedor
    },
    LerToken: {
      screen: LerTokenPedido
    },
    Chat:{
      screen: Chat
    },
    Mapa:{
      screen: Mapa
    },
    ExibeCliente: {
      screen: ExibeCliente
    }
  }, {
      mode: 'card',
      headerMode: 'none',
      lazy: true
  });

export const GerenciaPedidosSolicitadosV = StackNavigator({
  Solicitados: {
    screen: PedidosSolicitadosVendedor
  },
  ExibeCliente: {
    screen: ExibeCliente
  }
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});

export const GerenciaPedidosFinalizadosV = StackNavigator({
  Finalizados: {
    screen: PedidosFinalizadosVendedor
  },
  ExibeCliente: {
    screen: ExibeCliente
  }
}, {
  mode: 'card',
  headerMode: 'none',
  lazy: true
});

export const GerenciaPedidos = TabNavigator({
    Solicitados: {
      screen: GerenciaPedidosSolicitadosV
    },
    Confirmados: {
      screen: GerenciaPedidosConfirmadosV
    },
    Finalizados: {
      screen: GerenciaPedidosFinalizadosV
    }
  }, {
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
        backgroundColor: '#7A8887',
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

//implementação para voltar duas telas
const defaultGetStateForAction = BuscaPro.router.getStateForAction;

BuscaPro.router.getStateForAction = (passedAction, state) => {
  if(state && state.routes && state.routes.length > 2
      && passedAction.type === 'POP_TWO_ROUTES') {
    let routes = state.routes.slice();
    routes.pop();
    routes.pop();

    return {
      index: routes.length - 1,
      routes: routes
    };
  }
  // default behaviour for none custom types
  return defaultGetStateForAction(passedAction, state);
}

/**
MENU SOMENTE PARA VENDEDORES
**/
export const TabsVendedor = TabNavigator({
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
    },
    Home: {
      screen: HomeVendedor,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={28} color={tintColor} />
      },
    },
    GerenciaProdutos: {
      screen: GerenciaProdutos,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />
      },
    },
    Estatisticas: {
      screen: GerenciaRankingVendedores,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <FontAwesomeIcon name="bar-chart" size={20} color={tintColor} />
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
        backgroundColor: '#4FA19D',
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
  TermoUso: {
    screen: TermoUso,
  },
  AceiteTermoUso: {
    screen: AceiteTermoUso,
  }
}, {
  mode: 'card',
  lazy: true,
  headerMode: 'none',
});
