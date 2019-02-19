import { Component } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  userName: string,
  userCode: string
}
type State = {}

class SmartCardLogoComponent extends Component<Props, State> {
  render () {
    const {userName, userCode} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.textTileStyle}>Thông tin thẻ SmartCard</Text>
          <ImageBackground style={styles.imageStyle} source={require('../../../../assets/images/smartCard.png')}>
            <View style={{marginBottom: 30,marginRight: 10,alignItems: 'flex-end'}}>
              <Text style={styles.textNameStyle}>{userName !== null ? userName.toUpperCase().trim() : null}</Text>
              <Text style={styles.textCodeStyle}>{userCode !== null ? userCode.toUpperCase().trim() : null}</Text>
            </View>
          </ImageBackground>
      </View>
    )
  }
}

export default SmartCardLogoComponent

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  imageStyle: {
    width: 406 * 0.8,
    height: 239 *0.8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textNameStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C8AC56'
  },
  textCodeStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C8AC56'
  },
  textTileStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },

})
