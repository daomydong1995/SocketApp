import { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SCREENSTITLE from '../ContanstPage/SCREENSTITLE'
import connect from 'react-redux/es/connect/connect'
import { updateSocket, updateSocketStatus } from '../reducer/action'
import io from 'socket.io-client'
import DefaultPreference from 'react-native-default-preference'
import { Row, Table, TableWrapper } from 'react-native-table-component'
import Cell from 'react-native-table-component/components/cell'

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
      port: 3000
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
    socket.io = io(ip, {
      transports: ['websocket']
    }).io
    socket.connect()
  }

  eventScanQRCode () {
    console.log(this.props.socket)
  }

  render () {
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
                           onChangeText={(address) => {this.setState({address})}}/>
                <TouchableOpacity onPress={this.eventScanQRCode}>
                  <Icon name={'qrcode'} size={45}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.updateSocketGlobal}>
                <Text style={{fontSize: 22, color: '#fff', textAlign: 'center'}}>Kết nối</Text>
              </TouchableOpacity>

              <Table borderStyle={{borderWidth: 2, borderColor: '#000', borderRadius: 5}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                {
                  state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={[styles.row,{backgroundColor: index%2 === 0? '#fff':'#e0e0e0'}]}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
              </Table>
              {
                this.props.connected &&
                <View style={{width: 100, height: 50, backgroundColor: '#4eff35'}}></View>
              }
              {
                !this.props.connected &&
                <View style={{width: 100, height: 50, backgroundColor: '#ff0c16'}}></View>
              }
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
    marginBottom: 100,
    width: 350,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 3,
    height: 45,
    backgroundColor: '#597eaa',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  ...state.settingReducer
})

export default connect(
  mapStateToProps, {
    updateSocket,
    updateSocketStatus
  }
)(SettingPage)

