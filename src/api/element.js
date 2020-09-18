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

            this.content = "<p style='color: grey;'>請輸入</p>"
            this.props = {
                mouseclickposition: [
                    event.offsetX + props.viewBox["min-x"],
                    event.offsetY + props.viewBox["min-y"],
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