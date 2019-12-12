<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 17:05:04
 * @LastEditTime: 2019-08-16 14:47:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.new_version" clearable class="filter-item" style="width: 200px;" placeholder="请输入当前版本号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增版本</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <el-table-column align="center" label="发布时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="应用名" prop="name"/>
      <el-table-column align="center" min-width="100" label="平台" prop="type">
        <template slot-scope="scope">
          {{ scope.row.type | typeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="是否有更新" prop="isUpdate">
        <template slot-scope="scope">
          {{ scope.row.isUpdate | isUpdateName }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="是否强制更新" prop="isMustUpdate">
        <template slot-scope="scope">
          {{ scope.row.isMustUpdate | isMustUpdateName }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="是否需要重启" prop="isRestart">
        <template slot-scope="scope">
          {{ scope.row.isRestart | isRestartName }}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="当前版本号" prop="newVersion"/>
      <el-table-column align="center" min-width="100" label="最小版本" prop="minVersion"/>
      <!-- <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
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
import { getUpdateList } from '@/api/appVersion'
import { getComboBox } from '@/api/select'
import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'AppVersion',
  components: { BackToTop, Pagination },
  filters: {
    typeName(val) {
      if (val === 0 || val === '0') {
        return 'Android'
      }
      if (val === 1 || val === '1') {
        return 'IOS'
      }
    },
    isUpdateName(val) {
      if (val === 1 || val === '1') {
        return '否'
      }
      if (val === 0 || val === '0') {
        return '是'
      }
    },
    isMustUpdateName(val) {
      if (val === 1 || val === '1') {
        return '否'
      }
      if (val === 0 || val === '0') {
        return '是'
      }
    },
    isRestartName(val) {
      if (val === 1 || val === '1') {
        return '需要'
      }
      if (val === 0 || val === '0') {
        return '不需要'
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
        // position: 2 // 首页广告条（首页banner轮播图） string
      },
      positions: [{ id: 1, text: '启屏页' }, { id: 2, text: '首页轮播图' }, { id: 3, text: '首页菜单按扭' }, { id: 4, text: '活动营销位' }]
    }
  },
  created() {
    this.getList()
    this.initSelect()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUpdateList(this.listQuery).then(response => {
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
      const _this = this
      _this.getCommonSelect({
        key_group_name: 'order_type',
        callback: function(v) {
          _this.orderTypes = v
        }
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
    },
    handleCreate() {
      this.$router.push({ path: '/appManage/appVersionCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/appManage/appVersionEdit', query: { rowData: JSON.stringify(row) }})
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      // adDel(row).then(response => {
      //   this.$notify.success({
      //     title: '成功',
      //     message: '删除成功'
      //   })
      //   const index = this.list.indexOf(row)
      //   this.list.splice(index, 1)
      // }).catch(response => {
      //   this.$notify.error({
      //     title: '失败',
      //     message: response.data.errmsg
      //   })
      // })
    }
  }
}
</script>
