import { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SCREENSTITLE from '../ContanstPage/SCREENSTITLE'
import io from 'socket.io-client'
import { Row, Table, TableWrapper } from 'react-native-table-component'
import Cell from 'react-native-table-component/components/cell'
import { connect } from 'react-redux'

type Props = {}
type State = {
  address: string, //ip address of server
  port: number //port of socket server

}

class SettingPage extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
    this.updateSocketGlobal = this.updateSocketGlobal.bind(this)
    this.eventScanQRCode = this.eventScanQRCode.bind(this)
    this.state = {
      address: '',
      port: 4000,
      tableHead: ['Địa chỉ IP', 'Trạng thái']
    }
  }

  eventLeftHeader () {
    this.props.navigation.openDrawer()
  }

  updateSocketGlobal () {
    const {address, port} = this.state
    const {socket} = this.props
    socket.disconnect()
    let ip = 'http://' + address + ':' + port
    console.log(ip)
    socket.io = io(ip, {
      transports: ['websocket']
    }).io
    socket.connect()
  }

  eventScanQRCode () {
    console.log(this.props.socket)
  }

  render () {
    const {socketsAddress, connected} = this.props
    return (
      <View style={{flex: 1}}>
        <HeaderCustom title={SCREENSTITLE[this.props.navigation.state.routeName]}
                      leftView={(<Icon name='bars' color='#fff' size={24}/>)}
                      handleLeftButton={this.eventLeftHeader}/>
        <ScrollView style={{flex: 1}} horizontal={true}>
          <ScrollView style={{flex: 1, width: 1024}}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 20, marginBottom: 20}}>Nhập hoặc scan địa chỉ IP máy tính của nhân viên để thực
                  hiện
                  kết nối</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <TextInput style={styles.textInputStyle} placeholder={'192.168.1.1'} keyboardType={'numeric'}
                           value={this.state.address}
                           onChangeText={(address) => {this.setState({address})}}/>
                <TouchableOpacity onPress={this.eventScanQRCode}>
                  <Icon name={'qrcode'} size={45}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.updateSocketGlobal}>
                <Text style={{fontSize: 22, color: '#fff', textAlign: 'center'}}>Kết nối</Text>
              </TouchableOpacity>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
              <View style={styles.table}>
                {
                  socketsAddress.map((sk, index) => (
                    <TableWrapper key={index}
                                  style={[styles.row, {backgroundColor: index % 2 === 0 ? '#fff' : '#e0e0e0'}]}>
                      <Cell data={(
                        <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{margin: 5}} onPress={() => this.setState({address:sk.hostname})}>
                          <View style={{borderWidth: 2, padding: 4,backgroundColor: '#6affa1'}}>
                            <Text style={{fontWeight: 'bold'}}>Chọn</Text>
                          </View>
                        </TouchableOpacity>
                          <Text style={styles.text}>{sk.hostname}</Text>
                        </View>
                      )} textStyle={styles.text}/>
                      <Cell data={(
                        <View style={{marginLeft: 10, flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 20,
                              backgroundColor: (this.props.socket.io.engine.hostname === sk.hostname && connected) ? '#4eff35' : '#ff0c16'
                            }}/>
                          <Text style={styles.text}>{(this.props.socket.io.engine.hostname === sk.hostname && connected)  ? 'Đang kết nối...' : 'Không kết nối!'}</Text>
                        </View>
                      )}/>
                    </TableWrapper>
                  ))
                }
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 5,
    margin: 20,
    padding: 20,
    flex: 1
  },
  textInputStyle: {
    fontSize: 22,
    marginRight: 20,
    width: 350,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 3,
    height: 45,
    backgroundColor: '#fff',
    paddingLeft: 15
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 70,
    width: 350,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 3,
    height: 45,
    backgroundColor: '#597eaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  head: {height: 45, backgroundColor: '#a7b6c6', borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 2},
  text: {fontSize: 18, marginLeft: 10},
  table: {borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, marginBottom: 50},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1', height: 50, justifyContent: 'center'},
})

const mapStateToProps = state => ({
  ...state.settingReducer
})

export default connect(
  mapStateToProps, {}
)(SettingPage)

