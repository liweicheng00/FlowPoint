import mousemove from "@/api/position.js";

// class Element {
//     constructor(type, id, position = {}, props = { defult: 'defult' }) {
//         this.type = type
//         this.id = id;
//         this.position = position;
//         this.props = props;
//         this.childs = [];
//         this.parent = null;
//     }
// }

class Element {
    constructor(type, cpn, event) {
        this.type = type
        this.cpn = cpn
        this.event = event
        cpn.$store.commit("newID");
        this.id = cpn.$store.state.IdArray[cpn.$store.state.IdArray.length - 1]
        if (type == "block") {
            this.position = {
                mouseclickposition: [
                    mousemove.event.offsetX + cpn.props.viewBox["min-x"],
                    mousemove.event.offsetY + cpn.props.viewBox["min-y"],
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
                startX: event.offsetX + cpn.props.viewBox["min-x"],
                startY: event.offsetY + cpn.props.viewBox["min-y"],
                offsetX: event.offsetX + cpn.props.viewBox["min-x"],
                offsetY: event.offsetY + cpn.props.viewBox["min-y"],
                arrowstartPreview: cpn.arrowstartPreview,
            }
            this.childs = []
            this.parent = null
        }

    }
}

export default Element