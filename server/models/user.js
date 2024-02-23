import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 2,
      maxLength: 300,
      required: true,
    },
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 300,
      required: true,
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 300,
      required: true,
    },
    email: {
      type: String,
      minLength: 3,
      maxLength: 300,
      required: true,
    },
    password: {
      hash: { type: Buffer, required: true },
      salt: { type: Buffer, required: true },
    },
  },
  {
    versionKey: false,
  }
)

const model = mongoose.model('User', schema)

export default model
