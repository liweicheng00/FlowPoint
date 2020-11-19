<template>
  <div class="default">
    <svg
      class="Svg"
      version="2"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
    >
      <g>
        <Middle v-for="(child, index) in childs" :key="index" :data="child" />
      </g>
    </svg>
  </div>
</template>

<script>
import Middle from "@/components/Middle.vue";

export default {
  components: {
    Middle,
  },
  data: function () {
    return {
      data: {},
      props: {
        clientHeight: null,
        clientWidth: null,
        viewBox: {
          "min-x": 0,
          "min-y": 0,
          width: null,
          height: null,
          startPoint: [0, 0],
        },
      },
    };
  },
  computed: {
    viewBox() {
      return `0 0 ${this.initViewbox[0]} ${this.initViewbox[1]}`;
    },
    initViewbox() {
      return this.$store.state.editor.initViewbox;
    },
    childs() {
      return this.data.childs;
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
    this.$bus.$on("TreeBlock:mouseenter", (data) => {
      this.data = data;
    });
    this.$bus.$on("TreeBlock:mouseleave", () => {
      // this.data = {};
      // console.log(this.childs);
    });
    // Listen on mouse enter event for TreeBlock.vue
  },
  mounted: function () {
    this.windowresizeEvent();
  },
  methods: {
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
      this.props.viewBox.height = this.props.clientHeight;
      this.props.viewBox.width = this.props.clientWidth;
    },
  },
};
</script>

<style scoped>
.default {
  background: transparent;
  border: solid 1px rgb(205, 202, 197);
  margin: 5px 0px;
  border-radius: 3px;
}
</style>