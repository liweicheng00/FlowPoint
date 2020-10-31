<template>
  <div
    class="default"
    @mouseenter="toggleMagnifierShow"
    @mouseleave="toggleMagnifierShow"
  >
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
          :isBegin="true"
          :pkey="0"
          :parentCoor="[]"
          :data="alldata"
          :level="l"
        />
      </g>
    </svg>
    <Magnifier v-show="isMagnifierShow" :mouse="mouse" />
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
      isMagnifierShow: false,
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
  watch: {},
  computed: {
    filtChilds() {
      return this.alldata.childs.filter((child) => {
        return child.type == "block";
      });
    },
    alldata() {
      return this.$store.state.alldata;
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
  },
  mounted() {},
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
    toggleMagnifierShow() {
      this.isMagnifierShow = this.isMagnifierShow ? false : true;
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