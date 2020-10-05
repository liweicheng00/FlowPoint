// import mousemove from "@/api/position.js";
import store from "@/store/index.js";

class Element {
    constructor(type, props, event, parent) {
        this.type = type
        this.props = props
        this.event = event
        this.mainPage = false
        store.commit("newID")

        this.id = store.state.IdArray[store.state.IdArray.length - 1]

        if (type == "block") {
            this.arrows = { start: [], end: [] }

            this.content = ""
            this.props = {
                mouseclickposition: [
                    event.offsetX,
                    event.offsetY,
                ],
                styleObject: {},
                textObject: {}
            }
            this.childs = []
            this.parent = parent
        }
        else if (type == "arrow") {

            this.position = {}
            this.props = {
                visable: false,
                startX: null,
                startY: null,
                offsetX: null,
                offsetY: null,
                arrowstartPreview: props.arrowstartPreview,
                arrowendPreview: null,
            }
            props.arrowstartPreview.arrows.start.push(this)

            this.childs = []
            this.parent = null
        }

    }
}

export default Element