<template>
  <div class="hover-container" @mouseover="show = true" @mouseleave="show = false">
    <div class="name-tag">{{ name }}</div>
    <div v-if="show" class="info-box">
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HoverInfoBox",
  data() {
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      show: false
    };
  }
}
</script>

<style scoped>
.hover-container {
  position: relative;
  display: inline-block;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
}

.info-box {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 100;
  width: 200px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  left: 50%;
  transform: translateX(-50%); /* Center the tooltip */
  top: 30px; /* Distance from the text */
  white-space: nowrap;
  display: none;
}

.hover-container:hover .info-box {
  display: block;
}

/* CSS for the downward arrow */
.info-box::before {
  content: "";
  position: absolute;
  left: 50%; /* Position the arrow at the center of the tooltip */
  bottom: 100%; /* Place it above the tooltip */
  margin-left: -10px; /* Center the arrow */
  border-width: 10px;
  border-style: solid;
  border-color: white transparent transparent transparent; /* The top border is white, forming a downward arrow */
  filter: drop-shadow(0 -2px 2px rgba(0,0,0,0.1));
}
</style>
