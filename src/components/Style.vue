<template>
  <div class="default S">
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
            div: { padding: "20px" },
            p: { "font-size": "12px" },
          },
        },
        {
          name: "default_h_p",
          content: "<div><h4>head</h4><p>put something meaningful</p></div>",
          style: {
            div: { padding: "10px" },
            h: { "font-size": "20px" },
            p: { "font-size": "20px" },
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
  display: flex;
  flex-wrap: nowrap;
  align-content: flex-start;
}
</style>