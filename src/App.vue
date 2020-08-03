<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <Block/>
    <All/>
    <Demo/>
    <Keyboard/>
    <Tree/>
    <Style/>
    <Tool/>
  </div>
</template>

<script>
  import Block from '@/components/Block.vue'
  import All from '@/components/All.vue'
  import Demo from '@/components/Demo.vue'
  import Keyboard from '@/components/Keyboard.vue'
  import Tree from '@/components/Tree.vue'
  import Style from '@/components/Style.vue'
  import Tool from '@/components/Tool.vue'
  export default {
  name: 'app',
  components: {
    Block,
    All,
    Demo,
    Keyboard,
    Tree,
    Style,
    Tool
  }
}
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
