import crypto from 'crypto'

export function generateHash(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

  return { salt, hash }
}

export function isEqualHash({ salt, hash }, password) {
  const _hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')
  return crypto.timingSafeEqual(_hash, hash)
}
