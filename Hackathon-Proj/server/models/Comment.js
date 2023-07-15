import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  description: { type: String, required: true, maxlength: 20 },
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  }


}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
  ref: 'Post'
})