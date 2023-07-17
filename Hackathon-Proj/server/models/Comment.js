import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxlength: 100
  },
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
  profileId: {
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

CommentSchema.virtual('profile', {
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

CommentSchema.virtual('commentHotCount', {
  localField: '_id',
  foreignField: 'commentId',
  ref: 'CommentHot',
  count: true
})