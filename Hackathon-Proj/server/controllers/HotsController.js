import { Auth0Provider } from "@bcwdev/auth0provider";
import { hotsService } from "../services/HotsService.js";
import BaseController from "../utils/BaseController.js";


export class HotsController extends BaseController {
  constructor() {
    super('api/hots')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHotByPostId)
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
}