<template>
  <div class="magnifier" :style="positionObject">
    <svg
      version="1.1"
      ref="svg"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.clientWidth"
      :height="props.clientHeight"
      :viewBox="viewBox"
    >
      <g />
    </svg>
    <v-icon name="mouse-pointer" class="mouse-icon"></v-icon>
  </div>
</template>

<script>
export default {
  props: ["mouse"],
  data: function () {
    return {
      props: {
        clientHeight: null,
        clientWidth: null,
      },
    };
  },
  watch: {},
  computed: {
    viewBox() {
      if (!this.mouse.length) {
        return "0 0 10 10";
      }
      return `${this.mouse[0] - 10} ${this.mouse[1] - 10} 20 20`;
    },
    positionObject() {
      return {
        height: "80px",
        width: "80px",
        left: `${this.mouse[0] + 50}px`,
        top: `${this.mouse[1] + 10}px`,
      };
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted() {
    this.mag = this.$refs.mag;
    this.$bus.$on("all:refs", (mag) => {
      var g = this.$refs.svg.getElementsByTagName("g")[0];
      g.replaceWith(mag);
    });
  },
  methods: {
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
    },
  },
  beforeDestroy: function () {
    this.$bus.$off("all:refs");
  },
};
</script>

<style scoped>
.default {
  background: rgb(255, 255, 255);
  border: solid 1px rgb(205, 202, 197);
}
.magnifier {
  background: honeydew;
  border: gray 1px solid;
  z-index: 1000;
  position: absolute;
  /* width: 50px;
  height: 50px;
  top: 30px;
  left: 20px; */
}
.mouse-icon {
  position: absolute;
  top: 40px;
  left: 40px;
}
</style>