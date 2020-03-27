<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2020-03-11 16:53:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.payAll" class="filter-item" clearable placeholder="请选择销售类型">
        <el-option
          v-for="item in payAlls"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="listQuery.exampleName" clearable class="filter-item" style="width: 200px;" placeholder="案例名称"/>
      <el-input v-model="listQuery.serviceName" clearable class="filter-item" style="width: 200px;" placeholder="设计师名称"/>
      <el-input v-model="listQuery.serviceMobile" clearable class="filter-item" style="width: 200px;" placeholder="设计师电话"/>
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入客户昵称"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入客户电话"/>
      <el-date-picker
        v-model="listQuery.addTime"
        class="filter-item"
        type="datetime"
        placeholder="起止时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.updateTime"
        class="filter-item"
        type="datetime"
        placeholder="截至时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" type="primary" class="filter-item" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="index" align="center" width="50" label="序号"/>
      <el-table-column align="center" label="编号" prop="example_code"/>
      <el-table-column align="center" label="案例名称" prop="example_name"/>
      <el-table-column align="center" label="小区名称" prop="housing_name"/>
      <el-table-column align="center" label="设计师" prop="service_name"/>
      <el-table-column align="center" label="设计师号码" prop="service_mobile"/>
      <el-table-column align="center" label="销售时间" prop="pay_time"/>
      <el-table-column align="center" label="销售类型" prop="pay_all_text"/>
      <el-table-column align="center" label="客户昵称" prop="nickname"/>
      <el-table-column align="center" label="客户号码" prop="mobile"/>
      <el-table-column align="center" label="付款金额" prop="actual_price"/>
      <el-table-column align="center" label="平台佣金" prop="platform_money"/>
      <el-table-column align="center" label="销售利润" prop="sales_profit"/>
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

import { listExampleDataOrder } from '@/api/caseProject'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'SellList',
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
      downloadLoading: false, // 导出按钮loading状态
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      payAlls: [{ id: '0', name: '仅购买方案' }, { id: '1', name: '全方案购买' }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listExampleDataOrder(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.page.total
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
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '编号',
          '案例名称',
          '小区名称',
          '设计师',
          '设计师号码',
          '销售时间',
          '销售类型',
          '客户昵称',
          '客户号码',
          '付款金额(元)',
          '平台佣金(元)',
          '销售利润(元)'
        ]
        const filterVal = [
          'example_code',
          'example_name',
          'housing_name',
          'service_name',
          'service_mobile',
          'pay_time',
          'pay_all_text',
          'nickname',
          'mobile',
          'actual_price',
          'platform_money',
          'sales_profit'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '方案包销售记录')
        this.downloadLoading = false
      })
    }
  }
}
</script>
