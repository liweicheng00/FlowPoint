import Vue from 'vue'
import Vuex from 'vuex'
// import Element from "@/api/element.js";
// import gridAttach from "@/api/position.js"
import user from "./modules/user"
import editor from "./modules/editor"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    editor: editor
  },
  strict: "debug",
  // state: {
  //   svg: null,
  //   ctm: null,
  //   ictm: null,
  //   // IdArray: [],
  //   initViewbox: [0, 0],
  //   FocusingElementId: null,
  //   alldata: {
  //     id: "1",
  //     type: "block",
  //     position: {},
  //     props: {},
  //     childs: [],
  //     mainPage: true,
  //     parent: null,
  //     arrows: { start: [], end: [] },
  //     content: ""

  //   },
  //   self: {},
  //   arrowObject: null,
  //   NumOfChilds: [0],
  //   coor: [],
  // },
  // getters: {

  // },
  // mutations: {
  //   emptyState() {

  //     this.replaceState({
  //       svg: null,
  //       ctm: null,
  //       ictm: null,
  //       // IdArray: [],
  //       initViewbox: [0, 0],
  //       FocusingElementId: null,
  //       alldata: {
  //         id: "1",
  //         type: "block",
  //         position: {},
  //         props: {},
  //         childs: [],
  //         mainPage: true,
  //         parent: null,
  //         arrows: { start: [], end: [] },
  //         content: ""

  //       },
  //       self: {},
  //       arrowObject: null,
  //       NumOfChilds: [0],
  //       coor: [],
  //       done: []
  //     })
  //   },
  //   getSVG(state, ref) {
  //     state.svg = ref
  //   },
  //   clearSVG(state) {
  //     state.svg = null
  //   },
  //   setCTM(state) {
  //     state.ctm = state.svg.svg.getCTM()
  //     state.ictm = state.ctm.inverse()
  //     // todo: It seems like somthing getting wrong when wheel rollong too fast
  //   },
  //   setInitViewbox(state, box) {
  //     state.initViewbox = box
  //   },
  //   setBeginData(state, all_data) {
  //     if (all_data) {
  //       state.alldata = all_data
  //     }
  //     state.self = state.alldata
  //   },


  //   changeSelf(state, child) {
  //     state.self.mainPage = false
  //     state.self = child
  //     state.self.mainPage = true
  //   },
  //   gobackSelf(state) {
  //     state.self.mainPage = false
  //     state.self = state.self.parent
  //     state.self.mainPage = true
  //   },
  //   addElement(state, { type, params }) {

  //     var element = new Element(type, params)
  //     state.self.childs.push(element);
  //     if (type == 'arrow') {
  //       state.arrowObject = element
  //     }
  //   },

  //   setArrowPosition(state, { event, arrowEndMiddle }) {
  //     state.arrowObject.props.visable = true
  //     state.arrowObject.props.offsetX = state.ictm.a * event.offsetX + state.ictm.c * event.offsetY + state.ictm.e;
  //     state.arrowObject.props.offsetY = state.ictm.b * event.offsetX + state.ictm.d * event.offsetY + state.ictm.f;

  //     state.arrowObject.props.arrowEndMiddle = arrowEndMiddle;

  //     // if (arrowEndMiddle) {
  //     //   state.arrowObject.props.arrowEndMiddle = arrowEndMiddle;
  //     // } else {
  //     //   state.arrowObject.props.arrowEndMiddle = null;
  //     // }
  //   },
  //   endLink(state, arrowEndMiddle) {
  //     state.arrowObject.props.visable = true
  //     state.arrowObject.props.arrowEndMiddle = arrowEndMiddle;
  //     arrowEndMiddle.arrows.end.push(state.arrowObject)
  //     state.arrowObject = null
  //   },
  //   cancelLink(state) {
  //     console.log("cacel link")
  //     state.arrowObject = null

  //     state.self.childs.pop()
  //   },

  //   // newID(state) {
  //   //   var id
  //   //   if (state.IdArray.length != 0) {
  //   //     var num = parseInt(state.IdArray[state.IdArray.length - 1].split('_')[1])
  //   //     id = "cpn_" + (num + 1)
  //   //     state.IdArray.push(id)

  //   //   } else {
  //   //     id = "cpn_0"
  //   //     state.IdArray.push(id)
  //   //   }
  //   // },
  //   changeFocusingElement(state, ElementId) {
  //     console.log("Focus on id:", ElementId)
  //     state.FocusingElementId = ElementId
  //   },
  //   // todo:delete
  //   addChildNum(state, level) {
  //     var t = level.parentCoor.reduce((ac, cur) => {
  //       return ac[cur]
  //     }, state.coor)
  //     if (!t[level.pkey]) {
  //       t.push([])
  //     }
  //     if (state.NumOfChilds[level.l]) {
  //       state.NumOfChilds[level.l] += 1

  //     } else {
  //       state.NumOfChilds.push(1)
  //     }
  //   },
  //   // todo:delete
  //   reduceChildNum(state, level) {
  //     state.NumOfChilds[level] -= 1
  //     if (!state.NumOfChilds[level]) {
  //       state.NumOfChilds.splice(level, level)
  //     }
  //   },


  //   setBlockPosition(state, { dragData, position }) {

  //     dragData.arrows.start.forEach(element => {
  //       element.props.offsetX += 1
  //       element.props.offsetX -= 1
  //     });
  //     dragData.arrows.end.forEach(element => {
  //       element.props.offsetX += 1
  //       element.props.offsetX -= 1
  //     });
  //     dragData.props.styleObject.x = `${gridAttach(position.x)}`
  //     dragData.props.styleObject.y = `${gridAttach(position.y)}`
  //   },
  //   deleteMiddle(state, data) {
  //     let ids = []
  //     ids.push(data.id)
  //     if (data.type == "block") {
  //       data.arrows.start.forEach(item => {
  //         ids.push(item.id)
  //       })
  //       data.arrows.end.forEach(item => {
  //         ids.push(item.id)
  //       })
  //     }

  //     console.log(ids)

  //     var a = state.self.childs.filter(item => {
  //       if (!ids.includes(item.id)) {
  //         return item
  //       }
  //     });
  //     state.self.childs = a
  //   },

  //   // For Block.vue
  //   editContent(state, { data, content }) {
  //     data.content = content
  //     // data.props.styleObject.height = ref.clientHeight
  //   },
  //   resetBlockHeight(state, { data, ref }) {
  //     data.props.styleObject.height = ref.clientHeight
  //   },
  //   clearInitPosition(state, { data, style }) {
  //     data.props.mouseclickposition = null
  //     data.props.styleObject = style
  //   },


  // },
  actions: {
  },

})
