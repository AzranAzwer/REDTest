import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import HomeScreen from './src/screens/HomeScreen';
import reducer from './src/redux/reducers/DogBreeds';
import AppContainer from './src/navigation/AuthNavigation';

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
