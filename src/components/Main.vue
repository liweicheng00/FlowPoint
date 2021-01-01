<template>
  <div class="block">
    <!-- <button @click="testFunction">click</button> -->
    <svg
      style="border: 1px solid black"
      class="Svg"
      ref="svg"
      id="mainSVG"
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
      @mousemove.self="mousemoveEvent"
      @mouseleave="mouseleaveEvent"
      @wheel="wheelEvent"
    >
      <g>
        <Middle
          v-for="(child, index) in childs"
          :key="index"
          :data="child"
          :parent="self"
          @dblclick="middleDblClickEvent"
          @mousedown-right="middleMouseDownEvent"
          @mouseup-right="middleMouseUpEvent"
          @mouseup-left="middleMouseUpEventL"
          @mousedown-left="middleMouseDownEventL"
          @mouseenter="middleMouseEnterEvent"
          @mouseleave="middleMouseLeaveEvent"
        />
      </g>
      <rect v-if="canSelect" ref="selectBox" v-bind="selectBoxParam"></rect>
    </svg>
    <!-- <p>Save time:{{ saveTime }}</p> -->
  </div>
</template>

<script>
import Middle from "@/components/Middle.vue";
import OperateSVG, { isBBoxIntersect } from "@/api/svg.js";
import { mapActions, mapMutations, mapState } from "vuex";
// import Snap from "snapsvg-cjs";

