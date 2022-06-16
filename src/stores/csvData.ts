import { defineStore } from "pinia";

interface State {
  csvData: CsvData[];
}

interface CsvData {
  filter: string;
  partNumber: string;
}

export const useCsvStore = defineStore({
  id: "csvData",
  state: (): State => ({
    csvData: [{ filter: "", partNumber: "" }],
  }),
  getters: {
    getSelectedData: (state) => state.csvData.filter((l) => l.filter === "x"),
  },
  actions: {
    setCsv(data: CsvData[]) {
      this.csvData = data;
    },
  },
});
