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
  userName: null,
  userBirth: null,
  //
  userGender: null,
  userJob: null,
  //
  userEmail: null,
  userPhone: null,
  //
  userCMT: null,
  userCMTDay: null,
  userCMTPlace: null,
  //
  userPassport: null,
  userPassportDate: null,
  userPassportPlace: null,
  //
  userCountry: null,
  userNation: null,
  userTBH: null,
  //
  userAddress: null,
  //
  userDistrict: null,
  userWards: null,
  userProvince: null,
  //
  userId: null,
  userWalletId: null,
  userCardId: null,
  userHospital: null,
  userMoneyTotal: null,
  userNameCard: null,
  userCodeCard: null,
  //
  signatureBase64: '',
  imageAvatarBase64: ''
}

export const INITIAL_STATE_RELATIVE_INFO = {
  rltName: null,
  rltInfo: null,
  rltEmail: null,
  rltPhone: null,
  rltCMT: null,
  rltCMTDay: null,
  rltCMTPlace: null,
  rltPassport: null,
  rltPassportDate: null,
  rltPassportPlace: null,
  rltAddress: null,
  imageRltAvatarBase64: ''
}
