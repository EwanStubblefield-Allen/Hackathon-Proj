import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentHotsService } from "../services/CommentHotsService.js";

export class CommentHotsController extends BaseController {
  constructor() {
    super('api/commentHots')
    this.router
      .get('/:commentHotId', this.getCommentHotById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCommentHotByCommentId)
      .delete('/:commentHotId', this.removeCommentHot)
  }
  async getCommentHotById(req, res, next) {
    try {
      const commentHot = await commentHotsService.getCommentHotsById(req.params.commentHotId)
      return res.send(commentHot)
    } catch (error) {
      next(error)
    }
  }
  async createCommentHotByCommentId(req, res, next) {
    try {
      const commentHotData = req.body
      commentHotData.hotterId = req.userInfo.id
      const commentHot = await commentHotsService.createCommentHotByCommentId(commentHotData)
      return res.send(commentHot)
    } catch (error) {
      next(error);
    }
  }
  async removeCommentHot(req, res, next) {
    try {
      const commentHotId = req.params.commentHotId
      const profileId = req.userInfo.id
      await commentHotsService.removeCommentHot(commentHotId, profileId)
      return res.send("Hot Deleted")
    } catch (error) {
      next(error)
    }
  }
}