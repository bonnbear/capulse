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





当然可以!在 Vue 中,`v-for` 指令不仅可以遍历数组和对象,还可以遍历返回可迭代对象的计算属性或方法。

你可以将 `visibleEntries` 定义为一个函数,根据传入的 `id` 从大的模板对象中获取对应的对象,并返回该对象的部分键值对。下面是一个示例:

```html
<template>
  <!-- 其他代码保持不变 -->
  <span v-for="(value, key, index) in visibleEntries(selectedId)" :key="key" class="text-item"
        :class="{ 'selected': selectedKey === key }"
        @click="selectItem(key)">
    {{ value }}
  </span>
  <!-- 其他代码保持不变 -->
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  maxVisible: {
    type: Number,
    default: 4,
  },
});

const selectedId = ref(null);
// 其他代码保持不变

const visibleEntries = (id) => {
  if (id && props.data[id]) {
    return Object.fromEntries(Object.entries(props.data[id]).slice(0, props.maxVisible));
  }
  return {};
};

// 其他代码保持不变
</script>
```

在这个修改后的代码中:

1. 我们将 `visibleEntries` 定义为一个函数,接受一个 `id` 参数。

2. 在函数内部,我们首先检查 `id` 是否存在,并且在 `props.data` 中是否存在对应的对象。

3. 如果条件满足,我们使用 `Object.entries()` 获取该对象的键值对数组,并使用 `slice()` 方法截取前 `props.maxVisible` 个键值对,然后使用 `Object.fromEntries()` 将其转换回对象并返回。

4. 如果条件不满足,我们返回一个空对象 `{}`。

5. 在模板中,我们将 `visibleEntries` 作为函数调用,并传入 `selectedId` 作为参数。

这样,当 `selectedId` 发生变化时,`visibleEntries` 函数会根据新的 `id` 从大的模板对象中获取对应的对象,并返回其部分键值对。`v-for` 指令会自动重新渲染,显示更新后的键值对。

你可以根据你的具体需求来修改 `visibleEntries` 函数的逻辑,以适应你的数据结构和业务需求。

希望这个修改能够满足你的需求!如果你还有任何问题或需要进一步的帮助,请随时告诉我。
