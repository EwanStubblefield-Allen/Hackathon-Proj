import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  setActivePost(postId) {
    const posts = AppState.posts
    const foundPost = posts.find(p => p.id == postId)
    if (!foundPost) {
      throw new Error(`The post does not exist with the Id: ${postId}`)
    }
    AppState.activePost = foundPost
  }
  async getPosts() {
    const res = await api.get('api/posts')
    const posts = res.data.map(p => new Post(p))
    AppState.posts = posts
  }
  async getPostsByProfileId() {
    const res = await api.get(`api/profiles/${AppState.account?.id}/posts`)
    console.log(res.data)
    AppState.myPosts = res.data.map(d => new Post(d))
  }
  async createPost(postData) {
    debugger
    if (!postData.category) {
      postData.category = 'Unknown'
    }
    const res = await api.post('api/posts', postData)
    console.log(res.data)
    console.log(new Post(res.data))
    const newPostData = new Post(res.data)
    AppState.posts.push(newPostData)
    AppState.emit('posts')
  }
}

export const postsService = new PostsService()