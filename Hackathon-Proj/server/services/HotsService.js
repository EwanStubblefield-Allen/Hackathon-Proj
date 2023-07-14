import { dbContext } from "../db/DbContext.js"


class HotsService {
  async getHotsByPostId(postId) {
    const hots = await dbContext.Hots.find({ postId })

      .populate('hotter', 'name picture')

    return hots
  }
  async createHotByPostId(hotData) {

    // await hotsService.getHotsByPostId(hotData.postId)

    const hot = await dbContext.Hots.create(hotData)

    await hot.populate('hotter', 'name picture')

    return hot
  }
}

export const hotsService = new HotsService()