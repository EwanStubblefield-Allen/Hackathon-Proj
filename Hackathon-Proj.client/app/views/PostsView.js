export const PostsView = /*HTML*/`
  <section class="container-fluid">
    <!--SECTION Posts-->
    <div class="row justify-content-center" id="postTemplate">

    </div>
  </section>

  <!--SECTION Offcanvas-->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasProfile" aria-labelledby="offcanvasProfileLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasProfileLabel">Profile</h5>
      
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