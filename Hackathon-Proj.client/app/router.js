import { CommentsConroller } from "./controllers/CommentsController.js";
import { MyPostsController } from "./controllers/MyPostsController.js";
import { PostsController } from "./controllers/PostsController.js";
import { PostsView } from "./views/PostsView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    controller: [PostsController, MyPostsController, CommentsConroller],
    view: PostsView
  },
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */