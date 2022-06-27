<template>
  <div class="col-10">
        <div class="row bg-warning">
          <div class="col-4">
            <img class="img-fluid" :src="ticket.event.coverImg" alt="">
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <p>{{ticket.event.name}}</p>
              
            </div>
            <p>{{ticket.event.location}}</p>
            <p>{{formatDate(ticket.event.startDate)}}</p>
            <button class="btn btn-danger" @click="deleteTicket">not going</button>
          </div>
        </div>
      </div>
</template>


<script>

import { computed } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props:{ticket:{type: Object, required:true}},
  setup(props){
    return {

      account: computed(()=> AppState.account),
      attendingEvent: computed(()=> AppState.attendingEvent),
      towerEvent: computed(()=> AppState.towerEvents),
      async deleteTicket(){
        try {
          if(await Pop.confirm('are you sure you want to unattend')){
            await ticketsService.deleteTicket(props.ticket.id)
           
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      formatDate(rawDate) {
        let time = new Date(rawDate)
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let year = time.getUTCFullYear()
        return `${month} ${year}`
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>