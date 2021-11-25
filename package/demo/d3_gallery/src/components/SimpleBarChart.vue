<script setup>
import * as d3 from "d3";
import * as d3Tip from 'd3-tip';
import {ref, onMounted} from "vue";

const barChart = ref(null);

const margin = {
  top: 80,
  right: 20,
  bottom: 30,
  left: 60
}

const data = [
  {letter: '一', frequency: 0.08167},
  {letter: '二', frequency: 0.13492},
  {letter: '三', frequency: 0.02782},
  {letter: '四', frequency: 0.04253},
  {letter: '五', frequency: 0.12702},
  {letter: '六', frequency: 0.02288},
  {letter: '日', frequency: 0.22288}
]

import CreateSimpleBarChart from "../utils/createSimpleBarChart";

onMounted(() => {
  const containerWidth = barChart.value.parentElement.offsetWidth;
  new CreateSimpleBarChart({
    data: data,
    elmId: '#bar-chart',
    containerWidth
  });
})
</script>

<template>
  <h2>柱状图</h2>
  <div class="bar-chart">
    <svg ref="barChart" id="bar-chart"></svg>
  </div>
</template>

<style scoped>

</style>
