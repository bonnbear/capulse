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


















使用全局 CSS 来覆盖 Element Plus 的默认样式是完全可行的。这种方法通过在你的项目中直接定义更高优先级的 CSS 规则来覆盖 Element Plus 默认的 CSS。确保成功覆盖默认样式主要取决于几个关键因素：

### 1. **CSS Specificity（CSS 特异性）**
CSS 的特异性是一个衡量规则的权重的系统，决定了当多个规则冲突时哪个规则将被应用。通过使用更具体的选择器或同样的选择器，你的自定义样式可以优先于 Element Plus 的样式。在大多数情况下，`.el-button` 直接应用在元素上已经足够覆盖默认样式。

### 2. **CSS Cascading Order（CSS 层叠顺序）**
加载顺序也很重要。CSS 会按照它们在文档中出现的顺序应用样式，后出现的规则将覆盖先出现的规则。因此，你应该确保你的 CSS 文件在引入 Element Plus 的 CSS 之后加载。这可以通过在你的入口文件（如 `main.js` 或 `main.ts`）中，确保在引入 Element Plus 的样式之后再引入你的自定义 CSS 来实现。

### 3. **使用 `!important`**
虽然一般不推荐过度使用 `!important`，但在某些情况下，可能需要用它来确保你的样式覆盖第三方库的默认样式。如下示例：

```css
.el-button {
    background-color: #3498db !important; /* 设定按钮的默认背景颜色为淡蓝色，并确保此规则优先级最高 */
}

.el-button:hover {
    background-color: #2980b9 !important; /* 鼠标悬停时改变背景颜色为较深的蓝色，并确保此规则优先级最高 */
}
```

### 整合到项目中
在 Vue 项目中，可以这样组织文件：

1. 创建一个 CSS 文件，如 `custom-styles.css`，并包含上述规则。
2. 在项目的主入口文件中（通常是 `main.js` 或 `main.ts`），确保在加载 Element Plus 样式后加载此文件：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 先加载 Element Plus 的样式
import './custom-styles.css'; // 然后加载你的自定义样式

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
```

通过上述方法，你可以确保你的自定义样式能有效地覆盖 Element Plus 的默认按钮样式。











<template>
  <div>
    <el-form ref="form" :model="tableData" :rules="rules">
      <el-table :data="paginatedData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template #default="scope">
            <el-form-item :prop="`[${scope.$index}].date`">
              <el-input v-model="scope.row.date" placeholder="请输入日期" @input="markAsEdited(scope.$index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="scope">
            <el-form-item :prop="`[${scope.$index}].name`">
              <el-input v-model="scope.row.name" placeholder="请输入姓名" @input="markAsEdited(scope.$index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="scope">
            <el-form-item :prop="`[${scope.$index}].address`">
              <el-input v-model="scope.row.address" placeholder="请输入地址" @input="markAsEdited(scope.$index)"></el-input>
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

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2023-01-01', name: '张三', address: '北京市朝阳区', isEdited: false },
        { date: '2023-01-02', name: '李四', address: '上海市浦东新区', isEdited: false },
        { date: '2023-01-03', name: '王五', address: '广州市天河区', isEdited: false },
        { date: '2023-01-04', name: '赵六', address: '深圳市南山区', isEdited: false },
        { date: '2023-01-05', name: '孙七', address: '成都市锦江区', isEdited: false },
        { date: '2023-01-06', name: '周八', address: '武汉市江岸区', isEdited: false },
        { date: '2023-01-07', name: '吴九', address: '杭州市拱墅区', isEdited: false },
        { date: '2023-01-08', name: '郑十', address: '南京市鼓楼区', isEdited: false },
        { date: '2023-01-09', name: '王十一', address: '西安市碑林区', isEdited: false },
        { date: '2023-01-10', name: '杨十二', address: '苏州市姑苏区', isEdited: false },
        { date: '2023-01-11', name: '张十三', address: '天津市和平区', isEdited: false }
      ],
      originalData: [],
      currentPage: 1,
      pageSize: 10,
      rules: {
        date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
      }
    }
  },
  created() {
    this.originalData = JSON.parse(JSON.stringify(this.tableData)); // 存储原始数据用于更改检测
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          this.$message.error('请检查输入是否正确且完整！');
          return false;
        }
      });
    },
    submitData() {
      console.log('提交数据:', this.tableData);
      this.$message.success('提交成功！');
    },
    markAsEdited(index) {
      this.tableData[index].isEdited = true;
    },
    checkChanges() {
      const changes = this.tableData.some((row, index) => 
        row.isEdited && JSON.stringify(row) !== JSON.stringify(this.originalData[index])
      );
      if (changes) {
        alert('有未保存的更改，请检查！');
      } else {
        alert('所有更改均已保存。');
      }
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.handleCurrentChange(1); // 重置到第一页
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    }
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    }
  }
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="tableData" :rules="rules">
      <el-table :data="paginatedData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template #default="{row, $index}">
            <el-form-item :prop="`[${$index}].date`">
              <el-input v-model="row.date" placeholder="请输入日期" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template #default="{row, $index}">
            <el-form-item :prop="`[${$index}].name`">
              <el-input v-model="row.name" placeholder="请输入姓名" @input="markAsEdited($index)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template #default="{row, $index}">
            <el-form-item :prop="`[${$index}].address`">
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
  date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
};

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
    alert('有未保存的更改，请检查！');
  } else {
    alert('所有更改均已保存。');
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
