//改动点监听

<template>
  <div>
    <el-form ref="formRef" :model="tableData" :rules="rules">
      <el-table :data="paginatedData" style="width: 100%" header-cell-class-name="custom-header-style">
        <el-table-column label="日期" width="180">
          <template #default="{ row }">
            <el-date-picker v-model="row.date" type="date" placeholder="请选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="{ row }">
            <el-input v-model="row.name" placeholder="请输入姓名"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="{ row }">
            <el-input v-model="row.address" placeholder="请输入地址"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ $index }">
            <el-button type="danger" size="small" @click="removeRow($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="checkChanges">检查更改</el-button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';

const tableData = ref([
  { date: '2023-01-01', name: '张三', address: '北京市朝阳区' },
  { date: '2023-01-02', name: '李四', address: '上海市浦东新区' },
  { date: '2023-01-03', name: '王五', address: '广州市天河区' },
  // 可以继续添加更多行数据...
]);

const originalData = ref(JSON.parse(JSON.stringify(tableData.value)));
const editedRows = ref([]);

const currentPage = ref(1);
const pageSize = ref(10);
const formRef = ref(null);

const rules = computed(() => {
  const rulesObj = {};
  tableData.value.forEach((_, index) => {
    rulesObj[`${index}.date`] = [{ required: true, message: `请选择日期`, trigger: 'change' }];
    rulesObj[`${index}.name`] = [{ required: true, message: `请输入姓名`, trigger: 'blur' }];
    rulesObj[`${index}.address`] = [{ required: true, message: `请输入地址`, trigger: 'blur' }];
  });
  return rulesObj;
});

// 监听 tableData 的变化
watch(
  tableData,
  (newData) => {
    // 比较新数据与原始数据的差异
    const changedRows = newData.filter((newRow, index) => {
      const oldRow = originalData.value[index];
      return JSON.stringify(newRow) !== JSON.stringify(oldRow);
    });
    
    // 将发生变化的行数据添加到 editedRows 数组中
    editedRows.value = changedRows;
  },
  { deep: true }
);

function handleSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      submitData();
    } else {
      ElMessage.error('请检查输入是否正确且完整！');
      return false;
    }
  });
}

function submitData() {
  console.log('提交修改的数据:', editedRows.value);
  // 在这里可以将 editedRows.value 发送给服务器进行保存
  
  // 提交成功后,更新 originalData
  originalData.value = JSON.parse(JSON.stringify(tableData.value));
  
  // 清空 editedRows 数组
  editedRows.value = [];
  
  ElMessage.success('提交成功！');
}

function checkChanges() {
  if (editedRows.value.length > 0) {
    ElMessage.warning('有未保存的更改,请检查！');
  } else {
    ElMessage.info('所有更改均已保存。');
  }
}

function removeRow(index) {
  tableData.value.splice(index, 1);
  originalData.value.splice(index, 1);
  ElMessage.success('行已删除。');
}

function handleSizeChange(newSize) {
  pageSize.value = newSize;
}

function handleCurrentChange(newPage) {
  currentPage.value = newPage;
}

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return tableData.value.slice(startIndex, startIndex + pageSize.value);
});
</script>

<style>
.custom-header-style {
  background: black!important;
}
</style>


// 过滤树
<template>
  <div>
    <el-tree
      :data="filteredTreeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="id"
      ref="treeRef"
      draggable
    ></el-tree>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 原始树形数据
const treeData = ref([
  {
    id: 1,
    name: '一级 1',
    code: '001',
    children: [
      {
        id: 4,
        name: '二级 1-1',
        code: '001-1',
        children: [
          {
            id: 9,
            name: '三级 1-1-1',
            code: '001-1-1'
          },
          {
            id: 10,
            name: '三级 1-1-2',
            code: '001-1-2'
          }
        ]
      }
    ]
  },
  // 更多节点...
]);

// 过滤树的函数
function filterTree(code) {
  const result = [];
  function traverse(nodes) {
    nodes.forEach(node => {
      if (node.code === code || (node.children && node.children.some(child => traverse([child])))) {
        result.push(node);
      }
    });
  }
  traverse(treeData.value);
  console.log(result,'result')
  return result;
}

// 示例：过滤树以显示code为'001-1'及其子节点的节点
const filteredTreeData = ref(filterTree('001'));

const defaultProps = {
  children: 'children',
  label: 'name'
};

function handleNodeClick(data) {
  console.log('Node clicked:', data.name);
}

const treeRef = ref(null);
</script>
