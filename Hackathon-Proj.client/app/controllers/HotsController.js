import { Pop } from "../utils/Pop.js";

export class HotsController {
  constructor() {
    console.log('hots controller');
  }

  createHotPost(postId) {
    try {

      console.log(postId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)

    }
  }

}