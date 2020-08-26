import Vue from 'vue'
import Vuex from 'vuex'
import Element from "@/api/element.js";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: "debug",
  state: {
    IdArray: [],
    FocusingElementId: null,
    alldata: {
      id: "1",
      type: "block",
      position: { mouseclickposition: [120, 20] },
      props: {},
      childs: [
        {
          id: "1-1",
          type: "block",
          position: { mouseclickposition: [120, 20] },
          props: {},
          childs: [
            {
              id: "1-1-1",
              type: "block",
              position: { mouseclickposition: [30, 20] },
              props: {},
              childs: [],
              parent: null,
            },
          ],
          parent: null,
        },
        {
          id: "1-2",
          type: "block",
          position: { mouseclickposition: [230, 20] },
          props: {},
          childs: [
            {
              id: "1-2-1",
              type: "block",
              position: { mouseclickposition: [20, 20] },
              props: {},
              childs: [],
              parent: null,
            },
            {
              id: "1-2-2",
              type: "block",
              position: { mouseclickposition: [130, 20] },
              props: {},
              childs: [
                {
                  id: "1-2-2-1",
                  type: "block",

                  position: { mouseclickposition: [20, 20] },
                  props: {},
                  childs: [],
                  parent: null,
                },
              ],
              parent: null,
            },
          ],
          parent: null,
        },
        {
          id: "1-3",
          type: "block",
          position: { mouseclickposition: [340, 20] },
          props: {},
          childs: [],
          parent: null,
        },
      ],
      parent: null,
    },
  },
  getters: {
    getData: state => {
      console.log("sdssd", state.alldata)
      return state.alldata
    }
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
    },
    addBlock(state, payload) {
      console.log(payload)

      var a = new Element("block", payload.props, payload.event)
      // var a = new Element("block", payload.cpn, payload.event)
      state.alldata.childs.push(a);
      console.log('push')
    }
  },
  actions: {
  },
  modules: {
  }
})
