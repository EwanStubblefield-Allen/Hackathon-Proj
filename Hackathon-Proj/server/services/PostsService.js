import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { commentsService } from "./CommentsService.js"
import { hotsService } from "./HotsService.js"

class PostsService {
  async getPosts() {
    const posts = await dbContext.Posts.find().populate("profile", 'name picture').populate('hots', 'createdAt').populate('commentCount')
    return posts
  }
  async getPostsById(postId) {
    const post = await dbContext.Posts.findById(postId).populate("profile", 'name picture').populate('hots', 'createdAt').populate('commentCount')
    if (!post) {
      throw new BadRequest(`The Post does not exist with the Id: ${postId}`)
    }
    return post
  }
  async getPostsByCategory(category) {
    const posts = await dbContext.Posts.find({ category: category }).populate("profile", 'name picture').populate('hots', 'createdAt').populate('commentCount')
    return posts
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('profile', 'name picture')
    return post
  }
  async getPostsByProfileId(profileId) {
    const posts = await dbContext.Posts.find({ profileId }).populate("profile", 'name picture').populate('hots', 'createdAt').populate('commentCount')
    return posts
  }
  async removePost(postId, profileId) {
    const postToRemove = await this.getPostsById(postId)
    if (postToRemove.profileId != profileId) {
      throw new Forbidden(`You are not the owner of ${postToRemove.title}`)
    }
    const hots = await hotsService.getHotsByPostId(postId)
    if (hots[0]) {
      await hotsService.removeHotsByPostId(postId, profileId)
    }
    const comments = await commentsService.getCommentsByPostId(postId)
    if (comments[0]) {
      await commentsService.removeCommentsByPostId(postId, profileId)
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