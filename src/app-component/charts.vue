<template>
  <div class="box-card">
    <apexchart
      width="150%"
      type="line"
      :options="getOptions"
      :series="getSeries"
    ></apexchart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chartOptions: {},
      series: []
    };
  },
  computed: {
    ...mapGetters({
      dateWisePrice: "getDateWisePrice"
    }),
    getOptions() {
      return {
        xaxis: {
          categories: Object.keys(this.dateWisePrice).slice(0, 15)
        }
      };
    },
    getSeries() {
      let values = Object.values(this.dateWisePrice).slice(0, 15);
      let data = [];

      for (let i in values) {
        if (values[i] !== undefined) {
          data[i] = values[i];
        } else {
          data[i] = 0;
        }
      }
      return [
        {
          name: "series-1",
          data: data
        }
      ];
    }
  }
};
</script>
<style scoped>
.stock {
  width: 70%;
  margin: 0 auto;
}
</style>
