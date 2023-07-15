import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class HotsService {
  // TODO Hotcount isn't saving
  async createHotPost(postId) {

    const foundPost = AppState.posts.find(p => p.id == postId)

    foundPost.hotCount++
    // FIXME communicate with server
    await api.post(`api/hots`, foundPost.id)

    AppState.emit('posts')

    console.log(postId)
  }
}

export const hotsService = new HotsService()