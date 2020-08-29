<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
          </div>
          <span>学生选课系统</span>
      </div>
      <el-button type="info" @click="logout">退出
      </el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <div
        v-loading="loading"
        v-loading.fullscreen.lock="true"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      </div>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="togglo-button" @click="toggleCollapse"></div>
        <el-menu :router="true" background-color="#333744" text-color="#fff"
                 active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false"
                 :default-active="activePath">
          <!--一级菜单-->
          <template v-for="item in menulist">
            <template v-if="item.childMenus">
              <el-submenu :index="item.menuid + ''" :key="item.menuid">
                <!--一级菜单模板-->
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-menu"></i>
                  <!--文本-->
                  <span>{{item.menuname}}</span>
                </template>
                <template v-for="subItem in item.childMenus">
                  <template v-if="subItem.childMenus.length>0">
                    <el-submenu :index="subItem.menuid + ''" :key="subItem.menuid">
                      <template slot="title">
                      <!--图标-->
                      <i class="el-icon-menu"></i>
                      <!--文本-->
                      <span>{{subItem.menuname}}</span>
                      </template>
                      <el-menu-item :index="'/' + lastItem.url" v-for="lastItem in subItem.childMenus" :key="lastItem.menuid" @click="saveNavState('/' + lastItem.url)">
                        <template slot="title">
                          <!--图标-->
                          <i class="el-icon-location"></i>
                          <!--文本-->
                          <span>{{lastItem.menuname}}</span>
                        </template>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="subItem.url" :key="subItem.menuid" @click="saveNavState( subItem.url)">
                      <template slot="title">
                        <!--图标-->
                        <i class="el-icon-location"></i>
                        <!--文本-->
                        <span>{{subItem.menuname}}</span>
                      </template>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="'/' + item.url"  :key="item.menuid" @click="saveNavState('/' + item.url)">
                  <template slot="title">
                    <!--图标-->
                    <i class="el-icon-location"></i>
                    <!--文本-->
                    <span>{{item.menuname}}</span>
                  </template>
              </el-menu-item>
            </template>
          </template>
          </el-menu>
        </el-aside>
      <!--右侧内容主体-->
      <el-main>
<!--        <el-breadcrumb separator="/" separator-class="el-icon-arrow-right" :default-active="$route.path">-->
<!--          <el-breadcrumb-item v-for="route in $route.matched" :key="route.path">-->
<!--            {{route.name}}-->
<!--          </el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        menulist: [],
        isCollapse: false,
        activePath: '',
        loading: true
      }
    },
    created () {
      this.getMenuList(),
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getMenuList () {
        const { data: res } = await this.$http.get('/users/getUserMenu',{params:{id:sessionStorage.getItem("username")}}) // eslint-disable-line no-unused-vars
        // if (res.meta.staus !== 200) return this.$message.error(res.meta.msg)
        console.log(res)
        this.menulist = res.data
        this.loading=false
      },
      toggleCollapse () {
        this.isCollapse = !this.isCollapse
      },
      //保存连接的激活状态
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath=activePath
      }
    }
  }
</script>
<style lang='less' scoped>
  .home-container{
    height: 100%;
  }
  .el-header {
    background-color: #373d41 ;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: wheat;
    font-size: 20px;
    > div {
      display: flex;
      align-items:center;
      span {
        margin-left: 50px;
      }
    }
  }
  .el-aside{
    background-color: #333744 ;
    .el-menu{
      border-right: none;
    }
  }
  .el-main{
    background-color: #EAEDF1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .togglo-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .avatar_box{
    height: 40px;
    width: 40px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 3px;
    box-shadow: 0 0 3px #ddd;
    position: relative;
    left: 30px;
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
</style>
