<template>
  <g>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
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
  computed: {
    d() {
      var points = this.pathCalculate(this.data.props);
      var M = `${points.x1},${points.y1}`;
      var L = `${points.x2},${points.y2}`;

      // var H;
      // var V;
      return `M${M} L${L}`;
    },
  },
  methods: {
    pathCalculate(props) {
      var points;
      if (!props.visable) {
        points = {
          x1: props.startX,
          y1:
            parseInt(props.arrowstartPreview.prop.styleObject.y) +
            parseInt(props.arrowstartPreview.prop.styleObject.height) / 2,
        };

        points.x1 =
          parseInt(props.arrowstartPreview.prop.styleObject.x) +
          parseInt(props.arrowstartPreview.prop.styleObject.width);
        points.x2 = points.x1;
        points.y2 = points.y1;
        return points;
      }
      points = {
        x1: props.startX,
        y1:
          parseInt(props.arrowstartPreview.prop.styleObject.y) +
          parseInt(props.arrowstartPreview.prop.styleObject.height) / 2,
        x2: props.offsetX,
        y2: props.offsetY,
      };
      if (
        props.offsetX > parseInt(props.arrowstartPreview.prop.styleObject.x)
      ) {
        points.x1 =
          parseInt(props.arrowstartPreview.prop.styleObject.x) +
          parseInt(props.arrowstartPreview.prop.styleObject.width);
      } else {
        points.x1 = parseInt(props.arrowstartPreview.prop.styleObject.x);
      }

      if (props.arrowendPreview) {
        points.x2 = props.arrowendPreview.prop.styleObject.x;
        points.y2 =
          parseInt(props.arrowendPreview.prop.styleObject.y) +
          parseInt(props.arrowendPreview.prop.styleObject.height) / 2;
      } else {
        points.x2 = props.offsetX;
        points.y2 = props.offsetY;
      }
      return points;
    },
  },
};
</script>

<style scoped>
</style>