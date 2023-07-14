import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  description: { type: String, required: true, maxlength: 20 },
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' }


}, { timestamps: true, toJSON: { virtuals: true } })