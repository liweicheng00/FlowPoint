<template>
  <div class="block" @click.self="clickEvent">
    <!-- <h1 @dblclick.self="backdblclickEvent">{{self.id}}</h1>
    <p>height:{{props.clientHeight}} width:{{props.clientWidth}}</p>-->
    <svg
      id="block"
      version="1.1"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.clientWidth"
      :height="props.clientHeight"
      @contextmenu.prevent
      @click.right="rightclickEvent"
      @dblclick.self="dblclickEvent"
      @drag="dragEvent"
      @select="selectEvent"
      @mousedown.right="mousedownEvent"
      @mouseup.right="mouseupEvent"
      @mousemove="mousemoveEvent"
    >
      <g class="g_zoom">
        <Preview
          v-for="(child, index) in childs"
          :key="index"
          :data="child"
          :parent="self"
          @dblclick.self="previewdblclickEvent($event)"
          @mouseenter="PreviewMouseenterEvent($event)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import mousemove from "@/api/position.js";
import Preview from "@/components/Preview.vue";
import Element from "@/api/element.js";
import * as d3 from "d3";
// import * as zoom from "d3-zoom";

export default {
  components: {
    Preview,
  },
  props: {
    data: Object,
  },
  data: function () {
    return {
      allowZoom: false,
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
      props: { clientHeight: null, clientWidth: null },
    };
  },
  created() {
    // console.log(zoom);
    this.$bus.$on("tool:undo", () => {
      this.backtoolclickEvent();
    });
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted: function () {
    // console.log("mounted");
    this.svg = d3.select("#block");
    const g = this.svg.select("g");

    this.svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [300, 300],
        ])
        .scaleExtent([1, 8])
        .on("zoom", zoomed)
    );
    function zoomed() {
      console.log("zoom event");
      g.attr("transform", d3.event.transform);
      console.log(d3.event.sourceEvent);
    }
    if (!this.allowZoom) {
      this.svg.on(".zoom", null);
    }
    this.props.clientHeight = this.$el.clientHeight;
    this.props.clientWidth = this.$el.clientWidth;
  },

  computed: {},
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
    },
    clickEvent(event) {
      console.log(event.type);
    },
    rightclickEvent(event) {
      console.log(event);
    },
    dblclickEvent(event) {
      console.log(event.type);
      this.$store.commit("newID");
      this.childs.push(
        new Element(
          "preview",
          this.$store.state.IdArray[this.$store.state.IdArray.length - 1],
          {
            mouseclickposition: [
              mousemove.event.offsetX,
              mousemove.event.offsetY,
            ],
          }
        )
      );
    },
    mousedownEvent(event) {
      if (event.target.classList.contains("Preview")) {
        console.log(event.target);
        this.linkStatus = true;
        this.arrowstartPreview = event.target;
      }
    },
    mousemoveEvent(event) {
      if (this.linkStatus) {
        //   todo: add Arrow components
        console.log(event.x);
        if (!this.arrowObject) {
          this.$store.commit("newID");
          this.arrowObject = new Element(
            "arrow",
            this.$store.state.IdArray[this.$store.state.IdArray.length - 1],
            {}
          );
          this.childs.push(this.arrowObject);
        } else {
          this.arrowObject.props.len += 1;
        }
      }
    },
    mouseupEvent(event) {
      this.linkStatus = false;
      this.arrowObject = null;
      if (event.target.classList.contains("Preview")) {
        console.log(event.target);
        this.arrowendPreview = event.target;
      } else {
        //   todo: remove new arrow element in this.childs
        this.childs.pop();
      }
    },

    dragEvent(event) {
      // drag selected text
      console.log(event.type);
    },
    selectEvent(event) {
      console.log(event.type);
    },
    backtoolclickEvent(event) {
      console.log("backdblclickEvent");
      console.log(event);
      if (this.parent) {
        this.childs = this.parent.childs;
        this.self = this.parent;
        this.parent = this.parent.parent;
      } else {
        console.log("no parent");
      }
    },
    previewdblclickEvent(child) {
      console.log("previewdblClick");
      console.log(child);
      this.self.parent = this.parent;
      this.parent = this.self;
      this.childs = child.childs;
      this.self = child;
    },
    PreviewMouseenterEvent(child) {
      console.log(child);
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