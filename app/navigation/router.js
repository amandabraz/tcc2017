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
import PedidosCliente from '../screens/pedido/PedidosCliente';
import PedidosVendedor from '../screens/pedido/PedidosVendedor';
import Estatisticas from '../screens/estatisticas/Estatisticas';
import CadastroProduto from '../screens/cadastro_produto/CadastroProduto';
import Cadastro from '../screens/cadastro/Cadastro';
import Vendedor from '../screens/cadastro/Vendedor';
import LocalizacaoNaoPermitida from '../screens/localizacao/LocalizacaoNaoPermitida';

/**
MENU SOMENTE PARA CLIENTE
**/
export const GerenciaCliente = StackNavigator({
  PerfilCliente: {
    screen: PerfilCliente
  },
  ExibeProduto: {
    screen: ExibeProduto
  },
  ExibeVendedor: {
    screen: ExibeVendedor
  },
  PedidosCliente: {
    screen: PedidosCliente
  }
 }, {
  mode: 'card',
  lazy: true,
  headerMode: 'none',
});

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

export const TabsCliente = TabNavigator({
    PerfilCliente: {
      screen: GerenciaCliente,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="account-box" size={25} color={tintColor} />
        },
      },
    },
    Busca: {
      screen: BuscaPro,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="receipt" size={25} color={tintColor} />
        },
      },
    },
    Home: {
      screen: HomeCliente,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor} />
        },
      },
    },
    Favoritos: {
      screen: ProdutosFavoritos,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="star" size={25} color={tintColor} />
        },
      },
    },
    Ranking: {
      screen: RankingProdutos,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <FontAwesomeIcon name="bar-chart" size={20} color={tintColor} />
        },
      },
    }
  },{
    initialRouteName: 'Home',
    tabBarComponent: TabView.TabBarBottom,
    lazy: true,
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

export const GerenciaVendedor = StackNavigator({
    PerfilVendedor: {
      screen: PerfilVendedor
    },
    PedidosVendedor: {
      screen: PedidosVendedor
    }
  }, {
    mode: 'card',
    headerMode: 'none',
    lazy: true
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
        tabBar: {
          icon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />
        },
      },
    },
    Estatisticas: {
      screen: Estatisticas,
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
    GerenciaVendedor: {
      screen: GerenciaVendedor,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="account-box" size={25} color={tintColor} />
        },
      },
    },
    // TODO: colocar outra rota no lugar de configuracao já que ele foi pra dentro de GerenciaVendedor
    Configuração: {
      screen: PedidosVendedor,
      navigationOptions: {
        tabBar: {
          icon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />
        },
      },
    }
  },{
    initialRouteName: 'Home',
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#333333',
      inactiveTintColor: '#fff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#4682b4',
      },
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
