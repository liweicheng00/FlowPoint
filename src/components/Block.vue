<template>
  <g>
    <!-- <rect class="block" v-bind="data.props.styleObject" /> -->
    <foreignObject ref="ob" v-bind="data.props.styleObject">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <div
          tabindex="-1"
          ref="content"
          class="fo"
          :class="[fo_content]"
          :contenteditable="data.contenteditable"
          v-html="html_test"
          @input="onInput"
        ></div>
      </body>
    </foreignObject>
  </g>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    data: Object,
  },
  data: function () {
    return {
      ifFocus: false,
      fo_content: "",
      html_test: "<li><strong>sd</string></li><li></li>",
    };
  },
  created: function () {
    this.$bus.$on("Style:change", (style) => {
      if (this.ifFocus) {
        this.fo_content = style.name;
      }
    });
  },
  computed: {
    ...mapState("editor", {
      isSelected: (state) => {
        console.log("slelected change");

        return state.selectedMiddle[0];
      },
    }),
  },
  methods: {
    ...mapMutations("editor", ["resizeBlock"]),
    onInput(event) {
      // For changing rect and foriegnObject dimensions
      this.resizeBlock({ data: this.data, ref: event.target });
    },
  },
};
</script>

<style scoped>
.default {
  background: rgb(233, 226, 226);
  border: solid 1px rgb(205, 202, 197);
  padding: 2px;
  position: absolute;
}

body {
  background: transparent;
  height: 100%;
  width: 100%;
}
</style>
