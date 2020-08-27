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
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>

<script>
  export default {
    methods: {
      onsubmit() {
        console.log('name: '+this.formLabelAlign.name );
        console.log('value: '+this.formLabelAlign.value );
        this.$http.get('',this.formLabelAlign).then(res => {
          console.log("返回数据");
        })
        console.log('');
      },

      handleClick(row) {
        console.log(row);
      },
    },
    mounted(){
      this.$http.get('/users/getAllUser').then(res => {
        console.log(res.data)
        this.tableData  = res.data.data;
      })
    },
    data() {
      return {
        labelPosition: "right",
        formLabelAlign: {
          name: "",
          value: ''
        },
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
          }
        ],
        tableData: [
          {
            id: null,
            roles: [
              {
                rolename: null,
              }
            ],
            userInfo: {
              age: null,
              phone: null,
              sex: null,
              username: null,
            }
          }
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
