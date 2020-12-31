<template>
  <div>
    <b-container fluid>
      <b-form-row>
        <b-col cols="1">
          <FileTree />
        </b-col>
        <b-col cols="8">
          <Tool />
          <Main />
          <p>Save time:{{ saveTime }}</p>
        </b-col>
        <b-col>
          <All />
          <!-- <Preview /> -->
          <Style />
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import Main from "@/components/Main.vue";
import All from "@/components/All.vue";
// import Preview from "@/components/Preview.vue";
// import Keyboard from "@/components/Keyboard.vue";
// import Tree from "@/components/Tree.vue";
import Style from "@/components/Style.vue";
import Tool from "@/components/Tool.vue";
import FileTree from "@/components/FileTree.vue";
import { mapState } from "vuex";

export default {
  name: "EditFlow",
  components: {
    Main,
    All,
    // Preview,
    // Keyboard,
    // Tree,
    Style,
    Tool,
    FileTree,
  },

  created() {
    this.data = this.$store.state.editor.alldata;
  },
  computed: {
    ...mapState("editor", {
      saveTime: (state) => state.saveTime,
    }),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
p {
  text-align: left;
  font-size: 0.2rem;
  color: grey;
}
</style>

