import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js';
import mongoose from 'mongoose';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Posts = mongoose.model('Post', PostSchema)
}

export const dbContext = new DbContext()
