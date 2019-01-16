import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
const apiUrl = 'https://swapi.co/api/'
const config = {
  paramsSerializer: function (params) {
    if (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }
}
let apiCоnfig = Object.assign({}, { baseURL: apiUrl }, config)
const api = axios.create(apiCоnfig)
export const getData = (state, payload) => {
  let paramsData = {...payload.data}
  console.log(paramsData)
  return api.get(`${payload.url}/`, {params: paramsData}).then(res => {
    return res.data
  })
}