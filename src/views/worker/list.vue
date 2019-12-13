
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime: 2019-12-13 14:31:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" style="width: 150px;" placeholder="请输入昵称or姓名" />
      <el-input v-model="listQuery.mobile" style="width: 150px;" placeholder="请输入手机号码" />
      <el-select v-model="listQuery.gender" clearable style="width: 120px;" placeholder="请选择性别">
        <el-option
          v-for="(item , index) in genderOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.departCode"
        clearable
        style="width: 150px;"
        placeholder="请选择所属机构"
      >
        <el-option
          v-for="(item,index) in departOptions"
          :key="index"
          :label="item.departName"
          :value="item.departCode"
        />
      </el-select>
      <el-input v-model="listQuery.work_year" style="width: 150px;" placeholder="请选择工作年限" />
      <el-select v-model="listQuery.type_work" clearable style="width: 120px;" placeholder="请选择工种">
        <el-option
          v-for="(item,index) in classOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.is_barfain" clearable style="width: 120px;" placeholder="是否可议价">
        <el-option
          v-for="(item,index) in moneyOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.status" clearable style="width: 120px;" placeholder="请选择状态">
        <el-option
          v-for="(item,index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-form ref="form" :model="timeForm" class="initialTime" label-width="80px" size="mini">
        <el-form-item class="tiemBox" label-width="100px" label="注册起止时间">
          <el-col :span="11">
            <el-date-picker
              v-model="timeForm.date1"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="0" class="line">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="timeForm.date2"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <br >
      <el-button
        type="primary"
        style="margin-top:20px"
        icon="el-icon-download"
        @click="downloadLoading=true"
      >导出</el-button>
      <el-button
        type="primary"
        style="margin-top:20px"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button type="primary" style="margin-top:20px" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" min-width="100" label="序号" prop="id" />
      <el-table-column align="center" min-width="100" label="编号" prop="serviceCode" />
      <el-table-column align="center" min-width="100" label="姓名" prop="nickname" />
      <el-table-column align="center" min-width="100" label="性别" prop="gender">
        <template
          slot-scope="scope"
        >{{ scope.row.gender==0 ? '未知' : scope.row.gender==1 ? '男' : scope.row.gender==2 ? "女" :'' }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="手机号" prop="mobile" />
      <el-table-column align="center" min-width="100" label="归属机构" prop="departName" />
      <el-table-column align="center" min-width="100" label="工作年限" prop="work_year" />
      <el-table-column align="center" min-width="100" label="案例数" prop="example_number" />
      <el-table-column align="center" min-width="100" label="单价元/天" prop="unit_money" />
      <el-table-column align="center" min-width="100" label="工种" prop="type_work" >
        <template slot-scope="scope" >
          {{ workType(scope.row) }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" min-width="100" label="图片" prop="goodsLabelUrl">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="viewimage(scope.row.goodsLabelUrl)">查看</el-button>
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" min-width="100" label="首付" prop="retailPrice"/> -->
      <el-table-column align="center" min-width="100" label="是否可议价" prop="is_bargain" >
        <template slot-scope="scope" >
          {{ scope.row.is_bargain==0 ? '是' : scope.row.is_bargain==1 ? '否' :'' }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="评分" prop="grade" />
      <el-table-column align="center" min-width="100" label="出生日期" prop="birthday" />
      <el-table-column align="center" min-width="100" label="注册日期" prop="add_time" />
      <el-table-column align="center" min-width="100" label="状态" prop="status">
        <template
          slot-scope="scope"
        >{{ scope.row.status==0 ? '可用' : scope.row.status==1 ? '禁用' : scope.row.status == 2? "注销" : "" }}</template>
      </el-table-column>

      <el-table-column
        align="operation"
        label="操作"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleDetail(scope.row)">密码重置</el-button> -->
          <el-button v-show="scope.row.status==0" size="mini" type="danger" @click="handleForbid(scope.row)">禁用</el-button>
          <el-button v-show="scope.row.status==1" size="mini" type="success" @click="handleForbid(scope.row)">启用</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>
    <!-- 新增案例对话框 -->
    <!-- <el-dialog :visible.sync="dialogFormVisible" title="新建案例" width="30%">
      <el-form ref="ruleForm" :model="dialogForm" :rules="createRules">
        <el-form-item prop="example_type" label="案例类型" label-width="100px">
          <el-select v-model="dialogForm.example_type" size="medium" clearable placeholder="案例类型">
            <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="example_source" label="案例来源" label-width="100px">
          <el-select
            v-model="dialogForm.example_source"
            size="medium"
            clearable
            placeholder="请选择案例来源"
          >
            <el-option
              v-for="(item,index) in sourceOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCase('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>-->
    <!-- 详情 -->
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
.labelNum {
  display: inline-block;
  width: 200px;
}
.labelName {
  display: inline-block;
  width: 200px;
}
.search-button {
  width: 120px;
}
.add-button {
  width: 120px;
}
.addlabelname {
  display: inline-block;
  width: 300px;
}
.addremark {
  display: inline-block;
  width: 300px;
}
.initialTime {
  display: inline-block;
  vertical-align: middle;
  line-height: 47px;
}
.el-form-item.tiemBox.el-form-item--mini {
  margin-bottom: 0;
}
</style>

<script>
import { getUserList, deleteUser } from '@/api/user'
import { managerUserDelete } from '@/api/work'
import { departList } from '@/api/depart'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { getDropDown } from '@/api/dropDown'
export default {
  name: 'GoodsLabel',
  components: { BackToTop, Pagination },
  data() {
    return {
      timeForm: {
        date1: '',
        date2: ''
      },
      handleRemove: '',
      pciImageUrl: '',
      genderOptions: [
        { value: 0, label: '未知' },
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ],
      departOptions: [],
      classOptions: [
        { value: 0, label: '水电工' },
        { value: 1, label: '水泥工' },
        { value: 2, label: '木匠' },
        { value: 3, label: '电工' },
        { value: 4, label: '打孔' }
      ],
      moneyOptions: [
        { value: 0, label: '是' },
        { value: 1, label: '否' }
      ],
      typeOptions: [
        { value: 0, label: '可用' },
        { value: 1, label: '禁用' },
        { value: 2, label: '注销' }
      ],
      styleOptions: [],
      commonType: undefined,
      list: [],
      total: 0,
      text: undefined,
      listLoading: false,
      listQuery: {},
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogForm: {},
      caseDetail: {},
      downloadLoading: false
    }
  },
  computed: {

  },
  created() {
    this.init()
  },
  // watch: {
  //   workType:function( val ){

  //   }
  // },
  methods: {
    init: function() {
      this.getList()
      this.getdepartList()
      //   this.getDropDownFn();
    },
    // 获取公司列表
    getdepartList() {
      departList()
        .then(response => {
          console.log(response)
          this.departOptions = response.data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    workType: function(row) {
      switch (row.type_work) {
        case 0:
          return '水电工'
          // eslint-disable-next-line no-unreachable
          break
        case 1:
          return '水泥工'
          // eslint-disable-next-line no-unreachable
          break
        case 2:
          return '木匠'
          // eslint-disable-next-line no-unreachable
          break
        case 3:
          return '电工'
          // eslint-disable-next-line no-unreachable
          break
        case 4:
          return '打孔'
          // eslint-disable-next-line no-unreachable
          break
      }
    },

    // 获取零工列表
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      // let listData = {...this.listQuery};
      let listData = Object.assign({}, this.listQuery)
      if (listData.work_year === '') {
        delete listData.work_year
      }
      if (this.timeForm.date1 === '') {
        delete listData.add_time
      } else {
        listData.add_time = this.timeForm.date1
      }
      if (this.timeForm.date2 === '') {
        delete listData.update_time
      } else {
        listData.update_time = this.timeForm.date2
      }
      listData.type = 1

      getUserList(listData)
        .then(response => {
          console.log(response)
          this.list = response.data.data.data
          this.total = response.data.data.page.total
          this.listLoading = false
          listData = {}
        })
        .catch(err => {
          console.log(err)
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      // this.listQuery.page = 1;
      this.getList()
    },
    // 编辑案例
    handleUpdate(row) {
      this.$router.push({
        path: '/worker/edit',
        query: { id: row.id }
      })
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '序号',
          '编号',
          '姓名',
          '性别',
          '手机号',
          '归属机构',
          '工作年限',
          '案例数',
          '单价元/天',
          '工种',
          '是否可议价',
          '评分',
          '出生日期',
          '注册日期',
          '状态'
        ]
        const filterVal = [
          'id',
          'service_code',
          'nickname',
          'gender',
          'mobile',
          'departName',
          'work_year',
          'example_number',
          'unit_money',
          'type_work',
          'is_bargain',
          'grade',
          'birthday',
          'add_time',
          'status'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息')
        this.downloadLoading = false
      })
    },
    // 查看详情
    handleDetail(row) {
      this.$router.push({
        path: '/worker/detail',
        query: { id: row.id }
      })
    },
    // 新增零工
    handleCreate() {
      this.$router.push({ path: '/worker/create' })
    },
    // 禁用案例
    handleForbid(row) {
      if (row.status === 1 || row.status === '1') {
        row.status = '0'
      } else if (row.status === 0 || row.status === '0') {
        row.status = '1'
      }
      const State = {
        id: row.id,
        status: row.status
        // .toString()
      }
      //   console.log(State)
      deleteUser(State)
        .then(response => {
          console.log(response)
          this.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDel(row) {
      managerUserDelete(row).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    }
  }
}
</script>
