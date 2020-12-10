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
          @dblclick="middleDblClickEvent"
          @mousedown-right="middleMouseDownEvent"
          @mouseup-right="middleMouseUpEvent"
          @mouseup-left="middleMouseUpEventL"
          @mousedown-left="middleMouseDownEventL"
          @mouseenter="middleMouseEnterEvent"
          @mouseleave="middleMouseLeaveEvent"
        />
      </g>
    </svg>
    <!-- <p>Save time:{{ saveTime }}</p> -->
  </div>
</template>

<script>
import Middle from "@/components/Middle.vue";
import OperateSVG from "@/api/svg.js";
import { mapActions, mapMutations, mapState } from "vuex";

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
    redo() {
      let commit = this.undone.pop();
      this.newMutation = false;
      this[`${commit.type}`](commit.payload);
      this.newMutation = true;
    },
    undo() {
      this.undone.push(this.done.pop());
      this.newMutation = false;
      this[this.EMPTY_STATE]();

      this.done.forEach((mutation) => {
        console.log(`${mutation.type.split("/")[1]}`, mutation.payload);

        this[`${mutation.type.split("/")[1]}`](mutation.payload);

        this.done.pop();
      });
      this.newMutation = true;
    },
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
    },
    clickEvent(event) {
      if (this.linkStatus) {
        this.endLink(event);
      }
    },
    dblclickEvent(event) {
      this.addElement({
        type: "block",
        params: {
          event: event,
          parent: this.self,
        },
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
      } else if (this.canPen) {
        this.pen(event);
      } else if (this.canDrag) {
        this.drag(event, this.dragData);
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
      const isBlock = event.target.classList.contains("block");
      if (isBlock) {
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
    Link(event) {
      event.preventDefault();
      if (!this.$store.state.editor.arrowObject) {
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
    },
    zoom(event) {
      event.preventDefault();
      this.setViewBox({ type: "zoom", event: event });
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
  },
  beforeDestroy() {
    this.clearSVG();
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