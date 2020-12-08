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

export default OperateSVG
