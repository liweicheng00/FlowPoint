<template>
  <g @focus="onFocus">
    <rect
      class="block"
      :id="data.id"
      v-bind="data.props.styleObject"
      :class="{ focus: ifFocus }"
    />
    <foreignObject
      :x="styleObject.x"
      :y="styleObject.y"
      :width="data.props.styleObject.width"
      :height="data.props.styleObject.height"
      pointer-events="none"
    >
      <body xmlns="http://www.w3.org/1999/xhtml">
        <div ref="content" class="fo">
          <div v-html="data.content" :class="[fo_content]"></div>
        </div>
      </body>
    </foreignObject>
  </g>
</template>

<script>
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
      fo_content: "",
    };
  },
  created: function () {
    // get content from TextEditor
    this.$bus.$on("TextEditor:change", (content, id) => {
      if (this.ifFocus && this.data.id == id) {
        this.$store.commit("editContent", {
          data: this.data,
          content: content,
          ref: this.$refs.content,
        });
      }
    });
    this.$bus.$on("Style:change", (style) => {
      this.fo_content = style.name;
      console.log(style);
    });
  },
  watch: {
    focusingElementId: function (new_value) {
      if (new_value == this.data.id) {
        this.ifFocus = true;
        // pass content to TextEditor
        this.$bus.$emit("Block:focus", this.data.content, this.data.id);
      } else {
        this.ifFocus = false;
      }
    },
  },
  computed: {
    styleObject: function () {
      if (this.data.props.mouseclickposition) {
        var ictm = this.$store.state.ictm;
        var x =
          this.data.props.mouseclickposition[0] -
          parseInt(this.styleDefault.width) / ictm.a / 2;
        var y =
          this.data.props.mouseclickposition[1] -
          parseInt(this.styleDefault.height) / ictm.a / 2;

        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;
        var style = Object.assign(this.styleDefault, {
          color: "red",
          x: `${x1}`,
          y: `${y1}`,
        });
        this.$store.commit("clearInitPosition", {
          data: this.data,
          style: style,
        });
        return style;
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
    gridAttach(value, width) {
      var a = value % width;
      return a > width / 2 ? value + (width - a) : value - a;
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
</style>
