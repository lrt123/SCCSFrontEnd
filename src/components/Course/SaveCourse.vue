<template>
  <div>
    <div>
      <el-form :model="classform" :rules="rules" ref="classform" label-width="150px" class="demo-ruleForm">

        <el-form-item label="课程代码" prop="lessoncode">
          <el-input v-model="classform.lessoncode" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="课程名称" prop="lessonname">
          <el-input v-model="classform.lessonname" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="开设专业" prop="major">
          <el-input v-model="classform.major" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onsubmitclass()">立即创建</el-button>
          <!--<el-button @click="resetForm('classform')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">

        <el-form-item label="课号" prop="lessonno">
          <el-input v-model="form.lessonno" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="教师编号" prop="id">
          <el-input v-model="form.teacher.id" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="课程代码" prop="lessoncode">
          <el-input v-model="form.courseInfo.lessoncode" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="教室代码" prop="classroomloc">
          <el-input v-model="form.classroomInfo.classroomloc" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="学分" prop="credit">
          <el-input v-model="form.credit" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="课时" prop="period">
          <el-input v-model="form.period" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="选课上限人数" prop="limit">
          <el-input v-model="form.limit" class="hangkuan"></el-input>
        </el-form-item>

        <!--<el-form-item label="课程名称" prop="lessonname">
          <el-input v-model="form.lessonname" class="hangkuan"></el-input>
        </el-form-item>

        <el-form-item label="开设专业" prop="major">
          <el-input v-model="form.major" class="hangkuan"></el-input>
        </el-form-item>-->
        <!--
              <el-form-item label="教室代码" prop="classroomloc">
                <el-select v-model="ruleForm.classroomloc" placeholder="请选择教室代码">
                  <el-option label="区域一" value="shanghai" class="xialakuang"></el-option>
                  <el-option label="区域二" value="beijing" class="xialakuang"></el-option>
                </el-select>
              </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onsubmit()">立即创建</el-button>
         <!-- <el-button @click="resetForm('form')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>


  </div>


</template>

<script>
    export default {
        data() {
            return {
                form: {
                    lessonno: "",
                    teacher: {
                        id: "",
                        jobtitle: null,
                        userInfo: null
                    },
                    courseInfo: {
                        lessoncode: "",
                        lessonname: null,
                        major: null
                    },
                    classroomInfo: {
                        classroomBuilding: null,
                        classroomloc: "",
                        classroomname: null
                    },
                    credit: "",
                    period: "",
                    limit: ""/*,
                    lessonname: "",
                    major: ""*/
                },
                classform: {
                    lessoncode: "",
                    lessonname: "",
                    major: ""
                },
                rules: {
                    lessonno: [
                        { required: true,message: '请输入课号', trigger: 'blur'}
                    ],
                    lessoncode: [
                        { required: true,message: '请输入课程代码', trigger: 'blur'}
                    ],
                    classroomloc: [
                        { required: true, message: '请选择教室代码', trigger: 'blur' }
                    ],
                    credit: [
                        { required: true, message: '请输入课程学分', trigger: 'blur' }
                    ],
                    period: [
                        { required: true, message: '请输入课程学时', trigger: 'blur' }
                    ],
                    limit: [
                        { required: true, message: '请输入选课上限人数', trigger: 'blur' }
                    ],
                    lessonname: [
                        { required: true, message: '请输入课程名称', trigger: 'blur' }
                    ],
                    major: [
                        { required: true, message: '请输入开设专业', trigger: 'blur' }
                    ],
                    id: [
                        { required: true, message: '请输入教师编号', trigger: 'blur' }
                    ]

                }
            };
        },
        methods: {
            onsubmit(){
                console.log(this.form);
                this.$http.post("/Course/saveCourse",this.form).then((res)=>{
                    if(res.data.code === 200){
                        this.$message({ message: "保存成功",type: "success"});
                    }else{
                        this.$message({type: "info",message: "保存失败"});
                    }
                });
                console.log("submit!");
            },
            onsubmitclass(){
                console.log(this.classform);
                this.$http.post("/CourseInfo/saveCourseInfo",this.classform).then((res)=>{
                    if(res.data.code === 200){
                        this.$message({ message: "保存成功",type: "success"});
                    }else{
                        this.$message({type: "info",message: "保存失败"});
                    }
                });
                console.log("submit!");
            },
            resetForm(formName) {
                this[formName]={};

                /*this.$nextTick()(() => {
                    this.$refs[formName].resetFieslds();
                })*/
                this.$refs[formName].resetFieslds();
            }
        }
    }
</script>
<style>
  .hangkuan{
    width: 60%;
  }
  .demo-ruleForm{
    margin-left: 22%;
    margin-top: 5%;
  }
</style>
