import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class HotsService {
  async createHotPost(postId) {

    const foundPost = AppState.posts.find(p => p.id == postId)

    foundPost.hotCount++

    AppState.emit('posts')

    console.log(postId)
  }
}

export const hotsService = new HotsService()