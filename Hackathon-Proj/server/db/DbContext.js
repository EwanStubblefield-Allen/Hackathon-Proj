import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js';
import { CommentSchema } from '../models/Comment.js';
import mongoose, { mongo } from 'mongoose';
import { HotSchema } from '../models/Hot.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  Hots = mongoose.model('Hot', HotSchema);
}

export const dbContext = new DbContext()
