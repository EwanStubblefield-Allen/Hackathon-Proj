import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  // TODO finish need getter in server
  async getComments() {
    const res = await api.get(`api/posts/${AppState.activePost.id}/comments`)

    const comments = res.data.map(c => new Comment(c))
    AppState.comments = comments
    console.log(res.data);
  }
  async createComments(commentData) {
    const res = await api.post(`api/comments`, commentData)
    console.log(res.data)

    AppState.comments.push(new Comment(res.data))
  }
}

export const commentsService = new CommentsService()