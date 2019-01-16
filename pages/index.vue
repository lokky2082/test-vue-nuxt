<template>
  <section class="container">
    <div>
      <h1>Star Wars</h1>
       <b-row>
         <b-col cols="8">
            <b-form-input v-model="searchStr"
                      type="text"
                      placeholder="type here">
            </b-form-input>
         </b-col>
         <b-col cols="2">
           <b-button :variant="'warning'" @click="search">search</b-button>
         </b-col>
       </b-row>
    </div>
    <div class="results">
      <fade-transition>
        <FilmsList v-if="films" 
                  :films="films" 
                  :preloader="preloaders.film">
        </FilmsList>
      </fade-transition>
      <fade-transition>
        <ActorsList v-if="people" 
                    :actors="people"
                    @showpage="getActors"
                    :preloader="preloaders.people">
        </ActorsList>
      </fade-transition>
    </div>
  </section>
</template>

<script>
import FilmsList from '~/components/Films/FilmsList.vue'
import ActorsList from '~/components/Actors/ActorsList.vue'
import {FadeTransition} from 'vue2-transitions'
import { mapActions } from 'vuex'
export default {
  components: {
    FilmsList,
    ActorsList,
    FadeTransition
  },
  data() {
    return {
      searchStr: '',
      films: null,
      people: null,
      searchTypes: ['films', 'people'],
      preloaders: {
        film: false,
        people: false,
      }
    }
  },
  methods: {
    ...mapActions(['getData']),
    search: async function (params) {
      let datas = this.searchTypes.map(type => {
        return this.getData({
            url: type,
            data: {
              search: this.searchStr
             } 
        })
      })
      let values = await Promise.all(datas)
      this.searchTypes.forEach((type, i) => {
        this[type] = values[i].count !== 0 ? values[i] : null
      })
      console.log(values)
    },
    /*search () {
      if(this.searchStr !== '') {
        this.searchTypes.forEach(async (type) => {
          this[type] = null
          try {
            let result = await this.getData({
            url: type,
            data: {
              search: this.searchStr
             } 
            })
            this[type] = result.count > 0 ? result : null
          } catch (e) {
            console.error(e)
          }
        })
      }
    },*/
    getActors: async function(val) {
      try {
        this.preloaders[this.searchTypes[1]] = true
        let result = await this.getData({
            url: this.searchTypes[1],
            data: {
              search: this.searchStr,
              page: val
            }
         })
       this[this.searchTypes[1]] =  result
       this.preloaders[this.searchTypes[1]] = false 
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin-top: 50px;
  width:100%;
  min-height: 80vh;
}
.mg-b30 {
  margin-bottom: 30px;
}
.circle {
  width:30px;
  height: 30p
}
</style>
