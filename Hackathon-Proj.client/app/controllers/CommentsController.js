import { AppState } from "../AppState.js"
import { commentsService } from "../services/CommentsService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawComments() {
  let template = ''
  AppState.comments.forEach(c => template += c.CommentTemplate)
  setHTML('commentTemplate', template)
}

export class CommentsController {
  constructor() {
    console.log('Comments Controller Loaded.')
    AppState.on('activePost', this.getCommentsByPostId)
    AppState.on('commentHots', _drawComments)
  }
  async getCommentsByPostId() {
    try {
      await commentsService.getCommentByPostId()
      _drawComments()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#staticBackdrop').show()
    } catch (error) {
      console.log(error);
      Pop.error(error.message)
    }
  }
  async createComment(event) {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      if (!formData || !AppState.account || !AppState.activePost) {
        throw new Error('Data is not detected')
      }
      formData.userId = AppState.account.id
      formData.postId = AppState.activePost.id
      await commentsService.createComments(formData)
      form.reset()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
  async removeComment(commentId) {
    try {
      const isSure = await Pop.confirm('Are you sure you want to delete this comment')
      if (!isSure) {
        return
      }
      await commentsService.removeComment(commentId)
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance('#staticBackdrop').hide()
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}