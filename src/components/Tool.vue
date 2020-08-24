<template>
  <div class="default">
    <b-button-group size="sm">
      <b-button @click="undoclickEvent">
        <v-icon name="chevron-left"></v-icon>
      </b-button>
      <b-button @click="saveclickEvent">
        <v-icon name="save"></v-icon>
      </b-button>
      <!-- <b-button>Button 3</b-button> -->
    </b-button-group>Tool.vue
  </div>
</template>

<script>
export default {
  methods: {
    undoclickEvent() {
      this.$bus.$emit("tool:undo");
    },
    saveclickEvent() {
      this.$bus.$emit("tool:save");
    },
  },
};
</script>

<style scoped>
.default {
  text-align: left;
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
}
</style>