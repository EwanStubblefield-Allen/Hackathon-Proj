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
      .get('/:postId/hots', this.getHotsByPostId)
      .get('/:postId/comments', this.getCommentsByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.removePost)
      .put('/:postId', this.editPost)
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
      const hots = await hotsService.getHotsByPostId(postId)
      return res.send(hots)
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
  async removePost(req, res, next) {
    try {
      const postId = req.params.postId
      const profileId = req.userInfo.id
      await postsService.removePost(postId, profileId)
      return res.send('Post Removed')
    } catch (error) {
      next(error);
    }
  }

  async editPost(req, res, next) {
    try {
      const postData = req.body

      const postId = req.params.postId

      const userId = req.userInfo.id

      const updatedPost = await postsService.editPost(postData, postId, userId)

      return res.send(updatedPost)
    } catch (error) {
      next(error)
    }
  }

}
