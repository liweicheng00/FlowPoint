<template>
<g
  @mousedown.left="leftmousedownEvent"
  @mouseup.left="leftmouseupEvent"
  @mousemove="mousemoveEvent"
  @focus="onFocus"
>
  <rect
    class="block"
    :id="data.id"
    @dblclick.self="$emit('dblclick', $event,data)"
    v-bind="data.props.styleObject"
    :x="styleObject.x"
    :y="styleObject.y"
    :class="{focus: ifFocus}"
  />
  <foreignObject
    :x="styleObject.x"
    :y="styleObject.y"
    :width="data.props.styleObject.width"
    :height="data.props.styleObject.height"
    pointer-events="none"
  >
    <body xmlns="http://www.w3.org/1999/xhtml">
      <div ref="content" v-html="data.content" class="text"></div>
    </body>
  </foreignObject>
  <!-- <text :x="data.props.styleObject.x" :y="data.props.styleObject.y">{{x}},{{y}}</text> -->
</g>
</template>

<script>
// import func from "../../vue-temp/vue-editor-bridge";
// import { mapState } from "vuex";

export default {
  props: {
    data: Object,
    parent: Object,
  },
  data: function () {
    return {
      ifFocus: false,
      allowMove: false,
      styleDefault: {
        width: "100",
        height: "30",
        stroke: "black",
        rx: "3",
        fill: "transparent",
        "stroke-width": "1",
        x: "0",
        y: "0",
      },
      textDefault: {},
    };
  },
  created: function () {
    this.$store.commit("initStyleObject", {
      data: this.data,
      styleObject: this.styleObject,
    });

    this.$bus.$on("TextEditor:change", (content, id) => {
      if (this.ifFocus && this.data.id == id) {
        this.$store.commit("editContent", {
          data: this.data,
          content: content,
          clientHeight:
            parseInt(this.$refs.content.clientHeight) >=
            parseInt(this.styleDefault.height)
              ? this.$refs.content.clientHeight
              : this.styleDefault.height,
        });
      }
    });
  },
  watch: {
    focusingElementId: function (new_value) {
      // pass content to TextEditor
      if (new_value == this.data.id) {
        this.ifFocus = true;
        this.$bus.$emit("Block:focus", this.data.content, this.data.id);
      } else {
        this.ifFocus = false;
      }
    },
  },
  computed: {
    styleObject: function () {
      if (this.data.props.mouseclickposition) {
        console.log("re calculate");
        var ictm = this.$store.state.svg.svg.getCTM().inverse();
        var x =
          this.data.props.mouseclickposition[0] -
          parseInt(this.styleDefault.width) / ictm.a / 2;
        var y =
          this.data.props.mouseclickposition[1] -
          parseInt(this.styleDefault.height) / ictm.a / 2;
        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;
        this.$store.commit("clearInitPosition", this.data);
        return Object.assign(this.styleDefault, {
          color: "red",
          x: `${x1}`,
          y: `${y1}`,
        });
      } else {
        return this.data.props.styleObject;
      }
    },
    textObject: function () {
      return Object.assign(this.textDefault, {});
    },
    focusingElementId: function () {
      return this.$store.state.FocusingElementId;
    },
  },
  mounted: function () {},
  methods: {
    onFocus() {
      this.$store.commit("changeFocusingElement", this.data.id);
    },
    resizeBody() {
      console.log("here");
    },
    leftmousedownEvent(event) {
      this.startMove(event);
    },
    leftmouseupEvent(event) {
      this.endMove(event);
    },
    mousemoveEvent(event) {
      event.preventDefault();
      if (this.allowMove) {
        this.move(event);
      }
    },
    startMove() {
      this.allowMove = true;
    },
    move(event) {
      if (this.allowMove) {
        var ictm = this.$store.state.svg.svg.getCTM().inverse();
        var x = event.offsetX - parseInt(this.styleDefault.width) / ictm.a / 2;
        var y = event.offsetY - parseInt(this.styleDefault.height) / ictm.a / 2;
        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;

        this.$store.commit("setBlockPosition", {
          data: this.data,
          position: { x: `${x1}`, y: `${y1}` },
        });
        this.$set(this.styleObject, "x", `${x1}`);
        this.$set(this.styleObject, "y", `${y1}`);
      }
    },
    endMove() {
      this.allowMove = false;
    },
  },
  beforeDestroy: function () {
    this.$bus.$off("TextEditor:change");
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
  padding: 2px;
  position: absolute;
}
.focus {
  fill: greenyellow;
}
body {
  background: transparent;
}
.text {
  padding: 3px;
}
/* .default:focus {
  background-color: Aqua;
  border: solid 1px rgb(204, 137, 30);
} */
</style>