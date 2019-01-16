<template>
  <section class="actors">
     <h3> 
       <span>actors</span>
      <b-badge variant="info">
      {{actors.count}}
      </b-badge>
      </h3>
     <div class="actors-inner mg-b30">
         <nuxt-link 
            class="actor-item"
            v-for="(actor) in actors.results"
            :key="actor.name" 
            :to="{name: 'people-id', params: { id: actor.url} }">
            <Actor :actor="actor" />
         </nuxt-link>
     </div>
      <b-pagination @change="showPage" v-if="actors.count > max" align="left" size="md" :total-rows="actors.count" v-model="currentPage" :per-page="max">
      </b-pagination>
      <div class="preloader-cont" v-if="preloader">
        
      </div>
  </section>
</template>

<script>
import Actor from './Actor.vue'
import { mapActions } from 'vuex'
export default {
  props:{
    actors: {
      type: Object
    },
    preloader: {
      type: Boolean
    }
  },
  components: { Actor },
  data() {
    return {
      currentPage: 1,
      max: 10
    }
  },
  methods: {
    showPage(val) {
      this.$emit('showpage', val)
    }
  }
}
</script>

<style scoped>
  .actors {
    position: relative;
  }
  .actors-inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 200px));
    min-height: 100px;
    grid-gap: 10px;
    
  }
  .actor-item {
    height:40px;
    border:1px solid var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .preloader-cont {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(255,255,255, 0.5);
    z-index: 10;
  }
</style>
