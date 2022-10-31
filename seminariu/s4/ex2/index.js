const crypto = require('crypto-js')

let text = 'some words'

let encrypted = crypto.AES.encrypt(text, 'supersecret').toString()

console.log(encrypted)

let decrypted = crypto.AES.decrypt(encrypted, 'supersecret').toString(crypto.enc.Utf8)

console.log(decrypted)