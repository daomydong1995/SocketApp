export const STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
}

export const STATUS = {
  NEW: 'Mới',
  IN_PROCESS: 'Tiếp đón',
  PENDING: 'Tạm giữ',
  COMPLETED: 'Hoàn thành'
}

export const STATUSTYPE = {
  SUCCESS: 'Thành công',
  FAIL: 'Thất bại'
}

export const GENDER = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  UNKNOWN: 'Không xác định'
}

export const ROLE = [
  {
    slug: 'ADMIN',
    label: 'Admin'
  },
  {
    slug: 'STAFF',
    label: 'Staff'
  },
  {
    slug: 'ACCOUNTING',
    label: 'Accounting'
  }
]

export const TYPE = [
  {
    value: 'DEPOSIT',
    label: 'Nạp tiền'
  },
  {
    value: 'WITHDRAW',
    label: 'Rút tiền'
  },
  {
    value: 'TRANSFER',
    label: 'Chuyển tiền'
  },
  {
    value: 'REFUND',
    label: 'Trả lại tiền'
  },
  {
    value: 'CARD_FEE',
    label: 'Phí làm thẻ'
  }
]

export const SENDER = [
  {
    value: 'ALL',
    label: 'Tất cả'
  },
  {
    value: 'SENDER',
    label: 'Người gửi'
  },
  {
    value: 'RECEIVER',
    label: 'Người nhận'
  }
]

export const INITIAL_STATE_USER_INFO = {
  userName: '',
  userBirth: '',
  //
  userGender: '',
  userJob: '',
  //
  userEmail: '',
  userPhone: '',
  //
  userCMT: '',
  userCMTDay: '',
  userCMTPlace: '',
  //
  userPassport: '',
  userPassportDate: '',
  userPassportPlace: '',
  //
  userCountry: '',
  userNation: '',
  userTBH: '',
  //
  userAddress: '',
  //
  userDistrict: '',
  userWards: '',
  userProvince: '',
  //
  userId: '',
  userWalletId: '',
  userCardId: '',
  userHospital: '',
  userMoneyTotal: '',
  userNameCard: '',
  userCodeCard: '',
  //
  signatureBase64: '',
  imageAvatarBase64: ''
}

export const INITIAL_STATE_RELATIVE_INFO = {
  rltName: '',
  rltInfo: '',
  rltEmail: '',
  rltPhone: '',
  rltCMT: '',
  rltCMTDay: '',
  rltCMTPlace: '',
  rltPassport: '',
  rltPassportDate: '',
  rltPassportPlace: '',
  rltAddress: '',
  imageRltAvatarBase64: ''
}
