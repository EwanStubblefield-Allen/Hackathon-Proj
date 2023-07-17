import { AppState } from "../AppState.js"

export class Comment {
  constructor(data) {
    this.description = data.description
    this.postId = data.postId
    this.profileId = data.profileId
    this.profileName = data.profile.name
    this.profilePic = data.profile.picture
    this.createdAt = new Date(data.createdAt).toLocaleString()
    this.updatedAt = new Date(data.updatedAt).toLocaleString()
  }

  get CommentTemplate() {
    return /*HTML*/`
    <div class="row justify-content-between align-items-center border-top border-dark p-2">
      <div class="col-8 d-flex justify-content-start align-items-start">
        <img class="img-style img-fluid" src="${this.profilePic}"
        alt="${this.profileName}">
        <div class="px-3">
          <p>${this.profileName}</p>
          <p class="text-break">${this.description}</p>
        </div>
        </div>
        
        <div class="col-4 d-flex align-items-center">
        <p class="edited-marinara">
          Created At: ${this.createdAt}
        </p>
        ${this.ComputedUpdate}
      </div>
    </div>`
  }

  get ComputedUpdate() {
    const account = AppState.account
    if (!account || account.id != this.profileId) {
      return ''
    }
    return /*HTML*/`
    <button class="btn text-white" type="button" title="Delete Post">
      <i class="mdi mdi-delete-empty fs-5"></i>
    </button>`
  }
}