import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    const posts = res.data.map(p => new Post(p))
    AppState.posts = posts
  }

  async createPost(postData) {
    const res = await api.create('api/posts', postData)
    console.log(new Post(res.data))
  }
}

export const postsService = new PostsService()