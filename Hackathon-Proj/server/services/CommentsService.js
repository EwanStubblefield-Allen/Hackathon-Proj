import { dbContext } from "../db/DbContext.js"

class CommentsService {

  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({ postId })
    return comments
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)

    return comment
  }

  // async deleteComment(commentId) {
  //   const foundIndex = dbContext.Comments.find(c => c. == commentId)
}

export const commentsService = new CommentsService()