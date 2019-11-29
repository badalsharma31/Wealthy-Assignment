<template>
  <div class="layout">
    <layout></layout>
  </div>
</template>

<script>
import layout from "./component/layout.vue";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    layout
  }
};
</script>

<style></style>
