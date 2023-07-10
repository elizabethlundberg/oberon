const { Schema } = require('mongoose')

const noteSchema = new Schema(
  {
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId },
    project: { type: Schema.Types.ObjectId }
  },
  { timestamps: true }
)

module.exports = noteSchema
