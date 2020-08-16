<template>
  <div></div>
</template>
<script>
export default {
  name: "EventBus",
  created() {
    this.$bus.$on("alert:message", (msg) => {
      this.showAlert(msg);
    });
  },
  methods: {
    showAlert(msg) {
      alert(msg);
    },
  },
  beforeDestroy: function () {
    // 元件銷毀前要註銷監聽事件

    this.$bus.$off("alert:message");
  },
};
</script>