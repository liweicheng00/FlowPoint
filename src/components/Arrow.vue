<template>
  <g>
    <rect height="20" :width="data.props.width" />
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        markerWidth="10"
        markerHeight="10"
        refx="10"
        refy="30"
        orient="auto"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
      </marker>
    </defs>
    <line x1="50" y1="50" x2="250" y2="50" stroke="#000" stroke-width="5" marker-end="url(#arrow)" />
    <defs>
      <marker
        id="a1"
        viewBox="0 0 77 77"
        refX="20"
        refY="39"
        markerWidth="30"
        markerHeight="30"
        orient="auto"
      >
        <path
          fill="#f00"
          d="M12.707,38.6C-8.594,27.4-1.594,0,22.406,0c30.3,0,51.7,38.5,51.7,38.5s-22.7,38.6-51.7,38.6 C-1.594,77.1-8.594,49.8,12.707,38.6z"
        ></path>
      </marker>

      <marker
        id="a2"
        viewBox="0 0 80 45"
        refX="50"
        refY="22"
        markerWidth="40"
        markerHeight="30"
        orient="auto"
      >
        <polygon
          fill="#600"
          points="65.397,0 0,0 14.173,22.417 0.001,44.833 65.398,44.833 79.569,22.417 "
        />
      </marker>
    </defs>
    <polyline
      points="50,20 150,20"
      fill="none"
      stroke="black"
      stroke-width="1"
      marker-end="url(#a1)"
      marker-start="url(#a2)"
    ></polyline>
  </g>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  created() {
    // console.log("create arrow");
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
}
</style>