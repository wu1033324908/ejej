<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime : 2019-12-18 18:07:02
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.type" class="filter-item" clearable placeholder="请选择评论类别">
        <el-option
          v-for="item in types"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称"/>
      <el-input v-model="listQuery.value_id" clearable class="filter-item" style="width: 200px;" placeholder="请输入编号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <!-- <el-table-column type="selection"/> -->
      <el-table-column align="center" label="编号" prop="goodsSn"/>
      <el-table-column align="center" label="类别" prop="type">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type | MsgTypefilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="名称" prop="name"/>
      <el-table-column align="center" min-width="100" label="评论数" prop="size"/>
      <el-table-column align="center" min-width="100" label="综合评分" prop="grade"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style scoped>
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
import { listComment } from '@/api/comment'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CommentList',
  components: { BackToTop, Pagination },
  filters: {
    MsgTypefilter(val) {
      if (val === 0 || val === '0') {
        return '商品评论 '
      } else if (val === 1 || val === '1') {
        return '服务订单评论'
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
        limit: 20
      },
      types: [{ id: 0, name: '商品评论' }, { id: 1, name: '服务订单评论' }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listComment(this.listQuery).then(response => {
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
    handleDetail(row) {
      this.$router.push({ path: '/comment/detail', query: { valueId: row.valueId, type: row.type }})
    }
  }
}
</script>
