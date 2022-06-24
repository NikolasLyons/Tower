<template>
  <!-- Button trigger modal -->
  
  
  <!-- Modal -->
  <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">this is a header</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form>
          <div class="mb-3">
            <label for="" class="form-label"></label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Name..." v-model="towerEventData.name">
            <label for="" class="form-label"></label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Location..." v-model="towerEventData.location">
            <label for="" class="form-label"></label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Cover Image..." v-model="towerEventData.coverImg">
            <label for="" class="form-label"></label>
            <input type="Date" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Date..." v-model="towerEventData.startDate">
            <label for="" class="form-label"></label>
            <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Capacity..." v-model="towerEventData.capacity">
            <select class="form-select form-control" aria-label="Default select example" v-model="towerEventData.type">
                <option selected>Category</option>
                <option>sport</option>
                <option>digital</option>
                <option>concert</option>
                <option>convention</option>
            </select>
            <textarea class="form-control" name="" id="" cols="10" rows="5" placeholder="What is event About..." v-model="towerEventData.description"></textarea>
           
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-outline-primary" @click="createEvent">Submit</button>
        </div>
         </form>
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>
import { propsToAttrMap } from '@vue/shared'
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props:{towerEvent:{type: Object, required:true}},
  setup(props){
    const router = useRouter()
    let towerEventData = ref({})
    watchEffect(()=>{
      towerEventData.value = {...props.towerEvent}
    })
    return {
      towerEventData,
      activeTowerEvent: computed(()=> AppState.activeTowerEvent),
      TowerEvent: computed(()=> AppState.towerEvents),
    
     
      async createEvent(){
        try {
          
          const newEvent = await towerEventsService.createEvent(towerEventData.value)
          router.push({
          name: "EventDetails",
          params: {id: newEvent.id}
        })
        Modal.getOrCreateInstance(document.getElementById('createEvent')).hide()
          Pop.toast('Event created')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>