<template>
    <div>
      <div style="display: flex;justify-content: flex-start;align-items: center">
        <el-tag type="success">核算车队费用</el-tag>
        <div style="margin-left: 8px">
          <el-date-picker
            style="width: 300px"
            @change="initCostSum"
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="查询合计日期"
            end-placeholder="开始/结束">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div style="margin-top: 5px">
          <el-table
            ref="multipleTable"
            :data="sum"
            stripe
            border
            style="width: 100%">
            <el-table-column
              prop="teamName"
              label="车队名称">
            </el-table-column>
            <el-table-column
              prop="ctotalCost"
              label="合计费用">
            </el-table-column>
            <el-table-column
              prop="stotalCost"
              label="合计成本">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CostStatistic",
        data(){
          return{
            sum:[],
            daterange:''
          }
        },
        mounted(){
          this.initCostSum()
        },
        methods:{
          initCostSum(){
            let url = "/cost/sum"
            if (this.daterange) {
              url += '?daterange='+this.daterange
            }
            this.getRequest(url).then(resp=>{
              if (resp){
                this.sum = resp
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
