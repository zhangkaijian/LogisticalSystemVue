<template>
    <div>
      <div>
        <div style="display: flex;justify-content: flex-start">
          <el-button icon="el-icon-circle-plus" @click="showAddDriverView" type="primary" plain >添加驾驶员信息</el-button>
          <div style="margin-left: 8px">
            <el-button icon="el-icon-error" @click="delAll" type="danger" plain>批量删除</el-button>
          </div>
        </div>
      </div>
      <div style="margin-top: 5px">
        <el-table
          ref="multipleTable" @selection-change="handleSelectionChange"
          :data="drivers"
          stripe
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="driverid"
            label="驾驶员编号"
            width="90">
          </el-table-column>
          <el-table-column
            prop="name"
            width="80"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="sex"
            width="60"
            label="性别">
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.sex==1">男</el-tag>
              <el-tag  type="danger" v-if="scope.row.sex==2">女</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="birth"
            width="100"
            label="生日">
          </el-table-column>
          <el-table-column
            prop="phone"
            width="100"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="idcard"
            width="150"
            label="身份证号码">
          </el-table-column>
          <el-table-column
            prop="fkteamid"
            width="90"
            label="车队编号">
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.fkteamid==0">未绑定</el-tag>
              <el-tag  type="warning" v-else>{{scope.row.fkteamid}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            width="80"
            label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.state==2">空闲中</el-tag>
              <el-tag type="danger" v-if="scope.row.state==1">承运中</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkintime"
            width="100"
            label="加入时间">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="240">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-popover
                v-if="scope.row.fkteamid == 0"
                placement="left"
                title="可绑定的车辆"
                width="350"
                trigger="click">
                <el-table :data="NotBinding">
                  <el-table-column width="50" property="truckid" label="车辆编号"></el-table-column>
                  <el-table-column width="100" property="number" label="车牌号"></el-table-column>
                  <el-table-column width="100" property="type" label="车辆类型"></el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="binding2(scope.$index, scope.row)">绑定该车辆</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button
                  slot="reference"
                  size="mini"
                  type="primary"
                  @click="binding1(scope.$index, scope.row)">绑定车辆</el-button>
              </el-popover>
                <el-button
                  v-if="scope.row.fkteamid != 0"
                  slot="reference"
                  size="mini"
                  type="warning"
                  @click="notbinding(scope.$index, scope.row)">解绑车辆</el-button>
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
      </div>
      <div>
        <el-dialog
          :title="flag"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form ref="driver" :model="driver" label-width="80px" style="width: 80%">
            <el-form-item label="姓名">
              <el-input v-model="driver.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <template>
                  <el-radio v-model="driver.sex" label="1">男</el-radio>
                  <el-radio v-model="driver.sex" label="2">女</el-radio>
                </template>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="driver.birth"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="driver.phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="driver.idcard"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="driver.remark" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateDriver" v-if="flag=='修改驾驶员信息'">修改</el-button>
                <el-button type="primary"  @click="doAddDriver"v-if="flag=='添加驾驶员信息'">添加</el-button>
          </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          title="绑定车辆信息"
          :visible.sync="dialogVisible2"
          width="40%">
          <el-table :data="bindingTruck">
            <el-table-column width="100" property="truckid" label="车辆编号"></el-table-column>
            <el-table-column width="100" property="number" label="车牌号"></el-table-column>
            <el-table-column width="100" property="type" label="车辆类型"></el-table-column>
            <el-table-column property="tonnage" label="吨位" width="80"></el-table-column>
            <el-table-column prop="fkTeamid" label="所属车队" width="80"></el-table-column>
            <el-table-column>
            <el-button
              size="mini"
              type="danger"
              @click="deleteBinding">解绑该车辆</el-button>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DriverMana",
        data(){
          return{
            dialogVisible:false,
            dialogVisible2:false,
            flag:'',
            pageSize:10,
            currentPage:1,
            total:0,
            multipleSelection:[],
            delArr:[],
            drivers:[],
            NotBinding:[],
            bindingTruck:[],
            deleteBindingid:'',
            driver:{
              driverid:'',
              name:'',
              sex:'',
              birth:'',
              phone:'',
              idcard:'',
              fkteamid:0,
              state:'',
              remark:'',
              isdelete:'',
              altertime:''
            }
          }
        },
        mounted(){
          this.initDriver()
          this.initNotBinding()
        },
        methods: {
          sizeChange(val){
            this.pageSize = val
            this.initDriver()
          },
          currentChange(val){
            this.currentPage = val
            this.initDriver()
          },
          initDriver() {
            let url = "/driver/?page="+this.currentPage+"&size="+this.pageSize
            this.getRequest(url).then(resp => {
              this.drivers = resp.data
              this.total = resp.total
            })
          },
          showAddDriverView() {
            this.dialogVisible = true
            this.flag = '添加驾驶员信息'
            this.driver = {
              driverid: '',
              name: '',
              sex: '',
              birth: '',
              phone: '',
              idcard: '',
              fkteamid: '',
              state: '',
              remark: '',
              isdelete: '',
              altertime: ''
            }
          },
          doAddDriver() {
            this.postRequest("/driver/", this.driver).then(resp => {
              if (resp) {
                this.dialogVisible = false
                this.initDriver()
              }
            })
          },
          updateDriver(){
            this.putRequest("/driver/",this.driver).then(resp=>{
              if (resp){
                this.dialogVisible = false
                this.initDriver()
              }
            })
          },
          handleEdit(index,row) {
            this.flag = '修改驾驶员信息'
            this.driver = row
            this.dialogVisible = true
          },
          handleDelete(index,row){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteRequest("/driver/"+row.driverid).then(resp=>{
                if (resp){
                  this.initDriver()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
            const length = this.multipleSelection.length;
            for (let i = 0 ; i <length; i++){
              this.delArr.push(this.multipleSelection[i].driverid)
            }
          },
          delAll(){
            if (this.delArr.length == 0){
              this.$message({
                message: '警告，请选择要批量删除的记录',
                type: 'warning'
              });
            }else{
              this.$confirm('此操作将永久批量删除该记录, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.postRequest("/driver/deleteAll", this.delArr).then(resp => {
                  if (resp) {
                    this.delArr = []
                    this.initDriver()
                  }
                  this.delArr = []
                })
              }).catch(() => {
                this.delArr = []
                this.$refs.multipleTable.clearSelection();
                this.$message({
                  type: 'info',
                  message: '已取消删除',
                });
              });
            }
          },
          initNotBinding(){
            this.getRequest("/driver/getAllNotBindingTruck").then(resp=>{
              if (resp){
                this.NotBinding = resp
              }
            })
          },
          binding1(index,row){
            this.driver.driverid = row.driverid
          },
          binding2(index,row){
            this.$confirm('此操作将绑定该车辆, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.postKeyValueRequest("/driver/binding?driverid="+this.driver.driverid+"&truckid="+row.truckid).then(resp=>{
                if (resp){
                  this.initNotBinding();
                  this.initDriver();
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消绑定'
              });
            });
          },
          notbinding(index,row){
            this.dialogVisible2 = true
            this.deleteBindingid = row.driverid
            this.getRequest("/driver/getBindingTruck?driverid="+row.driverid).then(resp=>{
              if (resp){
                console.log(resp)
                this.bindingTruck = resp
              }
            })
          },
          deleteBinding(){
            this.$confirm('此操作将解绑该车辆, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.postKeyValueRequest("/driver/deleteBinding?driverid="+this.deleteBindingid).then(resp=>{
                if (resp){
                  this.dialogVisible2 = false
                  this.initDriver()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消绑定'
              });
            });
          }
        }
    }
</script>

<style >
  .el-button + .el-button {
    margin-left: 0px;
  }

</style>
