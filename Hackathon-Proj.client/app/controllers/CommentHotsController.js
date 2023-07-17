import { commentHotsService } from "../services/CommentHotsService.js";
import { Pop } from "../utils/Pop.js";

export class CommentHotsController {
  constructor() {
    console.log('Comment Hots Controller Loaded.')
  }
  async checkCommentHotByComment(postId) {
    try {
      await commentHotsService.checkCommentHotsByComment(postId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}