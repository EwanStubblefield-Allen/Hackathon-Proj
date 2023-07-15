export const PostsView = /*HTML*/`
  <section class="container-fluid">
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasProfile" aria-controls="offcanvasProfile">
        Profile
      </button>
    </div>

    <!--SECTION Posts-->
    <div class="row justify-content-center" id="postTemplate">

    </div>
  </section>

  <!--SECTION Offcanvas-->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasProfile" aria-labelledby="offcanvasProfileLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Profile</h5>
      <button type="button" class="btn btn-primary" onclick="app.MyPostsController.setPostForm()">Create New
      Post</button>
    </div>
    <div class="offcanvas-body">
      <div>
        <ul id="postList" class="p-0">
          <li class="d-flex align-items-center border-top border-dark p-2">
          <img class="img-style img-fluid" src="https://media.giphy.com/media/9fuvOqZ8tbZOU/giphy-downsized-large.gif" alt="">
          <p class="p-3">Post</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  <!--SECTION Modal-->
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div id="activePost" class="modal-content">
          
        </div>
      </div>
    </div>
  </div>`