<template>
  <div id="app" @click="getPosition">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <b-container fluid>
      <b-form-row>
        <b-col>
          <Tree />
        </b-col>
        <b-col cols="8">
          <Tool />
          <Block :data="data" />
        </b-col>
        <b-col>
          <All />
          <Demo />
          <Style />
        </b-col>
      </b-form-row>
      <Keyboard />
    </b-container>
  </div>
</template>

<script>
import Block from "@/components/Block.vue";
import All from "@/components/All.vue";
import Demo from "@/components/Demo.vue";
import Keyboard from "@/components/Keyboard.vue";
import Tree from "@/components/Tree.vue";
import Style from "@/components/Style.vue";
import Tool from "@/components/Tool.vue";
import mousemove from "@/api/position.js";

import Vue from "vue";
import Vuex from "vuex";

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
    Block,
    All,
    Demo,
    Keyboard,
    Tree,
    Style,
    Tool,
  },
  state: {},
  methods: {
    getPosition() {
      console.log(
        `position: ${mousemove.event.pageX}, ${mousemove.event.pageY}`
      );
    },
  },
  data: () => {
    return {
      data: {
        id: "1",
        type: "preview",
        position: { mouseclickposition: [120, 20] },
        props: {},
        childs: [
          {
            id: "a-1-1",
            type: "arrow",
            position: { mouseclickposition: [120, 20] },
            props: { width: 10 },
            childs: [],
            parent: null,
          },
          {
            id: "1-1",
            type: "preview",
            position: { mouseclickposition: [120, 20] },
            props: {},
            childs: [
              {
                id: "1-1-1",
                type: "preview",
                position: { mouseclickposition: [30, 20] },
                props: {},
                childs: [],
                parent: null,
              },
            ],
            parent: null,
          },
          {
            id: "1-2",
            type: "preview",
            position: { mouseclickposition: [230, 20] },
            props: {},
            childs: [
              {
                id: "1-2-1",
                type: "preview",
                position: { mouseclickposition: [20, 20] },
                props: {},
                childs: [],
                parent: null,
              },
              {
                id: "1-2-2",
                type: "preview",
                position: { mouseclickposition: [130, 20] },
                props: {},
                childs: [
                  {
                    id: "1-2-2-1",
                    type: "preview",

                    position: { mouseclickposition: [20, 20] },
                    props: {},
                    childs: [],
                    parent: null,
                  },
                ],
                parent: null,
              },
            ],
            parent: null,
          },
          {
            id: "1-3",
            type: "preview",
            position: { mouseclickposition: [340, 20] },
            props: {},
            childs: [],
            parent: null,
          },
        ],
        parent: null,
      },
    };
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
