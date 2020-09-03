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

            this.position = {
                mouseclickposition: [
                    event.offsetX + props.viewBox["min-x"],
                    event.offsetY + props.viewBox["min-y"],
                ],
            }

            this.content = ""
            this.props = { default: 'default' }
            this.childs = []
            this.parent = parent
        }
        else if (type == "arrow") {
            this.position = {}
            this.props = {
                visable: false,
                startX: event.offsetX + props.viewBox["min-x"],
                startY: event.offsetY + props.viewBox["min-y"],
                offsetX: event.offsetX + props.viewBox["min-x"],
                offsetY: event.offsetY + props.viewBox["min-y"],
                arrowstartPreview: props.arrowstartPreview,
                arrowendPreview: null,
            }
            this.childs = []
            this.parent = null
        }

    }
}

export default Element