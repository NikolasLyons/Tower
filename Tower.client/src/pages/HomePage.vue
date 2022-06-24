<template>
<div class="container-fluid">
  <div class="row p-3"  >
    <div class="col-12 shadow bg-img text-light" style="background-image: url('https://idahonews.com/resources/media/23a53fce-03ba-41ec-bb3e-7173acbc23d5-large16x9_Movie_Theater.jpg?1594266488683');">
      <div class="row ">
        <div class="col-4 d-flex flex-column">
          <h2>Get ahead of the scalpers.</h2>
          <h2>Reserve your seat now with</h2>
          <h2>real events for real people.</h2>
        </div>
      </div>
    </div>
    <div class="row p-3 justify-content-center">
      <div class="col-12 d-flex justify-content-evenly shadow">
        <button class="btn btn-outline-success" @click="filterEvent = ''">all</button>
        <button class="btn btn-outline-success"  @click="filterEvent = 'sport'">Sport</button>
        <button class="btn btn-outline-success"  @click="filterEvent = 'concert'">Concert</button>
        <button class="btn btn-outline-success"  @click="filterEvent = 'convention'">Convention</button>
        <button class="btn btn-outline-success"  @click="filterEvent = 'digital'">Digital</button>
      </div>
      <div class="row p-3">
     <TowerEvent v-for="t in towerEvents" :key="t.id" :towerEvent="t" />
        
      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup(){
    const filterEvent = ref('')
    
    onMounted( async ()=>{
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return{
      filterEvent,
      towerEvents: computed(()=> AppState.towerEvents.filter(t => filterEvent.value ? t.type == filterEvent.value: true))
    }

  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-img{
  height: 35vh;
  background-size: cover;
  background-position: center;
}

</style>
