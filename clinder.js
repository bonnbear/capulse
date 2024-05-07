<template>
  <el-select
    v-model="selectedLabel"
    filterable
    placeholder="Select"
    style="width: 240px"
    @change="handleChange"
  >
    <el-option value="" style="height: auto">
      <el-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

const selectedLabel = ref('')
const treeRef = ref(null)

const defaultProps = {
  children: 'children',
  label: 'label',
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.toLowerCase().includes(value.toLowerCase())
}

const handleNodeClick = (data) => {
  selectedLabel.value = data.label
  treeRef.value.filter('')
}

const handleChange = (value) => {
  if (!value) {
    selectedLabel.value = ''
  }
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
            label: 'Level three 1-1-2-9',
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
