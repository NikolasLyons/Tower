import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentsService{
  
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({eventId})
    .populate('creator', 'name picture')
    .populate('event')
    return comments
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    await comment.populate('event')
    return comment
  }
  async delete(id, userId) {
  const comment = await dbContext.Comments.findById(id)
  if(comment.creatorId.toString() != userId){
    throw new BadRequest('you can...not delete this')
  }
  await comment.remove()
  return 'comment deleted'
  }

}
export const commentsService = new CommentsService()