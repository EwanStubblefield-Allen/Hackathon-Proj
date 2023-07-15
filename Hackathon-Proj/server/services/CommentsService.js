import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getCommentsById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate('account', 'name picture')
    if (!comment) {
      throw new BadRequest(`The Comment does not exist with the Id: ${commentId}`)
    }
    return comment
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId }).populate('account', 'name picture')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    comment.populate('account', 'name picture')
    return comment
  }
  async removeComment(commentId, profileId) {
    const commentToRemove = await this.getCommentsById(commentId)
    if (commentToRemove.profileId != profileId) {
      throw new Forbidden(`You are not the owner of comment!`)
    }
    await commentToRemove.remove()
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