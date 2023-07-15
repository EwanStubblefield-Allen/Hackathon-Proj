import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class HotsService {
  async getHotsByPostId(postId) {
    const res = await api.get(`api/posts/${postId}/hots`)
    return res.data
  }
  async createHotPost(postId) {
    const foundPost = AppState.posts.find(p => p.id == postId)
    if (!foundPost) {
      throw new Error('The post does not exist with the Id: ${postId}')
    }
    const hotsData = await this.getHotsByPostId(postId)
    const myHot = hotsData.find(h => AppState.account?.id == h.hotterId)
    if (myHot) {
      return this.removeHot(foundPost, myHot)
    }
    await api.post(`api/hots`, { postId: foundPost.id })
    foundPost.hotCount++
    AppState.emit('posts')
  }
  async removeHot(postData, myHot) {
    await api.delete(`api/hots/${myHot.id}`)
    postData.hotCount--
    AppState.emit('posts')
  }
}

export const hotsService = new HotsService()