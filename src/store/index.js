import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url:'https://rgsbank.air-dev.agency/',
    data:{
      marks:'',
      models:'',
      ptsTypes:'',
      categories:'',
      conditions:'',
      gender:'',
      price:0,
      getPrice:false,
      save:false,
      loadMessage:false,
      getMessage:''
    },
    id:''
  },
  mutations: {
    setData(state, {path, value}){
      state.data[path] = value
    },
    setId(state, value){
      state.id = value
    }
  },
  actions: {
    async getConfig({commit,state}){
      try{
        const res = await Axios.get(`${state.url}api/app/calc/casco/config`);
        if(res.data.status){
          Object.keys(res.data.data).forEach(el => {
             commit('setData', {
              path:el,
              value: res.data.data[el]
             })
          })
        }
      }catch(e){}
    },
    async getCalculate({state,commit}){
        try{  
          commit('setData', {path:'getPrice', value:false})
          const res = await Axios.get(`${state.url}api/app/calc/casco/calculate`,{
            params:{
              orderId: state.id
            }
          })
          if(res && res.data.status){
            commit('setData',{path:'price', value:res.data.data.premium})
            commit('setData', {path:'getPrice', value:true})
          }

        }catch(e){}
    },
    async getPay({state, commit}){
        try{
          const res = await Axios.get(`${state.url}api/app/calc/casco/pay`, {
            params:{
              orderId: state.id
            }
          })
          if(res && res.data.status){
            console.warn(res.data.data.urlToRedirect)
            window.open(res.data.data.urlToRedirect, '_blank')
            // commit('setData', {path:'loadMessage',value:res.data.status})
            // commit('setData', {path:'loadMessage',value: true})
            if(res && res.data.data.message) commit('setData',{path:'getMessage', value:res.data.data.message})
          }
        }catch(e){
          
        }
    },
    async postSave({dispatch, commit, state},value){
        try{
          commit('setData',{path:'save',value:true})
          const res = await Axios.post(`${state.url}api/app/calc/casco/save`, value)
          if(res.data.status && res.data.data ){
            commit('setId',  res.data.data.resultId)
            dispatch('getCalculate')

          }
          commit('setData',{path:'save',value:false})
        }catch(e){}
    },
    async closeModal({commit}){
      commit('setData', {path:'loadMessage', value:false})
    }
  },
})
