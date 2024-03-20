import env from './config.js'

export const SALT = Buffer.from(env.SALT, 'hex')
