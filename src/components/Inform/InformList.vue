<template>
  <div>
    <div class="block">
      <div class="radio">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>

      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(inform, index) in informs"
          :key="index"
          :timestamp="inform.starttime">
          <el-button :id="index" type="text" class="informTitle" @click="reverseVisible(inform.id,index)">{{inform.title}}</el-button>
        </el-timeline-item>
      </el-timeline>
    </div>
    <inform-view v-if="dialog_visible" :dialog_visible="dialog_visible" :informid="informid" @closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import InformView from "./InformView";

  export default {
    name: "InformList",
    components: {InformView},
    data() {
      return {
        informid: '',
        dialog_visible: false,
        reverse: true,
        informs: []
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
      reverseVisible: function (informid,id) {
        document.getElementById(id).style.color = "gray"
        this.informid = informid;
        if (this.dialog_visible) {
          this.dialog_visible = false;
        } else {
          this.dialog_visible = true;
        }
      },
      closeDialog: function () {
        this.dialog_visible = false;
      }
    },
    mounted() {
      this.$axios.get("/inform/getlist").then(res => {
        let data = res.data.data
        let temp = {};
        for (const t of data) {
          temp = {}
          temp.id = t.id;
          temp.starttime = this.formatDate(t.starttime);
          temp.title = t.title;
          this.informs.push(temp);
        }
      })
    }

  }
</script>

<style scoped>
.informTitle{
  font-size: 16px;
  color: black;
}
</style>
