import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import DateTextBox from '../Common/DateTextBox'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserRelativeSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View style={styles.container} pointerEvents={'none'}>
        <Text style={styles.textTileStyle}>
          Thông tin người thân
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Họ tên:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltName}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Quan hệ:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltInfo}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Email:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltEmail}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Số điện thoại:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltPhone}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>CMND:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltCMT}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DateTextBox
              container={styles.datePickerStyle}
              textDate={this.props.rltCMTDay}/>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltCMTPlace}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Hộ chiếu:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltPassport}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DateTextBox
              container={styles.datePickerStyle}
              textDate={this.props.rltPassportDate}/>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.rltPassportPlace}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.itemRowContainer, {width: '100%'}]}>
            <Text style={styles.textLabelStyle}>Địa chỉ liên lạc:</Text>
            <TextInput
              style={[styles.textStyle]}
              value={this.props.rltAddress}
              placeholder={''}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ...state.userRelativeInfoReducer
})
export default connect(
  mapStateToProps, {}
)(UserRelativeSignComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    flex: 1
  },
  rowContainer: {
    width: '100%',
    height: 50,
    margin: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '33%',
    height: 50
  },
  textTileStyle: {
    fontSize: 28,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  textLabelStyle: {
    fontSize: 16,
    marginLeft: 10,
    width: 100,
    fontWeight: 'bold'
  },
  datePickerStyle: {
    width: '60%',
    height: 50
  },
  textStyle: {
    fontSize: 16,
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
    borderColor: '#4c4c4c',
    backgroundColor: '#fff',
    paddingLeft: 10
  },
  pickkerSelectView: {
    marginRight: 10,
    width: '60%',
    height: 50,
    backgroundColor: 'white'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
    height: 50,
    color: 'black',
    paddingLeft: 10
  }
})
