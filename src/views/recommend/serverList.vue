<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-11 14:34:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.serviceRecommendName"
        clearable
        class="filter-item"
        style="width: 300px;"
        placeholder="请输入名称"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="syncVisible = true"
      >新增</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" min-width="100" label="模块名称" prop="serviceRecommendName" />
      <el-table-column align="center" min-width="100" label="排序" prop="sortOrder" />
      <el-table-column align="center" min-width="100" label="推荐数量" prop="quantity" />
      <el-table-column align="center" min-width="100" label="推荐详情">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>
    <!-- 表单新增或编辑 -->
    <el-dialog :visible.sync="syncVisible" :title="title">
      <el-card class="box-card">
        <el-form ref="fromData" :rules="rules" :model="fromData" label-width="150px">
          <el-form-item label="名称" prop="serviceRecommendName">
            <el-input v-model="fromData.serviceRecommendName" />
          </el-form-item>
          <el-form-item label="排序" prop="sortOrder">
            <el-input v-model="fromData.sortOrder" />
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fromSubmit('fromData')">确定</el-button>
      </div>
    </el-dialog>
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
import { recommendList, recommendRemove, recommendAdd, recommendUpdate } from '@/api/recommend'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'IndexRecommendList',
  components: { BackToTop, Pagination },
  filters: {},
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
      },

      //   表单
      syncVisible: false,
      fromData: {},

      //   规则
      rules: {
        serviceRecommendName: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        sortOrder: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      if (!this.fromData.id) {
        return '新增'
      } else {
        return '编辑'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      recommendList(this.listQuery)
        .then(response => {
          this.list = response.data.data.data
          this.total = response.data.data.page.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleDetail(row) {
      this.$router.push({ path: '/recommend/ServerRecommendDetail', query: { data: JSON.stringify(row) }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleEdit(row) {
      this.syncVisible = true
      this.fromData = row
    },
    handleDelete(row) {
      recommendRemove(row)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    fromSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.fromData.id) {
            recommendUpdate(this.fromData)
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
                this.$notify.error({
                  title: '失败',
                  message: response.data.errmsg
                })
              })
          } else {
            recommendAdd(this.fromData)
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
                this.$notify.error({
                  title: '失败',
                  message: response.data.errmsg
                })
              })
          }
        }
      })
    }
  }
}
</script>
