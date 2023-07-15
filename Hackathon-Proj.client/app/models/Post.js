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
    this.commentCount = data.commentCount
  }
  get PostTemplate() {
    return /*HTML*/`
      <div class="col-10 basil-glass my-3 px-0">
        <div class="row pe-3">
          <div class="col-3">
            <img class="img-fluid post-style" src="${this.postImg}" alt="${this.title}">
          </div>

          <div class="p-3 col-7">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <p class="fs-1">
                  ${this.title}
                  ${this.computedEdit}
                </p>
              </div>
              <div class="d-flex flex-column justify-content-around">
                ${this.computedDates}
              </div>
            </div>
            <p class="category">Category: ${this.category}</p>
            <p>${this.description}</p>
          </div>

          <div class="d-flex flex-column justify-content-between p-2 col-2">
            <div class="d-flex align-items-center justify-content-end">
              <p class="p-1">${this.profileName}</p>
              <img class=" img-fluid img-style"
                src="${this.profilePic}" alt="${this.profileName}">
            </div>
            <div class="d-flex justify-content-end align-items-center">
              <div onclick="app.HotsController.createHotPost('${this.id}')" class="d-flex align-items-center p-2 selectable">
                <p>${this.hotCount}</p>
                <i title="HOTS" class="mdi mdi-fire ps-2"></i>
              </div>
              <div onclick="app.PostsController.setActivePost('${this.id}')" class="d-flex align-items-center p-2 selectable">
                <p>${this.commentCount}</p>
                <i class="mdi mdi-comment ps-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
  get computedDates() {
    if (this.createdAt == this.updatedAt) {
      return `
        <p class="edited">Created At: ${this.createdAt}</p>`
    }
    return `
      <p class="edited">Created At: ${this.createdAt}</p>
      <p class="edited">Updated At: ${this.updatedAt}</p>`
  }
  get computedEdit() {
    if (this.createdAt == this.updatedAt) {
      return ''
    }
    return `
      <span class="edited p-1">edited</span>`
  }
  get ActivePostTemplate() {
    return `
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img class="img-fluid activeImg w-100 pb-2" src="${this.postImg}"
          alt="${this.title}">
        <form onsubmit="app.CommentsController.createComment(event)">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Comment" aria-label="Comment"
              aria-describedby="comment" name="description" required>
            <button type="submit" class="input-group-text" id="comment">+</button>
          </div>
        </form>
        <div id="commentTemplate">

        </div>
      </div>`
  }
}