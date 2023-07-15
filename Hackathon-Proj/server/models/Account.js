import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    accountHolderId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('posts', {
  justOne: true,
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post'
})

AccountSchema.virtual('accountHolder', {
  localField: 'accountHolderId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
