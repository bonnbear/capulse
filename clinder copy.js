<template>
  <div class="timeline-container">
    <!-- 时间轴主体 -->
    <div class="timeline">
      <div v-for="event in events" :key="event.id" class="timeline-item">
        <div class="timeline-content">{{ event.date }}</div>
        <div class="timeline-bar"></div>
        <div class="index-node" @click="showDetail(event)">{{ event.index }}</div>
      </div>
    </div>
    
    <!-- 事件详情弹窗 -->
    <div v-if="selectedEvent" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ selectedEvent.title }}</h3>
        <p>{{ selectedEvent.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const events = [
  { id: 1, date: '2023-01-01', title: '新年', detail: '庆祝新年的到来', index: 1 },
  { id: 2, date: '2023-02-14', title: '情人节', detail: '庆祝爱与被爱', index: 2 },
  // 更多事件...
];

const selectedEvent = ref(null);

const showDetail = (event) => {
  selectedEvent.value = event;
};

const closeModal = () => {
  selectedEvent.value = null;
};
</script>

<style scoped>
.timeline-container {
  position: relative;
  width: 200px;
}
.timeline {
  position: relative;
  width: 20px;
  background: #ddd;
  height: 100%;
  float: left;
}
.timeline-item {
  position: relative;
  height: 50px; /* 每个事件的间距 */
}
.timeline-content {
  margin-left: 30px;
}
.timeline-bar {
  position: absolute;
  width: 50px;
  height: 4px;
  background: #333;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.index-node {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  cursor: pointer;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #fff;
}
.modal {
  position: fixed;
  top: 20%;
  right: 10%;
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
}
.modal-content {
  position: relative;
}
.close {
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
</style>
