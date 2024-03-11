import mongoose, { ObjectId } from 'mongoose'

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minLength: 2,
      maxLength: 300,
      unique: true,
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
      unique: true,
      required: true,
    },
    password: { type: Buffer, required: true },
    refreshToken: {
      token: {
        type: String,
        maxLength: 1000,
      },
      createdAt: {
        type: Date,
      },
    },
    teamId: {
      type: ObjectId,
      index: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    virtuals: {
      id: {
        get() {
          return this._id
        },
      },
    },
  }
)

const model = mongoose.model('User', schema)

export default model
