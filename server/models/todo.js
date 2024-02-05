import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    timeCreated: {
      type: Date,
      index: 1,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2],
      default: 2,
      required: true,
    },
  },
  {
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

schema.methods.toggleStatus = function () {
  switch (this.status) {
    case 1:
      this.status = 2
      break

    case 2:
      this.status = 1
      break

    default:
      throw new Error('document has invalid status')
  }

  return this.save()
}

schema.methods.updateName = function (name) {
  this.name = name

  return this.save()
}

schema.statics.deleteDone = function () {
  return this.deleteMany({ status: 1 })
}

const model = mongoose.model('Todo', schema)

export default model
