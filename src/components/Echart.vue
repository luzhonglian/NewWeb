<template>
  <div ref="EchartRef" :style="_style"></div>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
import * as echarts from "echarts";
let chartInstance;
const EchartRef = ref();
const props = defineProps({
  width: {
    type: [String, Number],
    default: "100%",
  },
  height: {
    type: [String, Number],
    default: "100%",
  },
  background: {
    type: String,
    default: "unset",
  },
});

const _style = computed(() => {
  const { width, height, background } = props;
  return {
    width: isNaN(+width) ? width : `${width}px`,
    height: isNaN(+height) ? height : `${height}px`,
    background,
  };
});
nextTick(() => {
  /// 用nextTick确保dom已经渲染完成,可确保能拿到正确的父组件宽高
  chartInstance = echarts.init(EchartRef.value, null, { locale: "ZH" });
});

//`传入的的高宽改变会resize
watch([() => props.width, () => props.height], () => {
  myChart.resize();
});

//`窗口的高宽改变会resize
useEventListener(window, "resize", resize);

function resize() {
  chartInstance.resize();
}

function clear() {
  chartInstance.clear();
}

function setOption(option) {
  chartInstance.setOption(option);
}
/**
 * @description 该监听器在需要显示markLine的情况下使用
 * @description 图例监听, 图例选中时, 动态调整y轴最大值
 * @description 使得markLine超过y轴最大值时，y轴最大值自动调整
 * @param {Object} option echart配置项
 * @param {Array} legendData 图例数组
 * eg: legendData= ['出水PH','进水PH']
 * @param {Object} markLineMap 信号markLine数据
 * eg:markLineMap = {
  PH: [
    { yAxis: 8.5, name: '上限值' },
    { yAxis: 6.5, name: '下限值' },
  ],
};
 */
function legendListener(option, legendData, markLineMap = {}) {
  chartInstance.off("legendselectchanged");
  chartInstance.on("legendselectchanged", function (params) {
    option.yAxis.max = function (value) {
      let max = 0;
      const unitKeys = Object.keys(markLineMap);
      legendData.forEach((item) => {
        if (params.selected[item]) {
          let vogueKey = unitKeys.find((key) => item.includes(key));
          let maxMarkLineUpperLimit = Math.max(
            ...(markLineMap[vogueKey] || []).map((line) => line.yAxis || 0)
          );
          if (maxMarkLineUpperLimit > max) {
            max = maxMarkLineUpperLimit;
          }
        }
      });
      return max > value.max ? max : value.max;
    };
    option.legend.selected = params.selected;
    chartInstance.setOption(option);
  });
}

defineExpose({
  setOption,
  clear,
  legendListener,
  resize,
});
</script>

<style lang="scss" scoped></style>
