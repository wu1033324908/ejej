<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-08-16 14:41:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 300px;" placeholder="请输入名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增新机</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="selection"/>
      <el-table-column align="center" min-width="100" label="名称" prop="name"/>
      <el-table-column align="center" min-width="100" label="品牌" prop="brandId"/>
      <el-table-column align="center" min-width="100" label="吨位" prop="fixP12"/>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
import { list, del } from '@/api/excavator'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ExcavatorList',
  components: { BackToTop, Pagination },
  filters: {
  },
  data() {
    return {
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
      }
    }
  },
  created() {
    console.log(this.listQuery)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        console.log(typeof response.data.data.data)
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
    handleCreate() {
      this.$router.push({ path: '/product/excavatorCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/product/excavatorEdit', query: { good_code: row.good_code }})
    },
    // showDetail(detail) {
    //   this.goodsDetail = detail
    //   this.detailDialogVisible = true
    // },
    handleDelete(row) {
      del(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
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
