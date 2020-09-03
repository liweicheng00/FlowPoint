<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <b-container fluid>
      <b-form-row>
        <!-- <b-col> -->
        <!-- <Tree /> -->
        <!-- </b-col> -->
        <b-col cols="8">
          <Tool />
          <Main />
        </b-col>
        <b-col>
          <All />
          <Demo />
          <Style />
          <TextEditor />
        </b-col>
      </b-form-row>
      <!-- <Keyboard /> -->
    </b-container>
  </div>
</template>

<script>
import Main from "@/components/Main.vue";
import All from "@/components/All.vue";
import Demo from "@/components/Demo.vue";
// import Keyboard from "@/components/Keyboard.vue";
// import Tree from "@/components/Tree.vue";
import Style from "@/components/Style.vue";
import Tool from "@/components/Tool.vue";
import TextEditor from "@/components/TextEditor.vue";

// import mousemove from "@/api/position.js";

import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index.js";

Vue.use(Vuex);

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

Vue.prototype.$bus = new Vue();
export default {
  name: "app",
  components: {
    Main,
    All,
    Demo,
    // Keyboard,
    // Tree,
    Style,
    Tool,
    TextEditor,
  },
  store,
  state: {},
  methods: {},

  data: () => {
    return {
      data: {},
    };
  },
  created() {
    this.data = this.$store.state.alldata;
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
