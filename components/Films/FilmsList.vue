<template>
  <section>
    <h3>
      <span>films</span>
      <b-badge variant="info">
      {{films.count}}
      </b-badge>
    </h3>
    <nuxt-link 
        v-for="(film) in films.results" 
        :key="film.episode_id" 
        :to="{name: 'films-id', params: { id: film.url} }">
        <Film :film="film"/>
    </nuxt-link>
  </section>
</template>

<script>
import Film from './Film.vue'
export default {
  props:{
    films: {
      type: Object
    }
  },
  components: { Film }
}
</script>

<style>

</style>
