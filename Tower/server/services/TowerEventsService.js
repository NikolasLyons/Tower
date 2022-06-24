import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class TowerEventsService{
  
  
 
  
  async getEvents(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
    return towerEvents
  }
  async getById(id) {
    const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
    return towerEvent
  }
  async createEvent(towerEventData) {
    if(new Date(towerEventData.startDate) < new Date()){
      throw new BadRequest('date has passed')

    }
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', 'name picture')
    
    return towerEvent
  }
  async update(update) {
  const original = await this.getById(update.id)
  if(original.creatorId.toString() != update.creatorId){
    throw new Forbidden('Not your event')
  }
  if(original.isCanceled == true){
    throw new BadRequest('events Canceled')
  }
  original.name = update.name || original.name
  original.description = update.description || original.description
  original.coverImg = update.coverImg || original.coverImg
  original.location = update.location || original.location
  original.capacity = update.capacity || original.capacity
  original.startDate = update.startDate || original.startDate
  // original.isCanceled = update.isCanceled || original.isCanceled
  original.type = update.type || original.type

  await original.save()
  return original 
  }

  async cancel(id, userId) {
    const towerEvent = await dbContext.TowerEvents.findById(id)
    if(towerEvent.creatorId.toString()!= userId){
      throw new BadRequest('that aint yo S**t')
    }
    towerEvent.isCanceled = true
    await towerEvent.save()
    return 'its canceled'
    
  }
}
export const towerEventsService = new TowerEventsService()