// import store from "@/store/index.js";
import gridAttach from "@/api/position.js"
import _ from "lodash"

// let elementMap = {}
class Element {
    constructor(type, { event = null, parent = null, arrowStartMiddle = null }, obj) {
        if (obj) {
            this._createCircular(obj)
        } else {
            this.type = type
            this.event = event
            this.mainPage = false
            this.parent = parent

            // store.commit("newID")

            // this.id = store.state.IdArray[store.state.IdArray.length - 1]
            this.id = this._uuid()
        }

        if (type == "block") {
            this.arrows = { start: [], end: [] }
            this.content = ""
            this.props = {
                mouseclickposition: [
                    gridAttach(event ? event.offsetX : null),
                    gridAttach(event ? event.offsetY : null),
                ],
                styleObject: {},
                textObject: {}
            }
            this.childs = []
        }
        else if (type == "arrow") {

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
    parseJson() {
        let a = this._avoidCircular(this)
        console.log(a)
        return a
    }
    _avoidCircular(ele) {

        return _.transform(ele, (result, value, key) => {
            if (key == "parent") return
            if (["arrowendMiddle", "arrowstartMiddle"].indexOf(key) != -1) {
                result[key] = value ? value.id : null
                return
            }
            if (["start", "end"].indexOf(key) != -1) {
                result[key] = value.map(element => element.id)
                return
            }
            if (key == "childs") {
                result[key] = value.map(element => {
                    return this._avoidCircular(element)
                })
                console.log(result[key])

                return
            }
            if (_.isArray(value)) {
                result[key] = value.map(element => {
                    return this._avoidCircular(element)
                })
                return
            }
            result[key] = _.isObject(value) ? this._avoidCircular(value) : value
        }, {})
    }
    _createCircular(obj) {
        obj.childs.map(element => {
            return new Element(null, {}, element)
        })
        console.log(obj.childs)
        Object.assign(this, obj)
        // idMap[obj.id] = this

    }
}

export default Element