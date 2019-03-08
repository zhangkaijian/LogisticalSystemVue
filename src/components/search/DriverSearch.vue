<template>
  <div>
    <div style="margin-top: 5px;display: flex;justify-content:flex-start;">
      <div style="margin-left: 8px">
        <el-input placeholder="请输入您要查询的内容" v-model="queryContent">
          <el-select v-model="filed" slot="prepend" placeholder="请选择" style="width: 100px">
            <el-option label="请选择" value="请选择"></el-option>
            <el-option label="车牌编号" value="truckid"></el-option>
            <el-option label="车牌号码" value="number"></el-option>
            <el-option label="吨位" value="tonnage"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="initTrucks "></el-button>
        </el-input>
      </div>
      <div style=" width: 135px;margin-left: 8px" >
        <el-select v-model="truckTypes" @change="initTrucks">
          <el-option
            v-for="item in types"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div style="margin-left: 8px">
        <el-date-picker
          style="width: 300px"
          @change="initTrucks"
          v-model="daterange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="查询购车日期"
          end-placeholder="开始/结束">
        </el-date-picker>
      </div>
    </div>
    <div style="margin-top: 5px">
      <el-table
        ref="multipleTable" @selection-change="handleSelectionChange"
        :data="trucks"
        stripe
        border
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props" >
            <el-form label-position="left" inline class="demo-table-expand label" style="margin-left: 60px">
              <el-form-item label="车队编号:">
                <span>{{ props.row.truckTeam.teamid}}</span>
              </el-form-item >
              <el-form-item label="车队名称:">
                <span>{{ props.row.truckTeam.teamname}}</span>
              </el-form-item>
              <br/>
              <el-form-item label="车队负责人:">
                <span>{{ props.row.truckTeam.leader}}</span>
              </el-form-item>
              <el-form-item label="创队时间:">
                <span>{{ props.row.truckTeam.checkintime}}</span>
              </el-form-item>
              `<br/>
              <el-form-item label="备注:">
                <span>{{ props.row.truckTeam.remark}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
    <el-dialog :title="flag" :visible.sync="dialogVisible" width="30%">
      <div style="padding-right: 77px;">
        <el-form ref="truck" label-width="80px" :moderl="truck">
          <el-form-item label="车牌号" >
            <el-input v-model="truck.number" prpo="number" placeholder="输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="购买日期">
            <el-date-picker v-model="truck.buydate" type="date" placeholder="选择购买日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-input v-model="truck.type" placeholder="输入车辆类型"></el-input>
          </el-form-item>
          <el-form-item label="入队时长">
            <el-input v-model="truck.length" placeholder="选择入队时长"></el-input>
          </el-form-item>
          <el-form-item label="吨位">
            <el-input v-model="truck.tonnage" placeholder="输入吨位"></el-input>
          </el-form-item>
          <el-form-item label="所属车队">
            <el-select v-model="truck.fkTeamid" @change="initTrucks">
              <el-option
                v-for="item in teams"
                :key="item.teamid"
                :label="item.teamname"
                :value="item.teamid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态">
            <el-switch
              v-model="truck.state"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="承运中"
              inactive-text="空闲中"
              active-value="1"
              inactive-value="2">
            </el-switch>
          </el-form-item>
          <el-form-item label="加入时间">
            <el-date-picker v-model="truck.checkintime" type="date" placeholder="选择加入时间" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="2" v-model="truck.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "TruckMana",
    data(){
      return{
        trucks:[],
        teams:[],
        types:[],
        total:0,
        pageSize:10,
        currentPage:1,
        flag:'',
        dialogVisible: false,
        daterange:null,
        filed:'请选择',
        queryContent:'',
        truckTypes:'全部车辆类型',
        truck:{
          truckid:'',
          number:'',
          buydate:null,
          type:'',
          length:'',
          tonnage:'',
          fkTeamid:'',
          state:0,
          remark:'',
          checkintime:null,
          isdelete:-1,
          altertime:null
        }
      }
    },
    mounted(){
      this.initTrucks();
      this.initTypes();
    },
    methods:{
      currentChange(val){
        this.currentPage = val;
        this.initTrucks()
      },
      sizeChange(val){
        this.pageSize=val;
        this.initTrucks()
      },
      initTypes(){
        this.getRequest('/truck/types').then(resp=>{
          if (resp){
            this.types = resp
          }
        })
      },
      initTrucks(){
        let url = '/search/?type='+this.truckTypes+'&size='+this.pageSize+'&page='+this.currentPage+'&filed='+this.filed;
        if (this.daterange) {
          url +='&daterange='+this.daterange;
        }
        if (this.queryContent){
          url +='&queryContent='+this.queryContent
        }
        this.getRequest(url).then(resp=>{
          if (resp){
            this.trucks = resp.data;
            this.total = resp.total
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        const length = this.multipleSelection.length;
        for (let i = 0 ; i <length; i++){
          this.delArr.push(this.multipleSelection[i].truckid)
          console.log(this.delArr)
        }
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
