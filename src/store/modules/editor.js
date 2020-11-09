
import Element from "@/api/element.js";
import gridAttach from "@/api/position.js"

const state = () => ({
    svg: null,
    ctm: null,
    ictm: null,
    IdArray: [],
    initViewbox: [0, 0],
    FocusingElementId: null,
    alldata: {
        id: "1",
        type: "block",
        position: {},
        props: {},
        childs: [],
        mainPage: true,
        parent: null,
        arrows: { start: [], end: [] },
        content: ""

    },
    self: {},
    arrowObject: null,
    NumOfChilds: [0],
    coor: []
})


// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {

    getSVG(state, ref) {
        state.svg = ref
    },
    clearSVG(state) {
        state.svg = null
    },
    setCTM(state) {
        state.ctm = state.svg.svg.getCTM()
        state.ictm = state.ctm.inverse()
        // todo: It seems like somthing getting wrong when wheel rollong too fast
    },
    setInitViewbox(state, box) {
        state.initViewbox = box
    },
    assignBeginingNode(state) {
        state.self = state.alldata
    },


    changeSelf(state, child) {
        state.self.mainPage = false
        state.self = child
        state.self.mainPage = true
    },
    gobackSelf(state) {
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
    clearInitPosition(state, { data, style }) {
        data.props.mouseclickposition = null
        data.props.styleObject = style
    },
    setArrowPosition(state, payload) {
        state.arrowObject.props.visable = true
        state.arrowObject.props.offsetX = state.ictm.a * payload.event.offsetX + state.ictm.c * payload.event.offsetY + state.ictm.e;
        state.arrowObject.props.offsetY = state.ictm.b * payload.event.offsetX + state.ictm.d * payload.event.offsetY + state.ictm.f;

        if (payload.props.arrowendMiddle) {
            state.arrowObject.props.arrowendMiddle = payload.props.arrowendMiddle;
        } else {
            state.arrowObject.props.arrowendMiddle = null;
        }
    },
    endLink(state, arrowendMiddle) {
        state.arrowObject.props.visable = true
        state.arrowObject.props.arrowendMiddle = arrowendMiddle;
        if (arrowendMiddle) {
            arrowendMiddle.arrows.end.push(state.arrowObject)
        } else {
            this._mutations.cancelLink[0]()
        }
        state.arrowObject = null
    },
    cancelLink(state) {
        console.log("cacel link")
        state.self.childs.pop()
    },
    // move to global module
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
    // replace with algorithm
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
    // replace with algorithm
    reduceChildNum(state, level) {
        state.NumOfChilds[level] -= 1
        if (!state.NumOfChilds[level]) {
            state.NumOfChilds.splice(level, level)
        }
    },
    editContent(state, { data, content }) {
        data.content = content
        // data.props.styleObject.height = ref.clientHeight
    },
    // auto task
    resetBlockHeight(state, { data, ref }) {
        data.props.styleObject.height = ref.clientHeight
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
        data.props.styleObject.x = `${gridAttach(position.x)}`
        data.props.styleObject.y = `${gridAttach(position.y)}`
    },
    deleteMiddle(state, data) {
        let ids = []
        ids.push(data.id)
        if (data.type == "block") {
            data.arrows.start.forEach(item => {
                ids.push(item.id)
            })
            data.arrows.end.forEach(item => {
                ids.push(item.id)
            })
        }

        console.log(ids)

        var a = state.self.childs.filter(item => {
            if (!ids.includes(item.id)) {
                return item
            }
        });
        state.self.childs = a
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}