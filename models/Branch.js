const { Schema } = require('mongoose')

const branchSchema = new Schema(
  {
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId },
    project: { type: Schema.Types.ObjectId },
    notes: [{ type: Schema.Types.ObjectId }]
  },
  { timestamps: true }
)

module.exports = branchSchema
