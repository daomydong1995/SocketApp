import { Component } from 'react'
import { Cell, Row, Rows, Table, TableWrapper } from 'react-native-table-component'
import React from 'react'
import tableData from '../../../../assets/json/tableData'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

type Props = {}
type State = {}

class SmartCartTable extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }
  _alertIndex(index) {
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
    );
    return (
      <View style={styles.container}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'transparent', borderRadius: 5 },
  head: { height: 40, backgroundColor: '#a7b6c6'},
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
})
export default SmartCartTable
