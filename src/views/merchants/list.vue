<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 18:16:51
 * @LastEditTime: 2020-02-28 18:10:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.addTime"
        class="filter-item"
        type="datetime"
        placeholder="创建时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <!-- <el-date-picker
        v-model="listQuery.updateTime"
        class="filter-item"
        type="datetime"
        placeholder="截止时间"
        value-format="yyyy-MM-dd HH:mm:ss"/> -->
      <el-select v-model="listQuery.type" class="filter-item" placeholder="类型" clearable>
        <el-option
          v-for="type in types"
          :key="type.id"
          :label="type.name"
          :value="type.id"
        />
      </el-select>
      <el-select v-model="listQuery.typeWork" class="filter-item" placeholder="工种" clearable>
        <el-option
          v-for="type in type_works"
          :key="type.id"
          :label="type.name"
          :value="type.id"
        />
      </el-select>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" @click="handleDownload">导出</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增卡券</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="名称" prop="name"/>
      <el-table-column align="center" label="类型" prop="type_text"/>
      <el-table-column align="center" label="工作类型" prop="type_work_text"/>
      <el-table-column align="center" label="手机号" prop="mobile"/>
      <el-table-column align="center" label="工龄" prop="work_year"/>
      <el-table-column align="center" label="创建时间" prop="add_time"/>

      <!-- <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
import { merchantsList } from '@/api/merchants'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'MerchantsList',
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
      downloadLoading: false,
      types: [{ name: '设计师', id: '0' }, { name: '零工', id: '1' }, { name: '项目经理', id: '2' }],
      type_works: [{ name: '水电工', id: '0' }, { name: '水泥工', id: '1' }, { name: '木匠', id: '2' }, { name: '电工', id: '3' }, { name: '打孔', id: '4' }]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      merchantsList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.page.total
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '名称',
          '类型',
          '工作类型',
          '手机号',
          '工龄',
          '创建时间'
        ]
        const filterVal = [
          'name',
          'type_text',
          'type_work_text',
          'mobile',
          'work_year',
          'add_time'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '招商列表')
        this.downloadLoading = false
      })
    }
  }
}
</script>
