import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { commentsService } from "./CommentsService.js"

class CommentHotsService {
  async getCommentHotsById(commentHotId) {
    const commentHot = await dbContext.CommentHots.findById(commentHotId)
    if (!commentHot) {
      throw new BadRequest(`The commentHot does not exist with the Id: ${commentHotId}`)
    }
    return commentHot
  }
  async getCommentHotsByCommentId(commentId) {
    const commentHots = await dbContext.CommentHots.find({ commentId }).populate('comment', 'profileId')
    return commentHots
  }
  async createCommentHotByCommentId(commentHotData) {
    const comment = await commentsService.getCommentsById(commentHotData.commentId)
    commentHotData.commenterId = comment.profileId
    const commentHot = await dbContext.CommentHots.create(commentHotData)
    return commentHot
  }
  async removeCommentHot(commentHotId, profileId) {
    const commentHotToRemove = await this.getCommentHotsById(commentHotId)
    if (commentHotToRemove.hotterId != profileId) {
      throw new Forbidden(`You are not the owner of commentHot!`)
    }
    await commentHotToRemove.remove()
  }
  async removeCommentHotsByCommentId(commentId, profileId) {
    const commentHotToRemove = await this.getCommentHotsByCommentId(commentId)
    const profile = commentHotToRemove[0]
    if (profile.posterId != profileId && profile.commenterId != profileId) {
      throw new Forbidden(`You are not the owner of commentHot!`)
    }
    commentHotToRemove.forEach(async p => await p.remove())
  }
}

export const commentHotsService = new CommentHotsService