<template>
  <div></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FileTree",

  created() {},
  computed: {
    ...mapState("user", {
      files: (state) => state.userInfo.filesName,
    }),
  },
  methods: {
    ...mapActions("user", ["getUserFile"]),
  },
};
</script>

<style>
</style>

