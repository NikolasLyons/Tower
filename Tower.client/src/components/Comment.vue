<template>
  <div class="col-2">
    <img class="img-fluid account-img" :src="comment.creator.picture" :title="`${comment.creator.name}`" alt="">
  </div>
  <div class="col-10 bg-danger rounded d-flex justify-content-between">
    <p>{{comment.body}}</p>
    <i class="mdi mdi-delete hoverable" v-if="comment.creatorId == account.id" @click="deleteComment"></i>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props:{comment:{type:Object, required: true}},
  setup(props){
    const route = useRoute()
   
    return {
      
      account: computed(()=> AppState.account),
      comments: computed(()=> AppState.comments),
      async deleteComment(){
        try {
          if(await Pop.confirm()){
            await commentsService.deleteComment(props.comment.id)
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
.hoverable{
  cursor: pointer;
}

</style>