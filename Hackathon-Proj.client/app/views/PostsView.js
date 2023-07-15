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
          
        </ul>
      </div>
    </div>
  </div>
  
  <!--SECTION Modal-->
    <div class="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div id="activePost" class="modal-content">
        
      </div>
    </div>
  </div>`