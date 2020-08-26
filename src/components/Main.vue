<template>
  <div class="block" @click.self="clickEvent">
    <svg
      ref="svg"
      id="block"
      version="1.1"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.clientWidth"
      :height="props.clientHeight"
      :viewBox="viewBox"
      @contextmenu.prevent
      @click="clickEvent"
      @dblclick.self="dblclickEvent"
      @mousedown.left="leftmousedownEvent"
      @mouseup.left="leftmouseupEvent"
      @mousemove="mousemoveEvent"
      @mouseleave="mouseleaveEvent"
    >
      <g>
        <Preview
          v-for="(child, index) in childs"
          :key="index"
          :data="child"
          :parent="self"
          @dblclick="previewdblclickEvent"
          @mousedown-right="previewmousedownEvent"
          @mouseup-right="previewmouseupEvent"
          @mouseenter="previewmouseenterEvent"
          @mouseleave="previewmouseleaveEvent"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Preview from "@/components/Preview.vue";
import Element from "@/api/element.js";
// import vueUndoRedo from "vue-undo-redo";
// import * as d3 from "d3";
// import * as zoom from "d3-zoom";
import { mapGetters } from "vuex";
export default {
  components: {
    Preview,
  },
  // mixins: [vueUndoRedo],
  props: {
    // data: Object,
  },
  data: function () {
    return {
      allowZoom: false,
      allowPen: false,
      self: this.data,
      childs: this.data.childs,
      parent: this.data.parent,
      dom: {},
      svg: null,
      linkStatus: false,
      arrowstartPreview: null,
      arrowendPreview: null,
      arrowObject: null,
      arrowDom: null,
      props: {
        clientHeight: null,
        clientWidth: null,
        viewBox: {
          "min-x": 0,
          "min-y": 0,
          width: null,
          height: null,
          startPoint: [0, 0],
        },
      },
    };
  },
  created() {
    // console.log(zoom);
    this.$bus.$on("tool:undo", () => {
      this.backtoolclickEvent();
    });
    this.$bus.$on("tool:save", () => {
      console.log(this.$refs);
      this.savetoolclickEvent(this.$refs.svg);
    });
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted: function () {
    // console.log("mounted");
    var svg = document.getElementById("block");
    this.svg = svg;
    // this.svg = d3.select("#block");
    // const g = this.svg.select("g");

    // this.svg.call(
    //   d3
    //     .zoom()
    //     .extent([
    //       [0, 0],
    //       [300, 300],
    //     ])
    //     .scaleExtent([1, 8])
    //     .on("zoom", zoomed)
    // );
    // function zoomed() {
    //   console.log("zoom event");
    //   g.attr("transform", d3.event.transform);
    //   console.log(d3.event.sourceEvent);
    // }
    // if (!this.allowZoom) {
    //   this.svg.on(".zoom", null);
    // }
    this.props.clientHeight = this.$el.clientHeight;
    this.props.clientWidth = this.$el.clientWidth;
    this.props.viewBox.height = this.props.clientHeight;
    this.props.viewBox.width = this.props.clientWidth;
  },

  computed: {
    viewBox() {
      if (this.props.clientHeight) {
        return `${this.props.viewBox["min-x"]} ${this.props.viewBox["min-y"]} ${this.props.clientWidth} ${this.props.clientHeight}`;
      } else {
        return "0 0 0 0";
      }
    },
    childs() {
      return this.data.childs;
    },
    parent() {
      return this.data.parent;
    },
    ...mapGetters({
      data: "getData",
    }),
  },
  watch: {
    allowZoom: function (newValue) {
      console.log("change");
      if (!newValue) {
        console.log(this.svg);
        this.svg.on(".zoom", null);
      }
    },
  },
  methods: {
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
      this.props.viewBox.height = this.props.clientHeight;
      this.props.viewBox.width = this.props.clientWidth;
    },
    clickEvent(event) {
      if (this.linkStatus) {
        this.endLink(event);
        this.childs.pop();
      }
      // console.log(event);
    },
    dblclickEvent(event) {
      this.$store.commit("addBlock", {
        props: this.props,
        event: event,
      });
      // this.addBlock(event);
    },
    leftmousedownEvent(event) {
      this.startPen(event);
    },
    leftmouseupEvent(event) {
      this.endPen(event);
    },
    mousemoveEvent(event) {
      event.preventDefault();
      if (this.linkStatus) {
        this.Link(event);
      } else if (this.allowPen) {
        this.pen(event);
      }
    },
    mouseleaveEvent() {
      // if (this.linkStatus) {
      //   this.linkStatus = false;
      //   this.childs.pop();
      // }
    },
    // Preview Event Methods
    previewmousedownEvent(event, data, prop) {
      this.startLink(event, data, prop);
    },
    previewmouseupEvent(event, data, prop) {
      this.endLink(event, data, prop);
    },
    previewdblclickEvent(event, child) {
      this.self.parent = this.parent;
      this.parent = this.self;
      this.childs = child.childs;
      this.self = child;
    },
    previewmouseenterEvent(event, data, prop) {
      if (this.linkStatus) {
        this.arrowendPreview = { data, prop };
      }
    },
    previewmouseleaveEvent() {
      if (this.linkStatus) {
        this.arrowendPreview = null;
      }
    },
    // Tool EventBus Event Methods
    backtoolclickEvent() {
      if (this.parent) {
        this.childs = this.parent.childs;
        this.self = this.parent;
        this.parent = this.parent.parent;
      } else {
        console.log("no parent");
      }
    },
    savetoolclickEvent(svgEl, name) {
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      var svgData = svgEl.outerHTML;
      var preface = '<?xml version="1.0" standalone="no"?>\r\n';
      var svgBlob = new Blob([preface, svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      var svgUrl = URL.createObjectURL(svgBlob);
      var downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    // Methods
    getMousePosition() {
      var CTM = this.svg.getScreenCTM();
      // console.log(event.clientX, CTM.e, CTM.a);
      console.log(CTM);
      // return {
      //   x: (event.clientX - CTM.e) / CTM.a,
      //   y: (event.clientY - CTM.f) / CTM.d,
      // };a
    },
    // addBlock(event) {},
    startLink(event, data, prop) {
      if (event.target.classList.contains("Preview")) {
        if (!this.arrowstartPreview) {
          this.linkStatus = true;
          this.arrowstartPreview = { data, prop };
        }
      }
    },
    endLink(event) {
      console.log(event.target);
      this.linkStatus = false;
      this.arrowObject = null;
      this.arrowstartPreview = null;
      this.arrowendPreview = null;
      // if (event.target.classList.contains("Preview")) {
      //   console.log("stop");
      //   this.arrowObject = null;
      //   this.arrowendPreview = null;
      // } else {
      //   console.log(event.target);
      //   if (this.arrowObject) {
      //     this.arrowendPreview = null;

      //     this.arrowObject = null;
      //     this.childs.pop();
      //   }
      // }
    },
    Link(event) {
      event.preventDefault();
      if (!this.arrowObject) {
        // this.$store.commit("newID");
        // this.arrowObject = new Element(
        //   "arrow",
        //   this.$store.state.IdArray[this.$store.state.IdArray.length - 1],
        //   {},
        //   {
        //     startX: event.offsetX + this.props.viewBox["min-x"],
        //     startY: event.offsetY + this.props.viewBox["min-y"],
        //     offsetX: event.offsetX + this.props.viewBox["min-x"],
        //     offsetY: event.offsetY + this.props.viewBox["min-y"],
        //     arrowstartPreview: this.arrowstartPreview,
        //   }
        // );
        this.arrowObject = new Element("arrow", this, event);
        this.childs.push(this.arrowObject);
      } else {
        this.arrowObject.props.offsetX =
          event.offsetX + this.props.viewBox["min-x"] + 1;
        this.arrowObject.props.offsetY =
          event.offsetY + this.props.viewBox["min-y"] + 1;
        if (this.arrowendPreview) {
          this.arrowObject.props.arrowendPreview = this.arrowendPreview;
        } else {
          this.arrowObject.props.arrowendPreview = null;
        }
      }
    },
    startPen(event) {
      this.allowPen = true;
      this.props.viewBox.startPoint = [
        this.props.viewBox["min-x"] + event.offsetX,
        this.props.viewBox["min-y"] + event.offsetY,
      ];
    },
    endPen() {
      this.allowPen = false;
    },
    pen(event) {
      this.props.viewBox["min-x"] =
        this.props.viewBox.startPoint[0] - event.offsetX;
      this.props.viewBox["min-y"] =
        this.props.viewBox.startPoint[1] - event.offsetY;
    },
  },
};
</script>

<style scoped>
.block {
  background: white;
  border: solid 1px rgb(205, 202, 197);
  height: 500px;
  position: relative;
}
</style>