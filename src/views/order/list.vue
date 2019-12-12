<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:25:06
 * @LastEditTime: 2019-08-16 15:07:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单名称"/>
      <el-select v-model="listQuery.orderType" clearable class="filter-item" placeholder="请选择">
        <el-option
          v-for="orderType in orderTypes"
          :key="orderType.key_name"
          :label="orderType.desc"
          :value="Number(orderType.key_name)"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="selection"/>
      <el-table-column align="center" label="订单编号" prop="orderCode"/>
      <el-table-column align="center" min-width="100" label="用户编号" prop="userCode"/>
      <el-table-column align="center" min-width="100" label="订单名称" prop="orderName"/>
      <el-table-column align="center" min-width="100" label="订单数量" prop="orderNum"/>
      <el-table-column align="center" min-width="100" label="订单价格" prop="orderPrice"/>
      <el-table-column align="center" min-width="100" label="订单状态" prop="orderText"/>
      <el-table-column align="center" min-width="100" label="订单生成时间" prop="addTime"/>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">详情</el-button>
          <el-button v-show="scope.row.orderHandleOption.deliver" type="primary" size="mini" @click="handleSend(scope.row)">发货</el-button>
          <el-button v-show="scope.row.orderStatus === 101" type="danger" size="mini" @click="handleCancel(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 发货 -->
    <el-dialog :visible.sync="logisticsFormVisible" title="发货">
      <el-form ref="logisticsForm" :model="logisticsForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="物流公司" prop="shipChannel">
          <el-select v-model="logisticsForm.shipChannel" placeholder="请选择">
            <el-option
              v-for="shipChannel in shipChannels"
              :key="shipChannel.key_name"
              :label="shipChannel.key_value"
              :value="shipChannel.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="shipSn">
          <el-input v-model="logisticsForm.shipSn" placeholder="请输入物流单号"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logisticsFormVisible = false">取消</el-button>
        <el-button type="primary" @click="logistics">确定</el-button>
      </div>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog :visible.sync="orderDetailVisible" title="详情">
      <el-card class="box-card">
        <div class="card-head">
          <div>
            <p>收货地址</p>
            <p>{{ detailData.consignee }}  {{ detailData.mobile }}  {{ detailData.address }}</p>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-head">
          <div v-for="item in detailData.goodsList" :key="item.goods_code	" class="img-content">
            <div class="img"> <img :src="item.pic_url" alt=""> </div>
            <div>
              <p>{{ item.goods_name }}</p>
              <p>价格：￥{{ item.price }}</p>
              <p>购买数量：{{ item.number }}</p>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-head">
          <div class="img-content">
            <div>
              <p>商品金额：￥{{ detailData.order_price }}</p>
              <p>运费：￥{{ detailData.freight_price }}</p>
              <p>优惠券：{{ detailData.order_price }}</p>
              <p>共{{ detailData.orderNum }}件  合计：￥{{ detailData.order_price }}</p>
            </div>
          </div>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderDetailVisible = false">取消</el-button>
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
import { orderList, orderDelete, orderUpdate, orderRead } from '@/api/order'
import { getComboBox } from '@/api/select'
import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OrderList',
  components: { BackToTop, Pagination },
  data() {
    return {
      logisticsFormVisible: false,
      orderDetailVisible: false,
      list: [],
      total: 0,
      orderTypes: [],
      shipChannels: [], // 发货 => 下拉列表
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
      },
      detailData: {}
    }
  },
  created() {
    this.getList()
    this.initSelect()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderList(this.listQuery).then(response => {
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    initSelect() {
      getComboBox({ key_group_name: 'order_type' }).then(response => {
        this.orderTypes = response.data.data
      }).catch(response => {
        MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSend(row) {
      getComboBox({ key_group_name: 'logistics' }).then(response => {
        this.shipChannels = response.data.data
      }).catch(response => {
        MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
      this.logisticsForm = { id: row.id, shipChannel: row.shipChannel, shipSn: row.shipSn }
      this.logisticsFormVisible = true
    },
    handleDetail(row) {
      orderRead(row).then(response => {
        this.detailData = response.data.data
      }).catch(response => {
        MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
      this.orderDetailVisible = true
    },
    handleCancel(row) {
      this.$confirm('确定要取消订单？')
        .then(_ => {
          orderDelete(row).then(response => {
            this.$notify.success({
              title: '成功',
              message: '取消订单成功'
            })
            this.getList()
          }).catch(response => {
            MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
              confirmButtonText: '确定',
              type: 'error'
            })
          })
        })
        .catch(_ => {})
    },
    logistics() {
      orderUpdate(this.logisticsForm).then(response => {
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
