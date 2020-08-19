import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InformView from "../components/InformView";
import InformList from "../components/InformList";

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
    }
  ]
})
