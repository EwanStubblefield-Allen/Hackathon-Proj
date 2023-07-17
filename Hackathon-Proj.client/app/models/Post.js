import { AppState } from "../AppState.js"

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
    this.hotCount = data.hots ? data.hots.length : 0
    this.lastHotDate = data.hotCount ? new Date(data.hotCount[-1].createdAt).valueOf() : 0
    this.commentCount = data.commentCount || 0
  }
  get PostTemplate() {
    return /*HTML*/`
      <div class="col-10 basil-glass my-3 px-0">
        <div class="row">
          <div class="col-12 col-md-3">
            <img class="img-fluid post-style w-100" src="${this.postImg}" alt="${this.title}">
          </div>

          <div class="col-12 col-md-7 p-3 text-center text-md-start">
            <div class="d-md-flex justify-content-between">
              <div class="d-flex justify-content-center justify-md-content-start align-items-center">
                <p class="fs-1">
                  ${this.title}
                  ${this.computedEdit}
                </p>
              </div>
              <div class="d-flex flex-column justify-content-around text-md-end">
                ${this.computedDates}
              </div>
            </div>
            <p class="category">Category: ${this.category}</p>
            <p class="text-break">${this.description}</p>
          </div>

          <div class="col-12 col-md-2 d-flex flex-md-column justify-content-between py-2 px-4">
            <div class="d-flex flex-row-reverse flex-md-row align-items-center justify-content-end">
              <p class="p-1">${this.profileName}</p>
              <img class=" img-fluid img-style"
                src="${this.profilePic}" alt="${this.profileName}">
            </div>
            <div class="d-flex justify-content-end align-items-center">
              ${this.computedInteraction}
            </div>
          </div>
        </div>
      </div>`
  }
  get computedDates() {
    if (this.createdAt == this.updatedAt) {
      return /*HTML*/`
        <p class="edited">Created At: ${this.createdAt}</p>`
    }
    return /*HTML*/`
      <p class="edited">Created At: ${this.createdAt}</p>
      <p class="edited">Updated At: ${this.updatedAt}</p>`
  }
  get computedEdit() {
    if (this.createdAt == this.updatedAt) {
      return ''
    }
    return /*HTML*/`
      <span class="edited p-1">(edited)</span>`
  }
  get computedInteraction() {
    if (!AppState.account) {
      return ''
    }
    return /*HTML*/`
    <div onclick="app.HotsController.checkHotByPost('${this.id}')" class="d-flex align-items-center p-2 selectable" title="That's Hot">
      <p>${this.hotCount}</p>
      <i class="mdi mdi-fire ps-2"></i>
    </div>

    <div onclick="app.PostsController.setActivePost('${this.id}')" class="d-flex align-items-center p-2 selectable" title="View Comments">
      <p>${this.commentCount}</p>
      <i class="mdi mdi-comment ps-2"></i>
    </div>`
  }
  get ActivePostTemplate() {
    return /*HTML*/`
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
        <div class="d-flex align-items-center">
          ${this.computedUpdate}
          <button type="button" class="btn text-white" data-bs-dismiss="modal" aria-label="Close" title="Close Post Window">
            <i class="mdi mdi-window-close fs-5"></i>
          </button>
        </div>
      </div>
      
      <div class="modal-body">
        <div class="collapse" id="formCollapse">
          <div class="card card-body mb-3">
            <form onsubmit="app.PostsController.updatePost(event)">
              <label for="title"></label>
              <input type="text" name="title" id="title" placeholder="Title" minlength="2" maxlength="20" required class="form-control w-100" value="${this.title}">

              <label for="postImg"></label>
              <input type="url" name="postImg" id="postImg" minlength="2" maxlength="300" placeholder="Media" required class="form-control w-100" value="${this.postImg}">

              <label for="description"></label>
              <textarea type="text" name="description" id="description" minlength="2" maxlength="100" placeholder="description" class="form-control w-100">${this.description}</textarea>

              <label for="category" class="form-label"></label>
              <input class="form-control" name="category" list="datalistOptions" id="category" placeholder="Pizza Type" value="${this.category}">
              <datalist id="datalistOptions">
                <option value="Flat Bread">
                <option value="Chicago">
                <option value="New York">
                <option value="Stuffed Crust">
                <option value="Italian">
                <option value="Thin Crust">
                <option value="Thick Crust">
                <option value="Pan">
                <option value="Cauliflower">
                <option value="Unknown">
              </datalist>
              <div class="text-end">
                <button type="submit" class="btn btn-danger mt-3">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <img class="img-fluid activeImg w-100 pb-2" src="${this.postImg}"
          alt="${this.title}">

        <form onsubmit="app.CommentsController.createComment(event)">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Comment" aria-label="Comment"
              aria-describedby="comment" name="description" maxlength="100" required>
            <button type="submit" class="input-group-text" id="comment" title="Post Comment">+</button>
          </div>
        </form>
        
        <div id="commentTemplate" class="container-fluid">

        </div>
      </div>`
  }
  get computedUpdate() {
    const account = AppState.account
    if (!account || account.id != this.profileId) {
      return ''
    }
    return /*HTML*/`
      <button class="btn text-white" type="button" data-bs-toggle="collapse" data-bs-target="#formCollapse"
        aria-expanded="false" aria-controls="formCollapse" title="Edit Post">
        <i class="mdi mdi-pencil fs-5"></i>
      </button>
      <button onclick="app.PostsController.removePost()" class="btn text-white" type="button" title="Delete Post">
        <i class="mdi mdi-delete-empty fs-5"></i>
      </button>`
  }
  get MyPostTemplate() {
    return /*HTML*/`
    <li onclick="app.PostsController.setActivePost('${this.id}')" class="d-flex justify-content-between align-items-center border-top border-dark p-2 selectable">
      <div class="d-flex justify-content-around align-items-center">
        <img class="img-style img-fluid" src="${this.postImg}"
        alt="${this.title}">
        <p class="p-3">${this.title}</p>
      </div>

      <div class="d-flex justify-content-around align-items-center">
        <div class="d-flex align-items-center p-2">
          <p>${this.hotCount}</p>
          <i title="HOTS" class="mdi mdi-fire ps-2"></i>
        </div>
        
        <div class="d-flex align-items-center p-2">
          <p>${this.commentCount}</p>
          <i class="mdi mdi-comment ps-2"></i>
        </div>
      </div>
    </li>`
  }
}