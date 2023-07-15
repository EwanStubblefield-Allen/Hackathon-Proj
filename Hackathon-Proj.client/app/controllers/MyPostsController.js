import { MyPost } from "../models/MyPost.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

export class MyPostsController {
  constructor() {
    console.log("My Posts Controller Loaded.")
  }
  setPostForm() {
    setHTML('offcanvasProfile', MyPost.PostForm)
  }
  viewProfile() {
    setHTML('offcanvasProfile', MyPost.ProfileView)
  }
}