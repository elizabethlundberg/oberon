const { Schema } = require('mongoose')

const branchSchema = new Schema(
  {
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    childBranch: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
    connected: { type: Boolean, default: false },
    parentBranch: { type: Schema.Types.ObjectId, ref: 'Branch' }
  },
  { timestamps: true }
)

module.exports = branchSchema
