import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


//Coisas comentadas vieram do exemplo que utilizei,
//retirado deste link: https://hackernoon.com/getting-started-with-react-navigation-the-navigation-solution-for-react-native-ea3f4bd786a4
// Não retirei tudo pois achei que pudesse ser útil...

// import Feed from '../screens/Feed';
// import Settings from '../screens/Settings';
// import UserDetail from '../screens/UserDetail';
import Vendedor from '../screens/Vendedor';

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

//Esse TabNavigator faz a navegação ser em Tabs.. talvez a gente possa mudar isso depois, quando tivermos mais coisas definidas
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
  Vendedor: {
    screen: Vendedor,
    navigationOptions: {
      tabBar: {
        label: 'Vendedor',
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

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  // Settings: {
  //   screen: SettingsStack,
  // },
}, {
  mode: 'modal',
  headerMode: 'none',
});
