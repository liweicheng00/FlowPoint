// import store from "@/store/index.js";
import gridAttach from "@/api/position.js"
import _ from "lodash"
import global from "@/flowpoint.config.js"

let elementMap = {}
class Element {
    // constructor(type, { event = null, parent = null, arrowStartMiddle = null }, obj) {
    constructor(parent = null, obj) {
        if (obj) {
            this._parseElement(obj)
            elementMap[this.id] = this
            if (this.mainPage) {
                elementMap.mainPage = this
            }
            this.elementMap = elementMap
            this._createCircular()
        } else {
            // this.type = type
            // this.event = event
            this.type = null
            this.contenteditable = false
            this.mainPage = false
            this.parent = parent
            this.id = this._uuid()
            this.viewBox = { minX: 0, minY: 0, width: global.SVG_INITIAL_WIDTH, height: global.SVG_INITIAL_HEIGHT }
            this.childs = []
            this.class = {
                Middle: true,
                Selected: false
            }
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
    // if (type == "block") {
    //     this.arrows = { start: [], end: [] }
    //     this.content = ""
    //     this.props = {
    //         mouseclickposition: [
    //             gridAttach(event ? event.offsetX : null),
    //             gridAttach(event ? event.offsetY : null),
    //         ],
    //         styleObject: {},
    //         textObject: {}
    //     }
    //     this.childs = []
    // }
    // else if (type == "arrow") {

    //     this.props = {
    //         endSection: 3,
    //         startSection: 1,
    //         points: {
    //             x1: 0,
    //             y1: 0,
    //             x2: 0,
    //             y2: 0,
    //         },
    //         // visable: false,
    //         // offsetX: null,
    //         // offsetY: null,
    //         arrowStartMiddle: arrowStartMiddle,
    //         arrowEndMiddle: null,
    //     }
    //     arrowStartMiddle.arrows.start.push(this)

    //     this.childs = []
    // }

    // }


    parseJson() {
        return this._avoidCircular(this)
    }
    _avoidCircular(ele) {

        return _.transform(ele, (result, value, key) => {
            if (key == "parent") return
            if (key == "elementMap") return
            if (["arrowEndMiddle", "arrowStartMiddle"].indexOf(key) != -1) {
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
                ele.props.arrowStartMiddle = ele.props.arrowStartMiddle ? elementMap[ele.props.arrowStartMiddle] : null
                ele.props.arrowEndMiddle = ele.props.arrowEndMiddle ? elementMap[ele.props.arrowEndMiddle] : null

            }
        })
    }
}
class Block extends Element {
    constructor(parent = null) {
        super(parent)

        this.type = "block"
        this.arrows = { start: [], end: [] }
        this.content = ""
        this.childs = []
        this.props = {
            styleObject: {
                width: "100",
                height: "30",
                stroke: "black",
                rx: "3",
                fill: "transparent",
                "stroke-width": "1",
                x: "0",
                y: "0",
            },
            // TODO: For foreignObject position 
            textObject: {

            }
        }
        this.class[this.type] = true
    }
    setPosition(event, ictm) {
        var x =
            event.offsetX -
            parseInt(this.props.styleObject.width) / ictm.a / 2;
        var y =
            event.offsetY -
            parseInt(this.props.styleObject.height) / ictm.a / 2;

        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;
        this.props.styleObject.x = `${gridAttach(x1)}`
        this.props.styleObject.y = `${gridAttach(y1)}`

    }
}
class Arrow extends Element {
    constructor(parent) {
        super(parent)
        this.type = "arrow"
        this.props = {
            endSection: 3,
            startSection: 1,
            points: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            },
            arrowStartMiddle: null,
            arrowEndMiddle: null,
        }
        this.class[this.type] = true
    }
    setStartMiddle(arrowStartMiddle) {
        this.props.arrowStartMiddle = arrowStartMiddle
        arrowStartMiddle.arrows.start.push(this)
    }
    setEndMiddle(arrowEndMiddle) {
        this.props.arrowEndMiddle = arrowEndMiddle
    }
    _setNodePosition(mouse, node, section) {
        switch (section) {
            case 1:
                if (mouse[0] - node[0] < 0) {
                    if (mouse[1] - node[1] >= 0) {
                        return 4;
                    } else {
                        return 2;
                    }
                } else {
                    return 1;
                }
            case 2:
                if (mouse[1] - node[1] >= 0) {
                    if (mouse[0] - node[0] >= 0) {
                        return 1;
                    } else {
                        return 3;
                    }
                } else {
                    return 2;
                }
            case 3:
                if (mouse[0] - node[0] >= 0) {
                    if (mouse[1] - node[1] >= 0) {
                        return 4;
                    } else {
                        return 2;
                    }
                } else {
                    return 3;
                }
            case 4:
                if (mouse[1] - node[1] < 0) {
                    if (mouse[0] - node[0] >= 0) {
                        return 1;
                    } else {
                        return 3;
                    }
                } else {
                    return 4;
                }
        }
    }
    calculateArrowPoints(event = null, arrowEndMiddle = null, ictm) {
        if (this.type != "arrow") {
            console.error("Can't use this method on this type of element.")
            return
        }
        // console.log(event, arrowEndMiddle)
        // this.props.offsetX = ictm.a * event.offsetX + ictm.c * event.offsetY + ictm.e;
        // this.props.offsetY = ictm.b * event.offsetX + ictm.d * event.offsetY + ictm.f;
        this.props.arrowEndMiddle = arrowEndMiddle ? arrowEndMiddle : this.props.arrowEndMiddle;
        if (event) {
            this.props.points.x2 = ictm.a * event.offsetX + ictm.c * event.offsetY + ictm.e;
            this.props.points.y2 = ictm.b * event.offsetX + ictm.d * event.offsetY + ictm.f;
        }

        // this.props.points.x1 = parseInt(this.props.arrowStartMiddle.props.styleObject.x) +
        //     parseInt(this.props.arrowStartMiddle.props.styleObject.width)
        // this.props.points.y1 = parseInt(this.props.arrowStartMiddle.props.styleObject.y) +
        //     parseInt(this.props.arrowStartMiddle.props.styleObject.height) / 2

        if (this.props.arrowEndMiddle) {
            this.props.points.x2 = this.props.arrowEndMiddle.props.styleObject.x;
            this.props.points.y2 = this.props.arrowEndMiddle.props.styleObject.y;
            this.props.endSection = this._setNodePosition(
                [this.props.points.x1, this.props.points.y1],
                [this.props.points.x2, this.props.points.y2],
                this.props.endSection
            );
            switch (this.props.endSection) {
                case 1:
                    this.props.points.x2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.width);
                    this.props.points.y2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.height) / 2;
                    break;
                case 2:
                    this.props.points.x2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.width) / 2;
                    this.props.points.y2 = this.props.arrowEndMiddle.props.styleObject.y;
                    break;
                case 3:
                    this.props.points.x2 = this.props.arrowEndMiddle.props.styleObject.x;
                    this.props.points.y2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.height) / 2;
                    break;
                case 4:
                    this.props.points.x2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.width) / 2;
                    this.props.points.y2 =
                        parseInt(this.props.arrowEndMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowEndMiddle.props.styleObject.height);
                    break;
            }
        }
        this.props.startSection = this._setNodePosition(
            [this.props.points.x2, this.props.points.y2],
            [this.props.points.x1, this.props.points.y1],
            this.props.startSection
        );
        if (this.props.arrowStartMiddle) {
            switch (this.props.startSection) {
                case 1:
                    this.props.points.x1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.width);
                    this.props.points.y1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.height) / 2;
                    break;
                case 2:
                    this.props.points.x1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.width) / 2;
                    this.props.points.y1 = parseInt(this.props.arrowStartMiddle.props.styleObject.y);
                    break;
                case 3:
                    this.props.points.x1 = parseInt(this.props.arrowStartMiddle.props.styleObject.x);
                    this.props.points.y1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.height) / 2;
                    break;
                case 4:
                    this.props.points.x1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.x) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.width) / 2;
                    this.props.points.y1 =
                        parseInt(this.props.arrowStartMiddle.props.styleObject.y) +
                        parseInt(this.props.arrowStartMiddle.props.styleObject.height);
                    break;
            }
        }

    }
}
export { Element, Block, Arrow }