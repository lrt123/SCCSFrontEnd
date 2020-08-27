import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InformView from "../components/Inform/InformView";
import InformList from "../components/Inform/InformList";
import InformCreate from "../components/Inform/InformCreate";
import InformManager from "../components/Inform/InformManager";
import InformEdit from "../components/Inform/InformEdit";
import LateRegister from "../components/CourseManagement/LateRegister";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
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
      path: '/lateregister',
      name: "LateRegister",
      component: LateRegister
    }
  ]
})
