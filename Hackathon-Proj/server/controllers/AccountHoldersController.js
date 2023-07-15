import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"

export class AccountHoldersController extends BaseController {
  constructor() {
    super('api/accountHolders')

    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
  }
}