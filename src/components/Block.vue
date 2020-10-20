<template>
<g
  @mouseenter="$emit('mouseenter',$event,data)"
  @mouseleave="$emit('mouseleave',$event,data)"
  @mousedown.right="$emit('mousedown-right',$event,data)"
  @mouseup.right="$emit('mouseup-right',$event,data)"
  @focus="onFocus($event)"
>
  <rect
    class="Preview"
    :id="data.id"
    @dblclick.self="$emit('dblclick', $event,data)"
    v-bind="data.props.styleObject"
    :class="{focus: ifFocus}"
  />
  <foreignObject
    :x="data.props.styleObject.x"
    :y="data.props.styleObject.y"
    :width="data.props.styleObject.width"
    :height="data.props.styleObject.height"
    pointer-events="none"
  >
    <body xmlns="http://www.w3.org/1999/xhtml">
      <div ref="content" v-html="data.content" class="text"></div>
    </body>
  </foreignObject>
  <!-- <text v-bind="textObject" @select.prevent>{{content}}</text> -->
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
      styleDefault: {
        width: "100",
        height: "30",
        stroke: "black",
        rx: "3",
        fill: "transparent",
        "stroke-width": "1",
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
    data: function () {
      console.log("here");
    },
  },
  computed: {
    styleObject: function () {
      if (this.data.props.mouseclickposition) {
        console.log(this.data.props.ctm.inverse());
        var ictm = this.data.props.ctm.inverse();

        var x =
          this.data.props.mouseclickposition[0] -
          parseInt(this.styleDefault.width) / 2;
        var y =
          this.data.props.mouseclickposition[1] -
          parseInt(this.styleDefault.height) / 2;

        var x1 = ictm.a * x + ictm.c * y + ictm.e;
        var y1 = ictm.b * x + ictm.d * y + ictm.f;
        console.log(x, y, x1, y1);

        return Object.assign(this.styleDefault, {
          color: "red",
          x: `${x1}`,
          y: `${y1}`,
        });
      } else {
        return this.styleDefault;
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