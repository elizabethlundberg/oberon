const { Schema } = require('mongoose')

const projectSchema = new Schema(
  {
    researchQuestion: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

module.exports = projectSchema
