import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsServices.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawPosts() {
  let template = ''
  AppState.posts.forEach(p => template += p.PostTemplate)
  setHTML('postTemplate', template)
}



function _drawActivePosts() {
  setHTML('activePost', AppState.activePost.ActivePostTemplate)
}

export class PostsController {
  constructor() {
    console.log("Profiles Controller Loaded.")
    this.getPosts()
    AppState.on('posts', _drawPosts)
    AppState.on('activePost', _drawActivePosts)
  }
  setActivePost(postId) {
    try {
      postsService.setActivePost(postId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
  async getPostsByUserId() {
    try {
      await postsService.getPostsByUserId()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
  async createPost(event) {
    try {
      event.preventDefault()
      const form = event.target
      await postsService.createPost(getFormData(form))
      form.reset()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}