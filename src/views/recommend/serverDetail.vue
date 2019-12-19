<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime : 2019-12-18 15:23:20
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-input v-model="listQuery.serviceCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入编号"/>
      <!-- <el-input v-model="listQuery.label" clearable class="filter-item" style="width: 200px;" placeholder="请输入标签"/> -->
      <!-- <el-input v-model="listQuery.serviceRecommendCode" clearable class="filter-item" style="width: 300px;" placeholder="请输入服务商推荐类目编码"/> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleAdd">新增</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="编号" prop="serviceCode"/>
      <el-table-column align="center" min-width="100" label="姓名" prop="nickname"/>
      <el-table-column align="center" min-width="100" label="评分" prop="grade"/>
      <el-table-column align="center" min-width="100" label="成交数" prop="serviceNumber"/>
      <el-table-column align="center" min-width="100" label="案例数" prop="exampleNumber"/>
      <!-- <el-table-column align="center" min-width="100" label="标签" prop="label"/>
      <el-table-column align="center" min-width="100" label="标签图片">
        <template slot-scope="scope">
          <div><img v-show="scope.row.avatar" :src="scope.row.avatar" alt="暂无" style="height:50px;"></div>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 表单新增或编辑 -->
    <el-dialog :visible.sync="syncVisible" :title="title" width="70%">
      <el-card class="box-card">
        <div class="filter-container">
          <el-input v-model="dlistQuery.nickname" clearable class="filter-item" style="width:150px;" placeholder="请输入姓名"/>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleDialogFilter">查找</el-button>
        </div>
        <el-table v-loading="dlistLoading" ref="table" :data="dlist" element-loading-text="正在查询中。。。" border fit highlight-current-row style="height:400px;overflow-y:auto;widht:700px;" @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column align="center" min-width="100" label="编号" prop="serviceCode"/>
          <el-table-column align="center" min-width="100" label="姓名" prop="nickname"/>
          <el-table-column align="center" min-width="100" label="评分" prop="grade"/>
          <el-table-column align="center" min-width="100" label="成交数" prop="serviceNumber"/>
          <el-table-column align="center" min-width="100" label="案例数" prop="exampleNumber"/>
          <el-table-column align="center" min-width="100" label="标签" prop="label"/>
          <el-table-column align="center" min-width="100" label="标签图片">
            <template slot-scope="scope">
              <div><img v-show="scope.row.avatar" :src="scope.row.avatar" alt="暂无" style="height:50px;"></div>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="dtotal>0" :total="dtotal" :page.sync="dlistQuery.page" :limit.sync="dlistQuery.limit" @pagination="handleAdd" />
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fromSubmit('fromData')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
</style>

<script>
import { recommendListDetail, recommendRemovePool, recommendAddPool } from '@/api/recommend'
import { getUserList } from '@/api/user'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ServerRecommendDetail',
  components: { BackToTop, Pagination },
  filters: {
  },
  data() {
    return {
      logisticsFormVisible: false,
      logisticsForm: {
        type: undefined,
        good_code: undefined
      },
      commonType: undefined,
      list: [],
      total: 0,
      text: undefined,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      serviceRecommendCode: undefined,

      //   表单
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'id', // 标识列表数据中每一行的唯一键的名称
      dlist: [],
      dtotal: 0,
      dlistLoading: true,
      dlistQuery: {
        page: 1,
        limit: 20,
        type: -1
      },
      syncVisible: false
    }
  },
  computed: {
    title() {
      if (!this.dlistQuery.id) {
        return '新增'
      } else {
        return '编辑'
      }
    }
  },
  created() {
    this.init()
    this.getList()
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      console.log(data)
      this.listQuery.serviceRecommendCode = data.serviceRecommendCode
      this.serviceRecommendCode = data.serviceRecommendCode
    },
    getList() {
      this.listLoading = true
      recommendListDetail(this.listQuery).then(response => {
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDelete(row) {
      row.serviceRecommendCode = this.serviceRecommendCode
      recommendRemovePool(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    },
    handleAdd() {
      const _this = this
      _this.syncVisible = true
      getUserList(_this.dlistQuery).then(response => {
        _this.changePageCoreRecordData()
        _this.dlist = response.data.data.data
        _this.dtotal = response.data.data.page.total
        _this.dlistLoading = false
        console.log('dlist' + _this.dlist.length)
        setTimeout(() => {
          _this.setSelectRow()
          console.log('总数' + _this.multipleSelectionAll.length)
        }, 200)
      }).catch(() => {
        console.log('err')
        // this.$notify.error({
        //   title: '失败',
        //   message: response.data.errmsg
        // })
      })
    },
    handleDialogFilter() {
      // this.changePageCoreRecordData()
      this.dlistQuery.page = 1
      this.handleAdd()
    },
    // 设置选中的方法
    setSelectRow() {
      console.log('未进入')
      console.log(this.multipleSelectionAll.length)
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      console.log('进入')
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []

      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      this.$refs.table.clearSelection()
      for (var i = 0; i < this.dlist.length; i++) {
        if (selectAllIds.indexOf(this.dlist[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.dlist[i], true)
        }
      }
      console.log('结束')
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // debugger
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })

      const noSelectIds = []
      // 得到当前页没有选中的id
      this.dlist.forEach(row => {
        // debugger
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => { // 没有选中的ID和已选中的ID对比 相同则删除
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              // debugger
              that.multipleSelectionAll.splice(i, 1)
              console.log('----------')
              console.log(that.multipleSelectionAll.length)
              break
            }
          }
        }
      })
    },
    // currentChange() {
    //   // 改变页的时候调用一次
    //   this.changePageCoreRecordData()
    //   this.setSelectRow()
    // },
    // sizeChange() { // 改变每页显示条数的时候调用一次
    //   this.changePageCoreRecordData()
    //   this.setSelectRow()
    // },

    handleSelectionChange(val) {
      // table组件选中事件,记得加上@selection-change="handleSelectionChange"
      console.log(val)
      this.multipleSelection = val
      // this.changePageCoreRecordData()
    },
    // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData()

      console.log(this.multipleSelectionAll)
      // 提交
      const _this = this
      const sendData = {}
      sendData.serviceRecommendCode = _this.serviceRecommendCode
      sendData.user = _this.multipleSelectionAll
      // sendData.user = JSON.stringify(_this.multipleSelectionAll)
      recommendAddPool(sendData).then(response => {
        this.$notify.success({
          title: '成功',
          message: '保存成功'
        })
        this.syncVisible = false
      }).catch(err => {
        this.$notify.error({
          title: '失败',
          message: err.data.errmsg
        })
      })
    },
    fromSubmit() {
      this.getAllSelectionData()
    }
  }
}
</script>
