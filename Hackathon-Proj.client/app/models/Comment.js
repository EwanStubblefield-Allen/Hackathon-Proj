export class Comment {
  constructor(data) {
    this.description = data.discription
    this.userId = data.userId
    this.postId = data.postId
    this.createdAt = new Date(data.createdAt).toLocaleString()
    this.updatedAt = new Date(data.updatedAt).toLocaleString()
  }

  get CommentTemplate() {
    return `
    <div>${this.description}</div>
    <div>${this.updatedAt}</div>

    `
  }
}