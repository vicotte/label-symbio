<template>
  <div class="container">
    <canvas :id="props.line.partNumber"></canvas>
  </div>
</template>

<script setup>
import { defineProps, computed, reactive, onMounted, onUpdated } from "vue";
import bwipjs from "bwip-js";

const state = reactive({ test: "" });

const props = defineProps({
  line: {
    type: Object,
    requiered: true,
  },
});

onMounted(() =>
  bwipjs.toCanvas(props.line.partNumber, {
    bcid: "datamatrix", // Barcode type
    text: props.line.partNumber, // Text to encode
    scale: 3, // 3x scaling factor
    includetext: true, // Show human-readable text
    textxalign: "center", // Always good to set this
  })
);

onUpdated(() =>
  bwipjs.toCanvas(props.line.partNumber, {
    bcid: "datamatrix", // Barcode type
    text: props.line.partNumber, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: "center", // Always good to set this
  })
);
</script>
