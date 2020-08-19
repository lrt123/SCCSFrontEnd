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
          <router-link :to="'/inform/'+inform.id">{{inform.title}}</router-link>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InformList",
    data() {
      return {
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
  a:link {
    color: black
  }

  a:visited {
    color: gray
  }

  a:hover {
    color: blue;
    text-decoration: underline;

  }

  a:active {
    color: blue
  }

  /* 鼠标点中激活链接 蓝色 */
  a {
    text-decoration: none;
  }
</style>
