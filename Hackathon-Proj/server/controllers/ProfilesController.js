import { accountHoldersService } from '../services/AccountHoldersService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:profileId/posts', this.getPostsByUserId)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
  async getPostsByUserId(req, res, next) {
    try {
      const profileId = req.params.profileId

      const posts = await accountHoldersService.getPostsByAuthorId(profileId)

      res.send(posts)
    } catch (error) {
      next(error)
    }
  }
}
