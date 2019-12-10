import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import BreedScreen from '../screens/BreedScreen';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Dog Breeds Page',
      },
    },
    Breed: {
      screen: BreedScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.name + "'s Details Page ",
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
