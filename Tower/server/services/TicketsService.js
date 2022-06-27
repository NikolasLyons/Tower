import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


 

 class TicketsService{
   
   
   async getTickets(accountId) {
    const towerEvents = await dbContext.Tickets.find({accountId})
   .populate('event')
     return towerEvents
   }

   async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({eventId})
    .populate('account')
    .populate('event')
    return tickets
  }
   async createTicket(ticketData) {
     const ticket = await dbContext.Tickets.create(ticketData)
     await ticket.populate('account', 'name picture')
     await ticket.populate('event')
     

     const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
     if(towerEvent.capacity == 0){
      throw new BadRequest('no more room')
    }
     
      towerEvent.capacity --


     await towerEvent.save()
     
     return ticket
   }

   async delete(id, userId) {
   const ticket = await dbContext.Tickets.findById(id)
   if(ticket.accountId.toString() != userId){
    throw new BadRequest('you cannot delete another persons ticket')
   }
   const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
   towerEvent.capacity ++
   await towerEvent.save()
   await ticket.remove()

  }
  
  

 }
 export const ticketsService = new TicketsService()