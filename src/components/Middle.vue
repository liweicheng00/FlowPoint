<template>
  <g
    ref="g"
    :class="classList"
    @mousedown.left="mousedownleft"
    @mouseup.left="mouseupleft"
    @dblclick="dblclick"
    @mousedown.right="mousedownright"
    @mouseup.right="mouseupright"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @keyup.delete="deleteKey"
    @keyup.enter="enterKey"
    @focus="onFocus"
  >
    <Block v-if="data.type == 'block'" :data="data" :parent="parent" />
    <Arrow v-else-if="data.type == 'arrow'" :data="data" />
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
  mounted: function () {
    console.log(this.$refs);
    if (this.data.type == "block") {
      this.$refs.g.focus();
    }
  },
  created() {},
  computed: {
    classList() {
      var c = {
        Middle: true,
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
    mouseupleft(event) {
      this.$emit("mouseup-left", event, this.data);
    },
    mousedownleft(event) {
      this.$emit("mousedown-left", event, this.data);
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
    deleteKey(event) {
      console.log(event);
      console.log(this.data);
      this.$store.commit("editor/deleteMiddle", this.data);
    },
    enterKey() {
      this.$bus.$emit("Block:enter", this.data.content, this.data.id);
    },
    onFocus(event) {
      console.log(event);
      this.$store.commit("editor/changeFocusingElement", this.data.id);
      this.$bus.$emit("Block:focus", this.data.content, this.data.id);
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