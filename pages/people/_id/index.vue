<template>
  <section class="container">
     <h1>{{loaded.name}}</h1>
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
