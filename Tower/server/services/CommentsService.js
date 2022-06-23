import { dbContext } from "../db/DbContext"


class CommentsService{
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.findById({eventId})
    return comments
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }

}
export const commentsService = new CommentsService()