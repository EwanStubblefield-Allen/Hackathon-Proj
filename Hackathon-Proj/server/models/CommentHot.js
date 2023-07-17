import { Schema } from "mongoose";

export const CommentHotSchema = new Schema({
  posterId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  commenterId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  commentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Comment'
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

// CommentHotSchema.index({ commentId: 1, hotterId: 1 }, { unique: true })

CommentHotSchema.virtual('hotter', {
  localField: 'hotterId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentHotSchema.virtual('comment', {
  localField: 'commentId',
  foreignField: '_id',
  justOne: true,
  ref: 'Comment'
})