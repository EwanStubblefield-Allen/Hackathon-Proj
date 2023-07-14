import { dbContext } from "../db/DbContext.js"

class PostsService {
  async getPosts() {
    const posts = await dbContext.Posts.find()
    return posts
  }
  async getPostsById(postId) {
    const post = await dbContext.Posts.findById(postId)
    return post
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    return post
  }
}

export const postsService = new PostsService()