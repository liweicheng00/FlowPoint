<template>
  <Block
    v-if="data.type=='block'"
    :data="data"
    :parent="parent"
    @dblclick="dblclick"
    @mousedown-right="mousedownright"
    @mouseup-right="mouseupright"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  />
  <Arrow v-else-if="data.type=='arrow'" :data="data" />
</template>

<script>
import Arrow from "@/components/Arrow.vue";
import Block from "@/components/Block.vue";

export default {
  components: {
    Arrow,
    Block,
  },
  props: {
    data: Object,
    parent: Object,
  },
  mounted: function () {},
  methods: {
    mousedownright(event, data) {
      this.$emit("mousedown-right", event, data);
    },
    mouseupright(event, data) {
      this.$emit("mouseup-right", event, data);
    },
    mouseenter(event, data) {
      console.log("mosue enter");
      this.$emit("mouseenter", event, data);
    },
    mouseleave(event, data) {
      this.$emit("mouseleave", event, data);
    },
    dblclick(event, data) {
      this.$emit("dblclick", event, data);
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
/* .default:focus {
  background-color: Aqua;
  border: solid 1px rgb(204, 137, 30);
} */
</style>