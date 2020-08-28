<template>
  <div>
    <label for="cascader">选择专业:</label>
    <el-cascader
      id="cascader"
      v-model="value"
      :options="options"
      style="width: 300px"
      @change="handleChange"></el-cascader>
    <el-divider content-position="left">或</el-divider>
    <label for="lessoninput">输入课号:</label>
    <el-input id="lessoninput" style="width: 300px" v-model="lessonno" placeholder="请输入课号"></el-input>
    <el-button icon="el-icon-search" circle @click="searchLessonno"></el-button>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
      style="width: 850px">
      <el-table-column
        fixed
        prop="lessonno"
        label="课号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lessoncode"
        label="课程代码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lessonname"
        label="课程名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="teachername"
        label="授课教师"
        width="120">
      </el-table-column>
      <el-table-column
        prop="selectednum"
        label="已选人数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="limit"
        label="容量"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">选课</el-button>
          <el-button @click="extendlimit(scope.row)" type="text" size="small">扩容</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="扩容人数"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-input-number v-model="limitnum" :min="limitnum" label="容量"></el-input-number>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="inputnumconfirm">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="增加学生"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-input v-model="stuid" placeholder="请输入学号"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "LateRegister",
    data() {
      return {
        stuid: "",
        addDialogVisible: false,
        currentRow: {},
        dialogVisible: false,
        limitnum: 0,
        lessonno: '',
        value: [],
        options: [],
        tableData: []
      };
    },
    methods: {
      addConfirm(){
        this.$axios.post("/courseManager/add",{
          stuid: this.stuid,
          lessonno: this.lessonno
        }).then(res => {
          if (res.data.code == 200){
            for (const t of this.tableData){
              if (t.lessonno == this.lessonno){
                let num = parseInt(t.selectednum)
                num += 1
                t.selectednum = num
              }
            }
            this.addDialogVisible = false
            this.stuid = ""
            this.lessonno = ""
            this.$message("添加成功");
          }
        }).catch(res => {
            this.addDialogVisible = false
            this.stuid = ""
            this.lessonno = ""
            this.$message({message: "添加失败,可能已选课或不存在该学生",duration: 2000});
        })

      },
      inputnumconfirm(){
        this.dialogVisible = false
        this.$axios.post("/courseManager/extend",{
          lessonno: this.currentRow.lessonno,
          limit: this.limitnum
        }).then(res => {
          if (res.data.code === 200){
            for (const t of this.tableData){
              if (t.lessonno === this.currentRow.lessonno){
                t.limit = this.limitnum
              }
            }
            this.$message("更新成功")
          }
        })
      },
      extendlimit(row) {
        this.limitnum = parseInt(row.limit);
        this.currentRow = row
        this.dialogVisible = true;
      },
      handleClick(row) {
        this.lessonno = row.lessonno;
        this.addDialogVisible = true;
      },
      handleChange(value) {
        let majorid = value[1];
        this.$axios.get("/courseManager/courseinfo/" + majorid).then(res => {
          this.tableData = res.data.data
        })
      },
      searchLessonno() {
        if (this.lessonno !== '') {
          this.$axios.get("/courseManager/courseinfol/" + this.lessonno).then(res => {
            let temp = res.data.data;
            this.tableData = []
            this.tableData.push(temp);
          })
        }
      }
    },
    mounted() {
      this.$axios.get("/courseManager/options").then(res => {
        console.log(res.data.data)
        this.options = res.data.data;
      })
    }
  }
</script>

<style scoped>

</style>
