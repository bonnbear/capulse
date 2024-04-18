// 监听 'message' 事件
window.addEventListener('message', function(event) {
  // 检查消息的来源是否为当前窗口
  if (event.source === window) {
    console.log('收到消息:', event.data);
  }
});

// 发送消息给自己
window.postMessage('Hello, myself!', '*');
