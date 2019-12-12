<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 18:16:51
 * @LastEditTime: 2019-12-11 09:58:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
        <el-select class="filter-item" v-model="listQuery.type" placeholder="请选择优惠券类型" clearable>
            <el-option
              v-for="type in types"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
        <el-select class="filter-item" v-model="listQuery.status" placeholder="请选择优惠券状态" clearable>
            <el-option
              v-for="status in statuss"
              :key="status.id"
              :label="status.name"
              :value="status.id"
            />
          </el-select>
      <el-input v-model="listQuery.title" clearable class="filter-item" style="width: 200px;" placeholder="请输入标题"/>
      <el-input v-model="listQuery.couponCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入卡券编号"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入卡券名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增卡券规则</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="卡券编号" prop="couponCode"/>
      <el-table-column align="center" label="卡券类别" prop="type">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type | filterType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" prop="title"/>
      <el-table-column align="center" label="卡券名称" prop="name"/>
      <el-table-column align="center" label="使用券开始时间" prop="startTime"/>
      <el-table-column align="center" label="使用券截至时间" prop="endTime"/>
      <el-table-column align="center" label="规则" prop=""/>
      <el-table-column align="center" label="赠送卡券编号" prop=""/>
      <el-table-column align="center" label="张数" prop=""/>
      <el-table-column align="center" label="活动参与人数" prop=""/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdata(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

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
import { couponRuleList, couponDelete } from '@/api/coupon'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'couponRuleList',
  components: { BackToTop, Pagination },
  filters: {
    filterDays(val) {
      if (Number(val) > 0) {
        return val + '天'
      }else{
        return '按时间段'
      }
    },
    filterLimit(val) {
      if (val === 0 || val === '0') {
        return '无限张'
      }
      if (val > 0) {
        return val + '张'
      }
    },
    filterStatus(val) {
      if (val === 0 || val === '0') {
        return '可用'
      } else {
        return '过期'
      }
    },
    filterStatus(val) {
       if (val === '0' || val === 0) {
        return '正常可用'
      }
      if (val === '1' || val === 1) {
        return '过期'
      }
      if (val === '2' || val === 2) {
        return '下架'
      }
    },
    filterType(val) {
      if (val === '0' || val === 0) {
        return '注册赠送'
      }
      if (val === '1' || val === 1) {
        return '消费赠送'
      }
      if (val === '2' || val === 2) {
        return '登陆赠送'
      }
      if (val === '3' || val === 3) {
        return '充值赠送'
      }
      if (val === '4' || val === 4) {
        return '评论赠送'
      }
      if (val === '5' || val === 5) {
        return '自定义'
      }
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      typeList: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      recordList: [],
      types:[{ name: '注册赠送', id: 0 },{ name: '消费赠送', id: 1 },{ name: '登陆赠送', id: 2 },{ name: '充值赠送', id: 3 },{ name: '评论赠送', id: 4 },{ name: '自定义', id: 5 }],
      statuss:[{ name: '已生效', id: 0 }, { name: '未生效', id: 1 }, { name: '已过期', id: 2 }]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      couponRuleList(this.listQuery).then(response => {
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getRecordList(row) {
      this.recordListQuery.couponCode = row.code
      this.userRecordLoading = true
    //   couponRecord(this.recordListQuery).then(response => {
    //     this.recordList = response.data.data.data
    //     this.recordTotal = response.data.data.page.total
    //     this.userRecordLoading = false
    //   }).catch(() => {
    //     this.recordList = []
    //     this.recordTotal = 0
    //     this.userRecordLoading = false
    //   })
    },
    getTypeList() {
      this.listLoading = true
    //   couponTypeList().then(response => {
    //     this.typeList = response.data.data.data
    //     this.listLoading = false
    //   }).catch(() => {
    //     this.typeList = []
    //   })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.$router.push({ path: '/coupon/couponRuleCreate' })
    },
    handleDelete(row) {
      couponDelete(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.errmsg
        })
      })
    },
    handleDetail(row) {
      this.userRecord = true
      this.getRecordList(row)
    },
    handleUpdata(row) {
      this.$router.push({ path: '/coupon/couponRuleCreate', query: { data: JSON.stringify(row) }})
    }
  }
}
</script>
