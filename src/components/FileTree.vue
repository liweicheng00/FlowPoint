<template>
  <b-list-group>
    <b-list-group-item
      v-for="(file, index) in files"
      :key="index"
      href="#"
      @click="run(file)"
      :active="activeId == file.file_id"
      >{{ file.file_name }}</b-list-group-item
    >
  </b-list-group>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FileTree",

  created() {},
  data: function () {
    return {
      activeId: "",
    };
  },
  computed: {
    ...mapState("user", {
      files: (state) => state.userInfo.filesInfo,
    }),
  },
  methods: {
    ...mapActions("user", ["getUserFile"]),
    run(fileInfo) {
      console.log(fileInfo);
      this.activeId = fileInfo.file_id;
      this.getUserFile(fileInfo.file_id);
    },
  },
};
</script>

<style>
</style>

