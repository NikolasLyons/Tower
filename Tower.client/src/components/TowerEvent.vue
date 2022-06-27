<template>
     <div class="col-md-3 shadow p-2 m-4 hoverable" @click="goToEvent">
          <div class="row">
            <div class="col-12">
              <img class="img-fluid" :src="towerEvent.coverImg" alt="">
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>{{towerEvent.name}}</p>
              <p>{{towerEvent.location}}</p>
              <p>{{formatDate(towerEvent.startDate)}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-end">
            
              <p v-if="towerEvent.capacity >=1 && !towerEvent.isCanceled"><span>{{towerEvent.capacity}}</span> Spots Left</p>
              <p v-else-if="towerEvent.isCanceled" class="sold-out">Canceled</p>
              
              <p v-else class="sold-out">Sold Out</p>
            </div>
          </div>

        </div>
</template>


<script>
import { objectToString } from '@vue/shared'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'

export default {
  props: { towerEvent:{type: Object, required: true}},
  setup(props){
    const router = useRouter()
    return {
      towerEvents: computed(()=> AppState.towerEvents),

      goToEvent(){
        router.push({
          name: "EventDetails",
          params: {id: props.towerEvent.id}

        })
      },
      formatDate(rawDate){
        return new Date(rawDate).toLocaleDateString()
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.hoverable{
  cursor: pointer;
}
.sold-out{
  color: red;
}

</style>