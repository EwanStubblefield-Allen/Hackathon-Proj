import { AppState } from "../AppState.js"
import { commentsService } from "../services/CommentsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"

export class CommentsConroller {
  constructor() {
    console.log('Comments Controller Loaded')
  }

  async getComments() {
    try {
      await commentsService.getComments()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
  async createComments(event) {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      formData.userId = AppState.account.id
      formData.postId = AppState.activePost.id
      await commentsService.createComments(formData)
      form.reset()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}