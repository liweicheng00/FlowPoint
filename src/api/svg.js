class OperateSVG {
    constructor(svgEl, { fileName, classArray = ['default_p1'], styles } = {}) {
        this.svgEl = svgEl
        this.fileName = fileName
        this.classArray = classArray
        this.styles = styles
    }

    save() {
        // console.log(this.classArray)
        var usedClass = this.getClass()

        this.svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var styleElement = document.createElement("style");

        this.svgEl.prepend(styleElement)
        let s = `body {
            margin: 0px;
        }
        .fo {
            padding: 5px;
          }
        .fo * {
            margin: 0px;
            padding: 0px;
          }`
        styleElement.appendChild(document.createTextNode(s));
        if (styleElement.styleSheet) {
            // This is required for IE8 and below.
            console.log("This is required for IE8 and below.")
            // styleElement.styleSheet.cssText = css;
        } else {
            usedClass.map(item => {
                styleElement.appendChild(document.createTextNode(item.style));
            })
        }

        var svgData = this.svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        // console.log(svgData)
        var svgBlob = new Blob([preface, svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = this.fileName; //Set this property to open download page.
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    getClass() {
        let usedClass = this.styles.filter(item => {
            return this.classArray.includes(item.name)
        })
        return usedClass
    }
}
function rectPath(x, y, w, h, r) {
    if (r) {
        return [
            ["M", +x + +r, y],
            ["l", w - r * 2, 0],
            ["a", r, r, 0, 0, 1, r, r],
            ["l", 0, h - r * 2],
            ["a", r, r, 0, 0, 1, -r, r],
            ["l", r * 2 - w, 0],
            ["a", r, r, 0, 0, 1, -r, -r],
            ["l", 0, r * 2 - h],
            ["a", r, r, 0, 0, 1, r, -r],
            ["z"]
        ];
    }
    var res = [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    res.toString = toString;
    return res;
}
function box(x, y, width, height) {
    if (x == null) {
        x = y = width = height = 0;
    }
    if (y == null) {
        y = x.y;
        width = x.width;
        height = x.height;
        x = x.x;
    }
    return {
        x: x,
        y: y,
        width: width,
        w: width,
        height: height,
        h: height,
        x2: x + width,
        y2: y + height,
        cx: x + width / 2,
        cy: y + height / 2,
        r1: Math.min(width, height) / 2,
        r2: Math.max(width, height) / 2,
        r0: Math.sqrt(width * width + height * height) / 2,
        path: rectPath(x, y, width, height),
        vb: [x, y, width, height].join(" ")
    };
}
function isPointInsideBBox(bbox, x, y) {
    return x >= bbox.x &&
        x <= bbox.x + bbox.width &&
        y >= bbox.y &&
        y <= bbox.y + bbox.height;
}
function isBBoxIntersect(el1, el2) {
    var bbox1 = box(el1.getBBox());
    var bbox2 = box(el2.getBBox());
    return isPointInsideBBox(bbox2, bbox1.x, bbox1.y)
        || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y)
        || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2)
        || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2)
        || isPointInsideBBox(bbox1, bbox2.x, bbox2.y)
        || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y)
        || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2)
        || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2)
        || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x
            || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
        && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y
            || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
}

export default OperateSVG
export { isBBoxIntersect }
