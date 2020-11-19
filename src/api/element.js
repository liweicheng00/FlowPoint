// import store from "@/store/index.js";
import gridAttach from "@/api/position.js"

class Element {
    constructor(type, { event, parent = null, arrowStartMiddle = null }) {
        this.type = type
        this.event = event
        this.mainPage = false
        this.parent = parent

        // store.commit("newID")

        // this.id = store.state.IdArray[store.state.IdArray.length - 1]
        this.id = this._uuid()
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
        }
        else if (type == "arrow") {

            this.position = {}
            this.props = {
                visable: false,
                startX: null,
                startY: null,
                offsetX: null,
                offsetY: null,
                arrowstartMiddle: arrowStartMiddle,
                // arrowstartMiddle: props.arrowstartMiddle,
                arrowendMiddle: null,
            }
            arrowStartMiddle.arrows.start.push(this)

            this.childs = []
        }

    }
    _uuid() {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

export default Element