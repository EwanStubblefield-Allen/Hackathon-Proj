import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { hotsService } from "../services/HotsService.js";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .get('/:postId', this.getPostsById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:postId/comments', this.getCommentsByPostId)
      .post('', this.createPost)
      .get('/:postId/hots', this.getHotsByPostId)
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
  async getCommentsByPostId(req, res, next) {
    try {
      const postId = req.params.postId
      const comments = await commentsService.getCommentsByPostId(postId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getHotsByPostId(req, res, next) {
    try {
      const postId = req.params.postId

      const hots = await hotsService.getHotsByCommentId(postId)

      return res.send(hots)

    } catch (error) {
      next(error);
    }
  }

}
