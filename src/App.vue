<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Flow</router-link>|
      <router-link to="/EditStyle">Edit Module</router-link>
      <!-- <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        >Login</GoogleLogin
      >
      <div class="g-signin2" data-onsuccess="onSignIn">sdfsd</div>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :logoutButton="true"
        >Logout</GoogleLogin
      > -->
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index.js";
// import GoogleLogin from "vue-google-login";

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
    // GoogleLogin,
  },
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id:
          "422430406019-4knnkh10lgpftp3a7hhi3cd17ljdnat2.apps.googleusercontent.com",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  store,
  mounted() {},
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
  },
};
</script>
<style src="@/css/style.css"></style>
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
