<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-17 17:34:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-input v-model="listQuery.serviceCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入编号"/>
      <!-- <el-input v-model="listQuery.label" clearable class="filter-item" style="width: 200px;" placeholder="请输入标签"/> -->
      <!-- <el-input v-model="listQuery.serviceRecommendCode" clearable class="filter-item" style="width: 300px;" placeholder="请输入服务商推荐类目编码"/> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="syncVisible = true">新增</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="编号" prop="serviceCode"/>
      <el-table-column align="center" min-width="100" label="姓名" prop="nickname"/>
      <el-table-column align="center" min-width="100" label="评分" prop="grade"/>
      <el-table-column align="center" min-width="100" label="成交数" prop="serviceNumber"/>
      <el-table-column align="center" min-width="100" label="案例数" prop="exampleNumber"/>
      <!-- <el-table-column align="center" min-width="100" label="标签" prop="label"/>
      <el-table-column align="center" min-width="100" label="标签图片">
        <template slot-scope="scope">
          <div><img v-show="scope.row.avatar" :src="scope.row.avatar" alt="暂无" style="height:50px;"></div>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 表单新增或编辑 -->
    <el-dialog :visible.sync="syncVisible" :title="title">
      <el-card class="box-card">
        <!-- <div class="filter-container">
            <el-input v-model="listQuery.nickname" clearable class="filter-item" placeholder="请输入姓名"/>
            <el-input v-model="listQuery.label" clearable class="filter-item" placeholder="请输入标签"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleDialogFilter">查找</el-button>
        </div> -->
        <!-- <el-table v-loading="dlistLoading" :data="dlist" element-loading-text="正在查询中。。。" border fit highlight-current-row>
            <el-table-column align="center" min-width="100" label="编号" prop="serviceCode"/>
            <el-table-column align="center" min-width="100" label="姓名" prop="nickname"/>
            <el-table-column align="center" min-width="100" label="评分" prop="grade"/>
            <el-table-column align="center" min-width="100" label="成交数" prop="serviceNumber"/>
            <el-table-column align="center" min-width="100" label="案例数" prop="exampleNumber"/>
            <el-table-column align="center" min-width="100" label="标签" prop="label"/>
            <el-table-column align="center" min-width="100" label="标签图片">
                <template slot-scope="scope">
                    <div><img v-show="scope.row.avatar" :src="scope.row.avatar" alt="暂无" style="height:50px;"></div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
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
import { recommendListDetail, recommendRemovePool } from '@/api/recommend'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ServerRecommendDetail',
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
      },
      serviceRecommendCode: undefined,

      //   表单
      dlist: [],
      dlistLoading: true,
      dlistQuery: {
        page: 1,
        limit: 20
      },
      syncVisible: false
    }
  },
  computed: {
    title() {
      if (!this.dlistQuery.id) {
        return '新增'
      } else {
        return '编辑'
      }
    }
  },
  created() {
    this.init()
    this.getList()
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      console.log(data)
      this.listQuery.serviceRecommendCode = data.serviceRecommendCode
      this.serviceRecommendCode = data.serviceRecommendCode
    },
    getList() {
      this.listLoading = true
      recommendListDetail(this.listQuery).then(response => {
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
    handleDelete(row) {
      row.serviceRecommendCode = this.serviceRecommendCode
      recommendRemovePool(row).then(response => {
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
