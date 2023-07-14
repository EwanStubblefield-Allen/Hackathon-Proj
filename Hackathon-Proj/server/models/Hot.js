import { Schema } from "mongoose"
export const HotSchema = new Schema({
  upvote: { type: Boolean, required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  commentId: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true, toJSON: { virtuals: true } })

