import { Component } from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
const iconSource = require('../../../../assets/images/date_icon.png')
type Props = {
  textDate: String
}

class DateTextBox extends Component<Props,State> {
  render(){
    return(
    <View style={[styles.container,this.props.container]}>
      <TextInput style={[styles.titleStyle]}>{this.props.textDate}</TextInput>
      <View style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={[styles.icoStyle, this.props.iconStyle]}
          source={iconSource}
        />
      </View>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#4c4c4c',
    borderRadius: 3,
    height: '100%',
    textAlign: 'center',
    width: '75%',
    backgroundColor: '#fff'
  },
  icoStyle: {
   width: 45,
    height: 45
  }
})

export default DateTextBox
