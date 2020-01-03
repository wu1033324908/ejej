
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime : 2020-01-03 10:52:42
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.depart_name" style="width: 150px;" placeholder="请输入公司名称" />
      <el-input v-model="listQuery.nickname" style="width: 150px;" placeholder="负责人姓名" />

      <el-input v-model="listQuery.mobile" style="width: 150px;" placeholder="请输入手机号码" />

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
        @click="handleDownload"
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
      <!--   <el-table-column align="center" min-width="100" label="序号" prop="id" /> -->
      <el-table-column align="center" min-width="100" label="编号" prop="id" />
      <el-table-column align="center" min-width="100" label="账号" prop="mobileOne" />
      <el-table-column align="center" min-width="100" label="公司名称" prop="departName"/>
      <el-table-column align="center" min-width="100" label="负责人" prop="nickName" />
      <el-table-column align="center" min-width="100" label="联系电话" prop="mobileOne" />
      <el-table-column align="center" min-width="100" label="公司电话" prop="departPhone" />
      <el-table-column align="center" min-width="100" label="设计师数量" prop="num0" />
      <el-table-column align="center" min-width="100" label="零工数量" prop="num1" />
      <!-- <el-table-column align="center" min-width="100" label="图片" prop="goodsLabelUrl">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="viewimage(scope.row.goodsLabelUrl)">查看</el-button>
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" min-width="100" label="首付" prop="retailPrice"/> -->
      <el-table-column align="center" min-width="100" label="项目经理数量" prop="num2" />
      <el-table-column align="center" min-width="100" label="评分" prop="grade" />
      <el-table-column align="center" min-width="100" label="订单数" prop="service_number" />
      <el-table-column align="center" min-width="100" label="案例数" prop="example_number" />
      <!-- <el-table-column align="center" min-width="100" label="状态" prop="status">
        <template
          slot-scope="scope"
        >{{ scope.row.status==0 ? '可用' : scope.row.status==1 ? '禁用' : scope.row.status == 2? "注销" : ""}}</template>
      </el-table-column> -->

      <el-table-column
        align="operation"
        label="操作"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" @click="handleDetail(scope.row)">查看</el-button>
          <!-- <el-button type="primary" @click="handleDetail(scope.row)">密码重置</el-button> -->

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
// departDelete
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
  created() {
    this.init()
  },
  methods: {
    init: function() {
      this.getList()
      //   this.getDropDownFn();
    },
    // 获取公司列表
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      // let listData = {...this.listQuery};
      let listData = Object.assign({}, this.listQuery)

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
      if (this.listQuery.nickname === '') {
        delete listData.nickname
      }
      if (this.listQuery.mobile === '') {
        delete listData.mobile
      }

      departList(listData)
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
        path: '/decorationCompany/edit',
        query: { id: row.id }
      })
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '序号',
          '账号',
          '公司名称',
          '负责人',
          '联系电话',
          '公司电话',
          '设计师数量',
          '零工数量',
          '项目经理数量',
          '评分',
          '订单数',
          '案例数',
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
          'service_number',
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
        path: '/decorationCompany/detail',
        query: { id: row.id }
      })
    },
    // 新增装修公司
    handleCreate() {
      this.$router.push({ path: '/decorationCompany/create' })
    }

  }
}
</script>
