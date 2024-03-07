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
  }
)

const model = mongoose.model('Team', schema)

export default model
