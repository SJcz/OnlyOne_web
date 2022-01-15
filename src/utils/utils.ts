import CryptoJS from 'crypto-js'
const config = require("../config/config.json")

export function encrptToken() {
  const appCodeName = window.navigator.appCodeName
  const origin = window.origin
  const mingwen = `${appCodeName}|${origin}|${Date.now()}`
  console.log(mingwen)
  const srcs = CryptoJS.enc.Utf8.parse(mingwen);
  return CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(config.secret_key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}