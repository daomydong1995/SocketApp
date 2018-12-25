import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'
import userRelativeInfoReducer from '../../../reducer/userRelativeInfoReducer'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserRelativeInfoComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
    }
  }

  render () {
    return (
      <View style={styles.container} pointerEvents={'none'} >
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
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.rltCMTDay}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01/01/1995"
              maxDate="01/01/2050"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy bỏ"
              customStyles={{
                dateIcon: {
                  // position: '',//absolute is left
                  width: 45,
                  height: 40
                },
                dateInput: styles.textStyle
              }} />
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
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.rltPassportDate}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01/01/1995"
              maxDate="01/01/2050"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy bỏ"
              customStyles={{
                dateIcon: {
                  // position: '',//absolute is left
                  width: 45,
                  height: 40
                },
                dateInput: styles.textStyle
              }} />
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
          <View style={[styles.itemRowContainer,{width: '100%'}]}>
            <Text style={styles.textLabelStyle}>Địa chỉ liên lạc</Text>
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
)(UserRelativeInfoComponent)

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
    marginLeft: 0,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  textLabelStyle: {
    fontSize: 16,
    marginLeft: 10,
    width: 100,
    fontWeight:'bold'
  },
  datePickerStyle: {
    width: '60%',
    marginRight: 10,
    height: 50
  },
  textStyle: {
    fontSize:16,
    marginRight: 10,
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
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
});
