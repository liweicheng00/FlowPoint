import Vue from 'vue'
import Vuex from 'vuex'
import Element from "@/api/element.js";
import VuexUndoRedo from "vuex-undo-redo";

Vue.use(Vuex)
Vue.use(VuexUndoRedo, { ignoreMutations: ['newID', "setArrowPosition"] });

export default new Vuex.Store({
  strict: "debug",
  state: {
    svg: null,
    IdArray: [],
    FocusingElementId: null,
    alldata: {
      id: "1",
      type: "block",
      position: {},
      props: {},
      childs: [],
      parent: null,
    },
    self: {},
    arrowObject: null,
    NumOfChilds: [0],
    coor: []
  },
  getters: {

  },
  mutations: {
    getSVG(state, ref) {
      state.svg = ref
    },
    assignBeginingNode(state) {
      state.self = state.alldata
    },
    changeSelf(state, child) {
      console.log("state.self change")
      state.self.mainPage = false
      state.self = child
      state.self.mainPage = true
    },
    gobackSelf(state) {
      console.log("state.self go back")

      state.self.mainPage = false
      state.self = state.self.parent
      state.self.mainPage = true
    },
    addElement(state, { type, props, event, parent }) {
      // console.log(payload.props.viewBox.startPoint)
      // console.log(payload.event.offsetX)

      var element = new Element(type, props, event, parent)
      state.self.childs.push(element);
      if (type == 'arrow') {
        state.arrowObject = element
      }
    },
    clearInitPosition(state, data) {
      data.props.mouseclickposition = null
    },
    setArrowPosition(state, payload) {
      state.arrowObject.props.visable = true
      state.arrowObject.props.offsetX = payload.event.offsetX + payload.props.viewBox["min-x"] + 1;
      state.arrowObject.props.offsetY = payload.event.offsetY + payload.props.viewBox["min-y"] + 1;
      if (payload.props.arrowendPreview) {
        state.arrowObject.props.arrowendPreview = payload.props.arrowendPreview;
      } else {
        state.arrowObject.props.arrowendPreview = null;
      }
    },
    endLink(state, arrowendPreview) {
      state.arrowObject.props.visable = true
      state.arrowObject.props.arrowendPreview = arrowendPreview;
      arrowendPreview.arrows.end.push(state.arrowObject)
      state.arrowObject = null
    },
    cancelLink(state) {
      state.self.childs.pop()
    },
    emptyState() {
      this.replaceState({
        IdArray: [],
        FocusingElementId: null,
        alldata: {
          id: "1",
          type: "block",
          position: {},
          props: {},
          childs: [],
          parent: null,
        },
        self: { childs: [] }, // todo: no good~
        arrowObject: null
      });
    },
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
      console.log("change focus", ElementId)
      state.FocusingElementId = ElementId
    },
    addChildNum(state, level) {
      var t = level.parentCoor.reduce((ac, cur) => {
        return ac[cur]
      }, state.coor)
      if (!t[level.pkey]) {
        t.push([])
      }
      if (state.NumOfChilds[level.l]) {
        state.NumOfChilds[level.l] += 1

      } else {
        state.NumOfChilds.push(1)
      }
    },
    reduceChildNum(state, level) {
      state.NumOfChilds[level] -= 1

    },
    initStyleObject(state, { data, styleObject }) {
      Object.assign(data.props.styleObject, styleObject)
    },
    editContent(state, { data, content, clientHeight }) {
      data.props.styleObject.height = clientHeight
      data.content = content
    },
    setBlockPosition(state, { data, position }) {
      data.arrows.start.forEach(element => {
        element.props.offsetX += 1
        element.props.offsetX -= 1
      });
      data.arrows.end.forEach(element => {
        element.props.offsetX += 1
        element.props.offsetX -= 1
      });
      data.props.styleObject.x = position.x
      data.props.styleObject.y = position.y
    }


  },
  actions: {
  },
  modules: {
  }
})
