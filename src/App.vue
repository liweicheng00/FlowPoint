<template>
  <div id="app">
    <b-navbar toggleable="sm" type="light" variant="warning">
      <b-navbar-brand href="#" tag="h1">
        <img src="./img/flowchart.png" class="icon-size" alt="FlowPoint" />
        FlowPoint

        <!-- <b-nav-text tag="h1">FlowPoint</b-nav-text> -->
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" to="/"> Flow </b-nav-item>
          <b-nav-item href="#" to="EditStyle">Edit Module </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button v-if="!signed" size="sm" v-b-modal="'login'">
              Login
            </b-button>
            <div v-else>Wellcome {{ basicProfile.tV }}!</div>
          </b-nav-item>
          <b-nav-item>
            <b-button size="sm" @click="signOut">LogOut</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- The modal -->
    <b-modal ref="login" id="login" title="Login" hide-footer>
      <div class="login-content">
        <GoogleLogin
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          >Login</GoogleLogin
        >
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      </div>
    </b-modal>
    <!-- <div class="g-signin2" data-onsuccess="onSignIn">sdfsd</div>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :logoutButton="true"
        >Logout</GoogleLogin
      > -->
    <div class="view">
      <router-view></router-view>
    </div>
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index.js";

const CLIENT_ID =
  "422430406019-4knnkh10lgpftp3a7hhi3cd17ljdnat2.apps.googleusercontent.com";
import GoogleLogin from "vue-google-login";
import { LoaderPlugin } from "vue-google-login";
Vue.use(LoaderPlugin, {
  client_id: CLIENT_ID,
});

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
    GoogleLogin,
  },
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      signed: false,
      basicProfile: null,
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
      // console.log(googleUser);
      this.$refs["login"].hide();
      // This only gets the user information: id, name, imageUrl and email
      this.basicProfile = googleUser.getBasicProfile();
      Vue.GoogleAuth.then((auth2) => {
        this.signed = auth2.isSignedIn.get();
      });
    },
    signOut() {
      Vue.GoogleAuth.then((auth2) => {
        auth2.signOut();
        this.signed = auth2.isSignedIn.get();
      });
    },
    isSigned() {
      Vue.GoogleAuth.then((auth2) => {
        this.signed = auth2.isSignedIn.get();
      });
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
.icon-size {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.view {
  padding: 10pt;
}
.login-content {
  display: flex;
  justify-content: center;
}
/* 
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
