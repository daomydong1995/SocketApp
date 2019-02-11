import { Component } from 'react'
import { Cell, Row, Rows, Table, TableWrapper } from 'react-native-table-component'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import connect from 'react-redux/es/connect/connect'
import tabletReducer from '../../../reducer/tabletReducer'

type Props = {}
type State = {}

class SmartCartTable extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      flexArrPending: [0.5,1,2,2,1.5,1.5],
      flexArrHistory: [0.5,1,2,1,2,1.5,2,2.5],
      transactionPending: ['STT', 'Ngày giao dịch', 'Mã giao dịch', 'Mô tả', 'Mã tham chiếu', 'Giá'],
      transactionHistory:['STT', 'Ngày giao dịch','Mã giao dịch','Trạng thái giao dịch', 'Loại giao dịch','Mã tham chiếu', 'Số tiền', 'Mô tả']
    }
  }

  render () {
    const attrPending = ['stt', 'created_at', 'id', 'memo', 'ref_id', 'amount']
    const attrHistory = ['stt', 'created_at', 'id', 'status', 'type', 'ref_id', 'amount', 'memo']
    const state = this.state
    const  dataPending = this.props.pendingTransactions.map(transaction => {
      return attrPending.map(field => {
        return transaction[field]
      })
    })
    const dataHistory =  this.props.historyTransactions.map(transaction => {
      return attrHistory.map(field => {
        return transaction[field]
      })
    })
    return (
      <View style={styles.container}>
        <Text style={styles.titleTable}>Giao dịch đang chờ</Text>
        <View style={styles.tableStyle}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#000', borderRadius: 5}}>
            <Row data={state.transactionPending} flexArr={state.flexArrPending} style={styles.head} textStyle={styles.text}/>
            {
              dataPending.map((rowData, index) => (
                <Row data={rowData}
                     flexArr={state.flexArrPending} style={[styles.row, {backgroundColor: index % 2 === 0 ? '#fff' : '#e0e0e0'}]} textStyle={styles.text}/>
              ))
            }
          </Table>
        </View>
        <Text style={styles.titleTable}>Lịch sử giao dịch</Text>
        <View style={styles.tableStyle}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#000', borderRadius: 5}}>
            <Row data={state.transactionHistory} flexArr={state.flexArrHistory} style={styles.head} textStyle={styles.text}/>
            {
              dataHistory.map((rowData, index) => (
                <Row data={rowData}
                     flexArr={state.flexArrHistory} style={[styles.row, {backgroundColor: index % 2 === 0 ? '#fff' : '#e0e0e0'}]} textStyle={styles.text}/>
              ))
            }
          </Table>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'transparent', borderRadius: 5},
  titleTable: {fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 15},
  tableStyle: {borderWidth: 1, borderRadius: 3},
  head: {backgroundColor: '#a7b6c6'},
  text: {textAlign: 'center'},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
})

const mapStateToProps = state => ({
  ...state.tabletReducer
})

export default connect(
  mapStateToProps, {}
)(SmartCartTable)
