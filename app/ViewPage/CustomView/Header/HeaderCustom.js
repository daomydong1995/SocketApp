import React, { Component } from 'react'
import {
  View,
  Text, TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

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
      <TouchableOpacity style={style.leftViewStyle} onPress={this.props.handleLeftButton}>
        {this.props.leftView}
      </TouchableOpacity>
    )
  }

  renderRightView () {
    return (
      <TouchableOpacity style={style.rightViewStyle} onPress={this.props.handleRightButton}>
        {this.props.rightView}
      </TouchableOpacity>)
  }

  render () {
    const {headerStyle} = this.props
    const {containerBackStyle, titleStyle} = style
    return (
      <View style={style.container}>
        <View style={[containerBackStyle, headerStyle]}>
          {this.renderLeftView()}
          <Text style={[titleStyle, this.props.titleStyle]}>
            {this.props.title}
          </Text>
          {this.renderRightView()}
        </View>
        {!this.props.connected && <Text style={{color: 'red'}}>Mất kết nối đến máy chủ, vui lòng xem lại kết nối trong cài đặt</Text>}
      </View>
    )
  }
}

const style = {
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  containerBackStyle: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  titleStyle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 3,
  },
  leftViewStyle: {
    width: 50,
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  rightViewStyle: {
    width: 50,
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
  }
}
const mapStateToProps = state => ({
  connected: state.settingReducer.connected
})
export default connect(
  mapStateToProps, {
  }
)(HeaderCustom)
