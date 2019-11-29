<template>
  <div>
    <el-calendar>
      <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="customdata">
          <div style="padding: 7px">
            <span>{{ data.day.split("-")[2] }}</span>
          </div>
          <div v-if="getPrice(date)">
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="deletePrice(date)"
              circle
            ></el-button>
          </div>
        </div>
        <div class="price">
          <template v-if="getPrice(date)"
            ><span class="stockPrice">Rs {{ getPrice(date) }}</span></template
          >
          <template v-else>
            <el-button class="addBtn" type="text" @click="onAddClick(date)"
              >Add</el-button
            >
          </template>
        </div>
      </template>
    </el-calendar>
    <el-dialog
      class="myDialog"
      title="Add Stock Price"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-input-number
        v-model="input"
        :precision="2"
        :step="0.1"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      centerDialogVisible: false,
      input: 0,
      currentDate: ""
    };
  },
  computed: {
    ...mapGetters({
      dateWisePrice: "getDateWisePrice"
    })
  },
  methods: {
    onAddClick(data) {
      this.currentDate = data;
      this.centerDialogVisible = true;
    },
    async save(data) {
      let formatDate = this.formatDate(this.currentDate);
      this.centerDialogVisible = false;
      if (!this.dateWisePrice.hasOwnProperty(formatDate)) {
        await this.$store.dispatch("addRecord", {
          date: formatDate,
          price: this.input
        });
        this.$store.dispatch("getStockData");
      } else {
        await this.$store.dispatch("updateRecords", {
          formatDate,
          input: this.input
        });
      }
    },

    getPrice(date) {
      let formatDate = this.formatDate(date);
      return this.dateWisePrice[formatDate];
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    deletePrice(data) {
      let formatDate = this.formatDate(data);
      this.$store.dispatch("deleteRecords", { formatDate });
    },
    addPrice() {}
  },
  async created() {
    await this.$store.dispatch("getStockData");
  }
};
</script>
<style lang="stylus" scoped>
.customdata {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.addBtn{
  padding: 8px 10px;
}
.stockPrice{
  background-color : #00a900;
  padding : 5px;
  border-radius : 3px;
  color: white
  width: 80%;
}
.price {
  display: block;
  text-align: center;
  padding: 5px;
}
</style>
