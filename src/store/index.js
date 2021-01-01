import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import editor from "./modules/editor"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    editor: editor
  },
  strict: "debug",

  actions: {
  },

})
