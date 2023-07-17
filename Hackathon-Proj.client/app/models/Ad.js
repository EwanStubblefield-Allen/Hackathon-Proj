export class Ad {
  static get AdTemplate() {
    return /*HTML*/`
    <div class="col-10 tomato-glass text-white border border-dark my-3 px-0">
      <div class="row">
        <div class="col-12 col-md-5 d-flex align-items-center p-3">
          <button class="fs-2 px-3 py-4 ad-btn text-break" type="button">START DOWNLOAD</button>
          <i class="mdi mdi-menu-left text-success fs-1"></i>
        </div>

        <div class="col-12 col-md-5 p-3 text-center text-md-start">
          <div class="d-md-flex justify-content-between">
            <div class="d-flex justify-content-center justify-md-content-start align-items-center">
              <p class="fs-4">
                Hot Pizzas In Your Area
              </p>
            </div>
          </div>
          <p>3 Easy Steps:</p>
          <ol class="text-break">
            <li>Click "Download"</li>
            <li>Download on our website</li>
            <li>Enjoy</li>
          </ol>
        </div>

        <div class="col-12 col-md-2 d-flex py-2 px-4 justify-content-end">
          <i class="mdi mdi-information-outline ad-icon p-1 me-1 fs-5"></i>
          <i class="mdi mdi-close ad-icon p-1 fs-5"></i>
        </div>
      </div>
    </div>`
  }
}