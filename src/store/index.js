import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: "debug",
  state: {
    IdArray: [],
    FocusingElementId: null
  },
  mutations: {
    newID(state) {
      var id
      if (state.IdArray.length != 0) {
        var num = parseInt(state.IdArray[state.IdArray.length - 1].split('_')[1])
        id = "cpn_" + (num + 1)
        state.IdArray.push(id)

      } else {
        id = "cpn_0"
        state.IdArray.push(id)
      }
    },
    changeFocusingElement(state, ElementId) {
      state.FocusingElementId = ElementId
    }
  },
  actions: {
  },
  modules: {
  }
})
