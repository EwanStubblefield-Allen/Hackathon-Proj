import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getCommentsById(commentId) {
    const comment = await (await dbContext.Comments.findById(commentId)).populate('account')
    if (!comment) {
      throw new BadRequest(`The Comment does not exist with the Id: ${commentId}`)
    }
    return comment
  }
  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId }).populate('account')
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    comment.populate('account')
    return comment
  }
  async removeComment(commentId, profileId) {
    const commentToRemove = await this.getCommentsById(commentId)
    if (commentToRemove.profileId != profileId) {
      throw new Forbidden(`You are not the owner of comment!`)
    }
    await dbContext.Comments.remove()
  }
}

export const commentsService = new CommentsService()