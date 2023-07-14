export class MyPost {
  constructor() {

  }

  static get PostForm() {
    return /*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Make a Post!</h5>
      <button type="button" class="btn btn-primary" onclick="app.MyPostsController.viewProfile()">View Profile</button>
    </div>
    <div class="offcanvas-body">
      <form onsubmit="app.PostsController.createPost(event)">
        <label for="title"></label>
        <input type="text" name="title" id="title" placeholder="Title" minlength="2" maxlength="20" required class="w-100">

        <label for="postImg"></label>
        <input type="url" name="postImg" id="postImg" minlength="2" maxlength="300" placeholder="Media" required class="w-100">

        <label for="description"></label>
        <textarea type="text" name="description" id="description" minlength="2" maxlength="100" placeholder="description" class="w-100"></textarea>

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
        <button type="submit" class="btn btn-danger">Submit</button>
      </form>
    </div>`
  }
  static get ProfileView() {
    return /*html*/`
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Profile</h5>
      <button type="button" class="btn btn-primary" onclick="app.MyPostsController.setPostForm()">Create New Post</button>
      </div>
      <div class="offcanvas-body">
      <div>
        <ul id="postList" class="p-0">
        <li class="d-flex align-items-center border-top border-dark p-2">
          <img class="img-style img-fluid" src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy-downsized-large.gif"
          alt="">
          <p class="p-3">Post</p>
        </li>
        </ul>
      </div>
    </div>`
  }
}