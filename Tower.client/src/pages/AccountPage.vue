<template>
  <div class="container-fluid"> 
    <div class="row">
      <div class="col-12">
        <h2>My Tickets</h2>
      </div>
    </div>
    <div class="row">
      <Ticket v-for="a in attendingEvent" :key="a.accountId"  :ticket="a"/>
    </div>
    
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import TowerEvent from '../components/TowerEvent.vue'
import { accountService } from '../services/AccountService' 
import { towerEventsService } from '../services/TowerEventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
    name: "Account",
    setup() {
      onMounted(async()=>{
        try {
          
          await accountService.getMyTickets()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      })
        return {
          towerEvents:computed(()=> AppState.towerEvents.filter(t=> t.creatorId == AppState.account.id)),
          account: computed(() => AppState.account),
          attendingEvent: computed(()=>AppState.attendingEvent)
        };
    },
    components: { TowerEvent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
