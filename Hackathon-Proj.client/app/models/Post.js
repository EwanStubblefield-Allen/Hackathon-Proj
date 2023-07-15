import { generateId } from "../utils/generateId.js"

export class Post {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.postImg = data.postImg
    this.description = data.description || ''
    this.category = data.category
    this.updatedAt = new Date(data.updatedAt).toLocaleString()
    this.createdAt = new Date(data.createdAt).toLocaleString()
    this.profileId = data.profileId
    this.profileName = data.profile[0].name
    this.profilePic = data.profile[0].picture
    this.hotCount = data.hotCount
  }

  get PostTemplate() {
    return /*HTML*/`
    <div onclick="app.PostsController.setActivePost('${this.id}')" class="col-10 basil-glass my-3 px-0 selectable" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <!--NOTE THESE ARE ALL NESTED DIVS  this contains the background color and the hero image, gif-->
      <div class="row pe-3">
        <div class="col-3">
          <img class="img-fluid post-style" src="${this.postImg}" alt="${this.title}">
        </div>

        <!--NOTE contains the comments and likes -->
        <div class="p-3 col-7">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <p class="fs-1">${this.title}</p>
              <p class="edited p-1">edited</p>
            </div>
            <div class="d-flex flex-column justify-content-around">
              <p class="edited">Created At: ${this.createdAt}</p>
              <p class="edited">Updated At: ${this.updatedAt}</p>
            </div>
          </div>
          <p class="category">Category: ${this.category}</p>
          <p>${this.description}</p>
        </div>

        <!--NOTE this contains the profile name and the profile picture -->
        <div class="d-flex flex-column justify-content-between p-2 col-2">
          <div class="d-flex align-items-center justify-content-end">
            <p class="p-1">${this.profileName}</p>
            <img class=" img-fluid img-style"
              src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy-downsized-large.gif" alt="Dog">
          </div>
          <div class="d-flex justify-content-end align-items-center">
          <div onclick="app.HotsController.createHotPost('${this.id}')" class="d-flex align-items-center" >
            <p>${this.hotCount}</p>
            <i title="HOTS" class="mdi mdi-fire p-2"></i>
            </div>
            <p>100</p>
            <i class="mdi mdi-comment p-2"></i>
          </div>
        </div>
      </div>
    </div>`
  }

  get ActivePostTemplate() {
    return `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <img class="img-fluid pb-2" src="${this.postImg}"
        alt="${this.title}">
      <form onsubmit="app.CommentsController.createComment(event)">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Comment" aria-label="Comment"
            aria-describedby="comment" name="description" required>
          <button type="submit" class="input-group-text" id="comment">+</button>
        </div>
      </form>
      <div id="commentTemplate"></div>
    </div>`
  }
}