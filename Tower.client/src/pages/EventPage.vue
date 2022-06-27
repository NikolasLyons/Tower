<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="row m-2 rounded shadow" style="background-color: yellow;">
         <div class="col-12 text-end">
          <button class="btn btn-danger" title="Cancel" @click="cancelEvent">CANCEL</button>
         </div>
         <div class="row">
           <div  class="col-4 p-3">
             <img class="img-fluid" :src="activeTowerEvent.coverImg" alt="">
           </div>
           <div class="col-8">
            <div class="row ">
              <div class="col-12 d-flex justify-content-between">
                <h3>{{activeTowerEvent.name}}</h3>
                <p>{{formatDate(activeTowerEvent.startDate)}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-between">
                <h5>{{activeTowerEvent.location}}</h5>
               
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>{{activeTowerEvent.description}}</p>
              </div>
            </div>
            <div class="row">
              <div v-if="activeTowerEvent.isCanceled">
<p class="bg-danger text-white">EVENT CANCELED</p>
              </div>
              <div v-else class="col-12 d-flex justify-content-between p-2">
                <h5 v-if="activeTowerEvent.capacity >=1 ">{{activeTowerEvent.capacity}} spots left</h5>
                <h5 v-else class="no-spots"> 0 spots left</h5>
                <button v-if="activeTowerEvent.capacity >= 1 " class="btn btn-outline-primary" @click="createTicket">ATTEND <i class="mdi mdi-account-group"></i></button>
                 <button v-else class="btn btn-outline-pr disabled" >ATTEND <i class="mdi mdi-account-group"></i></button>
                
              </div>
            </div>
           </div>
         </div>
        </div>
        <p m-2>see who is attending</p>
        <div class="row m-2" style="background-color: red;">
          <div class="col-12">
            <img :title="t.account.name" class="img-fluid attending-img" aria-labelledby="nik" v-for="t in tickets" :key="t.id" :src="t.account.picture" alt="">
          </div>
        </div> 
        <div class="row justify-content-center">
        <div class="col-10 p-2 bg-warning">
          <div class="row">
            <div class="col-12">
               <form @submit.prevent="createComment">
                <div class="mb-3">
                  <label for="" class="form-label"></label>
                  <textarea class="form-control" name="" id="" rows="3" placeholder="What are your thoughts..." v-model="commentData.body"></textarea>
                </div>
                <button class="btn btn-outline-info">Post Comment</button>
               </form>
              </div>
          </div>
          
          <div class="row p-2">
            <Comment v-for="c in comments" :key="c.id" :comment="c" />
          </div>
        </div>
        </div>
       </div>
      </div>
    </div>
</template>


<script>
import { propsToAttrMap } from '@vue/shared'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { towerEventsService } from '../services/TowerEventsService'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: { towerEvent:{type: Object, required: true}},
  setup(props){
    const route = useRoute()
    let commentData = ref({})
    // watchEffect(()=>{
    //   commentData.value = {...props.towerEvent}
    // })
    const hasTicket = computed(()=> AppState.tickets.find(t => t.accountId == AppState.account.id ))
    onMounted(async ()=>{
      try {
        await towerEventsService.getCurrentEvent(route.params.id)
        await commentsService.getEventComments(route.params.id)
        await ticketsService.getEventTickets(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      hasTicket,
      commentData,
      account: computed(()=>AppState.account),
      activeTowerEvent: computed(()=> AppState.activeTowerEvent),
      comments: computed(()=> AppState.comments),
      tickets: computed(()=> AppState.tickets),
      formatDate(rawDate){
        return new Date(rawDate).toLocaleDateString()
      },
      async createComment(){
        try {
          commentData.value.eventId = route.params.id
          await commentsService.createComment(commentData.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createTicket(){
        try {
          if(!AppState.account.id){
            Pop.toast('Please Login')
            return
          }
         
          if(hasTicket.value){
            Pop.toast('You already have a ticket')
          } else{
            const attending = {eventId: route.params.id}
            await ticketsService.createTicket(attending)
            Pop.toast('Ticket Purchased', 'success')
            AppState.activeTowerEvent.capacity --
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async cancelEvent(){
        try {
          if(await Pop.confirm('are you sure you want to Cancel Event')){
            await towerEventsService.cancelEvent(route.params.id)
           
          }
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
.attending-img{
  height: 40px;
  border-radius: 50%;
}

.no-spots{
  color: red;
}

</style>