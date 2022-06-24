import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

async getEventComments(eventId){
  const res = await api.get('api/events/'+ eventId+ '/comments')
  logger.log('these are where the comments as', res.data)
  AppState.comments = res.data
}

async createComment(body){
  const res = await api.post('api/comments', body)
  logger.log('we made  a comment', res.data)
  AppState.comments.push(res.data)
}

async deleteComment(id){
  const res = await api.delete('api/comments/' +id)
  logger.log('comment deleted', res.data)
  AppState.comments = AppState.comments.filter(c => c.id != id )
}
}
export const commentsService = new CommentsService()