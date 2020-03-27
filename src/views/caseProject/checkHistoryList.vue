<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2020-03-11 16:52:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.exampleName" clearable class="filter-item" style="width: 200px;" placeholder="请输入资料包名称"/>
      <el-input v-model="listQuery.housingName" clearable class="filter-item" style="width: 200px;" placeholder="请输入小区名称"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="index" align="center" width="50" label="序号"/>
      <el-table-column align="center" label="编号" prop="exampleCode"/>
      <el-table-column align="center" label="案例名称" prop="exampleName"/>
      <el-table-column align="center" label="小区名称" prop="housingName"/>
      <el-table-column align="center" label="设计师" prop="authorName"/>
      <el-table-column align="center" label="审核时间" prop="addTime"/>
      <el-table-column align="center" label="审核人" prop="reviewer"/>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.review==0?'primary':scope.row.review==1?'success':'danger'">{{ scope.row.review | reviewFilters }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="驳回理由" prop="passMsg"/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style scoped>
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
    .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .name{
    position: absolute;
    bottom: -130px !important;
    text-align: center;
  }

  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>

<script>

import { listHistoryExampleData } from '@/api/caseProject'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CheckHistoryList',
  components: { BackToTop, Pagination },
  filters: {
    reviewFilters(val) {
      if (val === 0 || val === '0') {
        return '审核中'
      }
      if (val === 1 || val === '1') {
        return '审核通过'
      }
      if (val === 2 || val === '2') {
        return '审核未通过'
      }
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
    this.getDropDownFn()
  },
  methods: {
    getList() {
      this.listLoading = true
      listHistoryExampleData(this.listQuery).then(response => {
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
    }
  }
}
</script>
