<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:38:54
 * @LastEditTime: 2019-08-16 14:54:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <span class="filter-item">关键字：</span> -->
      <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <el-table-column align="center" min-width="100" label="用户ID" prop="id"/>
      <el-table-column align="center" min-width="100" label="手机号" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="咨询相关信息" prop="content"/>
      <el-table-column align="center" min-width="100" label="备注信息" prop="desc"/>
      <el-table-column align="center" min-width="100" label="创建时间" prop="add_time"/>
      <el-table-column align="center" min-width="100" label="修改时间" prop="update_time"/>
      <el-table-column align="center" min-width="100" label="跟进状态" prop="follow_type">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.follow_type === '0' ? 'danger' : 'primary'"
            disable-transitions>
            {{ scope.row.follow_type | follow_type_filter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.follow_type === 0 || scope.row.follow_type === '0'" type="primary" size="mini" @click="handleContact(scope.row)">联系</el-button>
          <el-button v-show="scope.row.follow_type === 1 || scope.row.follow_type === '1'" type="primary" size="mini" @click="handleContact(scope.row)">备注</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 联系 -->
    <el-dialog :visible.sync="contactVisiable" :title="contactTitle[follow_type]">
      <el-form
        ref="contactForm"
        :model="contactForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="备注信息" prop="desc">
          <el-input :rows="2" v-model="contactForm.desc" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contactVisiable = false">取消</el-button>
        <el-button type="primary" @click="contactSubmit">确定</el-button>
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
import { findMsg, updateMsg } from '@/api/userManage'
// import { MessageBox } from 'element-ui'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PreSalManageList',
  components: { BackToTop, Pagination },
  filters: {
    follow_type_filter(val) {
      // console.log(val)
      if (val === 0 || val === '0') {
        return '未联系 '
      } else if (val === 1 || val === '1') {
        return '已联系'
      }
    }
  },
  data() {
    return {
      follow_type: 0,
      clearable: true,
      contactVisiable: false,
      contactTitle: ['联系', '备注信息'],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keyword: undefined
      },
      contactForm: {}
    }
  },
  created() {
    console.log(this.listQuery)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      findMsg(this.listQuery).then(response => {
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
      this.follow_type = Number(row.follow_type)
      this.contactVisiable = true
      console.log(row)
      this.contactForm.id = row.id
    },
    contactSubmit() {
      updateMsg(this.contactForm).then(response => {
        this.$notify.success({
          title: '成功',
          message: '保存成功'
        })
        this.contactVisiable = false
        this.getList()
      }).catch((response) => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    }
  }
}
</script>
