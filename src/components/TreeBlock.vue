<template>
  <g v-if="visible">
    <path :d="d" v-bind="pathDefault" />
    <rect v-bind="styleObject" @click="rectClick" />
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

  props: ["data", "level", "startPoint", "pkey", "parentCoor"],
  created() {
    this.$store.commit("addChildNum", {
      l: this.l,
      pkey: this.pkey,
      parentCoor: this.parentCoor,
    });

    this.index = this.$store.state.NumOfChilds[this.l];
  },
  data: function () {
    return {
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
    visible() {
      if (this.data.type == "arrow") {
        return false;
      } else {
        return true;
      }
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
    d() {
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
    alldata() {
      return this.$store.state.alldata;
    },
  },
  methods: {
    rectClick() {
      console.log("send changeSelf");
      this.$bus.$emit("changeSelf");
      this.$store.commit("changeSelf", this.data);
    },
  },
  destroyed() {
    this.$store.commit("reduceChildNum", this.l);
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
}
</style>