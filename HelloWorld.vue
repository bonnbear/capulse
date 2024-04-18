// 监听 'message' 事件
window.addEventListener('message', function(event) {
  // 检查消息的来源是否为当前窗口
  if (event.source === window) {
    console.log('收到消息:', event.data);
  }
});

// 发送消息给自己
window.postMessage('Hello, myself!', '*');



<template>
  <div class="container">
    <!-- 遍历可见键值对，显示值 -->
    <span v-for="(value, key, index) in visibleEntries" :key="key" class="text-item">{{ value }}</span>
    <!-- 如果键的数量超过最大可见数，显示图标和悬浮提示框 -->
    <div v-if="Object.keys(data).length > maxVisible" class="icon" @mouseenter="showAllTexts" @mouseleave="hideAllTexts">
      <i class="fas fa-ellipsis-h"></i>
      <div v-if="isHovered" class="tooltip">
        <!-- 遍历所有键值对，并使值可显示 -->
        <span v-for="(value, key) in data" :key="key" class="clickable-text">{{ key }}: {{ value }}</span>
        <div class="arrow-up"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true, // 对象数据，必须项
  },
  maxVisible: {
    type: Number,
    default: 4, // 最大可见键值对数量，默认为4
  },
});

const isHovered = ref(false);

// 计算属性，根据最大可见数量截取对象的前几个键值对
const visibleEntries = computed(() => {
  return Object.fromEntries(Object.entries(props.data).slice(0, props.maxVisible));
});

const showAllTexts = () => {
  isHovered.value = true;
};

const hideAllTexts = () => {
  isHovered.value = false;
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.icon {
  position: relative;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: #fff;
  color: #000;
  padding: 8px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #fff;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.text-item {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clickable-text {
  cursor: pointer;
  display: block;
}
</style>




.icon {
  position: relative;
  cursor: pointer;
  font-size: 16px; /* 调整字体大小以匹配其他文本 */
  padding: 0 5px; /* 添加一些内边距 */
}
