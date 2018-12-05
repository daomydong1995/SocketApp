import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
type Props = {
  tintColor: Object,
  title: Object,
  nameIcon: string
}
type State = {}

class CustomDrawerLabel extends Component<Props,State> {
  render(){
    const {tintColor,title,nameIcon} = this.props
    return(
    <View style={styles.container}>
      <View style={styles.icoStyle}>
        <Icon size={26} color={tintColor} name={nameIcon}/>
      </View>
      <Text style={[styles.titleStyle,{color: tintColor}]}>{title}</Text>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    height: 55,
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#9d9d9d'
  },
  titleStyle: {
    fontSize: 22
  },
  icoStyle: {
    marginLeft: 10,
    marginRight: 10
  }
})

export default CustomDrawerLabel
