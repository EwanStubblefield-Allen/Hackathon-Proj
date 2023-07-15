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
    await post.populate('profile')
    await post.populate('hotCount')
    await post.populate('commentCount')
    return post
  }

  async getPostsByProfileId(profileId) {
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
  async editPost(postData, postId, userId) {
    const originalPost = await this.getPostsById(postId)

    if (originalPost.profileId != userId) {
      throw new Forbidden(`You are not the owner of ${originalPost.title}`)
    }
    originalPost.title = postData.title || originalPost.title
    originalPost.postImg = postData.postImg || originalPost.postImg
    originalPost.description = postData.description || originalPost.description
    originalPost.category = postData.category || originalPost.category
    await originalPost.save()
    return originalPost
  }
}

export const postsService = new PostsService()