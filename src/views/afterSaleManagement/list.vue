<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-17 17:30:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">

      <el-input v-model="listQuery.orderCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-select v-model="listQuery.afterStatus" class="filter-item" clearable placeholder="请选择售后状态">
        <el-option
          v-for="item in afterStatuss"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.addTime_start"
        class="filter-item"
        type="datetime"
        placeholder="申请开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.addTime_end"
        class="filter-item"
        type="datetime"
        placeholder="申请结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="订单编号" prop="orderCode"/>
      <el-table-column align="center" min-width="100" label="售后状态" prop="afterStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.afterStatus | afterStatusF }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="售后结果" prop="orderResult">

        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderResult | orderResultF }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="姓名" prop="name"/>
      <el-table-column align="center" min-width="100" label="手机号码" prop="phone"/>
      <el-table-column align="center" min-width="100" label="申请时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="申请理由" prop="applyWord"/>
      <el-table-column align="center" min-width="100" label="申请退款金额" prop="refundPrice"/>
      <el-table-column align="center" min-width="100" label="允许退款金额" prop="allowPrice"/>
      <el-table-column align="center" min-width="100" label="实际退款金额" prop="truePrice"/>
      <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.afterStatus == 0" type="primary" size="mini" @click="handleAfterSale(scope.row)">售后</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 售后 -->
    <el-dialog :visible.sync="formVisible" title="售后">
      <el-card class="box-card">
        <el-form ref="afterSaleData" :rules="rules" :model="afterSaleData" label-width="150px">
          <el-form-item label="是否驳回">
            <el-select v-model="afterSaleData.isAfter" placeholder="请选择是否驳回">
              <el-option
                v-for="item in isAfters"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="售后结果">
            <el-select v-model="afterSaleData.orderResult" clearable placeholder="请选择售后结果">
              <el-option
                v-for="item in orderResults"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="允许退款金额">
            <el-input v-model="afterSaleData.allowPrice" />
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="afterSaleSubmit('afterSaleData')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款 -->
    <el-dialog :visible.sync="refundVisible" title="退款">
      <el-card class="box-card">
        <el-form ref="refundData" :rules="rules" :model="refundData" label-width="150px">
          <el-form-item label="实际退款金额">
            <el-input v-model="refundData.truePrice" />
          </el-form-item>
          <el-form-item label="退款账户">
            <el-input v-model="refundData.adminAccount" />
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="refundSubmit('refundData')">确定</el-button>
      </div>
    </el-dialog>
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
import { orderAfterList, orderAfterCheck, orderAfterRefund } from '@/api/afterSaleManagement'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { MessageBox } from 'element-ui'
export default {
  name: 'AfterSaleManagementList',
  components: { BackToTop, Pagination },
  filters: {
    afterStatusF(v) {
      if (v === 0) {
        return '售后中'
      }
      if (v === 1) {
        return '售后完成'
      }
    },
    orderResultF(v) {
      if (v === 0 || v === '0') {
        return '部分退款'
      }
      if (v === 1 || v === '1') {
        return '全额退款'
      }
      if (v === 3 || v === '3') {
        return '主动撤销'
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
      formVisible: false,
      afterSaleData: {},
      isAfters: [{ id: '1', name: '同意' }, { id: '2', name: '驳回' }],
      orderResults: [{ id: 0, name: '部分退款' }, { id: 1, name: '全额退款' }, { id: 2, name: '主动撤销' }],
      // 退款
      refundVisible: false,
      refundData: {},
      // 售后状态
      afterStatuss: [{ id: '0', name: '售后中' }, { id: '1', name: '售后完成' }],
      // 规则
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderAfterList(this.listQuery).then(response => {
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
    afterSaleSubmit(formName) {
      // 售后提交
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const finalGoods = _this.afterSaleData
          orderAfterCheck(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '保存成功'
              })
              setTimeout(() => {
                window.location.reload()
              }, 600)
            })
            .catch(response => {
              MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                confirmButtonText: '确定',
                type: 'error'
              })
            })
        }
      })
    },
    refundSubmit(formName) {
      // 退款提交
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const finalGoods = _this.refundData
          orderAfterRefund(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '保存成功'
              })
              setTimeout(() => {
                window.location.reload()
              }, 600)
            })
            .catch(response => {
              MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                confirmButtonText: '确定',
                type: 'error'
              })
            })
        }
      })
    },
    handleAfterSale(row) {
      // 售后
      this.afterSaleData = {}
      this.formVisible = true
      this.afterSaleData.afterCode = row.afterCode
    },
    handleRefund(row) {
      // 售后
      this.refundData = {}
      this.refundVisible = true
      this.refundData.afterCode = row.afterCode
    }
  }
}
</script>
