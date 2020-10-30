<template>
  <div class="default">
    <svg
      class="Svg"
      version="2"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="[0 0 300 300]"
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
      childs: [],
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
    viewBox: {
      get() {
        if (this.props.clientHeight) {
          return `${this.props.viewBox["min-x"]} ${this.props.viewBox["min-y"]} ${this.props.viewBox.width} ${this.props.viewBox.height}`;
        } else {
          console.warn("Waring: No viewBox");
          return "0 0 0 0";
        }
      },
      set(newValue) {
        this.props.viewBox["min-x"] = newValue[0];
        this.props.viewBox["min-y"] = newValue[1];
      },
    },
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowresizeEvent();
    });
    this.$bus.$on("TreeBlock:mouseenter", (data) => {
      console.log(data);

      this.childs = data;
      console.log(this.childs);
    });
    this.$bus.$on("TreeBlock:mouseleave", () => {
      // this.childs = [];
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