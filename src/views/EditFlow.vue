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
        </b-col>
        <b-col>
          <All />
          <Preview />
          <Style />
          <TextEditor />
        </b-col>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import Main from "@/components/Main.vue";
import All from "@/components/All.vue";
import Preview from "@/components/Preview.vue";
// import Keyboard from "@/components/Keyboard.vue";
// import Tree from "@/components/Tree.vue";
import Style from "@/components/Style.vue";
import Tool from "@/components/Tool.vue";
import TextEditor from "@/components/TextEditor.vue";
import FileTree from "@/components/FileTree.vue";

export default {
  name: "EditFlow",
  components: {
    Main,
    All,
    Preview,
    // Keyboard,
    // Tree,
    Style,
    Tool,
    TextEditor,
    FileTree,
  },

  created() {
    this.data = this.$store.state.editor.alldata;
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
</style>

