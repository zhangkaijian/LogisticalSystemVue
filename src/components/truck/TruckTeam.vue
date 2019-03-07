<template>
    <div>
      <div >
        <div style="display: flex;justify-content: flex-start">
        <div>
          <el-button icon="el-icon-circle-plus" @click="showAddTruckTeamView" type="primary" plain >添加车队信息</el-button>
        </div>
          <div style="margin-left: 8px">
            <el-button icon="el-icon-error" @click="delAll" type="danger" plain>批量删除</el-button>
          </div>
        <div>
          <el-input placeholder="请输入您要查询的内容" v-model="queryContent" style="width: 400px;margin-left: 8px">
            <el-select v-model="filed" slot="prepend" style="width: 100px">
              <el-option label="请选择" value="请选择"></el-option>
              <el-option label="车队编号" value="teamid"></el-option>
              <el-option label="车队名称" value="teamname"></el-option>
              <el-option label="车队负责人" value="leader"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="initTeams "></el-button>
          </el-input>
        </div>
        </div>
        <div>
          <el-dialog title="添加车队信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="truckTeam" label-width="90px" :moderl="truckTeam" style="margin-right: 67px;">
              <el-form-item label="车队名称" >
                <el-input v-model="truckTeam.teamname" prpo="teamname" placeholder="输入车队名称"></el-input>
              </el-form-item>
              <el-form-item label="车队负责人" >
                <el-input v-model="truckTeam.leader" prpo="leader" placeholder="输入车队负责人"></el-input>
              </el-form-item>
              <el-form-item label="创队时间">
                <el-date-picker v-model="truckTeam.checkintime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="truckTeam.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTruckTeam" v-if="flag=='修改车队信息'">修改</el-button>
                <el-button type="primary"  @click="doAddTruckTeam"v-if="flag=='添加车队信息'">添加</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div style="margin-top: 5px">
          <el-table
            ref="multipleTable" @selection-change="handleSelectionChange"
            :data="teams"
            stripe
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="teamid"
              label="车队编号">
            </el-table-column>
            <el-table-column
              prop="teamname"
              label="车队名称">
            </el-table-column>
            <el-table-column
              prop="leader"
              label="车队负责人">
            </el-table-column>
            <el-table-column
              prop="checkintime"
              label="创队时间">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
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
      </div>
</template>

<script>
    export default {
      name: "TruckTeam",
      data(){
        return{
          teams:[],
          queryContent:'',
          pageSize:10,
          currentPage:1,
          total:0,
          flag:'',
          filed:'请选择',
          multipleSelection:[],
          delArr:[],
          dialogVisible:false,
          truckTeam:{
            teamid:'',
            teamname:'',
            leader:'',
            remark:'',
            checkintime:null,
            isdelete:-1,
            altertime:null,
          }
        }
      },
      mounted(){
        this.initTeams();
      },
      methods:{
        sizeChange(val){
          this.pageSize = val
          this.initTeams()
        },
        currentChange(val){
          this.currentPage = val
          this.initTeams()
        },
        initTeams(){
          let url = "/truck/team/?size="+this.pageSize+"&page="+this.currentPage+"&filed="+this.filed
          if (this.queryContent){
            url = url + "&queryContent="+this.queryContent
          }
          this.getRequest(url).then(resp=>{
            if(resp){
              this.teams = resp.data;
              this.total = resp.total;
            }
          })
        },
        handleEdit(index,row){
          this.flag='修改车队信息'
          this.dialogVisible = true
          this.truckTeam = row;
        },
        handleDelete(index,row){
          this.$confirm('此操作将永久删除该记录, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/truck/team/"+row.teamid).then(resp=>{
              if (resp){
                this.initTeams()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        updateTruckTeam(){
          this.putRequest("/truck/team/",this.truckTeam).then(resp=>{
            if (resp){
              this.dialogVisible = false
              this.initTeams();
              this.truckTeam ={
                teamid:'',
                  teamname:'',
                  leader:'',
                  remark:'',
                  checkintime:null,
                  isdelete:-1,
                  altertime:null,
              }
            }
          })
        },
        doAddTruckTeam(){
          this.postRequest("/truck/team/",this.truckTeam).then(resp=>{
              if (resp){
                this.dialogVisible = false
                this.initTeams();
              }
            }
          )
        },
        showAddTruckTeamView(){
          this.flag='添加车队信息'
          this.dialogVisible = true
          this.truckTeam ={
            teamid:'',
            teamname:'',
            leader:'',
            remark:'',
            checkintime:null,
            isdelete:-1,
            altertime:null,
          }
        },
        handleSelectionChange(val) {
          console.log(val)
          this.multipleSelection = val;
          const length = this.multipleSelection.length;
          for (let i = 0 ; i <length; i++){
            this.delArr.push(this.multipleSelection[i].teamid)
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
              this.postRequest("/truck/team/deleteAll", this.delArr).then(resp => {
                if (resp) {
                  this.delArr = []
                  this.initTeams()
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

<style scoped>

</style>
