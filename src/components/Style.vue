<template>
  <div class="default">
    <StyleBlock
      v-for="(style, index) in styles"
      :key="index"
      :layout_style="style"
    />
  </div>
</template>

<script>
import StyleBlock from "@/components/StyleBlock.vue";

export default {
  components: {
    StyleBlock,
  },
  data: function () {
    return {
      styles: [
        {
          name: "default_p",
          content: "<div><p>put something graceful</p></div>",
          style: {
            div: { padding: "5%", "justify-content": "flex-start" },
            p: { "font-size": "1.6em", "text-align": "left" },
          },
        },
        {
          name: "default_h_p",
          content: "<div><h2>head</h2><p>put something meaningful</p></div>",
          style: {
            div: { padding: "5%", "justify-content": "flex-start" },
            h2: { "font-size": "2em", "text-align": "left" },
            p: { "font-size": "1em", "text-align": "left" },
          },
        },
        {
          name: "default_h_p",
          content: "<div><h2>head</h2><p>put something meaningful</p></div>",
          style: {
            div: { padding: "5%", "justify-content": "flex-start" },
            h2: { "font-size": "2em", "text-align": "left" },
            p: { "font-size": "1em", "text-align": "left" },
          },
        },
        {
          name: "default_h_p",
          content: "<div><h2>head</h2><p>put something meaningful</p></div>",
          style: {
            div: { padding: "5%", "justify-content": "flex-start" },
            h2: { "font-size": "2em", "text-align": "left" },
            p: { "font-size": "1em", "text-align": "left" },
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.default {
  border: solid 1px rgb(205, 202, 197);
  border-radius: 3px;
  font-size: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: flex-start;
  overflow-x: scroll;
}
</style>