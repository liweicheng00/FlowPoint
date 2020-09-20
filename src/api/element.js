// import mousemove from "@/api/position.js";
import store from "@/store/index.js";

class Element {
    constructor(type, props, event, parent, ctm) {
        this.type = type
        this.props = props
        this.event = event
        this.mainPage = false
        store.commit("newID")

        this.id = store.state.IdArray[store.state.IdArray.length - 1]

        if (type == "block") {

            this.content = ""
            console.log(ctm, ctm.inverse(), event)
            this.props = {
                mouseclickposition: [
                    event.offsetX,
                    event.offsetY,
                ],
                ctm: ctm,
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
                startX: event.offsetX + props.viewBox["min-x"],
                startY: event.offsetY + props.viewBox["min-y"],
                offsetX: event.offsetX + props.viewBox["min-x"],
                offsetY: event.offsetY + props.viewBox["min-y"],
                arrowstartPreview: props.arrowstartPreview,
                arrowendPreview: null,
                ctm: ctm
            }

            this.childs = []
            this.parent = null
        }

    }
}

export default Element