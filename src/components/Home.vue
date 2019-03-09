<template>
  <div>
    <el-container>
      <el-header style="background-color: #211816;display:flex;justify-content:space-between;align-items: center">
        <div style="width: 100px;height: 100px">
          <a href='/#/home'>
            <img src="../assets/a4.png" style="margin-top: 24px;"/>
          </a>
        </div>
        <!--<div style="font-family: 微软雅黑;font-size: 20px;color: #ffd04b">顺丰物流管理系统</div>-->
        <div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color: aliceblue">
              <i class="el-icon-setting"/>
              {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              <el-dropdown-item divided disabled>您的权限为：{{user.role.rolename}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container style="height: 743px">
        <el-aside width="205px" style="background-color: #211816">
          <el-menu background-color="#211816" text-color="#fff" active-text-color="#ffd04b" router style="height: 100%">
            <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.hidden && item.meta.role.indexOf(user.role.rolename)!=-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--style="border: 3px solid #E6A23C"-->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <hr size="1"/>
          <div  v-if="this.$router.currentRoute.path=='/home'">
            <div>
              <template>
                <el-carousel :interval="3000" arrow="always" class="d_jump" :height="imgHeight">
                <el-carousel-item v-for="item in imgList" :key="item.id">
                  <el-row> <el-col :span="24">
                    <img ref="imgHeight" :src="item.idView" class="banner_img"/></el-col>
                  </el-row>
                </el-carousel-item>
              </el-carousel>
              </template>
            </div>
            <div  style="height: 200px">
              <ul id="gov">
                <li class="li1">
                  <a class="gov1" href="http://webcert.cnmstl.net/cert/code?sn=c6cc6af3fac440c28901c15a104582fe" target="_blank" oncontextmenu="return false;">
                    <img src="http://webcert.cnmstl.net/images/cert/code/officialbrand_small_h_img.jpg?sn=c6cc6af3fac440c28901c15a104582fe&amp;t=1476167429157" alt="安全网址认证书">
                  </a>
                </li>
                <li class="li1">
                  <a class="gov4" href="http://szcert.ebs.org.cn/B943BEFD-EF5E-4747-AD73-B875A1FC5CC7" target="_blank" oncontextmenu="return false;">
                    <img src="http://szcert.ebs.org.cn/Images/govIcon.gif" title="深圳市市场监督管理局企业主体身份公示" alt="深圳市市场监督管理局企业主体身份公示">
                  </a>
                </li>
              </ul>
            </div>
            <div style="height: 35px;width: 100%">
              <ul id="ui1">
                <li class="li1">使用条款&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">服务网络&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">丰桥平台&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">隐私策略&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">手机顺丰&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">友情链接&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">销售联盟&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">顺丰社区&nbsp;&nbsp;&nbsp;|</li>
                <li class="li1">顺丰公益&nbsp;&nbsp;&nbsp;|</li>
              </ul>
              <ul id="copyright">
                <li class="li1"><a class="gray nolink">©&nbsp;2017&nbsp;&nbsp;顺丰速运&nbsp;&nbsp;版权所有&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                <li class="li1"> <a href="http://www.miitbeian.gov.cn/" target="_blank">粤&nbsp;&nbsp;ICP&nbsp;&nbsp;备08034243号</a></li>
              </ul>
            </div>
          </div>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        imgList: [ {id: 0, idView: require('../assets/a1.jpeg')},
                    {id: 1, idView: require('../assets/a2.jpg')},
                   {id: 2, name: '详情', idView: require('../assets/a3.jpg')}
                 ],
        user:JSON.parse(window.sessionStorage.getItem("user")),
      }
    },
    methods: {
      handleCommand(command) {
        if (command == "logout"){
          this.$confirm('您确定要退出登录吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.replace("/")
            window.sessionStorage.removeItem('user');
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        }
      }
    }
  }

</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__container {

    position: relative;
    height: 420px;

  }
  li.li1{
    list-style: none;
    display: inline-block;
  }
  #ui1 {
    font-size: 13px;
    text-align: center;
  }
  #copyright{
    font-size: 13px;
    text-align: center;
  }
  #gov{
    text-align: center;
  }

</style>
