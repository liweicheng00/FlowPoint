<template>
  <div class="default">
    <b-button-group size="sm">
      <b-button @click="backclickEvent">
        <v-icon name="chevron-left"></v-icon>
      </b-button>
      <b-button @click="saveclickEvent">
        <v-icon name="save"></v-icon>
      </b-button>

      <!-- <b-button @click="undoclickEvent">
        <v-icon name="undo"></v-icon>
      </b-button>
      <b-button @click="redoclickEvent">
        <v-icon name="redo"></v-icon>
      </b-button> -->
    </b-button-group>
  </div>
</template>

<script>
export default {
  methods: {
    backclickEvent() {
      this.$bus.$emit("tool:back");
    },
    saveclickEvent() {
      this.$bus.$emit("tool:save");
    },
    undoclickEvent() {
      this.$bus.$emit("tool:undo");
    },
    redoclickEvent() {
      this.$bus.$emit("tool:redo");
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