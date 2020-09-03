<template>
  <div class="default" @mouseenter="setshowMag" @mouseleave="setshowMag">
    <svg
      ref="all"
      id="all"
      version="1.1"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      :width="props.clientWidth"
      :height="props.clientHeight"
      @mousemove="mousemoveEvent"
    >
      <g ref="g">
        <TreeBlock
          v-for="(child, index) in alldata.childs"
          :key="index"
          :pkey="index"
          :parentCoor="[]"
          :data="child"
          :level="l"
          :startPoint="lastPoint"
        />
      </g>
    </svg>
    <Magnifier v-show="showMag" :mouse="mouse" />
  </div>
</template>

<script>
import TreeBlock from "@/components/TreeBlock.vue";
import Magnifier from "@/components/Magnifier.vue";

export default {
  components: {
    TreeBlock,
    Magnifier,
  },
  data: function () {
    return {
      l: 0,
      showMag: false,
      lastPoint: [0, 0],
      mouse: [],
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
    alldata() {
      return this.$store.state.alldata;
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted() {
    // console.log(this.$refs);
    // var node = this.$refs.all;
    // console.log(node);
    // var node1 = this.$refs.all.cloneNode(true);
    // console.log(node1);
    // this.$refs.ddd.append(node1);
    // this.mag = this.$refs.all;
  },
  beforeUpdate() {},
  updated() {
    this.$bus.$emit("all:refs", this.$refs.g.cloneNode(true));
  },
  methods: {
    windowresizeEvent() {
      this.props.clientHeight = this.$el.clientHeight;
      this.props.clientWidth = this.$el.clientWidth;
      this.props.viewBox.height = this.props.clientHeight;
      this.props.viewBox.width = this.props.clientWidth;
    },
    mousemoveEvent(event) {
      this.mouse = [event.offsetX, event.offsetY];
    },
    setshowMag() {
      this.showMag = this.showMag ? false : true;
    },
  },
};
</script>

<style scoped>
.default {
  background: rgb(255, 255, 255);
  border: solid 1px rgb(205, 202, 197);
}
</style>