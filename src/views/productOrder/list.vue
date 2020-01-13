<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:25:06
 * @LastEditTime : 2020-01-10 10:25:11
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.consignee" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-input v-model="listQuery.orderCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号"/>
      <el-select v-model="listQuery.orderStatus" clearable class="filter-item" placeholder="订单状态">
        <el-option
          v-for="item in orderStatus"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.payTime_start"
        class="filter-item"
        type="datetime"
        placeholder="付款开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.payTime_end"
        class="filter-item"
        type="datetime"
        placeholder="付款结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.addTime_start"
        class="filter-item"
        type="datetime"
        placeholder="创建开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.addTime_end"
        class="filter-item"
        type="datetime"
        placeholder="创建结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="数据标识" prop="id"/>
      <el-table-column align="center" label="订单编号" prop="orderCode"/>
      <el-table-column align="center" min-width="100" label="订单状态" prop="orderStatus_text"/>
      <el-table-column align="center" min-width="100" label="姓名" prop="consignee"/>
      <el-table-column align="center" min-width="100" label="手机号码" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="订单金额" prop="orderPrice"/>
      <el-table-column align="center" min-width="100" label="创建时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="付款时间" prop="payTime"/>
      <el-table-column align="center" min-width="100" label="备注" prop="message"/>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/order/update']" v-show="scope.row.orderStatus == '201'" type="primary" size="mini" @click="handleSend(scope.row)">发货</el-button>
          <el-button v-permission="['POST /admin/order/read']" type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 发货 -->
    <el-dialog :visible.sync="logisticsFormVisible" title="发货">
      <el-form ref="logisticsForm" :model="logisticsForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="物流公司" prop="shipChannel">
          <el-select v-model="logisticsForm.shipType" placeholder="请选择" @change="handleShipTypesChange">
            <el-option
              v-for="item in shipTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <div v-show="!isperson">
          <el-form-item label="快递公司">
            <el-input v-model="logisticsForm.shipChannel" placeholder="请输入物流单号"/>
          </el-form-item>
          <el-form-item label="快递单号">
            <el-input v-model="logisticsForm.shipSn" placeholder="请输入物流单号"/>
          </el-form-item>
        </div>
        <div v-show="isperson">
          <el-form-item label="配送员姓名">
            <el-input v-model="logisticsForm.shipName" placeholder="请输入物流单号"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="logisticsForm.shipPhone" placeholder="请输入物流单号"/>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logisticsFormVisible = false">取消</el-button>
        <el-button type="primary" @click="logistics">确定</el-button>
      </div>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style scoped>
.img-content{
  display: flex;
  justify-content: flex-start;
}
.img-content .img{
  width: 100px;
  height: 100px;
  margin-right: 20px;
  /* border: 1px solid red; */
}
.img-content .img img{
  width: 100px;
  height: 100px;
}

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
import { orderlist, orderdeliver } from '@/api/productOrder'
// import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProductOrderList',
  components: { BackToTop, Pagination },
  data() {
    return {
      isperson: true,
      logisticsFormVisible: false,
      list: [],
      total: 0,
      orderStatus: [{ name: '未支付', id: '101' }, { name: '支付完成', id: '201' }, { name: '已发货', id: '301' }, { name: '确认收货', id: '401' }, { name: '评价完成', id: '501' }],
      shipTypes: [{ name: '个人配送', id: 0 }, { name: '快递配送', id: 1 }], // 发货 => 下拉列表
      listLoading: true,
      listQuery: {
        order_status: undefined,
        page: 1,
        limit: 20
      },
      logisticsForm: {
        shipChannel: undefined,
        shipSn: undefined,
        id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderlist(this.listQuery).then(response => {
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
    handleSend(row) {
      this.logisticsFormVisible = true
      this.logisticsForm.orderCode = row.orderCode
    },
    handleDetail(row) {
      this.$router.push({ path: '/productOrder/ProductOrderDetail', query: { data: JSON.stringify(row) }})
    },
    handleShipTypesChange(data) {
      if (data === 0) {
        this.isperson = true
      } else {
        this.isperson = false
      }
    },
    logistics() {
      orderdeliver(this.logisticsForm).then(response => {
        this.logisticsFormVisible = false
        this.$notify.success({
          title: '成功',
          message: '发货成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    }
  }
}
</script>
