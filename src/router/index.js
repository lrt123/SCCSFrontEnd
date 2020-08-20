import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InformView from "../components/InformView";
import InformList from "../components/InformList";
import InformCreate from "../components/InformCreate";
import InformManager from "../components/InformManager";
import InformEdit from "../components/InformEdit";

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
    }
  ]
})
