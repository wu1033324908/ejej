<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 17:05:04
 * @LastEditTime: 2019-08-16 14:47:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <span class="filter-item">反馈用户:</span>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入..."/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <el-table-column align="center" label="反馈时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="反馈用户" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="版本号" prop="appVersion"/>
      <el-table-column align="center" min-width="100" label="平台" prop="fromType">
        <template slot-scope="scope">
          {{ scope.row.fromType | fromTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="反馈内容" prop="desc"/>
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
import { feedbackList } from '@/api/feedback'
import { getComboBox } from '@/api/select'
import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserFeedback',
  components: { BackToTop, Pagination },
  filters: {
    fromTypeFilter(val) {
      if (val === 1 || val === '1') {
        return 'Android'
      }
      if (val === 2 || val === '2') {
        return 'IOS'
      }
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        userName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      feedbackList(this.listQuery).then(response => {
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getCommonSelect(opts) {
      if (opts.key_group_name === undefined || typeof opts.callback !== 'function') return
      const key_group_name = opts.key_group_name
      const callback = opts.callback || ''
      getComboBox({ key_group_name }).then(response => {
        callback(response.data.data)
      }).catch(res => {
        MessageBox.alert('业务错误：' + res.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
