<template>
  <div>
    <el-form ref="formRef" :model="tableData" :rules="rules">
      <el-table :data="paginatedData" style="width: 100%" header-cell-class-name="custom-header-style">
        <el-table-column label="日期" width="180">
          <template #default="{ row, $index }">
            <el-form-item :prop="`${$index}.date`">
              <el-input v-model="row.date" placeholder="请输入日期" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="{ row, $index }">
            <el-form-item :prop="`${$index}.name`">
              <el-input v-model="row.name" placeholder="请输入姓名" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="{ row, $index }">
            <el-form-item :prop="`${$index}.address`">
              <el-input v-model="row.address" placeholder="请输入地址" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row, $index }">
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
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const tableData = ref([
  { date: '2023-01-01', name: '张三', address: '北京市朝阳区', isEdited: false },
  { date: '2023-01-02', name: '李四', address: '上海市浦东新区', isEdited: false },
  { date: '2023-01-03', name: '王五', address: '广州市天河区', isEdited: false },
  // 可以继续添加更多行数据...
]);
const originalData = JSON.parse(JSON.stringify(tableData.value));

const currentPage = ref(1);
const pageSize = ref(10);
const formRef = ref(null);

const rules = computed(() => {
  const rulesObj = {};
  tableData.value.forEach((_, index) => {
    rulesObj[`${index}.date`] = [{ required: true, message: `请输入日期`, trigger: 'blur' }];
    rulesObj[`${index}.name`] = [{ required: true, message: `请输入姓名`, trigger: 'blur' }];
    rulesObj[`${index}.address`] = [{ required: true, message: `请输入地址`, trigger: 'blur' }];
  });
  return rulesObj;
});

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
  console.log('提交数据:', tableData.value);
  ElMessage.success('提交成功！');
}

function markAsEdited(index) {
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

function removeRow(index) {
  tableData.value.splice(index, 1);
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
  background: black!important; /* 淡蓝色背景 */
}
</style>


function deleteFirstProperty(obj) {
  // 获取对象所有的键
  const keys = Object.keys(obj);

  // 如果对象没有键，则不进行操作
  if (keys.length === 0) {
    console.log("对象为空，无键可删除");
    return;
  }

  // 获取第一个键
  const keyToDelete = keys[0];

  // 删除第一个键
  delete obj[keyToDelete];

  // 输出删除后的对象
  console.log(`删除第一个属性 '${keyToDelete}' 后的对象:`, obj);
}

// 示例对象
const exampleObj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};

// 调用函数删除第一个属性
deleteFirstProperty(exampleObj);





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
