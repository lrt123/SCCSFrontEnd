<template>
  <div class="block">
    <el-row>
      <el-form :label-position="labelPosition" :model="formLabelAlign">
        <el-form-item>
          <span>
            <strong>按照指定类型查询</strong>
          </span>
          <el-select v-model="formLabelAlign.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input style="width:300px" v-model="formLabelAlign.name"></el-input>
          <el-button type="primary" @click="onsubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" width="150"></el-table-column>
      <el-table-column prop="userInfo.username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userInfo.age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="userInfo.sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="userInfo.phone" label="手机" width="300"></el-table-column>
      <el-table-column prop="roles[0].rolename" label="身份" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="deleteUserInfo(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editUserInfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :total="totalNum"
    ></el-pagination>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编号">
          <el-input style="width:300px" v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style="width:300px" v-model="form.userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number
            v-model="form.userInfo.age"
            controls-position="right"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.userInfo.sex" label="男">男</el-radio>
          <el-radio v-model="form.userInfo.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input style="width:300px" v-model="form.userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roles[0].roleid" placeholder="请选择角色">
            <el-option label="管理员" value="R0001"></el-option>
            <el-option label="老师" value="R0003"></el-option>
            <el-option label="学生" value="R0002"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    onsubmit() {
      console.log("onsubmit");
      console.log("name: " + this.formLabelAlign.name);
      console.log("value: " + this.formLabelAlign.value);
      this.$http
        .get("/users/getUsersByCondition", {
          params: {
            condition: this.formLabelAlign.value,
            value: this.formLabelAlign.name,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        });
    },
    deleteUserInfo(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("/users/deleteUser", { 
            params: {
              id : row.id
            }
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }else{
              this.$message({ type: "info", message: "删除失败" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange() {
      console.log("updateUserInfo");
      this.$http
        .get("/users/getAllUser", { params: { currentPage: this.currentPage } })
        .then((res) => {
          this.tableData = res.data.data.list;
          this.totalNum = res.data.data.totalPage * 10;
        });
      console.log(this.currentPage);
    },
    editUserInfo(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form = row;
    },
    updateUserInfo() {
      console.log("updateUserInfo");
      this.$http.post("/users/updateUser", this.form).then((res) => {
        if (res.data.code === 200) {
          this.$message({ message: "更新成功", type: "success" });
          this.dialogFormVisible = false;
        } else {
          this.$message({ type: "info", message: "更新失败" });
        }
      });
    },
  },
  mounted() {
    console.log("mounted");
    this.$http.get("/users/getAllUser?currentPage=1").then((res) => {
      console.log(res.data);
      this.tableData = res.data.data.list;
      this.totalNum = res.data.data.totalPage * 10;
    });
  },
  data() {
    return {
      labelPosition: "right",
      totalNum: 10,
      currentPage: 1,
      formLabelAlign: {
        name: "",
        value: "id",
      },
      dialogFormVisible: false,
      form: {
        id: "",
        userInfo: {
          id: "",
          username: "",
          age: "",
          sex: "",
          phone: "",
        },
        roles: [
          {
            roleid: "",
            rolename: "",
            menus: null,
          },
        ],
      },
      formLabelWidth: "120px",
      options: [
        {
          value: "id",
          label: "编号",
        },
        {
          value: "username",
          label: "姓名",
        },
        {
          value: "phone",
          label: "手机号",
        },
      ],
      tableData: [
        {
          id: null,
          roles: [
            {
              rolename: null,
            },
          ],
          userInfo: {
            age: null,
            phone: null,
            sex: null,
            username: null,
          },
        },
      ],
    };
  },
};
</script>
<style scoped>
span {
  font-size: 16px;
}
</style>