export default {
  components: {
    Middle,
  },
  props: {},
  data: function () {
    return {
      done: [],
      undone: [],
      newMutation: true,

      svg: null,
      selectItems: null,
      selectBoxParam: {
        width: "0",
        height: "0",
        x: "0",
        y: "0",
        fill: "none",
        stroke: "#9999FF",
      },

      canSelect: false,
      isCtrl: false,
      canZoom: false,
      canPen: false,
      canDrag: false,
      linkStatus: false,

      props: {
        clientHeight: null,
        clientWidth: null,
      },
      arrowEndMiddle: null,
      arrowStartMiddle: null,
      mutationModule: [],
    };
  },

  computed: {
    ...mapState("editor", {
      self: (state) => state.self,
      fileName: (state) => state.fileName,
      fileId: (state) => state.fileId,
      saveTime: (state) => state.saveTime,
      ictm: (state) => state.ictm,
    }),
    childs() {
      return this.self.childs;
    },
    parent() {
      return this.self.parent;
    },
    viewBox() {
      if (!this.self.viewBox) {
        return "0 0 0 0";
      }
      this.$nextTick(() => {
        this.setCTM();
      });
      return `${this.self.viewBox.minX} ${this.self.viewBox.minY} ${this.self.viewBox.width} ${this.self.viewBox.height}`;
    },
  },
  created() {
    this.$bus.$on("global:new file", () => {
      this.callSaveFile();
      this.clearFileName();
      this.clearFileId();
      this.clearAllData();
    });
    this.$bus.$on("tool:back", () => {
      this.backtoolclickEvent();
    });
    this.$bus.$on("tool:download", () => {
      this.savetoolclickEvent(this.$refs.svg);
    });
    this.$bus.$on("tool:save", () => {
      this.callSaveFile();
    });
    this.$bus.$on("tool:undo", () => {
      this.undo();
    });
    this.$bus.$on("tool:redo", () => {
      this.redo();
    });

    window.addEventListener("resize", () => {
      this.windowresizeEvent();
      this.$nextTick(() => {
        this.setCTM();
      });
    });
    // callsaveFile when close window
    // window.addEventListener("beforeunload", (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    //   console.log("eher");
    // });

    this.$store.subscribe((mutation) => {
      let ignoreMutations = [
        `editor/${this.EMPTY_STATE}`,
        "editor/setArrowPosition",
        "editor/setBlockPosition",
      ];
      if (
        ignoreMutations.indexOf(mutation.type) === -1 &&
        // mutation.type !== this.EMPTY_STATE &&
        mutation.type.indexOf("editor") != -1
      ) {
        this.done.push(mutation);
      }
      if (this.newMutation) {
        this.undone = [];
      }
    });
  },
  mounted: function () {
    this.windowresizeEvent();
    this.setBeginData();
    this.getSVG(this.$refs);
    this.setCTM();
<<<<<<< HEAD
=======

    window.addEventListener("keyup", this.keypressEvent);
    window.addEventListener("keydown", this.keypressEvent);
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
  },
  updated() {
    // this.saveFile();
  },
  methods: {
    ...mapMutations("editor", [
      "emptyState",
      "getSVG",
      "clearSVG",
      "setCTM",
      "setViewBox",
      "setBeginData",
      "changeSelf",
      "gobackSelf",
      "addElement",
      "setArrowPosition",
      "stopLink",
      "cancelLink",
      "changeFocusingElement",
      "addChildNum",
      "reduceChildNum",
      "setBlockPosition",
      "addSelectedMiddle",
      "cancelSelectedMiddle",
      "deleteMiddle",
      "editContent",
      "resetBlockHeight",
      "clearInitPosition",
    ]),
    ...mapActions("user", ["saveFile"]),
    ...mapMutations("editor", [
      "clearAllData",
      "setFileName",
      "clearFileName",
      "clearFileId",
      "clearSaveTime",
    ]),
    callSaveFile() {
      console.log("callSaveFile");

      if (!this.fileName) {
        // edit fileName
        let fileName = prompt("File name: ", "undefined");
        console.log(fileName);
        this.setFileName(fileName);
        this.saveFile();
      } else {
        this.saveFile();
      }
    },
<<<<<<< HEAD
    redo() {
      let commit = this.undone.pop();
      this.newMutation = false;
      this[`${commit.type}`](commit.payload);
      this.newMutation = true;
    },
    undo() {
      this.undone.push(this.done.pop());
      this.newMutation = false;
      // this.$store.commit(this.EMPTY_STATE);
      this[this.EMPTY_STATE]();

      this.done.forEach((mutation) => {
        // this.$store.commit(`${mutation.type}`, mutation.payload);
        console.log(`${mutation.type.split("/")[1]}`, mutation.payload);

        this[`${mutation.type.split("/")[1]}`](mutation.payload);

        this.done.pop();
      });
      this.newMutation = true;
    },
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
=======
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
    },
    keypressEvent(event) {
      if (event.key == "Meta" && event.type == "keydown") {
        this.isCtrl = true;
      } else if (event.key == "Meta" && event.type == "keyup") {
        this.isCtrl = false;

        // if (this.selectBox) {
        //   this.selectBox.remove();
        // }
      }
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
    },
    clickEvent(event) {
      if (this.linkStatus) {
        this.endLink(event);
      }
      if (!this.canSelect && event.target == this.$refs.svg) {
        this.cancelSelectedMiddle();
      }
    },
    dblclickEvent(event) {
<<<<<<< HEAD
      this.setCTM();
=======
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
      this.addElement({
        type: "block",
        params: {
          event: event,
          parent: this.self,
        },
      });
    },
    leftmousedownEvent(event) {
      if (!this.isCtrl) {
        this.startPen(event);
      } else {
        this.startSelect(event);
      }
    },
    leftmouseupEvent(event) {
      this.endPen(event);
      this.endSelect();
    },
    mousemoveEvent(event) {
      event.preventDefault();
      if (this.linkStatus) {
        this.link(event);
      } else if (this.canPen) {
        this.pen(event);
      } else if (this.canDrag) {
        this.drag(event, this.dragData);
      } else if (this.canSelect) {
        this.select(event);
      }
    },
    mouseleaveEvent() {},
    wheelEvent(event) {
      this.zoom(event);
    },
    // Middle Event Methods
    middleMouseDownEventL(event, data) {
      this.startDrag(data);
    },
    middleMouseUpEventL() {
      this.endDrag();
    },
    middleMouseDownEvent(event, data) {
      this.startLink(event, data);
    },
    middleMouseUpEvent(event, data) {
      this.endLink(event, data);
    },
    middleDblClickEvent(event, child) {
      this.changeSelf(child);
    },
    middleMouseEnterEvent(event, data) {
      if (this.linkStatus) {
        const isEndMiddle = data.id != this.arrowStartMiddle.id;
        const isBlock = event.target.classList.contains("block");
        if (isEndMiddle && isBlock) {
          this.arrowEndMiddle = data;
        }
      }
    },
    middleMouseLeaveEvent() {
      if (this.linkStatus) {
        const isBlock = event.target.classList.contains("block");
        if (isBlock) {
          this.arrowEndMiddle = null;
        }
      }
    },
    // Tool EventBus Event Methods
    backtoolclickEvent() {
      if (this.parent) {
        this.gobackSelf();
      } else {
        // todo: disable button
        console.log("no parent");
      }
    },
    savetoolclickEvent(svgEl) {
      new OperateSVG(svgEl, {
        styles: this.$store.state.user.blockStyles,
      }).save();
    },

    // Methods
    startLink(event, data) {
      if (data.type == "block") {
        if (!this.arrowStartMiddle) {
          this.linkStatus = true;
          this.arrowStartMiddle = data;
        }
      }
    },
    endLink() {
      this.linkStatus = false;
      if (this.arrowEndMiddle) {
        this.stopLink(this.arrowEndMiddle);
      } else {
        this.cancelLink();
      }
      this.arrowStartMiddle = null;
      this.arrowEndMiddle = null;
    },
    link(event) {
      event.preventDefault();
      if (!this.$store.state.editor.arrowObject) {
<<<<<<< HEAD
        //
=======
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
        this.addElement({
          type: "arrow",
          params: {
            parent: this.self,
            arrowStartMiddle: this.arrowStartMiddle,
          },
        });
      } else {
        this.setArrowPosition({
          event: event,
          arrowEndMiddle: this.arrowEndMiddle,
        });
      }
    },
    startPen(event) {
      const isSvg = event.target.classList.contains("Svg");
      if (isSvg) {
        this.canPen = true;
        this.setViewBox({ type: "pen", event: event });
      }
    },
    endPen() {
      this.canPen = false;
    },
    pen(event) {
      this.setViewBox({ type: "pen", event: event });
<<<<<<< HEAD
      this.setCTM();
=======
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
    },

    zoom(event) {
      event.preventDefault();
      this.setViewBox({ type: "zoom", event: event });
<<<<<<< HEAD
      this.setCTM();
=======
>>>>>>> 604fb02ab1f165e967ec4bfd41255d01da6bfb44
    },
    startDrag(data) {
      this.canDrag = true;
      this.dragData = data;
    },
    drag(event, dragData) {
      if (this.canDrag) {
        this.setBlockPosition({
          dragData: dragData,
          event: event,
        });
      }
    },
    endDrag() {
      this.canDrag = false;
      this.dragData = null;
    },
    // For selection with Snap.js
    startSelect(event) {
      if (this.isCtrl) {
        this.canSelect = true;
        var xx =
          this.ictm.a * event.offsetX +
          this.ictm.c * event.offsetY +
          this.ictm.e;
        var yy =
          this.ictm.b * event.offsetX +
          this.ictm.d * event.offsetY +
          this.ictm.f;
        this.selectBoxParam.x = xx;
        this.selectBoxParam.y = yy;
      }
    },
    endSelect() {
      this.canSelect = false;
      if (this.$refs.selectBox) {
        var el = document.querySelectorAll(".Middle");

        el.forEach((el) => {
          if (isBBoxIntersect(this.$refs.selectBox, el)) {
            this.addSelectedMiddle(el.getAttribute("id"));
          }
        });

        this.selectBoxParam = {
          width: "0",
          height: "0",
          x: "0",
          y: "0",
          fill: "none",
          stroke: "#9999FF",
        };
      }
    },
    select(event) {
      if (this.canSelect) {
        var xoffset = 0;
        var yoffset = 0;

        var dx =
          this.ictm.a * event.offsetX +
          this.ictm.c * event.offsetY +
          this.ictm.e -
          this.selectBoxParam.x;
        var dy =
          this.ictm.b * event.offsetX +
          this.ictm.d * event.offsetY +
          this.ictm.f -
          this.selectBoxParam.y;
        if (dx < 0) {
          xoffset = dx;
          dx = -1 * dx;
        }

        if (dy < 0) {
          yoffset = dy;
          dy = -1 * dy;
        }
        this.selectBoxParam.transform = `translate(${xoffset} ${yoffset})`;
        this.selectBoxParam.width = dx;
        this.selectBoxParam.height = dy;
      }
    },
  },
  beforeDestroy() {
    this.clearSVG();
    window.removeEventListener("keyup", this.keypressEvent);
    window.removeEventListener("keydown", this.keypressEvent);
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
p {
  text-align: left;
  font-size: 0.2rem;
  color: grey;
}
</style>