import { dbContext } from "../db/DbContext.js"


class HotsService {
  async getHotsByCommentId(postId) {
    const hots = await dbContext.Comments.find({ postId })

    return hots
  }
  async createHotByPostId(hotData) {

    await hotsService.getHotsByCommentId(hotData.commentId)

    const hot = await dbContext.Hots.create(hotData)

    return hot
  }
}

export const hotsService = new HotsService()