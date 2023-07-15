import { AppState } from "../AppState.js"
import { commentsService } from "../services/CommentsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawComments() {
  let template = ''
  AppState.comments.forEach(c => template += c.CommentTemplate)
  setHTML('commentTemplate', template)
  console.log('drawing comments')
}
export class CommentsController {
  constructor() {
    console.log('Comments Controller Loaded')
    AppState.on('activePost', this.getCommentsByPostId)
    AppState.on('activePost', _drawComments)
  }
  // TODO finish need getter
  // async getComments() {
  //   try {
  //     await commentsService.getComments()
  //   } catch (error) {
  //     console.log(error)
  //     Pop.error(error.message)
  //   }
  // }
  async createComment(event) {
    try {
      event.preventDefault()
      console.log('form submitted')
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


  async getCommentsByPostId() {
    try {
      await commentsService.getCommentByPostId()
    } catch (error) {
      console.log(error);
      Pop.error(error.message)

    }
  }
}