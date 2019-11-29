<template>
  <div class="chartContainer">
    <div class="firstPart">
      Rs {{ maxiumProfit.maxiumProfit * 10 }}
      <p>Max Profit</p>
    </div>
    <div class="secondPart">
      <charts />
    </div>
    <el-row class="thirdPart">
      <el-col :span="12">Buy Date : {{ maxiumProfit.buyDate }}</el-col>
      <el-col :span="12">Sell Date : {{ maxiumProfit.sellDate }}</el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import charts from "./charts.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      maxiumProfit: "maxiumProfit"
    })
  },
  components: {
    charts
  }
};
</script>
<style lang="stylus" scoped>
.chartContainer {
  display: flex;
  flex-direction: column;
  padding : 7vh 0vh
}

.chartContainer .firstPart {
  text-align: center;
  padding: 3.5vh;
  height: 33%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin: 10px;

}

.chartContainer .secondPart {
  height: 33%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin: 10px;

}

.chartContainer .thirdPart {
  margin: 10px;

  padding: 3.5 vh;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

  height: 33%;
}

.chartContainer .firstPart, .chartContainer .secondPart, .chartContainer .thirdPart {
  flex: 1;
}
.thirdPart .el-col{
  text-align : center;
}
</style>
