import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  description: { type: String, required: true, maxlength: 20 },
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'profile'
  }


}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('account', {
  localField: 'profileId',
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