<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 50px">
      <el-card style="width: 370px;">
        <div slot="header" style="display:flex;justify-content:space-between">
          <span>登录</span>
          <el-button type="success" plain size="mini" @click="dialogVisible = true">注册</el-button>
        </div>
        <div>
          <el-dialog title="注册账号"  :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="signUp" ref="signUp" :rules="rules" label-width="80px" style="width: 300px" status-icon>
              <el-form-item label="账号" prop="account">
                <el-input v-model="signUp.account" placeholder="请输入账号" ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="signUp.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="signUp.checkPassword" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="signUp.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <template>
                  <el-radio v-model="signUp.sex" label="1">男</el-radio>
                  <el-radio v-model="signUp.sex" label="2">女</el-radio>
                </template>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="signUp.phone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="signUp.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('signUp')">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <div style="padding-right: 60px;padding-left: 0px;" >
          <el-form ref="user" :model="user" label-width="80px" >
            <el-form-item label="账号" prop="account">
              <el-input v-model="user.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="user.password" @keydown.enter.native="doLogin"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding-left: 88px">
          <el-button type="primary" style="width: 150px" v-on:click="doLogin" round>登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      let validAccount = (rule,value,callback)=>{
        let reg=/[0-9a-zA-Z]{3,10}/
        if (!value){
          callback(new Error('账号不能为空！'))
        }if(!reg.test(value)){
          callback (new Error('账号必须3-10位数字或字母'))
        }else {
          this.postRequest("/signup/check",this.signUp.account).then(resp=>{
            console.log(resp)
            if (resp == 1) {
              callback()
            }else {
              callback(new Error('该账号已被注册'))
              this.$message.error('该账号已被注册');
            }
          })
        }
      }
      let validPassword = (rule,value,callback)=>{
        let reg = /[0-9a-zA-Z]{4,12}/
        if(!value){
          callback(new Error('密码不能为空！'))
        }if(!reg.test(value)){
          callback(new Error('密码必须4-12位数字或字母'))
        }else {
          callback()
        }
      }
      let validCheckPassword = (rule,value,callback)=>{
        let reg = /[0-9a-zA-Z]{4,12}/
        if (!reg.test(value)){
          callback(new Error('请再次输入密码！'))
        }
        if (!value){
          callback(new Error('请再次输入密码！'))
        }if (value != this.signUp.password){
          callback(new Error('两次密码不一致！'))
        } else {
          callback()
        }
      }
      let validUsername = (rule,value,callback)=>{
        let reg = /^[^ ]{0,10}$/
        if (!value){
          callback(new Error('用户名不能为空'))
        }
        if (!reg.test(value)){
          callback(new Error('请输入正确的用户名且不能超过10位！'))
        } else {
          callback()
        }
      }
      let validSex = (rule,value,callback)=>{
        if (!value){
          callback(new Error('请选择性别！'))
        } else {
          callback()
        }
      }
      let validPhone = (rule,value,callback)=>{
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!value){
          callback(new Error('手机不能为空！'))
        }if(!reg.test(value)){
          callback(new Error('请输入正确的手机号！'))
        }else {
          callback()
        }
      }
      let  validEmail = (rule,value,callback)=>{
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!value){
          callback (new Error('邮箱不能为空！'))
        } if (!reg.test(value)){
          callback(new Error('请输入正确的邮箱！'))
        }else {
          callback()
        }
      }
      return{
        dialogVisible: false,
        user:{
          account:'',
          password:''
        },
        signUp:{
          username:'',
          sex:'',
          account:'',
          password:'',
          phone:'',
          email:'',
          checkPassword:'',
        },
        rules:{
          account:[
            { validator:validAccount,trigger: 'blur'},
          ],
          password:[
            { validator:validPassword,trigger: 'blur'},
          ],
          checkPassword:[
            { validator:validCheckPassword,trigger: 'blur'},
          ],
          username:[
            { validator:validUsername,trigger: 'blur'},
          ],
          sex:[
            { validator:validSex,trigger: 'blur'},
          ],
          phone:[
            {validator:validPhone,trigger: 'blur'}
          ],
          email:[
            {validator:validEmail,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      doLogin(){
        this.postRequest("/doLogin",this.user).then(data=>{
          if (data){
            window.sessionStorage.setItem("user",JSON.stringify(data.obj));
            this.$router.replace("/home")
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit')
            this.postRequest("/signup/",this.signUp).then(resp=>{
              if (resp){
                this.signUp = {
                  username: '',
                  sex: '',
                  account: '',
                  password: '',
                  phone: '',
                  email: '',
                  checkPassword: '',
                }
                this.dialogVisible = false
                this.$refs[formName].resetFields();
              }
            })
          }
        });
      },
    }
  }
</script>
