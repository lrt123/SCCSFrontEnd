<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="通知标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input type="textarea" :autosize="{minRows: 10}" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "InformCreate",
    data() {
      return {
        form: {
          title: '',
          date1: '',
          date2: '',
          desc: ''
        }
      }
    },
    methods: {
      getDate: function () {
        let date = new Date();
        let date1 = this.form.date1;
        let date2 = this.form.date2;
        date.setTime(date1.getTime());
        date.setHours(date2.getHours());
        date.setMinutes(date2.getMinutes());
        date.setSeconds(date2.getSeconds());
        return date;
      },
      onSubmit() {
          let starttime = new Date();
          this.$axios.post("inform/save",{
            //带cookie时需要更改
            publisher: '10000',
            starttime: starttime,
            endtime: this.getDate(),
            message: this.form.desc,
            title: this.form.title
          }).then(res => {
            let code = res.data.code;
            if (code == 0){
              this.$message('发布成功')
            }else {
              this.$message('发布失败')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
