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
    console.log(res.data)
    AppState.posts = res.data.map(p => new Post(p))
    console.log(AppState.posts)
  }
  async getPostsByProfileId() {
    const res = await api.get(`api/profiles/${AppState.account?.id}/posts`)
    console.log(res.data)
    AppState.myPosts = res.data.map(d => new Post(d))
  }
  async createPost(postData) {
    if (!postData.category) {
      postData.category = 'Unknown'
    }
    const res = await api.post('api/posts', postData)
    const newPostData = res.data
    newPostData.profileName = AppState.account?.name
    newPostData.profilePic = AppState.account?.picture
    AppState.posts.push(new Post(newPostData))
    AppState.emit('posts')
  }
}

export const postsService = new PostsService()