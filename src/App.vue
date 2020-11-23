<template>
  <div id="app">
    <b-navbar toggleable="sm" type="light" variant="warning">
      <b-navbar-brand href="#" tag="h1">
        <img src="./img/flowchart.png" class="icon-size" alt="FlowPoint" />
        FlowPoint
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" to="/"> Flow </b-nav-item>
          <b-nav-item href="#" to="EditStyle">Edit Module </b-nav-item>
          <b-nav-item href="#" to="EditStyle">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button v-if="!signed" size="sm" v-b-modal="'login'">
              Login
            </b-button>
            <div v-else>Wellcome {{ basicProfile.Ad }}!</div>
          </b-nav-item>
          <b-nav-item>
            <b-button v-if="signed" size="sm" @click="signOut">LogOut</b-button>
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
          :onCurrentUser="onCurrentUser"
          >Login</GoogleLogin
        >
      </div>
    </b-modal>

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
import store from "@/store/index.js";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

const CLIENT_ID =
  "422430406019-4knnkh10lgpftp3a7hhi3cd17ljdnat2.apps.googleusercontent.com";
import { GoogleLogin, LoaderPlugin } from "vue-google-login";
// import { LoaderPlugin } from "vue-google-login";
Vue.use(LoaderPlugin, {
  client_id: CLIENT_ID,
});
// Vue.GoogleAuth.then((auth2) => {
//   console.log(auth2.isSignedIn.get());
//   console.log(auth2.currentUser.get());
// });

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

Vue.prototype.$bus = new Vue();
import { mapActions } from "vuex";

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
        // client_id:
        //   "422430406019-4knnkh10lgpftp3a7hhi3cd17ljdnat2.apps.googleusercontent.com",
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
  created() {},
  mounted() {},
  methods: {
    ...mapActions("user", ["userLogin"]),
    onSuccess(googleUser) {
      console.log(googleUser);
      var id_token = googleUser.getAuthResponse().id_token;
      this.$refs["login"].hide();
      // This only gets the user information: id, name, imageUrl and email
      this.basicProfile = googleUser.getBasicProfile();

      this.signed = googleUser.isSignedIn();

      this.userLogin({
        login_type: "google",
        userInfo: this.basicProfile,
        id_token,
      });
    },
    signOut() {
      // todo: alert to save
      Vue.GoogleAuth.then((auth2) => {
        auth2.signOut().then(() => {
          this.signed = auth2.isSignedIn.get();
        });
      });
    },
    onCurrentUser(googleUser) {
      this.basicProfile = googleUser.getBasicProfile();
      this.signed = googleUser.isSignedIn();
      this.$refs["login"].hide();

      var id_token = googleUser.getAuthResponse().id_token;

      this.userLogin({
        login_type: "google",
        userInfo: this.basicProfile,
        id_token,
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
</style>
