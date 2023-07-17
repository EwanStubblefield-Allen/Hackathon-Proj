import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { commentHotsService } from "./CommentHotsService.js"
import { postsService } from "./PostsService.js"

class CommentsService {
  async getCommentsById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate('profile', 'name picture').populate('commentHotCount')
    if (!comment) {
      throw new BadRequest(`The Comment does not exist with the Id: ${commentId}`)
    }
    return comment
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId }).populate('profile', 'name picture').populate('commentHotCount')
    return comments
  }
  async createComment(commentData) {
    const post = await postsService.getPostsById(commentData.postId)
    commentData.posterId = post.profileId
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('profile', 'name picture')
    return comment
  }
  async removeComment(commentId, profileId) {
    const commentToRemove = await this.getCommentsById(commentId)
    if (commentToRemove.profileId != profileId) {
      throw new Forbidden(`You are not the owner of comment!`)
    }
    await this.removeCommentHotsByCommentId(commentId, profileId)
    await commentToRemove.remove()
  }
  async removeCommentsByPostId(postId, profileId) {
    const commentToRemove = await this.getCommentsByPostId(postId)
    const commentId = commentToRemove[0].id
    if (commentToRemove[0].posterId != profileId) {
      throw new Forbidden(`You are not the owner of hot!`)
    }
    await this.removeCommentHotsByCommentId(commentId, profileId)
    commentToRemove.forEach(async c => await c.remove())
  }
  async removeCommentHotsByCommentId(commentId, profileId) {
    const commentHots = await commentHotsService.getCommentHotsByCommentId(commentId)
    if (commentHots[0]) {
      await commentHotsService.removeCommentHotsByCommentId(commentId, profileId)
    }
  }
  async editComment(commentData, commentId, userId) {
    const originalComment = await this.getCommentsById(commentId)
    if (originalComment.profileId != userId) {
      throw new Forbidden(`You are not the owner of $this comment`)
    }
    originalComment.description = commentData.description || originalComment.description
    await originalComment.save()
    return originalComment
  }
}

export const commentsService = new CommentsService()