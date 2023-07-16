import { AppState } from "../AppState.js"
import { MyPost } from "../models/MyPost.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawMyPosts() {
  let template = ''
  AppState.myPosts.forEach(m => template += m.MyPostTemplate)
  setHTML('postList', template)
}

export class MyPostsController {
  constructor() {
    console.log("My Posts Controller Loaded.")
    this.viewProfile()
    AppState.on('myPosts', _drawMyPosts)
  }
  setPostForm() {
    setHTML('offcanvasProfile', MyPost.PostForm)
  }
  viewProfile() {
    setHTML('offcanvasProfile', MyPost.ProfileView)
    _drawMyPosts()
  }
}