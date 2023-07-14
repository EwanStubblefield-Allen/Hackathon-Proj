import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .get('/:postId', this.getPostsById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
  }
  async getPosts(req, res, next) {
    try {
      const posts = await postsService.getPosts()
      return res.send(posts)
    } catch (error) {
      next(error);
    }
  }

  async getPostsById(req, res, next) {
    try {
      const postId = req.params.postId
      const post = await postsService.getPostsById(postId)
      return res.send(post)
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const postData = req.body
      postData.profileId = req.userInfo.id
      const post = await postsService.createPost(postData)
      return res.send(post)
    } catch (error) {
      next(error);
    }
  }

}