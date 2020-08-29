<template>
  <el-form :model="SaveMenuForm" :rules="rules" ref="SaveMenuForm" label-width="100px">
  <el-form-item label="菜单ID" prop="menuid">
    <el-input v-model="SaveMenuForm.menuid"></el-input>
  </el-form-item>
  <el-form-item label="菜单父ID" prop="pid">
    <el-input v-model="SaveMenuForm.pid"></el-input>
  </el-form-item>
  <el-form-item label="菜单名" prop="menuname">
    <el-input v-model="SaveMenuForm.menuname"></el-input>
  </el-form-item>
  <el-form-item label="路由" prop="url">
    <el-input v-model="SaveMenuForm.url"></el-input>
  </el-form-item>
  <el-form-item label="图标" prop="icon">
    <el-input v-model="SaveMenuForm.icon"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('SaveMenuForm')">立即创建</el-button>
    <el-button @click="resetForm('SaveMenuForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        SaveMenuForm: {
          menuid: '',
          pid: '',
          menuname: '',
          url: '',
          icon: ''
        },
        rules: {
          menuid: [
            { required: true, message: '请输入菜单ID', trigger: 'blur' },
            { min: 3, max: 36, message: '长度在 3 到 36 个字符', trigger: 'blur' }
          ],
          menuname: [
            { required: true, message: '请选择菜单名', trigger: 'blur' },
            { min: 3, max: 36, message: '长度在 3 到 36 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        console.log(this.SaveMenuForm)
        this.$refs['SaveMenuForm'].validate((valid) => {
          if (valid) {
            alert('正在尝试添加');
            this.$http.post("/menu/saveMenu",this.SaveMenuForm).then((res) => {
              if (res.data.code === 200 ) {
                this.$message({ message: "保存成功", type: "success"});
                location.reload();
              }else {
                this.$message({ type: "info", message: "保存失败"})
              }
            });
          } else {
              alert('输入属性格式出错，添加失败');
                return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
