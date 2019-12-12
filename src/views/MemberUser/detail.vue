<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2019-12-11 10:34:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <el-card class="box-card">
      <div class="card-head">
        <div class="head">
          <div class="head-l">
            <img :src="userInfo.avatar" alt="暂无头像">
          </div>
          <div class="head-r">
            <ul>
              <li>昵称：{{ userInfo.nickname }}</li>
              <li>手机号码：{{ userInfo.mobile }}</li>
              <li>城市：{{ userInfo.city }}</li>
              <li>姓名：{{ userInfo.userName }}</li>
              <li>邮箱：{{ userInfo.email }}</li>
              <li>小区：{{ userInfo.community }}</li>
              <li>性别：{{ userInfo.gender | genderFilter }}</li>
              <li>出生日期：{{ userInfo.birthday }}</li>
              <li>注册时间：{{ userInfo.addTime }}</li>
            </ul>
          </div>
        </div>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">消费情况</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="consumption" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="消费总额" prop="sumConsumption"/>
          <el-table-column align="center" label="服务类消费" prop="ServiceConsumption"/>
          <el-table-column align="center" label="商品类消费" prop="GoodsConsumption"/>
          <el-table-column align="center" label="退款总额" prop="Refund"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">服务订单列表</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="userService" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="订单编号" prop="orderCode"/>
          <el-table-column align="center" label="订单类型" prop="orderType">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderType | orderTypeFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同金额" prop="orderPrice"/>
          <el-table-column align="center" label="创建时间" prop="addTime"/>
          <el-table-column align="center" label="付款时间" prop="payTime"/>
          <el-table-column align="center" label="备注" prop="message"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">商品订单列表</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="UserGoods" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="订单编号" prop="orderCode"/>
          <el-table-column align="center" label="订单状态" prop="orderStatus">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderStatus | orderStatus2Filter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="金额" prop="couponPrice"/>
          <el-table-column align="center" label="付款时间" prop="orderPrice"/>
          <el-table-column align="center" label="备注" prop="actualPrice"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style scoped lang="scss">
.space{
    height: 20px;
}
.bt{
    color: #66a3ff;
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
  .head{
      width: 100%;
      height: 150px;
    //   border: 1px solid red;
      .head-l{
          width: 20%;
          float: left;

        //   border: 1px solid red;
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              align-items: center;
          img{
      height: 150px;
      width: 150px;
              border: 1px solid #DEDEDE;
          }
      }
      .head-r{
          width: 80%;
          height: 150px;
          float: left;
        //   border: 1px solid red;
          ul{
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              li{
                  width: 33.33%;
                  height: 50px;
              }
          }
      }
  }
</style>

<script>
import { detail } from '@/api/menberUser'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'ProductorderDetailPage',
  components: { BackToTop },
  filters: {
    orderStatus2Filter(val) {
      if (val === 101 || val === '101') {
        return '待付款'
      }
      if (val === 201 || val === '201') {
        return '待发货'
      }
      if (val === 301 || val === '301') {
        return '待收货'
      }
      if (val === 401 || val === '401') {
        return '待评价'
      }
      if (val === 501 || val === '501') {
        return '已完成'
      }
    },
    orderStatusFilter(val) {
      if (val === 0 || val === '0') {
        return '预约下单 '
      }
      if (val === 1 || val === '1') {
        return '签署合同'
      }
      if (val === 2 || val === '2') {
        return '待评价'
      }
      if (val === 3 || val === '3') {
        return '已完成'
      }
    },
    orderTypeFilter(val) {
      if (val === 0 || val === '0') {
        return '设计类订单 '
      }
      if (val === 1 || val === '1') {
        return '装修类订单'
      }
    },
    genderFilter(val) {
      if (val === 1 || val === '1') {
        return '男'
      } else if (val === 2 || val === '2') {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  data() {
    return {
      userInfo: {},
      consumption: [], // 消费情况
      userService: [], // 服务订单
      UserGoods: [],
      listLoading: true
    }
  },
  created() {
    // this.getList()
    this.init()
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      detail({ id: data.id }).then(response => {
        this.userInfo = response.data.data.User
        this.consumption.push(response.data.data.consume)
        this.userService = response.data.data.userService
        this.UserGoods = response.data.data.UserGoods
        this.listLoading = false
        console.log(response.data)
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
