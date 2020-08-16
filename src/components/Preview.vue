<template>
  <g v-if="data.type=='preview'" @mouseenter.self="$emit('mouseenter', data)">
    <rect class="Preview" @dblclick.self="$emit('dblclick', data)" v-bind="styleObject" />
    <text v-bind="textObject">{{data.id}}</text>
  </g>
  <Arrow v-else-if="data.type=='arrow'" :data="data" />
</template>

<script>
import Arrow from "@/components/Arrow.vue";

export default {
  components: {
    Arrow,
  },
  props: {
    data: Object,
    parent: Object,
  },
  data: function () {
    return {
      styleDefault: {
        width: "100px",
        height: "30px",
        stroke: "black",
        fill: "transparent",
        "stroke-width": "1",
      },
      textDefault: {
        fill: "black",
        "text-anchor": "middle",
      },
    };
  },
  created: function () {},
  computed: {
    styleObject: function () {
      if (this.data.position.mouseclickposition) {
        return Object.assign(this.styleDefault, {
          color: "red",
          x: `${
            this.data.position.mouseclickposition[0] -
            parseInt(this.styleDefault.width) / 2
          }px`,
          y: `${
            this.data.position.mouseclickposition[1] -
            parseInt(this.styleDefault.height) / 2
          }px`,
        });
      } else {
        return this.styleDefault;
      }
    },
    textObject: function () {
      return Object.assign(this.textDefault, {
        x: `${this.data.position.mouseclickposition[0]}px`,
        y: `${this.data.position.mouseclickposition[1]}px`,
      });
    },
  },
  mounted: function () {},
  methods: {},
  beforeDestroy: function () {},
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
  padding: 2px;
  position: absolute;
}
/* .default:focus {
  background-color: Aqua;
  border: solid 1px rgb(204, 137, 30);
} */
</style>