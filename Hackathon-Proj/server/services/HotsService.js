import { dbContext } from "../db/DbContext.js"


class HotsService {
  async getHotsByPostId(postId) {
    const hots = await dbContext.Posts.find({ postId })

    return hots
  }
  async createHotByPostId(hotData) {

    await hotsService.getHotsByPostId(hotData.postId)

    const hot = await dbContext.Hots.create(hotData)

    return hot
  }
}

export const hotsService = new HotsService()