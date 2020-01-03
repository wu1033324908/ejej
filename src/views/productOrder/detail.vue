<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2019-12-10 15:50:09
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
      <h3 class="bt">订单基本信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="orderBase" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="订单编号" prop="orderCode"/>
          <el-table-column align="center" label="订单状态" prop="orderStatus"/>
          <el-table-column align="center" label="订单金额" prop="orderPrice"/>
          <el-table-column align="center" label="创建时间" prop="addTime"/>
          <el-table-column align="center" label="付款时间" prop="payTime"/>
          <el-table-column align="center" label="发货时间" prop="shipTime"/>
          <el-table-column align="center" label="收货时间" prop="confirmTime"/>
          <el-table-column align="center" label="完成时间" prop="doneTime"/>
          <el-table-column align="center" label="备注" prop="message"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">商品基本信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="productBase" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="商品编号" prop="goodsSn"/>
          <el-table-column align="center" label="商品名称" prop="goodsName"/>
          <el-table-column align="center" label="图片">
            <template slot-scope="scope">
              <div><img :src="scope.row.picUrl" style="height:50px;" alt="暂无"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="数量" prop="nanumberme"/>
          <el-table-column align="center" label="付款方式" prop="payType"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">支付信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="payBase" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="商品总金额" prop="goodsPrice"/>
          <el-table-column align="center" label="快递费用" prop="freightPrice"/>
          <el-table-column align="center" label="优惠总金额" prop="couponPrice"/>
          <el-table-column align="center" label="订单总金额" prop="orderPrice"/>
          <el-table-column align="center" label="实际付款总金额" prop="actualPrice"/>
          <el-table-column align="center" label="付款方式" prop="payType">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.payType | payTypeFilter }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">其他</h3>
      <span>快递公司： {{ other.shipChannel_text }}</span>
    </el-card>
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
import { orderdetail } from '@/api/productOrder'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'ProductorderDetailPage',
  components: { BackToTop },
  filters: {
    payTypeFilter(val) {
      if (val === 0 || val === '0') {
        return '微信支付'
      } else if (val === 1 || val === '1') {
        return '支付宝'
      } else {
        return '未付款'
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
      productBase: [],
      userInfo: {},
      orderBase: [],
      payBase: [],
      listLoading: true,
      other: {
        shipChannel_text: ''
      }
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
      // console.log(data);

      orderdetail({ orderCode: data.orderCode }).then(response => {
        this.userInfo = response.data.data.user
        this.orderBase.push(response.data.data.order)
        this.payBase.push(response.data.data.order)
        this.productBase = response.data.data.goodslist
        this.other = response.data.data.other
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
