<template>
  <g>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
      </marker>
    </defs>
    <!-- <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      stroke="#000"
      stroke-width="1"
      marker-end="url(#arrow)"
    />-->
    <path :d="d" stroke="#000" stroke-width="1" marker-end="url(#arrow)" />
    <text :x="x1" :y="y1">
      {{data.props.arrowendPreview?data.props.arrowendPreview.id:"null"}}
      {{data.props.arrowstartPreview?data.props.arrowstartPreview.id:"null"}}
    </text>
  </g>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    x1() {
      // todo: user this.data.props.arrowstartPreview.prop
      return this.data.props.startX;
    },
    y1() {
      // todo: user this.data.props.arrowstartPreview.prop

      return this.data.props.startY;
    },
    // todo: user this.data.props.arrowendPreview.prop
    x2() {
      return this.data.props.offsetX;
    },
    // todo: user this.data.props.arrowendPreview.prop
    y2() {
      return this.data.props.offsetY;
    },
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
      var points = {
        x1: props.startX,
        y1:
          parseInt(props.arrowstartPreview.prop.styleObject.y) +
          parseInt(props.arrowstartPreview.prop.styleObject.height) / 2,
        x2: props.offsetX,
        y2: props.offsetY,
      };
      console.log("props", props);
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
      console.log(points);
      return points;
    },
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
}
</style>