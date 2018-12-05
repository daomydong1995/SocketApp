import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combineReducers from './app/reducer/index'
import DrawerMenu from './app/ContanstPage/flows'
import {View} from 'react-native'
type Props = {};
type State = {}
console.disableYellowBox = true;
class App extends Component<Props, State> {
    render () {
        return (
            <Provider store={createStore(combineReducers)}>
                <View style={{flex: 1}}>
                    <DrawerMenu/>
                </View>
            </Provider>
        )
    }
}
export default (App)
