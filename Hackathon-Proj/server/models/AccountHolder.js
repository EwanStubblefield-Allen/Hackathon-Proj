import { Schema } from "mongoose";

export const AccountHolderSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  accountHolderId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

AccountHolderSchema.virtual('posts', {
  justOne: true,
  localField: 'postId',
  foreignField: '_id',
  ref: 'Post'
})

AccountHolderSchema.virtual('accountHolder', {
  localField: 'accountHolderId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})