<template>
    <div>
      <div style="display: flex;justify-content: flex-start">
        <div>
          <el-button icon="el-icon-circle-plus" @click="showAddTaskView" type="primary" plain >添加承运单</el-button>
        </div>
        <div style="margin-left: 8px">
          <el-button icon="el-icon-error" @click="delAll" type="danger" plain>批量删除</el-button>
        </div>
        <!--<div style="margin-left: 8px;width: 150px">-->
          <!--<el-select v-model="queryState" @change="initCarriers">-->
            <!--<el-option label="全部状态" value="全部状态"></el-option>-->
            <!--<el-option label="待调度" value="0"></el-option>-->
            <!--<el-option label="已调度" value="1"></el-option>-->
            <!--<el-option label="已签收" value="2"></el-option>-->
            <!--<el-option label="已结算" value="3"></el-option>-->
          <!--</el-select>-->
        <!--</div>-->
        <div style="margin-left: 8px">
          <el-input placeholder="请输入您要查询的内容" v-model="key">
            <el-select v-model="field" slot="prepend" placeholder="请选择" style="width: 100px">
              <el-option label="发货单位" value="sendcompany"></el-option>
              <el-option label="收货单位" value="receivecompany"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="initCarriers "></el-button>
          </el-input>
        </div>
        <div style="margin-left: 8px">
          <el-date-picker
            style="width: 300px"
            @change="initCarriers"
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="录入时间查询"
            end-placeholder="开始/结束">
          </el-date-picker>
        </div>
      </div>
      <div style="margin-top: 5px">
        <el-table
          ref="multipleTable" :data="carrierss" stripe border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column
            fixed
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="carriersid"
            label="承运单编号"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="sendcompany"
            label="发货单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sendaddress"
            label="发货单位地址"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sendlinkman"
            label="发货人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sendphone"
            label="发货人电话"
            width="100">
          </el-table-column>
          <el-table-column
            prop="receivecompany"
            label="收货单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="fkReceiveaddress"
            label="收货单位地址"
            width="120">
          </el-table-column>
          <el-table-column
            prop="receivelinkman"
            label="收货人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="receivephone"
            label="收货人电话"
            width="100">
          </el-table-column>
          <el-table-column
            prop="leaverdate"
            label="承运日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="receivedate"
            label="收货日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="finishedstate"
            label="完结情况"
            width="100">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.finishedstate==0">待调度</el-tag>
              <el-tag type="info" v-if="scope.row.finishedstate==1">已调度</el-tag>
              <el-tag type="warning" v-if="scope.row.finishedstate==2">已签收</el-tag>
              <el-tag type="success" v-if="scope.row.finishedstate==3">已结算</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="insurancecost"
            label="保险费"
            width="100">
          </el-table-column>
          <el-table-column
            prop="transportcost"
            label="运费"
            width="100">
          </el-table-column>
          <el-table-column
            prop="othercost"
            label="其他费用"
            width="100">
          </el-table-column>
          <el-table-column
            prop="totalcost"
            label="合计费用"
            width="100">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="100">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="录入时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fkUserid"
            label="业务员"
            width="100">
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
      </div>
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
      <div>
        <el-dialog
          :title="flag"
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose">
        <div>
          <el-form ref="carriers" :model="carriers" label-width="150px">
            <el-row>
              <el-col :span="10">
                <el-form-item label="发货单位">
                  <el-input v-model="carriers.sendcompany"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="发货单位地址">
                  <el-input v-model="carriers.sendaddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="发货人">
                  <el-input v-model="carriers.sendlinkman"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="发货人电话">
                  <el-input v-model="carriers.sendphone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="收货单位">
                  <el-input v-model="carriers.receivecompany"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收货单位地址">
                  <el-input v-model="carriers.fkReceiveaddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="收货人">
                  <el-input v-model="carriers.receivelinkman"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收货人电话">
                  <el-input v-model="carriers.receivephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="承运日期">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="carriers.leaverdate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收货时间">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="carriers.receivedate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="完结情况">
                  <el-select v-model="carriers.finishedstate" disabled placeholder="待调度" style="width: 183px">
                    <el-option label="待调度" value="0"></el-option>
                    <el-option label="已调度" value="1"></el-option>
                    <el-option label="已签收" value="2"></el-option>
                    <el-option label="已结算" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="保险费">
                  <el-input v-model="carriers.insurancecost"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="运费">
                  <el-input v-model="carriers.transportcost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="其他费用">
                  <el-input v-model="carriers.othercost"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="合计费用">
                  <el-input v-model="carriers.totalcost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="备注">
                  <el-input v-model="carriers.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="doAddTask" v-if="flag=='添加承运单信息'">添加</el-button>
          <el-button type="primary" @click="doUpdateTask" v-if="flag=='修改承运单信息'">修改</el-button>
        </span>
      </el-dialog></div>
    </div>
