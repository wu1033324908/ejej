<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime : 2019-12-18 18:19:30
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-show="type == 1" v-model="listQuery.orderType" class="filter-item" clearable placeholder="请选择评论类别">
        <el-option
          v-for="item in orderTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <!-- <el-table-column align="center" label="订单编号" prop="goodsSn"/> -->
      <el-table-column align="center" label="姓名" prop="nickname"/>
      <el-table-column align="center" min-width="100" label="手机号" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="综合评分" prop="star"/>
      <el-table-column align="center" min-width="100" label="评论" prop="content"/>
      <el-table-column align="center" min-width="100" label="时间" prop="addTime"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleReply(scope.row)">回复</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <el-dialog :visible.sync="visiable" title="回复">
      <el-form
        ref="hfData"
        :model="hfData"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="回复内容" prop="content">
          <el-input :rows="4" v-model="hfData.content" type="textarea" placeholder="请输入回复内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visiable = false">取消</el-button>
        <el-button type="primary" @click="hfSubmit">确定</el-button>
      </div>
    </el-dialog>

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
import { look, deleteComment, replyComment } from '@/api/comment'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CommentDetail',
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      orderTypes: [{ id: '0', name: '设计订单' }, { id: '1', name: '服务订单' }],
      hfData: {},
      visiable: false,

      valueId: undefined,
      type: undefined
    }
  },
  computed: {
    userid() {
      return this.$store.getters.userid
    }
  },
  created() {
    this.init()
    this.getList()
  },
  mounted() {
    console.log(this.userid)
  },
  methods: {
    init() {
      if (!this.$route.query) return
      this.valueId = this.$route.query.valueId
      this.type = this.$route.query.type || undefined
      this.listQuery.valueId = this.$route.query.valueId
      this.listQuery.type = Number(this.$route.query.type)
      console.log(this.$route.query)
    },
    getList() {
      this.listLoading = true
      look(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        console.log('err')
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleReply(row) {
      this.hfData = {}
      this.visiable = true
      this.hfData = row
      this.hfData.type = this.type
      this.hfData.usertType = '2'
      this.hfData.userCode = 'adminID'
    },
    handleDelete(row) {
      deleteComment(row).then(response => {
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
    hfSubmit() {
      this.hfData.userCode = this.userid
      replyComment(this.hfData).then(response => {
        this.$notify.success({
          title: '成功',
          message: '回复成功'
        })
        this.visiable = false
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
