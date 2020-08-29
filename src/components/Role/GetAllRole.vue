<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看角色</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <label id="tips1">角色筛选</label>
      <el-select v-model="value" placeholder="请选择" @change="roleSelect($event)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-------------------表格开始-------------------------------->
      <br />
      <br />
      <el-button type="danger">删除所选角色</el-button>
      <el-button type="success">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="roleid" label="角色ID" width="150"></el-table-column>
        <el-table-column prop="rolename" label="角色名" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope"> 
            <el-button  @click="dialogFormVisible = true" type="text" size="small">查看拥有菜单</el-button>
            <el-button @click="deleteUserInfo(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editUserInfo(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-------------------表格结束-------------------------------->
    </template>
    <!-- -----------------------弹出框开始------------------------------- -->
    <el-dialog title="菜单列表" :visible.sync="dialogFormVisible">
      <template>
        <el-transfer v-model="menuvalue" :data="menulist"></el-transfer>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-----------------------弹出框结束------------------------->
  </div>
</template>
<script>
export default {
  methods: {
    handleSelectionChange() {},
    roleSelect(e) {
      console.log(e);
      this.$http
        .get("/role/getRoleById", { params: { roleId: e } })
        .then((res) => {
          console.log(res.data);
          if (res.data.data != null) {
            this.tableData = [res.data.data];
          } else {
            (this.tableData.roleid = null), (this.tableData.rolename = null);
          }
        });
    },
  },
  data() {
    const generateData = (_) => {
      const menulist = [];
      for (let i = 1; i <= 15; i++) {
        menulist.push({
          key: i,
          label: `备选项 ${i}`,
        });
      }
      return menulist;
    };
    return {
      menulist: generateData(),
      menuvalue: [], //这是弹出框里的菜单列表
      options: [
        {
          value: "R0001",
          label: "管理员",
        },
        {
          value: "R0003",
          label: "教师",
        },
        {
          value: "R00002",
          label: "学生",
        },
      ],
      value: "",
      tableData: [
        {
          roleid: null,
          rolename: null,
        },
      ],
      multipleSelection: [],
      dialogFormVisible: false, //zhege
    };
  },
};
</script>
<style scoped>
#tips1 {
  padding-right: 10px;
  font-size: 18px;
}
</style>