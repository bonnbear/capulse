<script setup>
import { ref, onUnmounted, nextTick } from 'vue';

const showIframe = ref(true);  // 控制 iframe 显示或隐藏
const iframeSrc = ref('http://example.com/your-preview-page');  // iframe 源地址
const apiURL = 'http://example.com/api/status';  // 状态检查接口地址
let intervalId = null;  // 存储定时器ID

// 刷新 iframe
function refreshIframe() {
  showIframe.value = false;  // 隐藏 iframe

  nextTick(() => {
    // 确保 iframe 完全从 DOM 中移除后再次添加
    showIframe.value = true;
  });
}

// 检查状态函数
function checkStatus() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'completed') {
        refreshIframe();
        clearInterval(intervalId);  // 如果任务完成，取消定时器
        intervalId = null;  // 清除定时器ID引用
      }
    })
    .catch(error => console.error('Error fetching status:', error));
}

// 使用 setInterval 进行轮询，这里设置为每10秒检查一次
intervalId = setInterval(checkStatus, 10000);

// 组件卸载时清理资源
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);  // 清除定时器
  }
});
</script>
