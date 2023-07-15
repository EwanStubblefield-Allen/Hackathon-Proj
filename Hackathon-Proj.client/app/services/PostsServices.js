import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  setActivePost(postId) {
    const posts = AppState.posts
    const foundPost = posts.find(p => p.id == postId)
    AppState.activePost = foundPost
  }

  async getPosts() {
    const res = await api.get('api/posts')
    const posts = res.data.map(p => new Post(p))
    AppState.posts = posts
  }
  async getPostsByUserId() {
    const res = await api.get(`api/${AppState.account.id}/posts`)
    // TODO Finish Function
  }
  async createPost(postData) {
    console.log(postData)
    if (!postData.category) {
      postData.category = 'Unknown'
    }
    const res = await api.post('api/posts', postData)
    AppState.posts.push(new Post(res.data))
    AppState.emit('posts')
  }
}

export const postsService = new PostsService()