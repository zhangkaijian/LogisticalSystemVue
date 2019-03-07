<template>
    <div>
      <div style="display: flex;justify-content: flex-start;align-items: center">
        <el-tag>已调度/待签收承运单</el-tag>
        <div style="margin-left: 8px">
          <el-input placeholder="请输入您要查询的内容" v-model="key">
            <el-select v-model="field" slot="prepend" placeholder="请选择" style="width: 100px">
              <el-option label="发货单位" value="sendcompany"></el-option>
              <el-option label="收货单位" value="receivecompany"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="initCarriers"></el-button>
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
        <div style="margin-left: 8px">
          <el-popover
            placement="bottom"
            title="已签收承运单记录"
            width="1000"
            trigger="click">
            <el-table
              ref="multipleTable" :data="accepts" stripe border style="width: 100%">
              <el-table-column
                prop="carriersid"
                label="承运单编号"
                width="100">
              </el-table-column>
              <el-table-column
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
            </el-table>
            <el-button slot="reference" type="warning" round>查看已签收的承运单</el-button>
          </el-popover>
        </div>
      </div>
      <div style="margin-top: 5px">
        <el-table
          ref="multipleTable" :data="carr" stripe border style="width: 100%">
          <el-table-column
            fixed
            prop="carriersid"
            label="承运单编号"
            width="100">
          </el-table-column>
          <el-table-column
            fixed
            prop="scheduling.fkTruckid"
            label="承运车辆编号"
            width="120">
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
            width="110">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="accept(scope.$index, scope.row)">承运单签收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
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
    </div>
</template>

<script>
    export default {
        name: "ReceiveOrder",
        data(){
          return{
            accepts:[],
            carr:[],
            fkTruckid:'',
            carriersid:'',
            pageSize:10,
            currentPage:1,
            total:'',
            daterange:'',
            field:'',
            key:''
          }
        },
        mounted(){
          this.initCarriers()
          this.initCarriersAccept()
        },
        methods:{
          initCarriers(){
            let url = "/task/sch/?state="+1+"&page="+this.currentPage+"&size="+this.pageSize
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
                this.carr = resp.data
                this.total = resp.total
              }
            })
          },
          initCarriersAccept(){
           this.getRequest("/task/?state="+2).then(resp=>{
             if (resp){
               this.accepts = resp.data;
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
          accept(index,row){
            this.fkTruckid = row.scheduling.fkTruckid
            this.carriersid = row.carriersid;
            this.$confirm('确定签收此承运单吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest("/task/accept?carriersid="+this.carriersid+"&fkTruckid="+this.fkTruckid).then(resp=>{
                if (resp){
                  this.initCarriers()
                  this.initCarriersAccept()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消签收'
              });
            });
          }
        }
    }
</script>

<style scoped>

</style>
