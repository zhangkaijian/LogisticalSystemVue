import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home'
import TruckTeam from '@/components/truck/TruckTeam'
import TruckMana from '@/components/truck/TruckMana'
import DriverMana from '@/components/drivers/DriverMana'
import DriverSearch from '@/components/search/DriverSearch'
import History from '@/components/search/History'
import Scheduling from '@/components/scheduling/Scheduling'
import WriteOrder from '@/components/task/WriteOrder'
import ReceiveOrder from '@/components/task/ReceiveOrder'
import Cost from '@/components/cost/Cost'
import CostStatistic from '@/components/cost/CostStatistic'
import Log from '@/components/sys/Log'
import Sys from '@/components/sys/Sys'
import User from '@/components/sys/User'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lgonin',
      hidden:true,
      component: Login
    },
    {
      path:'/home',
      name:'Home',
      hidden:true,
      component:Home
    },
    {
      path:'/home',
      name:'车辆管理',
      component:Home,
      meta:{
        role:['运输管理员','超级管理员']
      },
      children:[
        {
          path:'/truckmana',
          name:'车辆信息管理',
          component:TruckMana
        },
        {
          path:'/truckteam',
          name:'车队信息管理',
          component:TruckTeam
        }
      ]
    },
    {
      path:'/home',
      name:'驾驶员管理',
      component:Home,
      meta:{
        role:['运输管理员','超级管理员']
      },
      children:[
        {
          path:'/drivermana',
          name:'驾驶员信息管理',
          component:DriverMana
        }
      ]
    },
    {
      path:'/home',
      name:'运力管理',
      component:Home,
      meta:{
        role:['调度员','超级管理员']
      },
      children:[
        {
          path:'/driversearch',
          name:'运力综合查询',
          component:DriverSearch
        },
        {
          path:'/history',
          name:'历史承运任务查询',
          component:History
        }
      ]
    },
    {
      path:'/home',
      name:'调度任务',
      component:Home,
      meta:{
        role:['调度员','超级管理员']
      },
      children:[
        {
          path:'/scheduling',
          name:'调度承运任务',
          component:Scheduling
        }
      ]
    },
    {
      path:'/home',
      name:'承运任务管理',
      component:Home,
      meta:{
        role:['承运业务员','超级管理员']
      },
      children:[
        {
          path:'/writeorder',
          name:'承运单开出',
          component:WriteOrder
        },
        {
          path:'/receiveorder',
          name:'承运单接收',
          component:ReceiveOrder
        }
      ]
    },
    {
      path:'/home',
      name:'运输成本核算',
      component:Home,
      meta:{
        role:['财务人员','超级管理员']
      },
      children:[
        {
          path:'/cost',
          name:'车队运输成本维护',
          component:Cost
        },
        {
          path:'/coststatistic',
          name:'车队运输成本核算',
          component:CostStatistic
        }
      ]
    },
    {
      path:'/home',
      name:'系统维护',
      component:Home,
      meta:{
        role:['系统管理员','超级管理员']
      },
      children:[
        {
          path:'/log',
          name:'日志维护',
          component:Log
        },
        {
          path:'/user',
          name:'用户维护',
          component:User
        },
        {
          path:'/sys',
          name:'系统维护',
          component:Sys
        }
      ]
    }
  ]
})
