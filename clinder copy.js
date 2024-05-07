<template>
  <el-tooltip :content="tooltipContent" placement="top">
    <el-input
      v-model="formattedValue"
      placeholder="请输入数字"
      @blur="handleBlur"
      @focus="handleFocus"
    ></el-input>
  </el-tooltip>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const rawValue = ref('');
const inputFocused = ref(false);

const formattedValue = computed({
  get() {
    if (inputFocused.value) {
      return rawValue.value;
    }
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 20
    }).format(Number(rawValue.value.replace(/,/g, '')));
  },
  set(value) {
    const numericValue = value.replace(/[^\d.-]/g, '');
    rawValue.value = numericValue;
  }
});

const tooltipContent = computed(() => {
  const num = parseFloat(rawValue.value.replace(/,/g, ''));
  if (!isNaN(num)) {
    if (num >= 100000000) {
      return `${(num / 100000000).toFixed(2)} 亿`;
    } else if (num >= 10000) {
      return `${(num / 10000).toFixed(2)} 万`;
    } else {
      return `${num} 元`;
    }
  }
  return '';
});

function handleBlur() {
  inputFocused.value = false;
}

function handleFocus() {
  inputFocused.value = true;
}

watch(rawValue, (newVal) => {
  if (!inputFocused.value) {
    formattedValue.value = newVal;
  }
});
</script>

<style scoped>
/* 可以在这里添加一些样式 */
</style>












<template>
  <el-popover
    placement="top"
    trigger="manual"
    :visible="shouldShowTooltip"
    :content="tooltipContent"
  >
    <template #reference>
      <el-input
        v-model="formattedValue"
        placeholder="请输入数字"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      ></el-input>
    </template>
  </el-popover>
</template>

<script setup>
import { ref, computed } from 'vue';

const rawValue = ref('');
const inputFocused = ref(false);
const shouldShowTooltip = ref(false);

const formattedValue = computed({
  get() {
    if (inputFocused.value) {
      return rawValue.value;
    }
    // 当失去焦点且非空时,格式化显示
    return rawValue.value ? new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 20
    }).format(Number(rawValue.value.replace(/,/g, ''))) : '';
  },
  set(value) {
    // 只允许数字、小数点和减号
    const numericValue = value.replace(/[^\d.-]/g, '');
    rawValue.value = numericValue;
  }
});

const tooltipContent = ref('');

function handleBlur() {
  inputFocused.value = false;
  shouldShowTooltip.value = false;
}

function handleFocus() {
  inputFocused.value = true;
}

function handleInput() {
  const num = parseFloat(rawValue.value.replace(/,/g, ''));
  if (!isNaN(num) && num >= 10000) {
    if (num >= 100000000) {
      tooltipContent.value = `${(num / 100000000).toFixed(2)} 亿`;
    } else if (num >= 1000000) {
      tooltipContent.value = `${(num / 1000000).toFixed(2)} 百万`;
    } else if (num >= 100000) {
      tooltipContent.value = `${(num / 100000).toFixed(2)} 十万`;
    } else {
      tooltipContent.value = `${(num / 10000).toFixed(2)} 万`;
    }
    shouldShowTooltip.value = true;
  } else {
    tooltipContent.value = '';
    shouldShowTooltip.value = false;
  }
}
</script>

<style scoped>
::v-deep(.el-popover) {
  background-color: white !important;
  color: black;
}
</style>
