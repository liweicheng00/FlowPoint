<template>
  <g
    @mouseenter="$emit('mouseenter',$event,data, {styleObject, textObject})"
    @mouseleave="$emit('mouseleave',$event,data, {styleObject, textObject})"
    @mousedown.right="$emit('mousedown-right',$event,data, {styleObject, textObject})"
    @mouseup.right="$emit('mouseup-right',$event,data, {styleObject, textObject})"
    @focus="onFocus($event)"
  >
    <rect
      class="Preview"
      :id="data.id"
      @dblclick.self="$emit('dblclick', $event,data)"
      v-bind="styleObject"
      :class="{focus: ifFocus}"
    />
    <text v-bind="textObject" @select.prevent>{{content}}</text>
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
      content: "",
      styleDefault: {
        width: "100",
        height: "30",
        stroke: "black",
        fill: "transparent",
        "stroke-width": "1",
      },
      textDefault: {
        fill: "black",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      },
    };
  },
  created: function () {
    // todo: content
    this.content = this.data.id;

    this.$bus.$on("TextEditor:change", (content, id) => {
      if (this.ifFocus && this.data.id == id) {
        this.content = content;
      }
    });
  },
  watch: {
    focusingElementId: function (new_value, oldvalue) {
      // pass content to TextEditor
      console.log("watch", oldvalue, new_value, this.data.id);
      if (new_value == this.data.id) {
        this.ifFocus = true;
        this.$bus.$emit("Block:focus", this.content, this.data.id);
      } else {
        this.ifFocus = false;
      }
    },
  },
  computed: {
    styleObject: function () {
      if (this.data.position.mouseclickposition) {
        return Object.assign(this.styleDefault, {
          color: "red",
          x: `${
            this.data.position.mouseclickposition[0] -
            parseInt(this.styleDefault.width) / 2
          }`,
          y: `${
            this.data.position.mouseclickposition[1] -
            parseInt(this.styleDefault.height) / 2
          }`,
        });
      } else {
        return this.styleDefault;
      }
    },
    textObject: function () {
      return Object.assign(this.textDefault, {
        x: `${this.data.position.mouseclickposition[0]}`,
        y: `${this.data.position.mouseclickposition[1]}`,
      });
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
  },
  beforeDestroy: function () {},
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
div {
  border: 1px solid black;
}
/* .default:focus {
  background-color: Aqua;
  border: solid 1px rgb(204, 137, 30);
} */
</style>