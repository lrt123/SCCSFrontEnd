<template>
  <div style="">

    <el-row>
      <el-form :label-position="labelPosition" label-width="80px" :model="coursefind">

      <el-form-item>
          <span>
            <strong>课号</strong>
          </span>
          <el-input style="width:100px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                    placeholder="请输入课号"
                    v-model="coursefind.lessonno"></el-input>
          <el-button type="primary" plain icon="el-icon-search" @click="fidcourse">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>


    <el-form :label-position="labelPosition" label-width="80px" :model="course">
      <el-form-item label="课程名">
        <el-input class="yini"  v-model="course.courseInfo.lessonname"></el-input>
      </el-form-item>
      <el-form-item label="任课老师">
        <el-input class="yini" v-model="course.teacher.userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="开设专业">
        <el-input class="yini" v-model="course.courseInfo.major"></el-input>
      </el-form-item>
      <el-form-item label="教室">
        <el-input class="yini" v-model="course.classroomInfo.classroomname"></el-input>
      </el-form-item>

      <el-form-item label="学分">
        <el-input-number class="yini"
          v-model="course.credit"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="200"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="学时">
        <el-input-number class="yini"
          v-model="course.period"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="200"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="限选人数">
        <el-input-number class="yini"
          v-model="course.limit"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="200"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        labelPosition: "right",
        coursefind:{
            lessonno: "",
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
        course: {
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
    };
  },

  methods: {
      fidcourse() {
          this.$http
              .get("/Course/getCourseById", {
                  params: {
                      lessonno: this.coursefind.lessonno,
                  },
              })
              .then((res) => {
                  this.course = res.data.data;
                  console.log("zxcvbnm");
                  console.log(res.data);
              });
      },
      onSubmit() {
          this.course.lessonno=this.coursefind.lessonno;
          this.$http.post("/Course/updateCourse", this.course).then((res) => {
              if (res.data.code === 200) {
                  //this.$message({ message: "修改成功", type: "success" });
                  this.$confirm('是否修改信息, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                      this.$message({
                          type: 'success',
                          message: '修改成功!'
                      });
                  }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '已取消修改'
                      });
                  });
              } else {
                  this.$message({ type: "warning", message: "修改失败" });
              }
          });
      },
      handleChange(value) {
          console.log(value);
      },
  },
};
</script>
<style scoped>
  .yini{
    width:300px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
</style>
