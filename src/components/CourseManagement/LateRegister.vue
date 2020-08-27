<template>
  <div>
    <label for="cascader">选择专业:</label>
    <el-cascader
      id="cascader"
      v-model="value"
      :options="options"
      @change="handleChange"></el-cascader>
    <el-divider>或</el-divider>
    <label for="lessoninput">输入课号:</label>
    <el-input id="lessoninput" style="width: 229px" v-model.number="lessonno" placeholder="请输入课号"></el-input>
    <el-button icon="el-icon-search" circle @click="searchLessonno"></el-button>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 700px">
      <el-table-column
        fixed
        prop="lessonno"
        label="课号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="courseno"
        label="课程代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="coursename"
        label="课程名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="teacher"
        label="授课教师"
        width="120">
      </el-table-column>
      <el-table-column
        prop="selectednum"
        label="已选人数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "LateRegister",
    data() {
      return {
        lessonno: '',
        value: [],
        options: [],
        tableData: []
      };
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleChange(value) {
        console.log(value);
      },
      searchLessonno() {
        if (this.lessonno !== '') {
          this.$axios.get("/courseManager/getcourse?" + this.lessonno)
        }
      }
    },
    mounted() {
      this.$axios.get("/courseManager/options").then(res => {
        this.options = res.data.data.options
      })
    }
  }
</script>

<style scoped>

</style>
