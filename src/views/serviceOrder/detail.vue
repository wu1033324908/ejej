<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2019-12-17 17:16:08
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
      <h3 class="bt">订单基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V1" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="订单编号" prop="orderCode"/>
          <el-table-column align="center" label="类型" prop="orderType">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderType | orderTypeFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态" prop="orderStatus">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" prop="addTime"/>
          <el-table-column align="center" label="签约时间" prop="signTime"/>
          <el-table-column align="center" label="完工时间" prop="doneTime"/>
          <el-table-column align="center" label="验收完成时间" prop="checkTime"/>
          <el-table-column align="center" label="合同金额" prop="contractMoney"/>
          <el-table-column align="center" label="联系人" prop="name"/>
          <el-table-column align="center" label="电话" prop="mobile"/>
        </el-table>
      </div>
    </el-card>
    <!-- <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">楼房基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V2" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="所在城市" prop="orderCode"/>
          <el-table-column align="center" label="小区名称" prop="orderType"/>
          <el-table-column align="center" label="楼房面积" prop="addTime"/>
          <el-table-column align="center" label="楼房类型" prop="orderPrice"/>
          <el-table-column align="center" label="楼房户型" prop="addTime"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">设计基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V3" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="装修预算" prop="orderCode"/>
          <el-table-column align="center" label="风格类型" prop="orderStatus"/>
          <el-table-column align="center" label="施工类型" prop="couponPrice"/>
          <el-table-column align="center" label="是否需要设计" prop="orderPrice"/>
          <el-table-column align="center" label="房屋平面图" prop="orderStatus">
            <template slot-scope="scope">
              <div><img :src="scope.row.img" alt="暂无" style="height|:50px;"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="设计平面图" prop="orderStatus">
            <template slot-scope="scope">
              <div><img :src="scope.row.img" alt="暂无" style="height|:50px;"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">合同基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V4" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="合同编号" prop="orderCode"/>
          <el-table-column align="center" label="照片" prop="orderStatus">
            <template slot-scope="scope">
              <div><img :src="scope.row.img" alt="暂无" style="height|:50px;"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同金额" prop="couponPrice"/>
          <el-table-column align="center" label="备注" prop="actualPrice"/>
        </el-table>
      </div>
    </el-card>
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">验收基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V5" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="名称" prop="orderCode"/>
          <el-table-column align="center" label="首次提交时间" prop="orderStatus"/>
          <el-table-column align="center" label="图片数量" prop="couponPrice"/>
          <el-table-column align="center" label="通过数量" prop="orderPrice"/>
          <el-table-column align="center" label="驳回数量" prop="actualPrice"/>
          <el-table-column align="center" label="待验收数量" prop="actualPrice"/>
          <el-table-column align="center" label="验收完成时间" prop="actualPrice"/>
          <el-table-column align="center" label="备注" prop="actualPrice"/>
        </el-table>
      </div>
    </el-card> -->
    <div class="space"/>
    <el-card class="box-card">
      <h3 class="bt">服务商基础信息</h3>
      <div class="card-head">
        <el-table v-loading="listLoading" :data="V6" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="昵称" prop="nickName"/>
          <el-table-column align="center" label="岗位" prop="type" >
            <template slot-scope="scope">
              <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号码" prop="mobile"/>
          <el-table-column align="center" label="工作年限" prop="workYear"/>
          <el-table-column align="center" label="归属机构" prop="departName"/>
          <el-table-column align="center" label="状态" prop="status">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 0?'primary':'danger'">{{ scope.row.status | statusFilter }}</el-tag>
            </template>
          </el-table-column>
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
import { serviceOrderDetail } from '@/api/serviceOrder'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'ServiceOrderDetail',
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
    },
    statusFilter(val) {
      if (val === 0 || val === '0') {
        return '可用'
      } else if (val === 1 || val === '1') {
        return '禁用'
      } else if (val === 2 || val === '2') {
        return '注销'
      }
    },
    typeFilter(val) {
      if (val === 0 || val === '0') {
        return '设计师'
      } else if (val === 1 || val === '1') {
        return '零工'
      } else if (val === 2 || val === '2') {
        return '项目经理'
      } else if (val === 3 || val === '3') {
        return '负责人'
      }
    }
  },
  data() {
    return {
      userInfo: {},
      V1: [], // 订单基础信息
      //   V2: [], // 楼房基础信息
      //   V3: [], // 设计基础信息
      //   V4: [], // 合同基础信息
      //   V5: [], // 验收基础信息
      V6: [], // 服务商基础信息
      listLoading: true
    }
  },
  created() {
    // this.getList()
    this.init()
  },
  methods: {
    init() {
      if (!this.$route.query.orderCode) return
      const orderCode = this.$route.query.orderCode
      serviceOrderDetail({ orderCode: orderCode }).then(response => {
        this.userInfo = response.data.data.user
        this.V1.push(response.data.data.order)
        this.V6.push(response.data.data.serviceUser)
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
