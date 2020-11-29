// import store from "@/store/index.js";
import gridAttach from "@/api/position.js"
import _ from "lodash"

let elementMap = {}
class Element {
    constructor(type, { event = null, parent = null, arrowStartMiddle = null }, obj) {
        if (obj) {
            this._parseElement(obj)
            elementMap[this.id] = this
            if (this.mainPage) {
                elementMap.mainPage = this
            }
            this.elementMap = elementMap
            this._createCircular()
        } else {
            this.type = type
            this.event = event
            this.mainPage = false
            this.parent = parent
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
                offsetX: null,
                offsetY: null,
                arrowstartMiddle: arrowStartMiddle,
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
        return this._avoidCircular(this)
    }
    _avoidCircular(ele) {

        return _.transform(ele, (result, value, key) => {
            if (key == "parent") return
            if (key == "elementMap") return
            if (["arrowendMiddle", "arrowstartMiddle"].indexOf(key) != -1) {
                result[key] = value ? value.id : null
                return
            }
            if (["start", "end"].indexOf(key) != -1) {

                result[key] = value.map(element => {
                    if (element) {
                        return element.id
                    }
                })
                return
            }
            if (key == "childs") {
                result[key] = value.map(element => {
                    return this._avoidCircular(element)
                })
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
    _parseElement(obj) {
        obj.childs = obj.childs.map(element => {
            return new Element(null, {}, element)
        })
        Object.assign(this, obj)
    }
    _createCircular() {
        this.childs.forEach(ele => {
            ele.parent = this

            if (ele.type == 'block') {
                ele.arrows.start = ele.arrows.start.map(ele => elementMap[ele])
                ele.arrows.end = ele.arrows.end.map(ele => elementMap[ele])

            }
            if (ele.type == "arrow") {
                ele.props.arrowstartMiddle = ele.props.arrowstartMiddle ? elementMap[ele.props.arrowstartMiddle] : null
                ele.props.arrowendMiddle = ele.props.arrowendMiddle ? elementMap[ele.props.arrowendMiddle] : null

            }
        })
    }
}

export default Element