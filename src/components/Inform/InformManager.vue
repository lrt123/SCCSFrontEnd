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
          <el-button :id="index" type="text" class="informTitle" @click="reverseVisible(inform.id,index)">
            {{inform.title}}
          </el-button>
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" round @click="goEdit(inform.id)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" round
                       @click="showDeleteDialog(inform.id)"></el-button>
          </el-button-group>
        </el-timeline-item>
      </el-timeline>
    </div>
    <inform-view
      v-if="dialog_visible"
      :dialog_visible="dialog_visible"
      :informid="informid"
      @closeDialog="closeDialog"/>
    <el-dialog
      title="提示"
      :visible.sync="deleteDialog"
      width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialog = false">取 消</el-button>
    <el-button type="primary" @click="deleteInform">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import InformView from "./InformView";

  export default {
    name: "InformManager",
    components: {InformView},
    data() {
      return {
        informid: '',
        dialog_visible: false,
        reverse: true,
        informs: [],
        deleteDialog: false
      }
    },
    methods: {
      formatDate: function (date) {
        date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      },
      reverseVisible: function (informid, id) {
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
      },
      deleteInform: function () {
        this.deleteDialog = false
        this.$axios.post("/inform/delete",{
          id: this.informid
        }).then(res => {
          let code = res.data.code;
          if (code === 0){
            this.$message("删除成功");
            for (var index in this.informs){
              if (this.informs[index].id === this.informid){
                this.informs.splice(index, 1);
                break;
              }
            }
          }
          else {
            this.$message("删除失败");
          }
        })
      },
      showDeleteDialog: function (informid) {
        this.informid = informid;
        this.deleteDialog = true;
      },
      goEdit: function (informid) {
        console.log(informid)
        this.$router.push({name: "InformEdit", params: {informid: informid}})
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
  .informTitle {
    font-size: 16px;
    color: black;
  }
</style>
