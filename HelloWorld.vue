<template>
  <div>
    <el-form ref="formRef" :model="tableData" :rules="rules">
      <el-table :data="paginatedData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template #default="{row, $index}">
            <el-form-item :prop="`date`">
              <el-input v-model="row.date" placeholder="请输入日期" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="{row, $index}">
            <el-form-item :prop="`name`">
              <el-input v-model="row.name" placeholder="请输入姓名" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="{row, $index}">
            <el-form-item :prop="`address`">
              <el-input v-model="row.address" placeholder="请输入地址" @input="markAsEdited($index)"></el-input>
            </el-form-item>
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
        :total="tableData.length">
      </el-pagination>
    </el-form>
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="checkChanges">检查更改</el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const tableData = ref([
  { date: '2023-01-01', name: '张三', address: '北京市朝阳区', isEdited: false },
  { date: '2023-01-02', name: '李四', address: '上海市浦东新区', isEdited: false },
  { date: '2023-01-03', name: '王五', address: '广州市天河区', isEdited: false },
  // 添加更多示例数据...
]);
const originalData = JSON.parse(JSON.stringify(tableData.value));

const currentPage = ref(1);
const pageSize = ref(10);
const formRef = ref(null);

const rules = {
  date: [{ required: true, message: '请输入日期', trigger: 'change' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
  address: [{ required: true, message: '请输入地址', trigger: 'change' }],
};

function handleSubmit() {
  debugger
  formRef.value.validate((valid) => {
    if (valid) {
      debugger
      submitData();
    } else {
      ElMessage.error('请检查输入是否正确且完整！');
      return false;
    }
  });
}

function submitData() {
  console.log('提交数据:', tableData.value);
  ElMessage.success('提交成功！');
}

function markAsEdited(index) {
  debugger
  tableData.value[index].isEdited = true;
}

function checkChanges() {
  const changes = tableData.value.some((row, index) => 
    row.isEdited && JSON.stringify(row) !== JSON.stringify(originalData[index])
  );
  if (changes) {
    ElMessage.warning('有未保存的更改，请检查！');
  } else {
    ElMessage.info('所有更改均已保存。');
  }
}

function handleSizeChange(newSize) {
  pageSize.value = newSize;
  handleCurrentChange(1); // 重置到第一页
}

function handleCurrentChange(newPage) {
  currentPage.value = newPage;
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});
</script>











function validateDate(rule, value, callback) {
  // 日期格式校验逻辑
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    callback(new Error('日期格式不正确,请使用 YYYY-MM-DD 格式'));
  } else {
    callback();
  }
}

function validateName(rule, value, callback) {
  // 姓名校验逻辑
  if (value.length < 2 || value.length > 10) {
    callback(new Error('姓名长度应在 2 到 10 个字符之间'));
  } else {
    callback();
  }
}

function validateAddress(rule, value, callback) {
  // 地址校验逻辑
  if (value.length < 5 || value.length > 50) {
    callback(new Error('地址长度应在 5 到 50 个字符之间'));
  } else {
    callback();
  }
}
