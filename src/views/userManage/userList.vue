<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:38:54
 * @LastEditTime: 2019-08-15 17:44:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <span class="filter-item">关键字：</span> -->
      <span class="filter-item">手机号：</span><el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <el-table-column align="center" label="创建时间" prop="addTime"/>
      <el-table-column align="center" min-width="100" label="用户名称" prop="userName"/>
      <el-table-column align="center" min-width="100" label="手机号" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="实名认证" prop="isCheck">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isCheck === 0 ? 'danger' : 'primary'"
            disable-transitions>
            {{ scope.row.isCheck | isCheckFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最近一次登录时间" prop="lastLoginTime"/>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button v-show="scope.row.status === 1" type="primary" size="mini" @click="handleBlockUp(scope.row)">启用</el-button>
          <el-button v-show="scope.row.status === 0" type="primary" size="mini" @click="handleBlockUp(scope.row)">禁用</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="详情">
      <el-card class="box-card">
        <div class="card-head">
          <div>
            <el-tag type="success">用户信息</el-tag>
            <p>用户手机号：{{ detailData.mobile }}</p>
            <!-- <p>推荐人手机号：{{ detailData.mobile || '暂无' }}</p> -->
          </div>
          <!-- <div>
            <h4>分享记录:</h4>
            <p>身份证号:</p>
          </div> -->
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="card-head">
          <div>
            <el-tag type="success">实名信息</el-tag>
            <p>姓名:{{ detailData.userName }}</p>
            <p>身份证号:{{ detailData.idCard }}</p>
          </div>
      </div></el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>

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
import { userList, userBlockUp, userDelete } from '@/api/userManage'
// import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserList',
  components: { BackToTop, Pagination },
  filters: {
    isCheckFilter(val) {
      // console.log(val)
      if (val === 0) {
        return '未认证'
      } else if (val === 1) {
        return '已认证'
      } else {
        return '未知'
      }
    }
  },
  data() {
    return {
      clearable: true,
      detailDialogVisible: false,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        mobile: undefined
      },
      contactForm: [],
      detailData: {}
    }
  },
  created() {
    console.log(this.listQuery)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
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
      for (const i in this.listQuery) {
        if (this.listQuery[i] == null) {
          this.listQuery[i] = undefined
        }
      }
      this.getList()
    },
    handleContact(row) {
      this.detailDialogVisible = true
    },
    handleDetail(detail) {
      this.detailData = detail
      console.log(this.detailData)
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      userDelete(row).then(response => {
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
    },
    handleBlockUp(row) {
      let status = row.status
      if (status === 1 || status === '1') {
        status = 0
      } else {
        status = 1
      }
      const formData = {}
      formData.id = row.id
      formData.status = status
      userBlockUp(formData).then(response => {
        this.$notify.success({
          title: '成功',
          message: '启用成功'
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
