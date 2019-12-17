<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-17 16:51:27
 * @LastEditors: Please set LastEditors
 * 服务订单管理
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称"/>
      <el-select v-model="listQuery.province" class="filter-item" clearable placeholder="请选择售后状态">
        <el-option
          v-for="item in provinces"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.orderStatus" class="filter-item" clearable placeholder="请选择售后状态">
        <el-option
          v-for="item in orderStatuss"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.orderType" class="filter-item" clearable placeholder="请选择订单类型">
        <el-option
          v-for="item in orderTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.departCode" class="filter-item" clearable placeholder="请选择机构">
        <el-option
          v-for="item in departCodes"
          :key="item.departCode"
          :label="item.departOneName"
          :value="item.departCode"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.startTime"
        class="filter-item"
        type="datetime"
        placeholder="申请开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.endTime"
        class="filter-item"
        type="datetime"
        placeholder="申请结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="订单编号" prop="orderCode"/>
      <el-table-column align="center" min-width="100" label="类型" prop="orderType_text">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderType_text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="订单状态" prop="orderStatus_text">

        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus_text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="姓名" prop="nickname"/>
      <el-table-column align="center" min-width="100" label="手机号码" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="城市" prop="province_name"/>
      <el-table-column align="center" min-width="100" label="小区" prop="address"/>
      <el-table-column align="center" min-width="100" label="所属机构" prop="departName"/>
      <el-table-column align="center" min-width="100" label="合同金额" prop="contractMoney"/>
      <el-table-column align="center" min-width="100" label="创建时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="签约时间" prop="signTime"/>
      <el-table-column align="center" min-width="100" label="备注" prop="remark"/>
      <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
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
import { serviceOrderlist } from '@/api/serviceOrder'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { MessageBox } from 'element-ui'
import { getRegion, departList } from '@/api/commonselect'
export default {
  name: 'ServiceOrderList',
  components: { BackToTop, Pagination },
  filters: {
    orderTypeF(v) {
      if (v === 0) {
        return '设计类订单 '
      }
      if (v === 1) {
        return '装修类订单'
      }
    },
    orderStatusF(v) {
      if (v === 0 || v === '0') {
        return '预约下单'
      }
      if (v === 1 || v === '1') {
        return '签署合同'
      }
      if (v === 3 || v === '3') {
        return '待评价'
      }
      if (v === 4 || v === '4') {
        return '已完成'
      }
      return '暂无'
    }
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
      payments: [{ name: '支付宝', id: '0' }, { name: '微信', id: '1' }],

      // 售后数据
      // formVisible: false,
      // afterSaleData: {},
      // isAfters: [{ id: '1', name: '同意' }, { id: '2', name: '驳回' }],
      // orderResults: [{ id: '0', name: '部分退款' }, { id: '1', name: '全额退款' }, { id: '2', name: '主动撤销' }],
      // 规则
      rules: {
        isAfter: [
          {
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ]
      },
      // 筛选下拉框数据
      provinces: [],
      orderStatuss: [{ name: '预约下单', id: '0' }, { name: '签署合同', id: '1' }, { name: '待评价', id: '2' }, { name: '已完成', id: '3' }],
      orderTypes: [{ name: '设计类订单', id: '0' }, { name: '装修类订单', id: '1' }],
      departCodes: []
    }
  },
  created() {
    this.getList()
    this.getSelect()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceOrderlist(this.listQuery).then(response => {
        // console.log(response.data.data)
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
    handleAfterSale(row) {
      // 售后
      this.afterSaleData = {}
      this.formVisible = true
      this.afterSaleData.afterCode = row.afterCode
    },
    getSelect() {
      this.getProvinces({})
      this.getDepartList()
    },
    getDepartList() {
      departList({ limit: 999999, page: 1 })
        .then(response => {
          this.departCodes = response.data.data.data
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    getProvinces(opts) {
      const _this = this
      const type = opts.type || 1
      const pid = opts.pid || undefined
      const callback = opts.callback || undefined
      getRegion({ type, pid })
        .then(response => {
          if (type === 1) {
            _this.provinces = response.data.data
          } else {
            _this.citys = response.data.data
            typeof callback === 'function' && callback(response.data.data)
          }
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 查看
    handleDetail(row) {
      this.$router.push({
        path: '/serviceOrder/detail',
        query: { orderCode: row.orderCode }
      })
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '订单编号',
          '类型',
          '订单状态',
          '姓名',
          '手机号码',
          '城市',
          '小区',
          '所属机构',
          '合同金额',
          '创建时间',
          '签约时间',
          '备注'
        ]
        const filterVal = [
          'orderCode',
          'orderType_text',
          'orderStatus_text',
          'nickname',
          'mobile',
          'province_name',
          'address',
          'departName',
          'contractMoney',
          'addTime',
          'signTime',
          'remark'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '资金流水')
        this.downloadLoading = false
      })
    }
  }
}
</script>
