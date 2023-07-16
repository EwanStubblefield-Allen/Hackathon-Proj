import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class HotsService {
  async checkHotsByPost(postId) {
    const hotsData = await this.getHotsByPostId(postId)
    AppState.hots = hotsData
    const hots = AppState.hots
    const foundPost = AppState.posts.find(p => p.id == postId)
    if (!foundPost) {
      throw new Error(`The post does not exist with the Id: ${postId}`)
    }
    const myHotIndex = hots.findIndex(h => AppState.account?.id == h.hotterId)
    if (myHotIndex >= 0) {
      return this.removeHot(foundPost, myHotIndex)
    }
    return this.createHotPost(foundPost)
  }
  async getHotsByPostId(postId) {
    const res = await api.get(`api/posts/${postId}/hots`)
    return res.data
  }
  // NOTE This will prevent errors when spamming hots if you have a better way to do it feel free to try
  async createHotPost(foundPost) {
    const hots = AppState.hots
    hots.push({ hotterId: AppState.account?.id })
    if (foundPost.hotCount == hots.length) {
      return
    }
    foundPost.lastHotDate = new Date().valueOf()
    foundPost.hotCount = hots.length
    AppState.emit('posts')
    await api.post(`api/hots`, { postId: foundPost.id })
  }
  async removeHot(postData, myHotIndex) {
    const hots = AppState.hots
    const myHot = hots[myHotIndex]
    hots.splice(myHotIndex, 1)
    if (postData.hotCount == hots.length) {
      return
    }
    postData.hotCount = hots.length
    AppState.emit('posts')
    await api.delete(`api/hots/${myHot.id}`)
  }
}

export const hotsService = new HotsService()