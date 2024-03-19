import mongoose, { ObjectId } from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: 1,
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2],
      default: 2,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
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

const model = mongoose.model('Todo', schema)

export default model
