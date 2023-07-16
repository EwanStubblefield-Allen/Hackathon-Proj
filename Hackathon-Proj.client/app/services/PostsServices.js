import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {
  getPostIndexById(postId) {
    const foundPost = AppState.posts.findIndex(p => p.id == postId)
    if (foundPost == -1) {
      throw new Error(`The post does not exist with the Id: ${postId}`)
    }
    return foundPost
  }
  setActivePost(postId) {
    const foundIndex = this.getPostIndexById(postId)
    AppState.activePost = AppState.posts[foundIndex]
  }
  async getPosts() {
    const res = await api.get('api/posts')
    console.log(res.data)
    res.data.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
    console.log(res.data)
    AppState.posts = res.data.map(p => new Post(p))
  }
  async getPostsByProfileId() {
    const res = await api.get(`api/profiles/${AppState.account?.id}/posts`)
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
    const newPost = new Post(newPostData)
    AppState.posts.unshift(newPost)
    AppState.myPosts.unshift(newPost)
    AppState.emit('posts')
  }
  async removePost() {
    const posts = AppState.posts
    const myPosts = AppState.myPosts
    const activePost = AppState.activePost
    const foundIndex = this.getPostIndexById(activePost?.id)
    const myFoundIndex = myPosts.findIndex(m => m.id == activePost?.id)
    await api.delete(`api/posts/${posts[foundIndex].id}`)
    posts.splice(foundIndex, 1)
    AppState.myPosts.splice(myFoundIndex, 1)
    AppState.emit('posts')
    AppState.emit('hots')
  }
  async updatePost(postData) {
    if (!postData.category) {
      postData.category = 'Unknown'
    }
    const activePost = AppState.activePost
    const foundIndex = this.getPostIndexById(activePost?.id)
    const res = await api.put(`api/posts/${activePost?.id}`, postData)
    const newPostData = new Post(res.data)
    AppState.activePost = newPostData
    AppState.posts.splice(foundIndex, 1, newPostData)
    AppState.emit('posts')
    AppState.emit('hots')
  }
}

export const postsService = new PostsService()