import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combineReducers from './app/reducer/index'
import DrawerMenu from './app/ContanstPage/flows'
import { View, StatusBar, NetInfo} from 'react-native'
import SocketEmitPage from './app/ViewPage/SocketEmitPage'

type Props = {};
type State = {}
console.disableYellowBox = true
const store = createStore(combineReducers)
class App extends Component<Props, State> {
  render () {
    // Text.defaultProps.style = {fontFamily: 'Roboto-Regular'}
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <SocketEmitPage/>
          <DrawerMenu/>
        </View>
      </Provider>
    )
  }
}

export default (App)

