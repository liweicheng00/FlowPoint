<template>
  <div class="block">
    <svg
      class="Svg"
      ref="svg"
      id="block"
      version="2"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.clientWidth"
      :height="props.clientHeight"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid slice"
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
        <Middle
          v-for="(child, index) in childs"
          :key="index"
          :data="child"
          :parent="self"
          @dblclick="middledblclickEvent"
          @mousedown-right="middlemousedownEvent"
          @mouseup-right="middlemouseupEvent"
          @mouseup-left="middlemouseupEventL"
          @mousedown-left="middlemousedownEventL"
          @mouseenter="middlemouseenterEvent"
          @mouseleave="middlemouseleaveEvent"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import Middle from "@/components/Middle.vue";
// import _ from "lodash";
// import Element from "@/api/element.js";
// import vueUndoRedo from "vue-undo-redo";
// import * as d3 from "d3";
// import * as zoom from "d3-zoom";
// import { mapGetters } from "vuex";
export default {
  components: {
    Middle,
  },
  // mixins: [vueUndoRedo],
  props: {
    // data: Object,
  },
  data: function () {
    return {
      allowZoom: false,
      allowPen: false,
      allowDrag: false,
      dom: {},
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
        arrowstartMiddle: null,
        arrowendMiddle: null,
      },
    };
  },
  created() {
    // console.log(zoom);
    this.$nextTick(() => {
      this.$store.commit("getSVG", this.$refs);
      this.$store.commit("setCTM");
    });

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
    this.windowresizeEvent();
    this.$store.commit("assignBeginingNode");
  },

  computed: {
    viewBox: {
      get() {
        if (this.props.clientHeight) {
          return `${this.props.viewBox["min-x"]} ${this.props.viewBox["min-y"]} ${this.props.viewBox.width} ${this.props.viewBox.height}`;
        } else {
          return "0 0 0 0";
        }
      },
      set(newValue) {
        this.props.viewBox["min-x"] = newValue[0];
        this.props.viewBox["min-y"] = newValue[1];
      },
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
      if (!newValue) {
        this.$el.on(".zoom", null);
      }
    },
  },
  methods: {
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
      this.props.viewBox.height = this.props.clientHeight;
      this.props.viewBox.width = this.props.clientWidth;
      this.$store.commit("setInitViewbox", [
        this.props.clientWidth,
        this.props.clientHeight,
      ]);
    },
    clickEvent(event) {
      if (this.linkStatus) {
        this.$store.commit("cancelLink");

        this.endLink(event);
      }
    },
    dblclickEvent(event) {
      this.$store.commit("addElement", {
        type: "block",
        props: this.props,
        event: event,
        parent: this.self,
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
      } else if (this.allowDrag) {
        this.drag(event, this.dragData);
      }
    },
    mouseleaveEvent() {},
    wheelEvent(event) {
      this.zoom(event);
    },
    // Middle Event Methods
    middlemousedownEventL(event, data) {
      this.startDrag(data);
    },
    middlemouseupEventL() {
      this.endDrag();
    },
    middlemousedownEvent(event, data) {
      this.startLink(event, data);
    },
    middlemouseupEvent(event, data) {
      this.endLink(event, data);
    },
    middledblclickEvent(event, child) {
      this.initViewbox();
      this.$store.commit("changeSelf", child);
    },
    middlemouseenterEvent(event, data) {
      if (
        this.linkStatus &&
        data.id != this.props.arrowstartMiddle.id &&
        event.target.classList.contains("block")
      ) {
        this.props.arrowendMiddle = data;
      }
    },
    middlemouseleaveEvent() {
      if (this.linkStatus && event.target.classList.contains("block")) {
        this.props.arrowendMiddle = null;
      }
    },
    // Tool EventBus Event Methods
    backtoolclickEvent() {
      if (this.parent) {
        this.initViewbox();
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
    initViewbox() {
      this.viewBox = [0, 0];
    },
    startLink(event, data) {
      if (event.target.classList.contains("block")) {
        if (!this.props.arrowstartMiddle) {
          this.linkStatus = true;
          this.props.arrowstartMiddle = data;
        }
      }
    },
    endLink() {
      this.linkStatus = false;
      this.$store.commit("endLink", this.props.arrowendMiddle);
      this.props.arrowstartMiddle = null;
      this.props.arrowendMiddle = null;
    },
    Link(event) {
      event.preventDefault();
      if (!this.$store.state.arrowObject) {
        this.$store.commit("addElement", {
          type: "arrow",
          props: this.props,
          event: event,
        });
      } else {
        this.$store.commit("setArrowPosition", {
          event: event,
          props: this.props,
        });
      }
    },
    startPen(event) {
      if (event.target.classList.contains("Svg")) {
        this.allowPen = true;
        this.props.viewBox.startPoint = [
          this.props.viewBox["min-x"] + event.offsetX,
          this.props.viewBox["min-y"] + event.offsetY,
        ];
      }
    },
    endPen() {
      this.allowPen = false;
    },
    pen(event) {
      this.props.viewBox["min-x"] =
        this.props.viewBox.startPoint[0] - event.offsetX;
      this.props.viewBox["min-y"] =
        this.props.viewBox.startPoint[1] - event.offsetY;
      this.$store.commit("setCTM");
    },
    zoom(event) {
      var w = this.props.viewBox.width + event.deltaY;
      var h = this.props.viewBox.height + event.deltaY;

      this.props.viewBox.width = w >= 0 ? w : 0;
      this.props.viewBox.height = h >= 0 ? h : 0;
      this.$store.commit("setCTM");
    },
    startDrag(data) {
      this.allowDrag = true;
      this.dragData = data;
    },
    drag(event, data) {
      if (this.allowDrag) {
        var ictm = this.$store.state.ictm;
        var x =
          event.offsetX - parseInt(data.props.styleObject.width) / ictm.a / 2;
        var y =
          event.offsetY - parseInt(data.props.styleObject.height) / ictm.a / 2;
        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;

        this.$store.commit("setBlockPosition", {
          data: data,
          position: { x: x1, y: y1 },
        });
      }
    },
    endDrag() {
      this.allowDrag = false;
      this.dragData = null;
    },
  },
  beforeDestroy() {
    this.$store.commit("clearSVG");
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