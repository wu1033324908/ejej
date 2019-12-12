<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime: 2019-08-16 14:42:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 300px;" placeholder="请输入名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增二手机</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <!-- <el-table-column align="center" label="出厂时间" prop="factory_time"/> -->

      <el-table-column align="center" min-width="100" label="机器名称" prop="name"/>

      <el-table-column align="center" min-width="100" label="品牌" prop="brandID"/>
      <el-table-column align="center" min-width="100" label="使用时长" prop="oldTime"/>
      <el-table-column align="center" min-width="100" label="省" prop="province"/>
      <el-table-column align="center" min-width="100" label="市" prop="city"/>
      <!-- <el-table-column align="center" min-width="100" label="首付" prop="retailPrice"/> -->

      <el-table-column align="center" min-width="100" label="价格" prop="counterPrice"/>
      <el-table-column align="center" min-width="100" label="状态" prop="isSell" >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isSell === 1 ? 'danger' : 'success'"
            disable-transitions>
            {{ scope.row.isSell | is_sellFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="scope.row.isSell !== 1" type="primary" size="mini" @click="handleCheck(scope.row)">{{ scope.row.isSell | isSellFilter }}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 审核 -->
    <el-dialog :visible.sync="logisticsFormVisible" title="审核">
      <span>{{ text }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="logisticsFormVisible = false">取消</el-button>
        <el-button type="primary" @click="logistics">确定</el-button>
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
import { oldList, oldDel, oldCheck } from '@/api/oldExcavator'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'OldExcavatorList',
  components: { BackToTop, Pagination },
  filters: {
    is_sellFilter(val) {
      // console.log(val)
      if (val === 0) {
        return '未审核'
      } else if (val === 1) {
        return '已销售'
      } else {
        return '正常状态'
      }
    },
    isSellFilter(val) {
      // console.log(val)
      if (val === 0) {
        return '审核'
      } else if (val === 2) {
        return '销售'
      }
    }
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
      oldList(this.listQuery).then(response => {
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
      this.$router.push({ path: '/informationPublish/oldExcavatorCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/informationPublish/oldExcavatorEdit', query: { good_code: row.good_code }})
    },
    // showDetail(detail) {
    //   this.goodsDetail = detail
    //   this.detailDialogVisible = true
    // },
    handleDelete(row) {
      oldDel(row).then(response => {
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
    handleCheck(row) {
      this.logisticsForm = { good_code: row.good_code }
      this.commonType = row.isSell
      console.log(typeof this.commonType)
      this.logisticsFormVisible = true
      if (this.commonType === 2) {
        this.text = '确认已销售吗？'
      } else if (this.commonType === 0) {
        this.text = '确认上架吗？'
      }
    },
    logistics() {
      const data = this.logisticsForm
      if (this.commonType === 2) {
        data.type = 1
      } else if (this.commonType === 0) {
        data.type = 0
      }
      // data.type = parseInt(this.logisticsForm.type)
      oldCheck(data).then(response => {
        this.logisticsFormVisible = false
        this.$notify.success({
          title: '成功',
          message: '回复成功'
        })
        setTimeout(() => {
          this.getList()
        }, 1000)
      }).catch(response => {
        this.logisticsFormVisible = false
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    }
  }
}
</script>
