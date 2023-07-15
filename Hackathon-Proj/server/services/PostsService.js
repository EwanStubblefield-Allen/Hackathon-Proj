import { dbContext } from "../db/DbContext.js"

class PostsService {
  async getPosts() {
    const posts = await dbContext.Posts.find().populate("profile").populate('hotCount')
    return posts
  }
  async getPostsById(postId) {
    const post = await dbContext.Posts.findById(postId)
    return post
  }
  async getPostsByUserId(userId) {
    const post = await dbContext.Posts.find({ profileId: userId })

    return post
  }
  async createPost(postData) {
    const post = (await dbContext.Posts.create(postData)).populate('profile')
    return post
  }
}

export const postsService = new PostsService()