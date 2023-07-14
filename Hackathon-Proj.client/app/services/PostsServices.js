import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"


class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        console.log('got posts', res.data)
        const posts = res.data.map(p => new Post(p))

        AppState.posts = posts

        console.log('posts in the appstate', AppState.posts);
    }



}

export const postsService = new PostsService()

