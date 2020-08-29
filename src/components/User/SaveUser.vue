<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加用户</el-breadcrumb-item>
     </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="编号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.roles[0].roleid" placeholder="请选择角色">
          <el-option label="管理员" value="R0001"></el-option>
          <el-option label="老师" value="R0003"></el-option>
          <el-option label="学生" value="R0002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number
          v-model="form.userInfo.age"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.userInfo.sex" label="男">男</el-radio>
        <el-radio v-model="form.userInfo.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: "",
        userInfo: {
          id: "",
          username: "",
          age: "",
          sex: "",
          phone: "",
        },
        roles: [{
          roleid: "",
          rolename: "",
          menus: null,
        }],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.$http.post("/users/saveUser",this.form).then((res) => {
        if (res.data.code === 200) {
          this.$message({ message: "保存成功", type: "success" });
        } else {
          this.$message({type: "info", message: "保存失败" });
        }
      });
      console.log("submit!");
    },
    handleChange(value) {},
  },
};
</script>
<style scoped>
</style>
