import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {
  async getPosts() {
    const posts = await dbContext.Posts.find().populate("profile").populate('hotCount').populate('commentCount')
    return posts
  }
  async getPostsById(postId) {
    const post = await dbContext.Posts.findById(postId).populate('hotCount').populate('commentCount')
    if (!post) {
      throw new BadRequest(`The Post does not exist with the Id: ${postId}`)
    }
    return post
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    post.populate('profile')
    return post
  }

  async getPostsByAccountId(profileId) {
    const posts = await dbContext.Posts.find({ profileId }).populate('hotCount').populate('commentCount')
    return posts
  }
  async removePost(postId, profileId) {
    const postToRemove = await this.getPostsById(postId)
    if (postToRemove.profileId != profileId) {
      throw new Forbidden(`You are not the owner of ${postToRemove.title}`)
    }
    await postToRemove.remove()
  }
}

export const postsService = new PostsService()