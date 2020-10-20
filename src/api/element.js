import store from "@/store/index.js";
import gridAttach from "@/api/position.js"

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
                    gridAttach(event.offsetX),
                    gridAttach(event.offsetY),
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
                arrowstartMiddle: props.arrowstartMiddle,
                arrowendMiddle: null,
            }
            props.arrowstartMiddle.arrows.start.push(this)

            this.childs = []
            this.parent = null
        }

    }
}

export default Element