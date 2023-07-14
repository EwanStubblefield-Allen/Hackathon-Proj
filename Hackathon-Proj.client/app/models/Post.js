
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
  }

  get PostTemplate() {
    return `
    <div class="col-10 basil-glass d-flex justify-content-between my-3 px-0">
      <!--NOTE THESE ARE ALL NESTED DIVS  this contains the background color and the hero image, gif-->
      <div class="d-flex w-100">
        <img class="img-fluid post-style"
          src="${this.postImg}"
          alt="${this.title}">
        <!--NOTE contains the comments and likes -->
        <div class="p-3">
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
      </div>

      <!--NOTE this contains the profile name and the profile picture -->
      <div class="d-flex flex-column justify-content-between p-2">
        <div class="d-flex align-items-center">
          <p class="p-1">Profile Name</p>
          <img class=" img-fluid img-style"
            src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy-downsized-large.gif" alt="Dog">
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <p>100</p>
          <i class="mdi mdi-heart p-2"></i>
          <p>100</p>
          <i class="mdi mdi-comment p-2"></i>
        </div>
      </div>
    </div>
    `
  }
}