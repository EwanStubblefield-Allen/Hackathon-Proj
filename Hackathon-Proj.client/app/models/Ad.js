export class Ad {
  static get AdTemplate() {
    return `
    <div class="col-10 tomato-glass text-white my-3 px-0">
      <div class="row">
        <div class="col-12 col-md-3">
          <img class="img-fluid post-style w-100" src="" alt="Hot Pizza in your area">
        </div>

        <div class="col-12 col-md-7 p-3 text-center text-md-start">
          <div class="d-md-flex justify-content-between">
            <div class="d-flex justify-content-center justify-md-content-start align-items-center">
              <p class="fs-1">
                Hot Pizzas In Your Area
              </p>
            </div>
          </div>
          <p class="category">Call Now: 1-800-Hot-Piza</p>
          <p class="text-break"></p>
        </div>

        <div class="col-12 col-md-2 d-flex flex-md-column justify-content-between py-2 px-4">
          <div class="d-flex flex-row-reverse flex-md-row align-items-center justify-content-end">
            <p class="p-1">Ad</p>
          </div>
          <div class="d-flex justify-content-end align-items-center">

          </div>
        </div>
      </div>
    </div>`
  }
}