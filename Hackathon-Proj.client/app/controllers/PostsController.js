import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsServices.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawProfileAbilities() {
  setHTML('profileInfo', `
    <p class="text-decoration-underline selectable" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProfile" aria-controls="offcanvasProfile">
      Profile
    </p>`)

}
function _drawPosts() {
  _drawBackground()
  let template = ''
  const posts = AppState.posts
  posts.forEach(p => template += p.PostTemplate)
  setHTML('postTemplate', template)
}
function _drawActivePosts() {
  setHTML('activePost', AppState.activePost?.ActivePostTemplate)
}
function _drawBackground() {
  const posts = AppState.posts
  let mostHots = posts[0]
  console.log(mostHots)
  // FIXME Get error when drilling into lastHotDate
  // posts.forEach(p => {
  //   if (p.hotCount > mostHots.hotCount || (p.hotCount == mostHots.hotCount && p.lastHotDate.createAt > mostHots.lastHotDate.createAt)) {
  //     mostHots = p
  //   }
  // })
  let url = mostHots.postImg
  document.body.style.backgroundImage = `url('${url}')`
}

export class PostsController {
  constructor() {
    console.log("Profiles Controller Loaded.")
    this.getPosts()
    AppState.on('account', this.getPosts)
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
      if (AppState.account) {
        _drawProfileAbilities()
      }
      await postsService.getPosts()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
  async getPostsByUserId() {
    try {
      await postsService.getPostsByProfileId()
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