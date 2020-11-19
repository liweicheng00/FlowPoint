<template>
  <g>
    <path v-if="!isBegin" :d="arrowPath" v-bind="pathDefault" />
    <rect
      v-bind="styleObject"
      @click="rectClick"
      @mouseenter.self="rectMouseenter"
      @mouseleave.self="rectMouseleave"
    />
    <!-- <text v-bind="textObject">{{data.id}}</text> -->
    <TreeBlock
      v-for="(child, index) in filtChilds"
      :key="index"
      :pkey="index"
      :parentCoor="coor"
      :data="child"
      :level="l"
      :startPoint="lastPoint"
    />
  </g>
</template>

<script>
export default {
  name: "TreeBlock",

  props: {
    data: Object,
    level: Number,
    startPoint: {
      type: Array,
      default: () => {
        return [0, 0];
      },
    },
    pkey: Number,
    parentCoor: Array,
    isBegin: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.commit("editor/addChildNum", {
      l: this.l,
      pkey: this.pkey,
      parentCoor: this.parentCoor,
    });

    this.index = this.$store.state.editor.NumOfChilds[this.l];
  },
  data: function () {
    return {
      beginBlock: false,
      defaultSpace: 10,
      index: null,
      ifFocus: false,
      content: "",
      styleDefault: {
        width: "20",
        height: "6",
        stroke: "black",
        fill: "transparent",
        "stroke-width": "1",
      },
      pathDefault: {
        stroke: "#000",
        "stroke-width": "1",
      },
      textDefault: {
        fill: "black",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      },
    };
  },
  computed: {
    coor() {
      var coor = Array.from(this.parentCoor);
      coor.push(this.pkey);
      return coor;
    },
    l: function () {
      return this.level + 1;
    },
    filtChilds() {
      return this.data.childs.filter((child) => {
        return child.type == "block";
      });
    },

    connectPoint() {
      return [
        this.startPoint[0] + this.defaultSpace,
        this.index * this.defaultSpace,
      ];
    },
    lastPoint() {
      var x = this.connectPoint[0] + parseInt(this.styleDefault.width);
      var y = this.connectPoint[1] + parseFloat(this.styleDefault.height) / 2;
      return [x, y];
    },
    styleObject: function () {
      return Object.assign(this.styleDefault, {
        fill: this.data.mainPage ? "green" : "transparent",
        x: `${this.connectPoint[0]}`,
        y: `${this.connectPoint[1]}`,
      });
    },
    arrowPath() {
      if (this.startPoint != "0,0") {
        var start = `${this.startPoint[0]},${this.startPoint[1]}`;
        var end = `${this.connectPoint[0]},${
          this.connectPoint[1] + parseFloat(this.styleDefault.height) / 2
        }`;
        return `M${start} L${end}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    rectClick() {
      console.log("send changeSelf");
      this.$bus.$emit("changeSelf");
      this.$store.commit("editor/changeSelf", this.data);
    },
    rectMouseenter() {
      this.$bus.$emit("TreeBlock:mouseenter", this.data);
    },
    rectMouseleave() {
      this.$bus.$emit("TreeBlock:mouseleave");
    },
  },
  destroyed() {
    this.$store.commit("editor/reduceChildNum", this.l);
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
}
</style>