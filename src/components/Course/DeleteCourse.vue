<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 75%"
      max-height="100%">
      <el-table-column
        prop="lessonno"
        label="课号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="courseInfo.lessoncode"
        label="课程代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="courseInfo.lessonname"
        label="课程名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="teacher.userInfo.username"
        label="任课老师"
        width="120">
      </el-table-column>
      <el-table-column
        prop="courseInfo.major"
        label="开设专业"
        width="100">
      </el-table-column>
      <el-table-column
        prop="classroomInfo.classroomname"
        label="教室名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="credit"
        label="学分"
        width="120">
      </el-table-column>
      <el-table-column
        prop="period"
        label="学时"
        width="120">
      </el-table-column>
      <el-table-column
        prop="limit"
        label="上限人数"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
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
                ]
            }
        },
        mounted() {
            this.$axios.get("/Course/getAllCourse").then(res=>{
                this.tableData=res.data.data;
                console.log(res.data)
            })
        },
        methods: {
            deleteRow(index, row){
                console.log(row.lessonno);
                this.$http.get("/Course/deleteCourse?lessonno="+row.lessonno).then((res)=>{
                    if(res.data.code === 200){
                        this.$message({ message: "删除成功",type: "success"});
                        this.$axios.get("/Course/getAllCourse").then(res=>{
                            this.tableData=res.data.data;
                            console.log(res.data)
                        })
                    }else{
                        this.$message({type: "info",message: "删除失败"});
                    }
                });
            }
        }
    }
</script>
<style>
  .el-table{
    margin-left: 2%;
  }
</style>
