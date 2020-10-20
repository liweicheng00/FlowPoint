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
    startPoint() {
      console.log("startPoint");
      if (!this.data.props.visable) {
        return [0, 0];
      } else {
        if (this.data.props.arrowstartMiddle) {
          var x1;
          var y1 =
            parseInt(this.data.props.arrowstartMiddle.props.styleObject.y) +
            parseInt(
              this.data.props.arrowstartMiddle.props.styleObject.height
            ) /
              2;
          if (
            this.data.props.offsetX >
            parseInt(this.data.props.arrowstartMiddle.props.styleObject.x)
          ) {
            x1 =
              parseInt(this.data.props.arrowstartMiddle.props.styleObject.x) +
              parseInt(
                this.data.props.arrowstartMiddle.props.styleObject.width
              );
          } else {
            x1 = parseInt(this.data.props.arrowstartMiddle.props.styleObject.x);
          }
          return [x1, y1];
        } else {
          console.warn("something wrong!");
          return [0, 0];
        }
      }
    },
    endPoint() {
      console.log("endPoint");

      if (!this.data.props.visable) {
        return [0, 0];
      } else {
        var x2, y2;
        if (!this.data.props.arrowendMiddle) {
          x2 = this.data.props.offsetX;
          y2 = this.data.props.offsetY;
          return [x2, y2];
        } else {
          x2 = this.data.props.arrowendMiddle.props.styleObject.x;
          y2 =
            parseInt(this.data.props.arrowendMiddle.props.styleObject.y) +
            parseInt(this.data.props.arrowendMiddle.props.styleObject.height) /
              2;
          return [x2, y2];
        }
      }
    },
    d() {
      var points = this.pathCalculate(this.data.props);
      var M = `${points.x1},${points.y1}`;
      var L = `${points.x2},${points.y2}`;

      // var M = `${this.startPoint[0]},${this.startPoint[1]}`;
      // var L = `${this.endPoint[0]},${this.endPoint[1]}`;
      // var H;
      // var V;
      return `M${M} L${L}`;
    },
  },
  methods: {
    setNodePosition(mouse, node, section) {
      switch (section) {
        case 1:
          if (mouse[0] - node[0] < 0) {
            if (mouse[1] - node[1] >= 0) {
              return 4;
            } else {
              return 2;
            }
          } else {
            return 1;
          }
        case 2:
          if (mouse[1] - node[1] >= 0) {
            if (mouse[0] - node[0] >= 0) {
              return 1;
            } else {
              return 3;
            }
          } else {
            return 2;
          }
        case 3:
          if (mouse[0] - node[0] >= 0) {
            if (mouse[1] - node[1] >= 0) {
              return 4;
            } else {
              return 2;
            }
          } else {
            return 3;
          }
        case 4:
          if (mouse[1] - node[1] < 0) {
            if (mouse[0] - node[0] >= 0) {
              return 1;
            } else {
              return 3;
            }
          } else {
            return 4;
          }
      }
    },
    pathCalculate(props) {
      var points;
      if (!props.visable) {
        return {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
        };
      }
      // var start = new Date().getTime();
      points = {
        x1:
          parseInt(props.arrowstartMiddle.props.styleObject.x) +
          parseInt(props.arrowstartMiddle.props.styleObject.width),
        y1:
          parseInt(props.arrowstartMiddle.props.styleObject.y) +
          parseInt(props.arrowstartMiddle.props.styleObject.height) / 2,
        x2: props.offsetX,
        y2: props.offsetY,
      };

      // var end = new Date().getTime();
      // console.log(end - start);
      // if (
      //   props.offsetX > parseInt(props.arrowstartMiddle.props.styleObject.x)
      // ) {
      //   points.x1 =
      //     parseInt(props.arrowstartMiddle.props.styleObject.x) +
      //     parseInt(props.arrowstartMiddle.props.styleObject.width);
      // } else {
      //   points.x1 = parseInt(props.arrowstartMiddle.props.styleObject.x);
      // }

      if (props.arrowendMiddle) {
        points.x2 = props.arrowendMiddle.props.styleObject.x;
        points.y2 = props.arrowendMiddle.props.styleObject.y;
        this.endSection = this.setNodePosition(
          [points.x1, points.y1],
          [points.x2, points.y2],
          this.endSection
        );
        switch (this.endSection) {
          case 1:
            points.x2 =
              parseInt(props.arrowendMiddle.props.styleObject.x) +
              parseInt(props.arrowendMiddle.props.styleObject.width);
            points.y2 =
              parseInt(props.arrowendMiddle.props.styleObject.y) +
              parseInt(props.arrowendMiddle.props.styleObject.height) / 2;
            break;
          case 2:
            points.x2 =
              parseInt(props.arrowendMiddle.props.styleObject.x) +
              parseInt(props.arrowendMiddle.props.styleObject.width) / 2;
            points.y2 = props.arrowendMiddle.props.styleObject.y;
            break;
          case 3:
            points.x2 = props.arrowendMiddle.props.styleObject.x;
            points.y2 =
              parseInt(props.arrowendMiddle.props.styleObject.y) +
              parseInt(props.arrowendMiddle.props.styleObject.height) / 2;
            break;
          case 4:
            points.x2 =
              parseInt(props.arrowendMiddle.props.styleObject.x) +
              parseInt(props.arrowendMiddle.props.styleObject.width) / 2;
            points.y2 =
              parseInt(props.arrowendMiddle.props.styleObject.y) +
              parseInt(props.arrowendMiddle.props.styleObject.height);
            break;
        }
      }
      this.startSection = this.setNodePosition(
        [points.x2, points.y2],
        [points.x1, points.y1],
        this.startSection
      );

      switch (this.startSection) {
        case 1:
          points.x1 =
            parseInt(props.arrowstartMiddle.props.styleObject.x) +
            parseInt(props.arrowstartMiddle.props.styleObject.width);
          points.y1 =
            parseInt(props.arrowstartMiddle.props.styleObject.y) +
            parseInt(props.arrowstartMiddle.props.styleObject.height) / 2;
          break;
        case 2:
          points.x1 =
            parseInt(props.arrowstartMiddle.props.styleObject.x) +
            parseInt(props.arrowstartMiddle.props.styleObject.width) / 2;
          points.y1 = parseInt(props.arrowstartMiddle.props.styleObject.y);
          break;
        case 3:
          points.x1 = parseInt(props.arrowstartMiddle.props.styleObject.x);
          points.y1 =
            parseInt(props.arrowstartMiddle.props.styleObject.y) +
            parseInt(props.arrowstartMiddle.props.styleObject.height) / 2;
          break;
        case 4:
          points.x1 =
            parseInt(props.arrowstartMiddle.props.styleObject.x) +
            parseInt(props.arrowstartMiddle.props.styleObject.width) / 2;
          points.y1 =
            parseInt(props.arrowstartMiddle.props.styleObject.y) +
            parseInt(props.arrowstartMiddle.props.styleObject.height);
          break;
      }

      return points;
    },
  },
};
</script>

<style scoped>
</style>