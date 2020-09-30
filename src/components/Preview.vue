<template>
  <g
    :class="classList"
    @dblclick="dblclick"
    @mousedown.right="mousedownright"
    @mouseup.right="mouseupright"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <Block v-if="data.type=='block'" :data="data" :parent="parent" />
    <Arrow v-else-if="data.type=='arrow'" :data="data" />
  </g>
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
  computed: {
    classList() {
      var c = {
        Preview: true,
      };
      c[this.data.type] = true;
      return c;
    },
  },
  methods: {
    mousedownright(event) {
      this.$emit("mousedown-right", event, this.data);
    },
    mouseupright(event) {
      this.$emit("mouseup-right", event, this.data);
    },
    mouseenter(event) {
      this.$emit("mouseenter", event, this.data);
    },
    mouseleave(event) {
      this.$emit("mouseleave", event, this.data);
    },
    dblclick(event) {
      this.$emit("dblclick", event, this.data);
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