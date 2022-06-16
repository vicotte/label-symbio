<template>
  <BaseTemplate>
    <div class="container" :key="key">
      <input
        type="file"
        id="files"
        style="display: none"
        accept=".csv"
        ref="window"
        v-on:change="handleFileUpload()"
      />
      <button class="v-button">Load CSV</button>
      <input type="file" ref="file" style="display: none" />
      <button @click="window.click()">open file dialog</button>
      {{ state.csvData }}
      <!-- <canvas id="mycanvas"></canvas> -->
      <div v-for="(line, index) in csvData" :key="index" class="label border">
        <div id="first-line">
          <div class="datamatrix">
            <GDatamatrix :line="line" />
          </div>
          <div id="infos" border>
            <div id="name" class="sub-info">Info : {{ line.partNumber }}</div>
            <div id="date" class="sub-info">Date : 30/01/1990</div>
            <div id="nbpart" class="sub-info">Qty : 10</div>
          </div>
        </div>
        <div id="second-line">
          <div id="remarks" class="sub-info">Remarque :</div>
        </div>
      </div>
    </div>
  </BaseTemplate>
</template>

<script lang="ts" setup>
import BaseTemplate from "../templates/BaseTemplate.vue";
import GDatamatrix from "../components/GDatamatrix.vue";
import { reactive, ref, nextTick, computed, onMounted } from "vue";
import { useCsvStore } from "../stores/csvData";

import bwipjs from "bwip-js";

//////////////////////////////////////
/// STATE ////////////////////////////
//////////////////////////////////////

const state = reactive({ file: new Blob(), csvData: [] });

async function handleFileUpload() {
  state.file = window.value.files[0];

  const reader = new FileReader();

  reader.readAsText(state.file);

  reader.onload = () => {
    const csv = reader.result;
    const lines = csv.split(/\r?\n/);
    var result = [];
    var headers = lines[0].split(";");
    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(";");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    //return result; //JavaScript object
    result = JSON.stringify(result); //JSON
    const data = JSON.parse(result);

    store.setCsv(data);
    // Object.assign(state.csvData, zog);
    // data.value = zog;
  };

  nextTick();
  forceUpdate();
}

//////////////////////////////////////
/// COMPUTED /////////////////////////
//////////////////////////////////////

const test = computed(() =>
  bwipjs.toCanvas("mycanvas", {
    bcid: "datamatrix", // Barcode type
    text: "0123456789", // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: "center", // Always good to set this
  })
);

//////////////////////////////////////
/// METHODS //////////////////////////
//////////////////////////////////////
const key = ref(0);
function forceUpdate() {
  key.value = key.value + 1;
}

// onMounted(() => {
//   const canvas = bwipjs.toCanvas("mycanvas", {
//     bcid: "code128", // Barcode type
//     text: "0123456789", // Text to encode
//     scale: 3, // 3x scaling factor
//     height: 10, // Bar height, in millimeters
//     includetext: true, // Show human-readable text
//     textxalign: "center", // Always good to set this
//   });
// });

//////////////////////////////////////
/// DOM REF //////////////////////////
//////////////////////////////////////
const window = ref(null);

//////////////////////////////////////
/// STORE ////////////////////////////
//////////////////////////////////////
const store = useCsvStore();

const csvData = computed(() => store.getSelectedData);
</script>

<style lang="scss" scoped>
$border: 1px solid black;
.container {
  width: 1;
}

#mycanvas {
  color: white;
}

.border {
  border: 1px solid black;
}

#first-line {
  display: flex;
}

#second-line {
  height: 100px;
  display: flex;
}

#infos {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sub-info {
  flex: 1;
  padding: auto;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.text {
  margin: auto;
}

.label {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 3cm 3cm 0 3cm;
}

.datamatrix {
  padding: 10px;
  border-right: $border;
  height: 200px;
  width: 200px;
}

#date {
  border-top: $border;
  border-bottom: $border;
}

#remarks {
  border-top: $border;
}
</style>
