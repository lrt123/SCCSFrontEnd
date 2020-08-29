<template>
  <div>
    <template>
      <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border style="border-radius: 20px;width: 100%;margin-top: 100px">
        <el-table-column fixed prop="lessonno" label="课号" width="150px"></el-table-column>
        <el-table-column prop="courseInfo.lessoncode" label="课程代码" width="120"></el-table-column>
        <el-table-column prop="courseInfo.lessonname" label="课程名" width="120"></el-table-column>
        <el-table-column prop="teacher.userInfo.username" label="任课老师" width="120"></el-table-column>
        <el-table-column prop="courseInfo.major" label="开设专业" width="120"></el-table-column>
        <el-table-column prop="classroomInfo.classroomname" label="教室" width="120"></el-table-column>
        <el-table-column prop="credit" label="学分" width="120"></el-table-column>
        <el-table-column prop="period" label="学时" width="120"></el-table-column>
        <el-table-column prop="limit" label="限选人数" width="120"></el-table-column>

      </el-table>
    </template>
    <div class="tabListPage">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,2,3]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },       // 分页
      // 每页显示的条数
      handleSizeChange (val) {
          // 改变每页显示的条数
          this.PageSize = val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage = 1
      },
      // 显示第几页
      handleCurrentChange (val) {
          // 改变默认的页数
          this.currentPage = val
      }
  },
  mounted() {
    this.$http.get("/Course/getAllCourse").then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
        this.totalCount = res.data.data.length
    });
  },
  data() {
    return {
      tableData: [
        {
          lessonno: null,
          teacher: {
            id: null,
            jobtitle: "",
            userInfo: {
              id: "",
              username: "",
              age: "",
              sex: "",
              phone: "",
            },
          },
          courseInfo: {
            lessoncode: "",
            lessonname: "",
            major: "",
          },
          classroomInfo: {
            classroomBuilding: {
              id: "",
              name: "",
            },
            classroomloc: "",
            classroomname: "",
          },
          credit: null,
          period: null,
            limit:null,
        },
      ],
        isCollapse: false,
        activePath: '',
        // 默认显示第几页
        currentPage: 1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount: 3,
        // 默认每页显示的条数（可修改）
        PageSize:[1]
    };
  },
};
</script>
<style scoped>

</style>
