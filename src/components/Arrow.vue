<template>
  <g>
    <defs>
      <marker
        id="arrow"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
      </marker>
    </defs>
    <path :d="d" stroke="#000" stroke-width="1" marker-end="url(#arrow)" />
  </g>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data: function () {
    return {
      startSection: 1,
      endSection: 3,
    };
  },
  computed: {
    d() {
      var M = `${this.data.props.points.x1},${this.data.props.points.y1}`;
      var L = `${this.data.props.points.x2},${this.data.props.points.y2}`;
      return `M${M} L${L}`;
    },
  },
};
</script>

<style scoped>
</style>