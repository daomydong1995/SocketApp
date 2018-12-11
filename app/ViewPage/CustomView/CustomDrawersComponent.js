import {SafeAreaView, DrawerItems} from 'react-navigation'
import {Image, ScrollView, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native'
import React from 'react'
import {Text} from 'react-native-elements'
import CustomDrawerLabel from './CustomDrawerLabel'
type Props = {}
type State = {}

const CustomDrawerMenu = (props) => (
    <SafeAreaView style={styles.safeStyle}>
        <Image source={require('../../../assets/images/iconHome.png')} style={styles.logoStyle}/>
        <Text style={styles.textStyle}>SmartCard</Text>
        <ScrollView style={styles.scrollStyle} contentContainerStyle={{paddingBottom: 50}}>
          <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)
const renderDrawerItem = (data) => {
    return (
        <TouchableOpacity onPress={transformClicked(data)}>
            <View>
                <Text>{data.item.key}</Text>
            </View>
        </TouchableOpacity>
    )
}
function transformClicked (data){
  // data.navigation.navigate(data.item.key)

}
const styles = StyleSheet.create({
    safeStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    logoStyle: {
        width: 150,
        marginTop: 30,
        marginBottom: 15,
        height: 150
    },
    scrollStyle: {
        marginTop: 30,
        width: '100%'
    },
    textStyle: {
        fontSize: 24
    }
})
export default CustomDrawerMenu
