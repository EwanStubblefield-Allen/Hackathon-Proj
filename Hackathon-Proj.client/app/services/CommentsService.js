import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentByPostId() {
    const activePost = AppState.activePost
    const res = await api.get(`api/posts/${activePost?.id}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
  }
  async createComments(commentData) {
    if (!AppState.activePost) {
      throw new Error(`There is no Active Post`)
    }
    AppState.activePost.commentCount++
    const res = await api.post(`api/comments`, commentData)
    AppState.comments.push(new Comment(res.data))
    AppState.emit('activePost')
    AppState.emit('posts')
  }
}

export const commentsService = new CommentsService()