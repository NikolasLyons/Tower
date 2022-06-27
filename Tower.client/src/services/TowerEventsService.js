import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class TowerEventsService{
 async getTowerEvents( params= {}){
  const res = await api.get('api/events', { params })
  logger.log(res.data)
  AppState.towerEvents = res.data
 }

 

 async getCurrentEvent(id){
  const res = await api.get('api/events/'+ id)
  logger.log(res.data)
  AppState.activeTowerEvent = res.data
 }

 async createEvent(body){
  const res = await api.post('api/events', body)
  logger.log('you made and event',res.data)
  AppState.towerEvents.push(res.data)
  return res.data
 }

 async cancelEvent(id){
  await api.delete('api/events/'+id)
  logger.log('event canceled')
  AppState.activeTowerEvent.isCanceled = true
 }

 

 
}
export const towerEventsService = new TowerEventsService()