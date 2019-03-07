<template>
    <div>
      <div style="display: flex;justify-content: flex-start;align-items: center">
        <el-tag type="warning">已签收/待结算承运单</el-tag>
        <div style="margin-left: 8px">
          <el-input placeholder="请输入您要查询的内容" v-model="key">
            <el-select v-model="field" slot="prepend" placeholder="请选择" style="width: 100px">
              <el-option label="承运单编号" value="carriersid"></el-option>
              <el-option label="承运车辆编号" value="fktruckid"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="initCost"></el-button>
          </el-input>
        </div>
        <div style="margin-left: 8px">
          <el-date-picker
            style="width: 300px"
            @change="initCost"
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="收货日期查询"
            end-placeholder="开始/结束">
          </el-date-picker>
        </div>
        <div style="margin-left: 8px">
          <el-popover
            placement="right-end"
            title="已结算承运单记录"
            width="1000"
            trigger="click">
            <el-table ref="multipleTable" :data="okCost" stripe border style="width: 100%">
              <el-table-column
                prop="carriersid"
                label="承运单编号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="scheduling.fkTruckid"
                label="承运车辆编号"
                width="120">
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
                  <el-tag v-if="scope.row.finishedstate==1">已调度</el-tag>
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
                prop="scheduling.oilcost"
                label="油费"
                width="70">
              </el-table-column>
              <el-table-column
                prop="scheduling.toll"
                label="过桥费"
                width="80">
              </el-table-column>
              <el-table-column
                prop="scheduling.fine"
                label="罚款"
                width="80">
              </el-table-column>
              <el-table-column
                prop="scheduling.othercost"
                label="其他费用"
                width="80">
              </el-table-column>
              <el-table-column
                prop="scheduling.totalcost"
                label="合计成本"
                width="80">
              </el-table-column>
              <el-table-column
                prop="fkUserid"
                label="业务员"
                width="100">
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="success">查看已结算的承运单</el-button>
          </el-popover>
        </div>
      </div>
      <div style="margin-top: 5px">
        <el-table ref="multipleTable" :data="cost" stripe border style="width: 100%">
          <el-table-column
            prop="carriersid"
            label="承运单编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="scheduling.fkTruckid"
            label="承运车辆编号"
            width="120">
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
              <el-tag v-if="scope.row.finishedstate==1">已调度</el-tag>
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
            prop="scheduling.oilcost"
            label="油费"
            width="70">
          </el-table-column>
          <el-table-column
            prop="scheduling.toll"
            label="过桥费"
            width="80">
          </el-table-column>
          <el-table-column
            prop="scheduling.fine"
            label="罚款"
            width="80">
          </el-table-column>
          <el-table-column
            prop="scheduling.othercost"
            label="其他费用"
            width="80">
          </el-table-column>
          <el-table-column
            prop="scheduling.totalcost"
            label="合计成本"
            width="80">
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
                type="primary"
                @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">结算</el-button>
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
      <el-dialog title="修改费用" :visible.sync="dialogVisible" width="27%" :before-close="handleClose">
        <el-form :model="allMoney" label-width="80px" style="width: 82%">
          <el-form-item label="保险费">
            <el-input v-model="allMoney.insurancecost" placeholder="请输入邮费"></el-input>
          </el-form-item>
          <el-form-item label="运费">
            <el-input v-model="allMoney.transportcost" placeholder="请输入邮费"></el-input>
          </el-form-item>
          <el-form-item label="其他费用">
            <el-input v-model="allMoney.othercost" placeholder="请输入邮费"></el-input>
          </el-form-item>
          <el-form-item label="合计费用">
            <el-input v-model="allMoney.totalcost" placeholder="请输入邮费"></el-input>
          </el-form-item>
          <el-form-item label="油费">
            <el-input v-model="allMoney.scheduling.oilcost" placeholder="请输入油费"></el-input>
          </el-form-item>
          <el-form-item label="过桥费">
            <el-input v-model="allMoney.scheduling.toll" placeholder="请输入过桥费"></el-input>
          </el-form-item>
          <el-form-item label="罚款">
            <el-input v-model="allMoney.scheduling.fine" placeholder="请输入罚款"></el-input>
          </el-form-item>
          <el-form-item label="其他费用">
            <el-input v-model="allMoney.scheduling.othercost" placeholder="请输入其他费用"></el-input>
          </el-form-item>
          <el-form-item label="合计成本">
            <el-input v-model="allMoney.scheduling.totalcost" placeholder="请输入合计费用"></el-input>
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
        name: "Cost",
        data(){
          return{
            dialogVisible:false,
            cost:[],
            okCost:[],
            total:'',
            pageSize:10,
            currentPage:1,
            daterange:null,
            field:'',
            key:'',
            carriersid:'',
            allMoney:{
              insurancecost:'',
              transportcost:'',
              othercost:'',
              totalcost:'',
              scheduling:{
                oilcost:'',
                toll:'',
                fine:'',
                othercost:'',
                totalcost:''
              }
            }
          }
        },
        mounted(){
          this.initCost()
          this.initOkCost()
        },
        methods:{
          initCost(){
            let url = "/cost/?state=2"+"&page="+this.currentPage+"&size="+this.pageSize
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
                this.cost = resp.data
                this.total = resp.total
              }
            })
          },
          currentChange(val){
            this.currentPage = val;
            this.initCost()
          },
          sizeChange(val){
            this.pageSize=val;
            this.initCost()
          },
          initOkCost(){
            this.getRequest("/cost/?state="+3).then(resp=>{
              if (resp){
                this.okCost = resp.data
              }
            })
          },
          handleEdit(index,row){
            this.carriersid = row.carriersid;
            this.$confirm('此操作将永久结算该承运单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest("/cost/upstate?carriersid="+this.carriersid).then(resp=>{
                if (resp){
                  this.initCost();
                  this.initOkCost()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消结算'
              });
            });
          },
          handleUpdate(index,row){
            this.dialogVisible = true
            this.allMoney = row
            console.log(this.allMoney)
          },
          updateScheMoney(){
            this.putRequest("/cost/",this.allMoney).then(resp=>{
              if (resp){
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
