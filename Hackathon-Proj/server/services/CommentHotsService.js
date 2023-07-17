import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { commentsService } from "./CommentsService.js"

class CommentHotsService {
  async getHotById(hotId) {
    const hot = await dbContext.CommentHots.findById(hotId)

    if (!hot) {
      throw new BadRequest(`The hot does not exist with the Id: ${hotId}`)
    }
    return hot
  }

  async createHotByCommentId(hotData) {
    const comment = await commentsService.getCommentsById(hotData.postId)

    hotData.posterId = comment.profileId

    const hot = await dbContext.CommentHots.create(hotData)

    return hot
  }
}


export const commenthotsService = new CommentHotsService