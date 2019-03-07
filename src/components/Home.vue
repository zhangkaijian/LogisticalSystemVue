<template>
  <div>
    <el-container>
      <el-header style="background-color: #545c64;display:flex;justify-content:space-between;align-items: center">
        <div style="font-family: 微软雅黑;font-size: 20px;color: #ffd04b">物流管理系统</div>
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
        <el-aside width="205px" style="background-color: #545c64">
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" :key="index" v-if="!item.hidden && item.meta.role.indexOf(user.role.rolename)!=-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item.name}}</span>
              </template>
                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="border: 3px solid #E6A23C">
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <hr size="1"/>
          <div style="font-size: 40px;font-family: 华文行楷;text-align: center;line-height: 500px" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到粤通物流管理系统！
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

<style scoped>

</style>
