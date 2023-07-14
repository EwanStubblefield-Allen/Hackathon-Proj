import { Schema } from "mongoose"
export const HotSchema = new Schema({
  // upvote: { type: Boolean, required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  hotterId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  // commentId: { type: Schema.Types.ObjectId, ref: 'Post' },

}, { timestamps: true, toJSON: { virtuals: true } })

HotSchema.virtual('hotter', {
  localField: 'hotterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

HotSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
  ref: 'Post'
})
