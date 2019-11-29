<template>
  <el-main class="main">
    <div class="main-calender">
      <calender :search="input" />
    </div>
    <div class="main-chart">
      <right />
    </div>
  </el-main>
</template>

<script>
import calender from "../app-component/calender";
import right from "../app-component/right";
export default {
  data() {
    return {
      selectedItem: "",
      input: ""
    };
  },
  components: {
    calender,
    right
  },
  computed: {
    screenWidth() {
      return this.$store.state.app.screenWidth;
    },
    screenHeight() {
      return this.$store.state.app.screenHeight;
    }
  },
  methods: {
    selected(value) {
      this.selectedItem = value;
    },
    changeInput(value) {
      this.input = value;
    }
  }
};
</script>

<style lang="stylus" scoped>
.main {
  display: flex;
  padding : 0px;

}

.main .main-calender {
  width: 60%;
}

.main .main-chart {
  padding-left : 0px;
}
#body{
  margin : 0px;
}
</style>
