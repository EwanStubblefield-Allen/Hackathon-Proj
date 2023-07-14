import { Schema } from "mongoose";

export const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20
  },
  postImg: {
    type: String,
    required: true,
    maxlength: 300
  },
  description: {
    type: String,
    maxlength: 100
  },
  category: {
    type: String,
    enum: ['Flat Bread', 'Chicago', 'New York', 'Stuffed Crust', 'Italian', 'Thin Crust', 'Thick Crust', 'Pan', 'Cauliflower', 'Unknown'],
    default: 'Unknown'
  },
  profileId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PostSchema.virtual('profile', {
  localField: 'profileId',
  foreignField: '_id',
  ref: 'Account'
})

PostSchema.virtual('hotCount', {
  localField: '_id',
  foreignField: 'postId',
  ref: 'Hot',
  count: true
})