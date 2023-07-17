import { Schema } from "mongoose";

export const CommentHotSchema = new Schema({
  posterId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  hotterId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

CommentHotSchema.index({ postId: 1, hotterId: 1 }, { unique: true })

CommentHotSchema.virtual('hotter', {
  localField: 'hotterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentHotSchema.virtual('post', {
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
  ref: 'Post'
})