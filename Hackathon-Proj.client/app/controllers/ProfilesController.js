import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { postsService } from "../services/PostsServices.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawPosts() {
    let template = ''
    AppState.posts.forEach(p => template += p.PostTemplate)
    setHTML('postTemplate', template)
}
export class PostsController {
    constructor() {
        console.log("Profiles Controller Loaded.")
        this.getPosts()
        AppState.on('posts', _drawPosts)
    }
    async getPosts() {
        try {
            await postsService.getPosts()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }
}