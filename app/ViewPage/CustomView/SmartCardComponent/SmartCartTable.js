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
      flexArrPending: [0.5,2,1,3,2.5,1],
      flexArrHistory: [3,2,0.8,1.2,3,2],
      transactionPending: ['STT', 'Ngày giao dịch', 'Mã giao dịch', 'Nội dung', 'Nơi yêu cầu', 'Giá'],
      transactionHistory:['Ngày giao dịch','Số tham chiếu','Thay đổi', 'Số tiền', 'Mô tả','Nơi thực hiện']
    }
  }

  _alertIndex (index) {
    alert(index)
  }

  render () {
    const state = this.state
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View style={styles.container}>
        <Text style={styles.titleTable}>Giao dịch đang chờ</Text>
        <View style={styles.tableStyle}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#000', borderRadius: 5}}>
            <Row data={state.transactionPending} flexArr={state.flexArrPending} style={styles.head} textStyle={styles.text}/>
            {/*{*/}
              {/*console.log(this.props.pendingTransactions)*/}
              {/*this.props.pendingTransactions.map((rowData, index) => (*/}
                {/*<Row data={rowData}*/}
                     {/*flexArr={state.flexArrPending} style={[styles.row, {backgroundColor: index % 2 === 0 ? '#fff' : '#e0e0e0'}]} textStyle={styles.text}/>*/}
              {/*))*/}
            {/*}*/}
          </Table>
        </View>
        <Text style={styles.titleTable}>Lịch sử giao dịch</Text>
        <View style={styles.tableStyle}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#000', borderRadius: 5}}>
            <Row data={state.transactionHistory} flexArr={state.flexArrHistory} style={styles.head} textStyle={styles.text}/>
            {/*{*/}
              {/*this.props.historyTransactions.map((rowData, index) => (*/}
                {/*<Row data={rowData}*/}
                     {/*flexArr={state.flexArrHistory} style={[styles.row, {backgroundColor: index % 2 === 0 ? '#fff' : '#e0e0e0'}]} textStyle={styles.text}/>*/}
              {/*))*/}
            {/*}*/}
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
  head: {height: 40, backgroundColor: '#a7b6c6'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'}
})

const mapStateToProps = state => ({
  ...state.tabletReducer
})

export default connect(
  mapStateToProps, {}
)(SmartCartTable)
