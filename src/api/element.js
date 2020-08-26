import mousemove from "@/api/position.js";

class Element {
    constructor(type, props, event) {
        this.type = type
        this.cpn = props
        this.event = event
        // cpn.$store.commit("newID");
        // this.id = cpn.$store.state.IdArray[cpn.$store.state.IdArray.length - 1]
        this.id = "sasd"
        if (type == "block") {

            this.position = {
                mouseclickposition: [
                    mousemove.event.offsetX + props.viewBox["min-x"],
                    mousemove.event.offsetY + props.viewBox["min-y"],
                ],
            }

            this.content = ""
            this.props = { default: 'default' }
            this.childs = []
            this.parent = null
        }
        else if (type == "arrow") {
            this.position = {}
            this.props = {
                startX: event.offsetX + props.viewBox["min-x"],
                startY: event.offsetY + props.viewBox["min-y"],
                offsetX: event.offsetX + props.viewBox["min-x"],
                offsetY: event.offsetY + props.viewBox["min-y"],
                // arrowstartPreview: cpn.arrowstartPreview,
            }
            this.childs = []
            this.parent = null
        }

    }
}

export default Element