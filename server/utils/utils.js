import crypto from 'crypto'
import { SALT } from '../constants.js'

export function generateHash(password) {
  const hash = crypto.pbkdf2Sync(password, SALT, 10000, 512, 'sha512')

  return hash
}

export function isEqualHash(hash, password) {
  const _hash = crypto.pbkdf2Sync(password, SALT, 10000, 512, 'sha512')

  return crypto.timingSafeEqual(_hash, hash)
}
