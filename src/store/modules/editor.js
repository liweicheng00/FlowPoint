
import { Element, Block, Arrow } from "@/api/element.js";
// import gridAttach from "@/api/position.js"
const state = () => ({
    fileName: null,
    fileId: null,
    saveTime: null,
    svg: null,
    ctm: null,
    ictm: null,
    FocusingElementId: null,
    alldata: new Block(),
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

    emptyState(state) {
        let i = {
            svg: null,
            ctm: null,
            ictm: null,
            // IdArray: [],
            FocusingElementId: null,
            alldata: {
                id: "1",
                type: "block",
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
            coor: [],
        }

        for (var key in state) {
            state.key = i[key]
        }
        console.log(state)


    },
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
    setViewBox(state, { type, event }) {
        if (type == "pen") {
            state.self.viewBox.minX -= event.movementX
            state.self.viewBox.minY -= event.movementY
        } else if (type == "zoom") {
            state.self.viewBox.width = (state.self.viewBox.width + event.deltaY >= 0) ? state.self.viewBox.width + event.deltaY : 0;
            state.self.viewBox.height = (state.self.viewBox.height + event.deltaY >= 0) ? state.self.viewBox.height + event.deltaY : 0
        }
    },

    setBeginData(state, all_data) {
        if (all_data) {
            state.alldata = all_data
        }
        state.self = state.alldata
        state.self.mainPage = true
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
    addElement(state, { type, params }) {
        if (type == "block") {
            var block = new Block(params.parent)
            block.setPosition(params.event, state.ictm)
            state.self.childs.push(block)

        } else if (type == "arrow") {
            var arrow = new Arrow(params.parent)
            state.arrowObject = arrow
            arrow.setStartMiddle(params.arrowStartMiddle)
            state.self.childs.push(arrow)
        }
        // var element = new Element(type, params)
        // state.self.childs.push(element);

    },

    setArrowPosition(state, { event, arrowEndMiddle }) {
        state.arrowObject.calculateArrowPoints(event, arrowEndMiddle, state.ictm)
    },
    stopLink(state, arrowEndMiddle) {
        state.arrowObject.props.arrowEndMiddle = arrowEndMiddle;
        if (state.arrowObject) {
            arrowEndMiddle.arrows.end.push(state.arrowObject)
        }
        state.arrowObject = null
    },
    cancelLink(state) {
        console.log("cacel link")
        state.arrowObject = null

        state.self.childs.pop()
    },

    changeFocusingElement(state, ElementId) {
        state.FocusingElementId = ElementId
    },
    // todo:delete
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
    // todo:delete
    reduceChildNum(state, level) {
        state.NumOfChilds[level] -= 1
        if (!state.NumOfChilds[level]) {
            state.NumOfChilds.splice(level, level)
        }
    },


    setBlockPosition(state, { dragData, event }) {

        dragData.arrows.start.forEach(element => {
            element.calculateArrowPoints()
        });
        dragData.arrows.end.forEach(element => {
            element.calculateArrowPoints()
        });
        dragData.setPosition(event, state.ictm)
        // dragData.props.styleObject.x = `${gridAttach(position.x)}`
        // dragData.props.styleObject.y = `${gridAttach(position.y)}`
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
    },

    // For Block.vue
    editContent(state, { data, content }) {
        data.content = content
        // data.props.styleObject.height = ref.clientHeight
    },
    resetBlockHeight(state, { data, ref }) {
        data.props.styleObject.height = ref.clientHeight
    },
    clearInitPosition(state, { data, style }) {
        data.props.mouseclickposition = null
        data.props.styleObject = style
    },



    setFileId(state, fileId) {
        state.fileId = fileId
    },
    clearFileId(state) {
        state.fileId = null
        console.log("clearFileId")
    },
    setFileName(state, fileName) {
        state.fileName = fileName
        console.log("setFileName", state.fileName)
    },
    clearFileName(state) {
        state.fileName = null
        console.log("clearFileName")
    },

    setAllData(state, alldata) {
        console.log("set all data", alldata)
        state.alldata = new Element(null, {}, alldata)
        state.self = state.alldata.elementMap.mainPage ? state.alldata.elementMap.mainPage : state.alldata
        // state.self.mainPage = true
        console.log("parsed all data", state.self)
    },
    clearAllData(state) {
        state.alldata = new Block()
        state.self = state.alldata
        state.self.mainPage = true
        console.log("create new file")
    },
    setSaveTime(state) {
        state.saveTime = new Date
        console.log("setSaveTime", state.saveTime)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}