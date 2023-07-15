import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class HotsService {

  async getHotsById(hotId) {
    const hot = await dbContext.Hots.findById(hotId)
    if (!hot) {
      throw new BadRequest(`The hot does not exist with the Id: ${hotId}`)
    }
    return hot
  }
  async getHotsByPostId(postId) {
    const hots = await dbContext.Hots.find({ postId })
    return hots
  }
  async createHotByPostId(hotData) {
    const hot = await dbContext.Hots.create(hotData)
    await hot.populate('hotter', 'name picture')
    return hot
  }
  async removeHot(hotId, profileId) {
    const hotToRemove = await this.getHotsById(hotId)
    if (hotToRemove.hotterId != profileId) {
      throw new Forbidden(`You are not the owner of hot!`)
    }
    await hotToRemove.remove()
  }
}

export const hotsService = new HotsService()