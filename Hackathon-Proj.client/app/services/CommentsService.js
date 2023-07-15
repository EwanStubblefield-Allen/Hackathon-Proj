import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentByPostId() {
    const activePost = AppState.activePost
    if (!activePost) {
      return
    }
    const res = await api.get(`api/posts/${activePost.id}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }
  async createComments(commentData) {
    const res = await api.post(`api/comments`, commentData)
    AppState.comments.push(new Comment(res.data))
    AppState.emit('activePost')
  }
}

export const commentsService = new CommentsService()