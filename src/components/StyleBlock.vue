<template>
  <div
    class="default"
    @click="changeStyle"
    :class="[layout_style.name]"
    v-html="layout_style.content"
  ></div>
</template>

<script>
export default {
  props: ["layout_style"],
  data: function () {
    return {};
  },
  created() {
    var css = this.layout_style.style;
    var head = document.head || document.getElementsByTagName("head")[0];
    var styleElement = document.createElement("style");
    head.appendChild(styleElement);

    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
      // This is required for IE8 and below.
      styleElement.styleSheet.cssText = css;
    } else {
      styleElement.appendChild(document.createTextNode(css));
    }
  },
  computed: {},
  methods: {
    changeStyle() {
      console.log();
      this.$bus.$emit("Style:change", this.layout_style);
    },
  },
};
</script>

<style scoped>
.default {
  margin: 5px;
  padding: 2px;
  border: solid 1px black;
  border-radius: 3px;
  width: 100px;
  height: 100px;
  font-size: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: flex-start;
}
.default:hover {
  border: solid 1px orange;
}
</style>