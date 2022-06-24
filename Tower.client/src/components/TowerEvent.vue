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
              <p>{{towerEvent.startDate}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-end">
              <p><span>{{towerEvent.capacity}}</span> Spots Left</p>
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
      }
    }
  }
}
</script>


<style lang="scss" scoped>

.hoverable{
  cursor: pointer;
}

</style>