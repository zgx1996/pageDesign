import { cloneDeep } from 'lodash';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function forEachComponentInstanceList(list, fn) {
  list.forEach((item, index) => {
    fn(item, index, list);
    if(item.slots) {
      Object.keys(item.slots).forEach(slotName => {
        const slots = item.slots[slotName]
        if(Array.isArray(slots)) {
          forEachComponentInstanceList(slots, fn)
        }
      })
    }
  })
}

export default new Vuex.Store({
  state: {
    componentInstanceList: []
  },
  getters: {
  },
  mutations: {
    addComponentInstance(state, componentInstance) {
      state.componentInstanceList.push(componentInstance)
    },
    deleteComponentInstance(state, componentInstance) {
      forEachComponentInstanceList(state.componentInstanceList, (item, index, parentList) => {
        if(item.componentId === componentInstance.componentId) {
          parentList.splice(index, 1)
        }
      })
    },
    replaceComponentInstanceList(state, componentInstanceList) {
      console.log("cloneDeep(componentInstanceList)", cloneDeep(componentInstanceList))
      state.componentInstanceList = componentInstanceList
    },
    replaceOneComponentInstance(state, componentInstance) {
      forEachComponentInstanceList(state.componentInstanceList, (item, index, parentList) => {
        if(item.componentId === componentInstance.componentId) {
          parentList.splice(index, 1, componentInstance)
        }
      })
    },
  },
  actions: {
  },
  modules: {
  }
})
