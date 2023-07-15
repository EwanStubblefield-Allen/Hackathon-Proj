import { dbContext } from "../db/DbContext.js"

class AccountHoldersService {
  async getPostsByAuthorId(profileId) {
    const posts = await dbContext.AccountHolder.find({ accountHolderId: profileId }).populate('posts')

    return posts
  }
}

export const accountHoldersService = new AccountHoldersService