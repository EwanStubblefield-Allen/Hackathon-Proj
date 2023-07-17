import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class CommentHotsService {
  async checkCommentHotsByComment(commentId) {
    const commentHotsData = await this.getCommentHotsByCommentId(commentId)
    AppState.commentHots = commentHotsData
    const foundComment = AppState.comments.find(p => p.id == commentId)
    if (!foundComment) {
      throw new Error(`The comment does not exist with the Id: ${commentId}`)
    }
    const myCommentHotIndex = AppState.commentHots.findIndex(h => AppState.account?.id == h.hotterId)
    if (myCommentHotIndex >= 0) {
      return this.removeCommentHot(foundComment, myCommentHotIndex)
    }
    return this.createCommentHot(foundComment)
  }
  async getCommentHotsByCommentId(commentId) {
    const res = await api.get(`api/comments/${commentId}/commentHots`)
    return res.data
  }
  async createCommentHot(foundComment) {
    const commentHots = AppState.commentHots
    commentHots.push({ commentHotterId: AppState.account?.id })
    if (foundComment.commentHotCount == commentHots.length) {
      return
    }
    foundComment.commentHotCount = commentHots.length
    AppState.emit('commentHots')
    await api.post(`api/commentHots`, { commentId: foundComment.id, posterId: AppState.activePost?.id })
  }
  async removeCommentHot(foundComment, myCommentHotIndex) {
    const commentHots = AppState.commentHots
    const myCommentHot = commentHots[myCommentHotIndex]
    commentHots.splice(myCommentHotIndex, 1)
    if (foundComment.commentHotCount == commentHots.length) {
      return
    }
    foundComment.commentHotCount = commentHots.length
    AppState.emit('commentHots')
    await api.delete(`api/commentHots/${myCommentHot.id}`)
  }
}

export const commentHotsService = new CommentHotsService()