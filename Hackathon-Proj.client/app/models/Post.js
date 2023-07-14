
export class Post {
    constructor(data) {
        this.title = data.title
        this.postImg = data.postImg
        this.description = data.description
        this.category = data.category
        this.updatedAt = data.updatedAt
        this.createdAt = data.createdAt
        this.id = data.id
        this.profileId = data.profileId
    }

    get PostTemplate() {
        return `
<div class="col-12">

  <!--NOTE THESE ARE ALL NESTED DIVS  this contains the background color and the hero image, gif-->
  <div class="basil-glass d-flex">
    <div>
      <img class="img-fluid post-style"
        src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy-downsized-large.gif" alt="">

    </div>

    <!--NOTE this contains the profile name and the profile picture -->
    <div class="d-flex flex-column">
      <div>
        <img class="img-fluid img-style"
          src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
          alt="PIZZA IMG">
        <p>Profile Name</p>

      </div>

      <!--NOTE contains the comments and likes -->
      <div>
        <p>Description</p>
        <i class="mdi mdi-heart"></i>
        <i class="mdi mdi-comment"></i>

      </div>
    </div>
  </div>
</div>
`
    }
}