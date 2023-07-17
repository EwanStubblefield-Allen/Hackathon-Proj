import { AppState } from "../AppState.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.description = data.description
    this.postId = data.postId
    this.profileId = data.profileId
    this.profileName = data.profile.name
    this.profilePic = data.profile.picture
    this.hotCount = data.hotCount
    this.createdAt = new Date(data.createdAt).toLocaleString()
    this.updatedAt = new Date(data.updatedAt).toLocaleString()
  }

  get CommentTemplate() {
    return /*HTML*/`
    <div class="d-flex justify-content-between align-items-center border-top border-dark p-2">
      <div class="w-100 text-center">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img class="img-style img-fluid" src="${this.profilePic}" alt="${this.profileName}">
            <p class="mx-1">${this.profileName}</p>
          </div>
          <p class="edited-marinara">Created At: ${this.createdAt}</p>
        </div>
        <p class="text-break">${this.description}</p>
      </div>

      <div class="d-flex flex-column justify-content-between">
        ${this.ComputedUpdate}
        <div onclick="app.HotsController.checkHotByPost('${this.id}')" class="d-flex align-items-center p-2 selectable" title="That's Hot">
          <p>${this.hotCount}</p>
          <i class="mdi mdi-fire ps-2"></i>
        </div>
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