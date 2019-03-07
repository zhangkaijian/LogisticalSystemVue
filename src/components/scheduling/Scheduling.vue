<template>
  <div>
    <div>
      <el-tag type="danger">待调度承运单</el-tag>
    </div>
    <div>
      <div style="margin-top: 5px">
        <el-table
          ref="multipleTable"
          :data="carrierss" stripe border
          style="width: 100%">
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
            width="80">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="500"
                trigger="click">
                <div style="display: flex;justify-content:space-between;align-items: center">
                  <span style="font-size: 20px">可调度车辆</span>
                  <span style="margin-left: 50px">调度出发时间:</span>
                  <el-date-picker
                    value-format="yyyy-MM-dd HH:mm"
                    v-model="sche.startTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <el-table :data="trucks">
                  <el-table-column width="150" property="truckid" label="车辆编号"></el-table-column>
                  <el-table-column width="100" property="number" label="车牌号"></el-table-column>
                  <el-table-column width="300" property="type" label="车辆类型"></el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleEdit2(scope.$index, scope.row)">调度该车辆</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" size="mini" type="success" @click="handleEdit1(scope.$index, scope.row)">调度</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <hr/>
      <div><el-tag>已调度承运单</el-tag></div>
      <div style="margin-top: 5px">
        <el-table
          ref="multipleTable"
          :data="scheduling" stripe border
          style="width: 100%">
          <el-table-column
            fixed
            prop="schedulingid"
            label="调度编号"
            width="80">
          </el-table-column>
          <el-table-column
            fixed
            prop="starttime"
            label="出发时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="fkCarriersid"
            label="承运单编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fkTruckid"
            label="车辆编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="oilcost"
            label="油费"
            width="70">
          </el-table-column>
          <el-table-column
            prop="toll"
            label="过桥费"
            width="80">
          </el-table-column>
          <el-table-column
            prop="fine"
            label="罚款"
            width="80">
          </el-table-column>
          <el-table-column
            prop="othercost"
            label="其他费用"
            width="80">
          </el-table-column>
          <el-table-column
            prop="totalcost"
            label="合计成本"
            width="80">
          </el-table-column>
          <el-table-column
            prop="fkUserid"
            label="调度员"
            width="60">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            label="调度时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="aaa(scope.$index, scope.row)">修改费用信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="修改费用" :visible.sync="dialogVisible" width="27%" :before-close="handleClose">
      <el-form :model="money" label-width="80px" style="width: 79%">
        <el-form-item label="油费">
          <el-input v-model="money.oilcost" placeholder="请输入油费"></el-input>
        </el-form-item>
        <el-form-item label="过桥费">
          <el-input v-model="money.toll" placeholder="请输入过桥费"></el-input>
        </el-form-item>
        <el-form-item label="罚款">
          <el-input v-model="money.fine" placeholder="请输入罚款"></el-input>
        </el-form-item>
        <el-form-item label="其他费用">
          <el-input v-model="money.othercost" placeholder="请输入其他费用"></el-input>
        </el-form-item>
        <el-form-item label="合计成本">
          <el-input v-model="money.totalcost" placeholder="请输入合计成本"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" v-model="money.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateScheMoney">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Scheduling",
        data(){
          return{
            dialogVisible:false,
            carrierss:[],
            trucks:[],
            scheduling:[],
            sche:{
              truckid:'',
              carriersid:'',
              startTime:'',
            },
            money:{
              schedulingid:'',
              oilcost:'',
              toll:'',
              fine:'',
              othercost:'',
              totalcost:'',
              remark:''
            }
          }
        },
      mounted(){
        this.initCarriers()
        this.initTrucks()
        this.initSche()
      },
      methods:{
          initTrucks(){
            this.getRequest("/sche/truck").then(resp=>{
              if (resp){
                this.trucks = resp
              }
            })
          },
          initSche(){
            this.getRequest("/sche/").then(resp=>{
              if (resp){
                this.scheduling = resp.data
                console.log(resp)
              }
            })
          },
          initCarriers(){
            this.getRequest("/sche/carriers").then(resp=>{
              if (resp){
                this.carrierss = resp.data
              }
            })
          },
        handleEdit1(index, row){
          console.log(index,row)
          this.sche.carriersid = row.carriersid;
        },
        handleEdit2(index, row){
          console.log(row.truckid)
          console.log(this.sche.carriersid)
          this.sche.truckid = row.truckid
          if (this.sche.startTime){
            this.$confirm('确定用改车辆调度此承运单？, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.postRequest("/sche/",this.sche).then(resp=>{
                if (resp){
                  this.initCarriers()
                  this.initTrucks()
                  this.initSche()
                  this.sche={
                    truckid:'',
                    carriersid:'',
                    startTime:'',
                  }
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消调度'
              });
            });
          }else {
            this.$message.error('请选择出发时间！！');
          }
        },
        aaa(index, row){
            this.dialogVisible = true;
            this.money = row
        },
        updateScheMoney(){
            this.putRequest("/sche/",this.money).then(resp=>{
              if (resp){
                this.dialogVisible = false
                this.initSche()
                this.money = {
                  schedulingid:'',
                  oilcost:'',
                  toll:'',
                  fine:'',
                  othercost:'',
                  totalcost:'',
                  remark:''
                }
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
