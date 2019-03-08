<template>
    <div>
      <div>
        <div><el-tag type="primary">已结算承运单</el-tag></div>
      </div>
      <div style="margin-top: 5px">
        <el-table
          :data="carriers"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="carriersid"
            label="承运单编号"
            fixed
            width="100">
          </el-table-column>
          <el-table-column
            prop="sendlinkman"
            fixed
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="sendcompany"
            label="发货单位"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sendaddress"
            width="150"
            label="发货单位地址">
          </el-table-column>
          <el-table-column
            prop="sendphone"
            width="150"
            label="发货人电话">
          </el-table-column>
          <el-table-column
            prop="receivecompany"
            width="150"
            label="收货单位">
          </el-table-column>
          <el-table-column
            prop="fkReceiveaddress"
            width="150"
            label="收货单位地址">
          </el-table-column>
          <el-table-column
            prop="receivelinkman"
            label="收货人">
          </el-table-column>
          <el-table-column
            prop="receivephone"
            width="150"
            label="收货人电话">
          </el-table-column>
          <el-table-column
            prop="leaverdate"
            width="150"
            label="承运日期">
          </el-table-column>
          <el-table-column
            prop="receivedate"
            width="150"
            label="收货时间">
          </el-table-column>
          <el-table-column
            label="完成情况">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.finishedstate==0" type="danger">待调度</el-tag>
              <el-tag v-else-if="scope.row.finishedstate==1" type="info">已调度</el-tag>
              <el-tag v-else-if="scope.row.finishedstate==2" type="warning">已签收</el-tag>
              <el-tag v-else type="success">已结算</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="insurancecost"
            label="保险费">
          </el-table-column>
          <el-table-column
            prop="transportcost"
            label="运费">
          </el-table-column>
          <el-table-column
            prop="othercost"
            label="其他费用">
          </el-table-column>
          <el-table-column
            prop="totalcost"
            label="合计费用">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="checkintime"
            width="150"
            label="录入时间">
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
    </div>
</template>

<script>
    export default {
        name: "History",
      data(){
          return{
            carriers:[],
            pageSize:10,
            currentPage:1,
            total:0,
          }
      },
      mounted(){
         this.initcarriers();
      },
      methods:{
        currentChange(val){
          this.currentPage = val;
          this.initcarriers()
        },
        sizeChange(val){
          this.pageSize=val;
          this.initcarriers()
        },
          initcarriers(){
            this.getRequest("/history/?page="+this.currentPage+"&size="+this.pageSize).then(resp=>{
              if (resp){
                this.carriers=resp.data;
                this.total=resp.total
              }
            })
          },

      }
    }
</script>

<style scoped>

</style>
