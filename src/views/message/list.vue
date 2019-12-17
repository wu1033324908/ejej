<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2019-12-16 11:32:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.title" class="filter-item" style="width: 200px;" placeholder="请输入标题"/>
      <el-input v-model="listQuery.createName" class="filter-item" style="width: 200px;" placeholder="请输入创建人"/>
      <el-select v-model="listQuery.msgState" class="filter-item" clearable placeholder="请选择消息类型">
        <el-option
          v-for="msgState in msgStates"
          :key="msgState.id"
          :label="msgState.name"
          :value="msgState.id"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.startTime"
        class="filter-item"
        type="datetime"
        placeholder="创建开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.endTime"
        class="filter-item"
        type="datetime"
        placeholder="创建结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <!-- <el-table-column type="selection"/> -->
      <el-table-column align="center" label="消息编码" prop="msgCode"/>
      <el-table-column align="center" label="消息类型" prop="msgState">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.msgState | msgStateFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发送类型" prop="sendType">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sendType | sendTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" prop="title"/>
      <el-table-column align="center" label="短信内容" prop="content" />
      <el-table-column align="center" label="创建人" prop="createName" />
      <el-table-column align="center" label="创建时间" prop="addTime"/>
      <el-table-column align="center" label="发送时间" prop="sendTime"/>
      <el-table-column align="center" label="发送数量" prop="sendNum"/>
      <el-table-column align="center" label="阅读量" prop="readNum"/>
      <el-table-column align="center" label="备注" prop="remark"/>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.sendType != 0" type="danger" size="mini" @click="handleCancel(scope.row)">取消</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleReadList(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 收件人详情 -->
    <el-dialog :visible.sync="syncVisible" :title="'收件人详情'">
      <el-card class="box-card">
        <div class="card-head" style="height:450px; overflow-y:auto;">
          <div class="filter-container">
            <el-input v-model="readListQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称"/>
            <el-input v-model="readListQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleReadFilter">查询</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleReadExport">导出</el-button>
          </div>
          <el-table v-loading="readListLoading" ref="multipleTable" :data="readlList" element-loading-text="正在查询中。。。" border fit highlight-current-row>
            <!-- <el-table-column type="selection"/> -->
            <el-table-column align="center" label="昵称" prop="nickname"/>
            <el-table-column align="center" label="姓名" prop="userName"/>
            <el-table-column align="center" label="手机号" prop="mobile"/>
          </el-table>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="syncVisible = false">确定</el-button>
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
import { rollback, list, pushRead } from '@/api/messages'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CreateList',
  components: { BackToTop, Pagination },
  filters: {
    msgStateFilter(val) {
      if (val === 0 || val === '0') {
        return '系统消息'
      }
      if (val === 1 || val === '1') {
        return '活动消息'
      }
      if (val === 2 || val === '2') {
        return '优惠促销'
      }
      if (val === 3 || val === '3') {
        return '售后反馈'
      }
      if (val === 4 || val === '4') {
        return '通知'
      }
      if (val === 5 || val === '5') {
        return '私信'
      }
      if (val === 6 || val === '6') {
        return 'b端站内消息'
      }
      if (val === 7 || val === '7') {
        return 'b端站内私信'
      }
    },
    sendTypeFilter(val) {
      if (val === 0 || val === '0') {
        return '直接发送'
      }
      if (val === 1 || val === '1') {
        return '定时发送'
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
      row: {},
      msgStates: [
        { name: '系统消息', id: '0' },
        { name: '活动消息', id: '1' },
        { name: '优惠促销', id: '2' },
        { name: '售后反馈', id: '3' },
        { name: '通知', id: '4' },
        { name: '私信', id: '5' },
        { name: 'b端站内消息', id: '6' },
        { name: 'b端站内私信', id: '7' }
      ],
      // 收件人数据
      readListQuery: {
        page: 1,
        limit: 9999
      },
      readlList: [],
      syncVisible: false,
      readListLoading: true,
      // 导出
      downloadLoading: false

    }
  },
  created() {
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
      if (this.listQuery.startTime && this.listQuery.endTime) {
        this.listQuery.page = 1
        this.getList()
      } else {
        if (!this.listQuery.startTime && !this.listQuery.endTime) {
          this.listQuery.page = 1
          this.getList()
        } else {
          this.$message.warning('请输入开始时间和结束时间')
        }
      }
    },
    handleCreate() {
      this.$router.push({ path: '/message/create' })
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleCancel(row) {
      rollback({ msgCode: row.msgCode }).then(response => {
        this.$notify.success({
          title: '成功',
          message: '取消成功'
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
    handleEdit(row) {
      this.$router.push({ path: '/message/create', query: { data: JSON.stringify(row) }})
    },
    handleReadFilter() {
      this.readListQuery.msgCode = this.row.msgCode
      this.getReadList(this.readListQuery)
    },
    handleReadExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '昵称',
          '姓名',
          '手机号'
        ]
        const filterVal = [
          'nickname',
          'userName',
          'mobile'
        ]
        excel.export_json_to_excel2(tHeader, this.readlList, filterVal, '收件人详情')
        this.downloadLoading = false
      })
    },
    handleReadList(row) {
      this.row.msgCode = row.msgCode
      this.getReadList(row)
    },
    getReadList(row) {
      this.syncVisible = true
      this.readListLoading = true
      pushRead(row).then(response => {
        this.readlList = response.data.data
        // this.readTotal = response.data.data.page.total
        this.readListLoading = false
      }).catch(response => {
        this.readlList = []

        this.readListLoading = false
      })
    }
  }
}
</script>
