<template>
  <div>

    <el-dialog
      :title="title"
      :visible.sync="dialog_visible"
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
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialog_visible: Boolean,
      informid: String
    },
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
      },
      closeDialog: function () {
        this.$emit("closeDialog");
      }
    },
    mounted() {
      let id = this.informid
      this.$axios.get('/inform/get/' + id).then(res => {
        let data = res.data.data;
        let message = data.message;
        let reg = new RegExp('\r\n|\n', 'g')//g代表全部
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
