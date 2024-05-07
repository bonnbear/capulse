<template>
  <div class="tree-select">
    <el-popover
      ref="popoverRef"
      placement="bottom-start"
      trigger="click"
      v-model:visible="popoverVisible"
      :width="popoverWidth"
      popper-class="custom-popover"
    >
      <template #reference>
        <el-input
          v-model="selectedLabel"
          placeholder="Please input"
          @input="filterTextChange"
        />
      </template>

      <el-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </el-popover>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { ElTree } from 'element-plus'

const selectedLabel = ref('')
const filterText = ref('')
const popoverVisible = ref(false)
const popoverRef = ref(null)
const treeRef = ref(null)
const popoverWidth = ref(0)

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.toLowerCase().includes(value.toLowerCase())
}

const handleNodeClick = (data) => {
  selectedLabel.value = data.label
  filterText.value = ''
  popoverVisible.value = false
}

const filterTextChange = (val) => {
  filterText.value = val
  popoverVisible.value = true
  nextTick(() => {
    popoverWidth.value = Math.max(popoverRef.value.width, treeRef.value.$el.scrollWidth + 20)
  })
}

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
</script>

<style scoped>
.tree-select {
  width: 100%;
}
:deep(.custom-popover) {
  padding: 0;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
:deep(.custom-popover .el-tree) {
  max-height: 300px;
  overflow-y: auto;
}
</style>
