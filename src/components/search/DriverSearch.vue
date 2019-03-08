<template>
  <div>
    <div></div>
    <div style="margin-top: 5px">
      <el-tag type="primary">承运中车辆</el-tag>
      <el-table
        :data="trucks">
        <el-table-column
          prop="truckid"
          label="车辆编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="number"
          label="车牌号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="buydate"
          label="购买日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="车辆类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="length"
          label="入队时长"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tonnage"
          label="吨位"
          width="80">
        </el-table-column>
        <el-table-column
          prop="truckTeam.teamname"
          label="所属车队"
          width="80">
        </el-table-column>
        <el-table-column
          label="车辆状态"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state==2">空闲中</el-tag>
            <el-tag type="danger" v-else>承运中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkintime"
          label="加入时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200">
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
  </div>
</template>

<script>
  export default {
    name: "DriverSearch",
    data() {
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        dialogVisible: false,
        trucks: {
          truckid: '',
          number: '',
          buydate: null,
          type: '',
          length: '',
          tonnage: '',
          fkTeamid: '',
          state: 0,
          remark: '',
          checkintime: null,
          isdelete: -1,
          altertime: null
        }
      }
    },
    mounted() {
      this.initTrucks();
    },
    methods: {
      initTrucks(){
        this.getRequest("/search/").then(resp=>{
          if (resp){
            this.trucks = resp.data;
            this.total = resp.total
          }
        })
      },
    }
  }

</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
</style>
