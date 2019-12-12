<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-11 16:21:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.waterType" class="filter-item" clearable placeholder="请选择流水类型">
        <el-option
          v-for="item in waterTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.payment" class="filter-item" clearable placeholder="请选择收款方式">
        <el-option
          v-for="item in payments"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.addTime_start"
        class="filter-item"
        type="datetime"
        placeholder="收款时间开始"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.addTime_end"
        class="filter-item"
        type="datetime"
        placeholder="收款时间结束"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 300px;" placeholder="请输入姓名"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="流水号" prop="waterCode"/>
      <el-table-column align="center" min-width="100" label="流水类型" prop="waterType_text"/>
      <el-table-column align="center" min-width="100" label="收款方式" prop="payment_text"/>
      <el-table-column align="center" min-width="100" label="收款日期" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="姓名" prop="name"/>
      <el-table-column align="center" min-width="100" label="手机号" prop="phone"/>
      <el-table-column align="center" min-width="100" label="金额" prop="money"/>
      <el-table-column align="center" min-width="100" label="备注" prop="remark"/>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

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
import { orderWaterList } from '@/api/dayToDayAccount'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'DayToDayAccountList',
  components: { BackToTop, Pagination },
  filters: {
  },
  data() {
    return {
      downloadLoading: false,
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
      waterTypes: [{ name: '订单收款', id: 0 }],
      payments: [{ name: '支付宝', id: '0' }, { name: '微信', id: '1' }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderWaterList(this.listQuery).then(response => {
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '流水号',
          '流水类型',
          '收款方式',
          '收款日期',
          '姓名',
          '手机号',
          '金额',
          '备注'
        ]
        const filterVal = [
          'waterCode',
          'waterType_text',
          'payment_text',
          'addTime',
          'name',
          'phone',
          'money',
          'remark'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '资金流水')
        this.downloadLoading = false
      })
    }
  }
}
</script>
