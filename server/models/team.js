import mongoose, { ObjectId } from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
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

const model = mongoose.model('Team', schema)

export default model
