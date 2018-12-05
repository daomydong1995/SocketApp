import React, { Component } from 'react'
import {
  View,
  Text, Platform, TouchableOpacity, SafeAreaView
} from 'react-native'
import Header from 'react-native-elements/src/header/Header'

type Props = {
  title: string,
  handleRightButton: Function,
  handleLeftButton: Function,
  leftView: Object,
  rightView: Object,
  headerStyle: Object

}
type State = {}

class HeaderCustom extends Component<Props, State> {
  renderLeftView () {
    return (
      <TouchableOpacity onPress={this.props.handleLeftButton}>
        {this.props.leftView}
      </TouchableOpacity>
    )
  }

  renderRightView () {
    return (
      <TouchableOpacity onPress={this.props.handleRightButton}>
        {this.props.rightView}
      </TouchableOpacity>)
  }

  render () {
    const {headerStyle} = this.props
    const {containerBackStyle, leftViewStyle, titleStyle, rightViewStyle} = style
    return (
      <View style={[containerBackStyle, headerStyle]}>
        <View style={leftViewStyle}>
          {this.renderLeftView()}
        </View>
        <Text style={[titleStyle, this.props.titleStyle]}>
          {this.props.title}</Text>
        <View style={rightViewStyle}>
          {this.renderRightView()}
        </View>
      </View>
    )
  }
}

const style = {
  containerBackStyle: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 25,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#476190',
    shadowOffset: {
      width: 0,
      height: 0},
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  leftViewStyle: {
    width: 30,
    alignItems: 'flex-end',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  rightViewStyle: {
    width: 30
  }
}

export default HeaderCustom
