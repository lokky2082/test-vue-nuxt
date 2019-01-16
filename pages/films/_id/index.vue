<template>
  <section class="container">
        <h1>{{loaded.title}}</h1>
        <h3>by {{loaded.director}}</h3>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  asyncData(context) {
    return axios.get(context.params.id)
      .then(res => {
        return {
          loaded: res.data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style>

</style>
