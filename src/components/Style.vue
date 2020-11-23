<template>
  <div class="overflow-x">
    <StyleBlock
      v-for="(style, index) in styles"
      :key="index"
      :layout_style="style"
    />
  </div>
</template>

<script>
import StyleBlock from "@/components/StyleBlock.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    StyleBlock,
  },
  created() {
    this.getBlockStyles();
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState("user", {
      styles: (state) => state.styles,
    }),
  },
  methods: {
    ...mapActions("user", ["getBlockStyles"]),
  },
};
</script>

<style scoped>
.overflow-x {
  border: solid 1px rgb(205, 202, 197);
  border-radius: 3px;
  display: flex;
  flex-wrap: nowrap;
  align-content: flex-start;
  overflow-x: scroll;
}
</style>