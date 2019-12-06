import Vue from "vue";
import Airtable from "airtable";
const state = {
  screenWidth: -1,
  screenHeight: -1,
  stockData: []
};

const mutations = {
  setScreenWidth(state, value) {
    state.screenWidth = value;
  },
  setScreenHeight(state, value) {
    state.screenHeight = value;
  },
  setFavourite(state, value) {
    Vue.set(state.favourite, value.ifsc, "");
  },
  setStockData(state, payload) {
    Vue.set(state, "stockData", payload);
  },
  setPrice(state, payload) {
    Vue.set(state.stockData[payload.index].fields, "Price", payload.price);
  },
  deleteRecord(state, payload) {
    Vue.delete(state.stockData, payload);
  }
};

const getters = {
  getDateWisePrice(state) {
    let priceObj = {};
    if (state.stockData) {
      for (let obj of state.stockData) {
        priceObj[obj.fields.Date] = obj.fields.Price;
      }
    }
    return priceObj;
  },
  maxiumProfit(state, getters) {
    let processedData = Object.values(getters.getDateWisePrice).slice(0, 15);
    let processDate = Object.keys(getters.getDateWisePrice).slice(0, 15);
    for (let i in processedData) {
      if (processedData[i] > 0) {
      } else {
        processedData[i] = 0;
      }
    }

    let maxDiff = processedData[1] - processedData[0];
    let buyDate = processDate[0];
    let sellDate = processDate[0];
    let minElement = processedData[0];
    let minElementIndex = 0;
    for (let i in processedData) {
      if (processedData[i] - minElement > maxDiff) {
        buyDate = processDate[minElementIndex];
        sellDate = processDate[i];
        maxDiff = processedData[i] - minElement;
      }
      if (processedData[i] < minElement) {
        minElement = processedData[i];
        minElementIndex = i;
      }
    }

    if (maxDiff < 0) {
      maxDiff = 0;
      buyDate = processDate[0];
      sellDate = processDate[0];
    }
    return {
      maxiumProfit: maxDiff,
      buyDate,
      sellDate
    };
  },
  getDateWiseId(state) {
    let idObj = {};
    if (state.stockData) {
      for (let obj of state.stockData) {
        idObj[obj.fields.Date] = obj.id;
      }
    }
    return idObj;
  },
  getIdIndex(state) {
    return function (id) {
      let index = state.stockData.findIndex(item => {
        return item.id === id;
      });
      return index;
    };
  }
};

const actions = {
  getStockData(store) {
    var base = new Airtable({ apiKey: "keytDLALxTAybZrcX" }).base(
      "appVRttziDgHS96xT"
    );

    base("StockPrice")
      .select({
        sort: [{ field: "Date", direction: "asc" }],
        fields: ["Date", "Price"]
      })
      .eachPage(
        function page(records, fetchNextPage) {
          store.commit("setStockData", records);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  },
  updateRecords(store, record) {
    let id = store.getters.getDateWiseId[record.formatDate];
    var base = new Airtable({ apiKey: "keytDLALxTAybZrcX" }).base(
      "appVRttziDgHS96xT"
    );

    base("StockPrice").update(
      [
        {
          id: id,
          fields: {
            Price: record.input
          }
        }
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        let index = store.getters.getIdIndex(records[0].id);
        store.commit("setPrice", { index, price: records[0].fields.Price });
      }
    );
  },
  addRecord(store, record) {
    var base = new Airtable({ apiKey: "keytDLALxTAybZrcX" }).base(
      "appVRttziDgHS96xT"
    );

    base("StockPrice").create(
      {
        Date: record.date,
        Price: record.price
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  },
  deleteRecords(store, record) {
    let id = store.getters.getDateWiseId[record.formatDate];
    let index = store.getters.getIdIndex(id);
    var base = new Airtable({ apiKey: "keytDLALxTAybZrcX" }).base(
      "appVRttziDgHS96xT"
    );

    base("StockPrice").destroy(id, function (err, deletedRecord) {
      if (err) {
        console.error(err);
        return;
      }
      store.commit("deleteRecord", index);
    });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
