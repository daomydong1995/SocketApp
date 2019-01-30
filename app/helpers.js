import moment from 'moment'
import { find, map } from 'lodash'
import { TYPE, STATUS, GENDER, ROLE, STATUSTYPE } from './constants'

export const formatDate = date =>
  date ? moment(date).format('DD/MM/YYYY') : false

export const formatDateTime = date =>
  date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : false

export const formatMoney = value => {
  if (Number(value)) {
    return Number(value).toLocaleString('vi-VN', {
      maximumFractionDigits: 2
    })
  }
  return value
}

export const formatType = data => {
  const matched = find(TYPE, type => type.value === data)
  if (matched) {
    return matched.label
  }
  return data
}

export const formatStatus = data => {
  const matched = map(STATUS, (label, value) => {
    if (value === data) {
      return label
    }
  })
  if (matched) {
    return matched
  }
  return data
}

export const formatStatuses = data => {
  const matched = map(STATUSTYPE, (label, value) => {
    if (value === data) {
      return label
    }
  })
  if (matched) {
    return matched
  }
  return data
}

export const formatGender = data => {
  const matched = map(GENDER, (label, value) => {
    if (value === data) {
      return label
    }
  })
  if (matched) {
    return matched
  }
  return data
}

export const checkActiveCards = cards => {
  const activeCard = find(cards, card => card.status === 'ACTIVE')
  if (activeCard) {
    return true
  }
  return false
}

export const formatRole = data => {
  const matched = map(ROLE, role => {
    if (role.slug === data) {
      return role.label
    }
  })
  if (matched) {
    return matched
  }
  return data
}

export const formatCustomer = data => {
  const activeCard = find(data.cards, card => card.status === 'ACTIVE')
  const activeWallet = find(data.wallets, wallet => wallet.status === 'ACTIVE')

  let cardId
  let walletId
  let walletPubKey
  if (activeCard) {
    cardId = activeCard.id
  }
  if (activeWallet) {
    walletId = activeWallet.id
    walletPubKey = activeWallet.public_key
  }

  const birthDate = data.birth_date ? moment(data.birth_date) : undefined
  const identityCardDate = data.identity_card_date
    ? moment(data.identity_card_date)
    : undefined
  const passportDate = data.passport_date
    ? moment(data.passport_date)
    : undefined
  const relativeIdentityCardDate = data.relative_identity_card_date
    ? moment(data.relative_identity_card_date)
    : undefined
  const relativePassportDate = data.relative_passport_date
    ? moment(data.relative_passport_date)
    : undefined

  return {
    ...data,
    card_id: cardId,
    wallet_id: walletId,
    wallet_public_key: walletPubKey,
    birth_date: birthDate,
    identity_card_date: identityCardDate,
    passport_date: passportDate,
    relative_identity_card_date: relativeIdentityCardDate,
    relative_passport_date: relativePassportDate
  }
}

const ChuSo = [
  ' không ',
  ' một ',
  ' hai ',
  ' ba ',
  ' bốn ',
  ' năm ',
  ' sáu ',
  ' bảy ',
  ' tám ',
  ' chín '
]

const Tien = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ']

const formatThreeDigits = baso => {
  var tram
  var chuc
  var donvi
  var KetQua = ''
  tram = parseInt(baso / 100)
  chuc = parseInt((baso % 100) / 10)
  donvi = baso % 10
  if (tram === 0 && chuc === 0 && donvi === 0) return ''
  if (tram !== 0) {
    KetQua += ChuSo[tram] + ' trăm '
    if (chuc === 0 && donvi !== 0) KetQua += ' linh '
  }
  if (chuc !== 0 && chuc !== 1) {
    KetQua += ChuSo[chuc] + ' mươi'
    if (chuc === 0 && donvi !== 0) KetQua = KetQua + ' linh '
  }
  if (chuc === 1) KetQua += ' mười '
  switch (donvi) {
    case 1:
      if (chuc !== 0 && chuc !== 1) {
        KetQua += ' mốt '
      } else {
        KetQua += ChuSo[donvi]
      }
      break
    case 5:
      if (chuc === 0) {
        KetQua += ChuSo[donvi]
      } else {
        KetQua += ' lăm '
      }
      break
    default:
      if (donvi !== 0) {
        KetQua += ChuSo[donvi]
      }
      break
  }
  return KetQua
}

export const formatMoneyToString = SoTien => {
  var lan = 0
  var i = 0
  var so = 0
  var KetQua = ''
  var tmp = ''
  var ViTri = []
  if (SoTien < 0) return 'Số tiền âm !'
  if (SoTien === 0) return 'Không đồng !'
  if (SoTien > 0) {
    so = SoTien
  } else {
    so = -SoTien
  }
  if (SoTien > 8999999999999999) {
    // SoTien = 0;
    return 'Số quá lớn!'
  }
  ViTri[5] = Math.floor(so / 1000000000000000)
  if (isNaN(ViTri[5])) ViTri[5] = '0'
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000
  ViTri[4] = Math.floor(so / 1000000000000)
  if (isNaN(ViTri[4])) ViTri[4] = '0'
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000
  ViTri[3] = Math.floor(so / 1000000000)
  if (isNaN(ViTri[3])) ViTri[3] = '0'
  so = so - parseFloat(ViTri[3].toString()) * 1000000000
  ViTri[2] = parseInt(so / 1000000)
  if (isNaN(ViTri[2])) ViTri[2] = '0'
  ViTri[1] = parseInt((so % 1000000) / 1000)
  if (isNaN(ViTri[1])) ViTri[1] = '0'
  ViTri[0] = parseInt(so % 1000)
  if (isNaN(ViTri[0])) ViTri[0] = '0'
  if (ViTri[5] > 0) {
    lan = 5
  } else if (ViTri[4] > 0) {
    lan = 4
  } else if (ViTri[3] > 0) {
    lan = 3
  } else if (ViTri[2] > 0) {
    lan = 2
  } else if (ViTri[1] > 0) {
    lan = 1
  } else {
    lan = 0
  }
  for (i = lan; i >= 0; i--) {
    tmp = formatThreeDigits(ViTri[i])
    KetQua += tmp
    if (ViTri[i] > 0) KetQua += Tien[i]
    if (i > 0 && tmp.length > 0) KetQua += ',' // && (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) === ',') {
    KetQua = KetQua.substring(0, KetQua.length - 1)
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2)
  return KetQua // .substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}
