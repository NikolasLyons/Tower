import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class TicketsService{
  async getEventTickets(eventId){
    const res = await api.get('api/events/'+ eventId+'/tickets')
    logger.log('we are the attending',res.data)
    AppState.tickets = res.data
  }
async createTicket(attendingData){
const res = await api.post('api/tickets', attendingData)
console.log('attending', res.data)
AppState.tickets.push(res.data)
AppState.attendingEvent.push(res.data)
}
async deleteTicket(id){
  await api.delete('api/tickets/'+ id)
  logger.log('ticket has been deleted')
  AppState.attendingEvent = AppState.attendingEvent.filter( a=> a.id != id)
}
}
export const ticketsService = new TicketsService()