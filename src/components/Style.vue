<template>
  <div class="default">
    <div
      v-for="(style, index) in styles"
      :key="index"
      @click="changeStyle(index)"
    >
      {{ style.name }}
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      styles: [
        {
          name: "test1",
          style: {
            padding: "20px",
            "font-size": 12,
          },
        },
        {
          name: "test2",
          style: {
            padding: "40px",
            "font-size": 24,
          },
        },
      ],
    };
  },
  methods: {
    changeStyle(index) {
      console.log(index);
      this.$bus.$emit("Style:change", this.styles[index]);
    },
  },
};
</script>

<style scoped>
.default {
  border: solid 1px rgb(205, 202, 197);
  border-radius: 3px;
}
</style>