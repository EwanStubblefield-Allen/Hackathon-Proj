import { dbContext } from "../db/DbContext.js"

class CommentService {

  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId })
    return comments
  }

  async createComment(commentData, postId) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }
}
export const commentsService = new CommentService()