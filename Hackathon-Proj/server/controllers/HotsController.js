import { Auth0Provider } from "@bcwdev/auth0provider";
import { hotsService } from "../services/HotsService.js";
import BaseController from "../utils/BaseController.js";


export class HotsController extends BaseController {
  constructor() {
    super('api/hots')
    this.router
      .get('/:hotId', this.getHotById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHotByPostId)
      .delete('/:hotId', this.removeHot)
  }
  async getHotById(req, res, next) {
    try {
      const hot = await hotsService.getHotsById(req.params.hotId)
      return res.send(hot)
    } catch (error) {
      next(error)
    }
  }

  async createHotByPostId(req, res, next) {
    try {
      const hotData = req.body
      hotData.hotterId = req.userInfo.id
      const hot = await hotsService.createHotByPostId(hotData)
      return res.send(hot)
    } catch (error) {
      next(error);
    }
  }

  async removeHot(req, res, next) {
    try {

      const hotId = req.params.hotId

      const profileId = req.userInfo.id

      await hotsService.removeHot(hotId, profileId)

      return res.send("Hot Deleted")
    } catch (error) {
      next(error)
    }
  }
}