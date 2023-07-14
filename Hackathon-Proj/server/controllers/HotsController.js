import { hotsService } from "../services/HotsService.js";
import BaseController from "../utils/BaseController.js";


export class HotsController extends BaseController {
  constructor() {
    super('api/hots')
    this.router
      .post('/:postId/hots', this.createHotByPostId)

  }

  async createHotByPostId(req, res, next) {
    try {
      const hotData = req.body

      const hot = await hotsService.createHotByPostId(hotData)

      return res.send(hot)
    } catch (error) {
      next(error);
    }

  }
}