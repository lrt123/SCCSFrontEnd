<template>
  <div>
    <el-table
      :data="MenuData.filter(data => !search || data.menuname.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <!-- <el-table-column
        label="展开"
        type="expand">
        <template slot-scope="scope">
           <el-table :data="scope.row.children" style="width: calc(100% - 47px)" class="two-list">
            
           </el-table>
        </template>
      </el-table-column> -->
      <el-table-column
        label="菜单ID"
        prop="menuid">
      </el-table-column>
      <el-table-column
        label="菜单父ID"
        prop="pid">
        <!-- <template slot-scope="scope">
          {{scope.row.pid || filterA}}
        </template> -->
      </el-table-column>
      <el-table-column
        label="菜单名"
        prop="menuname">
      </el-table-column>
      <el-table-column
        label="路由"
        prop="url">
      </el-table-column>
      <el-table-column
        label="图标"
        prop="icon">
      </el-table-column>
      <el-table-column
        align="right">
        
        <template slot="header" slot-scope="scope">
        <!-- 本来是 <template slot="header" slot-scope="scope"> -->
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
            <el-button size="mini" @click="resetForm()">重置</el-button>
        </template>
        
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-popconfirm
            title="确定此菜单删除吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
            size="mini"
            type="danger"  
            slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改菜单" :visible.sync="dialogFormVisible" >
      <el-form :model="EditMenuForm">
        <el-form-item label="菜单ID">
          <el-input v-model="EditMenuForm.menuid"></el-input>
        </el-form-item>
        <el-form-item label="菜单父ID">
          <el-input v-model="EditMenuForm.pid"></el-input>
        </el-form-item>
        <el-form-item label="菜单名">
          <el-input v-model="EditMenuForm.menuname"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="EditMenuForm.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="EditMenuForm.icon"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditCommit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        MenuData: [],
        EditMenuForm: {
          menuid: '',
          pid: '',
          menuname: '',
          url: '',
          icon: ''
        },
        
        dialogFormVisible: false,
        loading: true,
        search: '',
      }
    },
    mounted:function(){
      this.getAllMenu();
     },
    methods: {
      handleEdit(index, row ) {
        this.dialogFormVisible  = true
        console.log(index, row );
        this.EditMenuForm.menuid = row.menuid       
        this.EditMenuForm.pid = row.pid
        this.EditMenuForm.menuname = row.menuname
        this.EditMenuForm.url = row.url
        this.EditMenuForm.icon = row.icon
      },
      async getAllMenu() {
        const { data: res } = await this.$http.get('/menu/getAllAllMenu') 
        console.log(res)
        this.MenuData = res.data
        this.loading= false
      },  
      handleDelete(index, row) {
        console.log(row.menuid);
        this.$axios.get("/menu/deleteMenuById?id="+row.menuid,{
        }).then(res => {
          let code = res.data.code;
          if (code == 200){
            this.$message('删除成功');
            this.reload;
          }else {
            this.$message('删除失败')
          }
        }) 
      },
      EditCommit() {
        console.log(this.EditMenuForm)
        if(this.EditMenuForm.pid != null){console.log("pid不为null")}
        else{ this.EditMenuForm.pid = "" }
        if(this.EditMenuForm.url != null){}
        else{ this.EditMenuForm.url = "" }
        if(this.EditMenuForm.icon != null){}
        else{ this.EditMenuForm.icon = "" }
        this.$http.post("/menu/updateMenu",this.EditMenuForm).then((res) => {
          if (res.data.code === 200 ) {
            this.$message({ message: "保存成功", type: "success"});
          }else {
            this.$message({ type: "info", message: "保存失败"})
          }
        });
        console.log("submit")
      },
      
      resetForm() {
        this.search = ''
      }
    },
    // filters: {
    //   filterA: function(value) {
    //     if (value !== "" && value !== null && value !== undefined ){
    //       return value;
    //     }else {
    //       return "--";
    //     }
    //   }
    // }
  }
</script>