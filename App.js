import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combineReducers from './app/reducer/index'
import DrawerMenu from './app/ContanstPage/flows'
import { View, StatusBar } from 'react-native'

type Props = {};
type State = {}
console.disableYellowBox = true

class App extends Component<Props, State> {
  render () {
    return (
      <Provider store={createStore(combineReducers)}>
        <View style={{flex: 1}}>
          {/*<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>*/}
          <StatusBar hidden={true} />
          <DrawerMenu/>
        </View>
      </Provider>
    )
  }
}

export default (App)
