import { Schema } from "mongoose"
export const HotSchema = new Schema({
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

HotSchema.index({ postId: 1, hotterId: 1 }, { unique: true })

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