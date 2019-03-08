<template>
    <div>
      <div>
        <div>
          <el-tag type="danger">用户管理</el-tag>
        </div>
      </div>
      <div>
        <div style="margin-top: 5px">
          <el-table
            ref="multipleTable" @selection-change="handleSelectionChange"
            :data="users"
            stripe
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="userid"
              width="60"
              label="用户id">
            </el-table-column>
            <el-table-column
              prop="username"
              width="80"
              label="用户姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              width="80"
              label="用户性别">
              <template slot-scope="scope">
                <el-tag  v-if="scope.row.sex==1">男</el-tag>
                <el-tag  type="danger" v-if="scope.row.sex==2">女</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="account"
              label="账号">
            </el-table-column>
            <el-table-column
              prop="role.rolename"
              label="用户权限">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机">
            </el-table-column>
            <el-table-column
              prop="email"
              label="注册邮箱">
            </el-table-column>
            <el-table-column
              prop="checkintime"
              label="注册时间">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: flex-end;margin-top: 5px;margin-right: 10px">
            <el-pagination
              :page-sizes="[10,20,40]"
              :page-size="pageSize"
              :current-page="currentPage"
              @size-change="sizeChange"
              @current-change="currentChange"
              background
              layout="sizes, prev, pager, next, jumper, ->, total, slot"
              :total="total">
            </el-pagination>
          </div>
          <el-dialog
            title="修改用户信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="user" :model="user" label-width="80px" style="width: 322px;">
              <el-form-item label="用户姓名">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="用户姓别">
                <template>
                  <el-radio v-model="user.sex" label="1">男</el-radio>
                  <el-radio v-model="user.sex" label="2">女</el-radio>
                </template>
              </el-form-item>
              <el-form-item label="授权管理">
                <el-select v-model="user.fkRoleid" style="width: 243px">
                  <el-option label="承运业务员" value="1"></el-option>
                  <el-option label="调度员" value="2"></el-option>
                  <el-option label="财务人员" value="3"></el-option>
                  <el-option label="运输管理员" value="4"></el-option>
                  <el-option label="系统管理员" value="5"></el-option>
                  <el-option label="游客" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="user.phone"></el-input>
              </el-form-item>
              <el-form-item label="注册邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateUser">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
          return{
            dialogVisible:false,
            users:[],
            pageSize:10,
            currentPage:1,
            total:0,
            user:{
              userid:'',
              username:'',
              sex:'',
              email:'',
              phone:'',
              fkRoleid:''
            }
          }
        },
        mounted(){
          this.initUsers()
        },
        methods:{
          initUsers(){
            let url ="/sys/?size="+this.pageSize+"&page="+this.currentPage
            this.getRequest(url).then(resp=>{
              this.users = resp.data
              this.total = resp.total
            })
          },
          sizeChange(val){
            this.pageSize = val
            this.initUsers()
          },
          currentChange(val){
            this.currentPage = val
            this.initUsers()
          },
          handleDelete(index,row){
            this.deleteRequest("/sys/"+row.userid).then(resp=>{
              if (resp){
                this.initUsers()
              }
            })
          },
          handleEdit(index,row){
            this.dialogVisible = true
            this.user = row
          },
          updateUser(){
            this.putRequest("/sys/",this.user).then(resp=>{
              if (resp){
                this.dialogVisible = false
                this.initUsers()
              }
            })
          }
        }
    }
</script>

<style>

</style>
