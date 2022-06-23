import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController{
  constructor(){
    super('api/events')
    this.router
    .get('',this.getAll)
    .get('/:id', this.getById)
    .get('/:id/tickets', this.getEventTickets)
    .get('/:id/comments', this.getEventComments)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('',this.create)
    .put('/:id',this.edit)
    .delete('/:id', this.cancel)
  }
  
  
  
  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getEvents(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    req.body.creatorId = req.userInfo.id
    const comments = await commentsService.getEventComments(req.body)
    return res.send(comments)
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id 
      const update = await towerEventsService.update(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
  }
  async cancel(req, res, next) {
    try {
      await towerEventsService.cancel(req.params.id, req.userInfo.id)
      return res.send({message: 'that got to go'})
    } catch (error) {
      next(error)
    }
  }
  
}