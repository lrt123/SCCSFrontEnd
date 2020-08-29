import Vue from 'vue'
import Router from 'vue-router'
import InformView from "../components/Inform/InformView";
import InformList from "../components/Inform/InformList";
import InformCreate from "../components/Inform/InformCreate";
import InformManager from "../components/Inform/InformManager";
import InformEdit from "../components/Inform/InformEdit";
import login from '../components/login'
import Home from '../components/Home'
import Welcome from '../components/welcome'
import SaveUser from '../components/User/SaveUser'
import GetAllUser from '../components/User/GetAllUser'
import UpdateUser from '../components/User/UpdateUser'
import SaveCourse from "../components/Course/SaveCourse";
import DeleteCourse from "../components/Course/DeleteCourse";
import GetAllMenu from '../components/Menu/GetAllMenu'
import SaveMenu from '../components/Menu/SaveMenu'
import GetAllRole from '../components/Role/GetAllRole'
import SaveRole from '../components/Role/SaveRole'
import GetAllCourse from "../components/Course/GetAllCourse";
import UpdateCourse from "../components/Course/UpdateCourse";
import LateRegister from "../components/CourseManagement/LateRegister";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: Home,
      /*redirect: '/welcome',*/
      children: [
        {
          path: '/welcome',
          meta: {
            name: '首页'
          },
          component: Welcome
        },
        {
          path: '/GetAllUser',
          meta: {
            name: '查看用户'
          },
          component: GetAllUser
        },
        {
          path: '/SaveUser',
          name: '添加用户',
          component: SaveUser
        },
        {
          path: '/UpdateUser',
          name: '修改信息',
          component: UpdateUser
        },{
          path: '/inform/:id',
          name: 'InformView',
          component: InformView
        },
        {
          path: '/informlist',
          name: "InformList",
          component: InformList
        },
        {
          path: '/informcreate',
          name: "InformCreate",
          component: InformCreate
        },
        {
          path: '/informmanager',
          name: "InformManager",
          component: InformManager
        },
        {
          path: '/informmanager/edit',
          name: "InformEdit",
          component: InformEdit,
          props: true
        },
        {
          path: '/SaveCourse',
          name: "SaveCourse",
          component: SaveCourse
        },
        {
          path: '/DeleteCourse',
          name: "DeleteCourse",
          component: DeleteCourse
          path: '/GetAllMenu',
          name: "查看菜单",
          component: GetAllMenu
        },
        {
          path: '/SaveMenu',
          name: "添加菜单",
          component: SaveMenu
        },
        {

          path: '/lateregister',
          name: "LateRegister",
          component: LateRegister
        },
        {
          path: '/GetAllRole',
          component: GetAllRole
        },
        {
          path: '/SaveRole',
          component: SaveRole

        },
        {
          path: '/GetAllCourse',
          component: GetAllCourse
        },
        {
          path: '/UpdateCourse',
          component: UpdateCourse
        }
      ]
    },
  ]
})