</template>

<script>
    export default {
        name: "WriteOrder",
        data(){
          return{
            flag:'',
            dialogVisible : false,
            carrierss:[],
            multipleSelection:[],
            delArr:[],
            daterange:'',
            field:'',
            key:'',
            pageSize:10,
            currentPage:1,
            total:'',
            carriers:{
              carriersid:'',
              sendcompany:'',
              sendaddress:'',
              sendlinkman:'',
              sendphone:'',
              receivecompany:'',
              fkReceiveaddress:'',
              receivelinkman:'',
              receivephone:'',
              leaverdate:'',
              receivedate:'',
              finishedstate:'',
              insurancecost:'',
              transportcost:'',
              othercost:'',
              totalcost:'',
              remark:'',
            }
          }
        },
        mounted(){
          this.initCarriers()
        },
        methods:{
          initCarriers(){
            let url = "/task/?state="+0+"&page="+this.currentPage+"&size="+this.pageSize
            if (this.daterange){
              url += '&daterange='+this.daterange
            }
            if(this.field){
              url +='&field='+this.field
            }
            if(this.key){
              url +='&key='+this.key
            }
            this.getRequest(url).then(resp=>{
              if (resp){
                this.carrierss = resp.data;
                this.total = resp.total
              }
            })
          },
          currentChange(val){
            this.currentPage = val;
            this.initCarriers()
          },
          sizeChange(val){
            this.pageSize=val;
            this.initCarriers()
          },
          showAddTaskView(){
            this.flag = '添加承运单信息'
            this.dialogVisible = true
            this.carriers = {
              carriersid:'',
              sendcompany:'',
              sendaddress:'',
              sendlinkman:'',
              sendphone:'',
              receivecompany:'',
              fkReceiveaddress:'',
              receivelinkman:'',
              receivephone:'',
              leaverdate:'',
              receivedate:'',
              finishedstate:'',
              insurancecost:'',
              transportcost:'',
              othercost:'',
              totalcost:'',
              remark:'',
            }
          },
          doAddTask(){
            this.postRequest("/task/",this.carriers).then(resp=>{
              if (resp){
                this.dialogVisible = false
                this.initCarriers()
              }
            })
          },
          handleEdit(index,row){
            this.flag = '修改承运单信息'
            this.dialogVisible = true
            this.carriers = row
          },
          doUpdateTask(){
            this.putRequest("/task/",this.carriers).then(resp=>{
              if (resp){
                this.dialogVisible = false;
                this.initCarriers()
              }
            })
          },
          handleDelete(index,row){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteRequest("/task/"+row.carriersid).then(resp=>{
                if (resp){
                  this.initCarriers()
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
            this.multipleSelection = val;
            const length = this.multipleSelection.length;
            for (let i = 0 ; i <length; i++){
              this.delArr.push(this.multipleSelection[i].carriersid)
              console.log(this.delArr)
            }
          },
          delAll(){
            if (this.delArr.length == 0){
              this.$message({
                message: '警告，请选择要批量删除的记录',
                type: 'warning'
              });
            }else{
              console.log(this.delArr)
              this.$confirm('此操作将永久批量删除该记录, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.postRequest("/task/deleteAll", this.delArr).then(resp => {
                  if (resp) {
                    this.delArr = []
                    this.initCarriers()
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
        }
    }
</script>

<style >
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 193px;}
</style>
