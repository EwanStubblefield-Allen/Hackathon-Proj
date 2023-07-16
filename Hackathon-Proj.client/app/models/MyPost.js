export class MyPost {
  constructor(data) {
    this.title = data.title
    this.postImg = data.postImg
  }
  static get PostForm() {
    return /*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Make a Post!</h5>
      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-danger" onclick="app.MyPostsController.viewProfile()">View Profile</button>
        <button type="button" class="btn text-white" data-bs-dismiss="offcanvas" aria-label="Close" title="Close Form Window">
            <i class="mdi mdi-window-close fs-5"></i>
        </button>
      </div>
    </div>
    <div class="offcanvas-body">
      <form onsubmit="app.PostsController.createPost(event)">
        <label for="title"></label>
        <input type="text" name="title" id="title" placeholder="Title" minlength="2" maxlength="20" required class="form-control w-100">

        <label for="postImg"></label>
        <input type="url" name="postImg" id="postImg" minlength="2" maxlength="300" placeholder="Image Url" required class="form-control w-100">

        <label for="description"></label>
        <textarea type="text" name="description" id="description" minlength="2" maxlength="100" placeholder="Description" class="form-control w-100"></textarea>

        <label for="category" class="form-label"></label>
        <input class="form-control" name="category" list="datalistOptions" id="category" placeholder="Pizza Type">
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
    </div>`
  }
  static get ProfileView() {
    return /*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Profile</h5>
      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-danger" onclick="app.MyPostsController.setPostForm()">Create New Post</button>
        <button type="button" class="btn text-white" data-bs-dismiss="offcanvas" aria-label="Close" title="Close My Posts Window">
          <i class="mdi mdi-window-close fs-5"></i>
        </button>
      </div>
    </div>
    <div class="offcanvas-body">
      <div>
        <ul id="postList" class="p-0">
          
        </ul>
      </div>
    </div>`
  }
}