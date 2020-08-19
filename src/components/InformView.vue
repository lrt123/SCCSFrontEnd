<template>
  <div>

    <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="50%"
      :lock-scroll="true"
      :append-to-body="true"
      center
    >
      <template>
        <span class="releasetime">发布时间：{{releaseTime}}</span>
        <span>发布人：{{publisher}}</span>
      </template>
      <el-container
        class="container"
      >
        <el-main>
          <template slot-scope="scope">
            <p v-html='msg' style="font-size: 20px"></p>
          </template>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "InformView",
    data: function () {
      return {
        releaseTime: '2019-10-19',
        msg: "",
        publisher: '杜华巍',
        title: '标题',
        centerDialogVisible: false
      }
    },
    methods: {
      formatDate: function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      }
    },
    mounted() {
      let id = this.$route.params.id
      this.$axios.get('/inform/get/'+id).then(res => {
        console.log("rec")
        let data = res.data.data;
        let message = data.message;
        let reg = new RegExp('\r\n', 'g')//g代表全部
        message = message.replace(reg, '<br>');
        this.msg = message;
        this.publisher = data.publisher;
        this.title = data.title;
        this.releaseTime = this.formatDate(data.starttime)
      })
    }
  }
</script>

<style scoped>
  .container {
    height: 600px;
    width: 100%
  }

  span, p {
    font-size: 20px;
  }

  .releasetime {
    margin-left: 30%;
  }
</style>
