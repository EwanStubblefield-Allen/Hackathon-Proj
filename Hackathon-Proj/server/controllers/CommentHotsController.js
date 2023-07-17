import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commenthotsService } from "../services/CommentHotsService.js";

export class CommentHotsController extends BaseController {
  constructor() {
    super('api/commenthots')

    this.router
      .get(':/hotId', this.getHotById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHotByCommentId)
  }
  async getHotById(req, res, next) {
    try {
      const hot = await commenthotsService.getHotById(req.params.hotId)

      return res.send(hot)

    } catch (error) {
      next(error)
    }

  }

  async createHotByCommentId(req, res, next) {
    try {
      const hotData = req.body

      hotData.hotterId = req.userInfo.Id

      const hot = await commenthotsService.createHotByCommentId(hotData)

      return res.send(hot)

    } catch (error) {
      next(error)
    }
  }
}