import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }

  async createComment(req, res, next) {
    try {
      const postId = req.params.postId
      const commentData = req.body
      commentData.profileId = req.userInfo.id
      const comment = await commentsService.createComment(commentData, postId)
      return res.send(comment)
    } catch (error) {
      next(error);
    }
  }

}

