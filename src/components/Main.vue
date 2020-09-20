<template>
  <div class="block" @click.self="clickEvent">
    <svg
      ref="svg"
      id="block"
      version="2"
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
      @wheel="wheelEvent"
    >
      <g>
        <rect x="0" y="0" width="10" height="10" />
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
// import _ from "lodash";
// import Element from "@/api/element.js";
// import vueUndoRedo from "vue-undo-redo";
// import * as d3 from "d3";
// import * as zoom from "d3-zoom";
// import { mapGetters } from "vuex";
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
      // self: this.data,
      // childs: this.data.childs,
      // parent: this.data.parent,
      dom: {},
      svg: null,
      linkStatus: false,
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
        arrowstartPreview: null,
        arrowendPreview: null,
      },
    };
  },
  created() {
    // console.log(zoom);
    this.$bus.$on("tool:back", () => {
      this.backtoolclickEvent();
    });
    this.$bus.$on("tool:save", () => {
      console.log(this.$refs);
      this.savetoolclickEvent(this.$refs.svg);
    });
    this.$bus.$on("tool:undo", () => {
      if (this.canUndo) {
        this.undo();
      }
    });
    this.$bus.$on("tool:redo", () => {
      if (this.canRedo) {
        this.redo();
      }
    });
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted: function () {
    var svg = document.getElementById("block");
    this.svg = svg;

    this.props.clientHeight = this.$el.clientHeight;
    this.props.clientWidth = this.$el.clientWidth;
    this.props.viewBox.height = this.props.clientHeight;
    this.props.viewBox.width = this.props.clientWidth;

    this.$store.commit("assignBeginingNode");
  },

  computed: {
    viewBox() {
      if (this.props.clientHeight) {
        return `${this.props.viewBox["min-x"]} ${this.props.viewBox["min-y"]} ${this.props.viewBox.width} ${this.props.viewBox.height}`;
      } else {
        return "0 0 0 0";
      }
    },
    data() {
      return this.$store.state.alldata;
    },
    self() {
      return this.$store.state.self;
    },
    childs() {
      return this.self.childs;
    },
    parent() {
      return this.self.parent;
    },
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
        this.$store.commit("cancelLink");
      }
    },
    dblclickEvent(event) {
      this.$store.commit("addElement", {
        type: "block",
        props: this.props,
        event: event,
        parent: this.self,
        ctm: this.svg.getCTM(),
      });
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
    mouseleaveEvent() {},
    wheelEvent(event) {
      this.zoom(event);
    },
    // Preview Event Methods
    previewmousedownEvent(event, data) {
      this.startLink(event, data);
    },
    previewmouseupEvent(event, data) {
      this.endLink(event, data);
    },
    previewdblclickEvent(event, child) {
      console.log("db click");
      this.$store.commit("changeSelf", child);
    },
    previewmouseenterEvent(event, data) {
      if (this.linkStatus) {
        this.props.arrowendPreview = data;
      }
    },
    previewmouseleaveEvent() {
      if (this.linkStatus) {
        this.props.arrowendPreview = null;
      }
    },
    // Tool EventBus Event Methods
    backtoolclickEvent() {
      if (this.parent) {
        this.$store.commit("gobackSelf");
      } else {
        // todo: disable button
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
    startLink(event, data) {
      if (event.target.classList.contains("Preview")) {
        if (!this.props.arrowstartPreview) {
          this.linkStatus = true;
          this.props.arrowstartPreview = data;
        }
      }
    },
    endLink() {
      this.linkStatus = false;
      this.$store.commit("endLink", this.props.arrowendPreview);
      this.props.arrowstartPreview = null;
      this.props.arrowendPreview = null;
    },
    Link(event) {
      event.preventDefault();
      if (!this.$store.state.arrowObject) {
        this.$store.commit("addElement", {
          type: "arrow",
          props: this.props,
          event: event,
          ctm: this.svg.getCTM(),
        });
      } else {
        this.$store.commit("setArrowPosition", {
          event: event,
          props: this.props,
        });
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
    zoom(event) {
      // todo not lower than zoro
      var w = this.props.viewBox.width + event.deltaY;
      var h = this.props.viewBox.height + event.deltaY;

      this.props.viewBox.width = w >= 0 ? w : 0;
      this.props.viewBox.height = h >= 0 ? h : 0;
    },
    key_u() {
      console.log(this.done, this.undone);
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