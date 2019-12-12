<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:38:54
 * @LastEditTime: 2019-08-15 17:07:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.keyword" clearable class="filter-item" style="width: 200px;" placeholder="关键字"/> -->
      <el-select v-model="listQuery.province" :clearable="clearable" class="filter-item" placeholder="请选择省份" @change="provinceSelectChange">
        <el-option
          v-for="item in provinces"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.city" :clearable="clearable" class="filter-item" placeholder="请选择城市">
        <el-option
          v-for="item in citys"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.job" :clearable="clearable" class="filter-item" placeholder="请选择工作岗位">
        <el-option
          v-for="item in job"
          :key="item.id"
          :label="item.key_value"
          :value="item.key_name"
        />
      </el-select>
      <el-select v-model="listQuery.salay_money" :clearable="clearable" class="filter-item" placeholder="请选择薪资水平">
        <el-option
          v-for="item in salay_money"
          :key="item.id"
          :label="item.key_value"
          :value="item.key_name"
        />
      </el-select>
      <el-select v-model="listQuery.work_time" :clearable="clearable" class="filter-item" placeholder="请选择工作经验">
        <el-option
          v-for="item in work_time"
          :key="item.id"
          :label="item.key_value"
          :value="item.key_name"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">新增求职</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column
        type="selection"/>
      <el-table-column align="center" label="发布时间" prop="add_time"/>
      <el-table-column align="center" min-width="100" label="标题" prop="name"/>
      <el-table-column align="center" min-width="100" label="劳务编号" prop="labour_code"/>
      <el-table-column align="center" min-width="100" label="省份" prop="province"/>
      <el-table-column align="center" min-width="100" label="城市" prop="city"/>
      <el-table-column align="center" min-width="100" label="薪资水平" prop="salay_money"/>
      <el-table-column align="center" min-width="100" label="工作经验" prop="work_time"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
import { labourWorkList, labourWorkDel } from '@/api/jobWanted'
import { MessageBox } from 'element-ui'
import { getRegion, getComboBox } from '@/api/select'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'JobWantedList',
  components: { BackToTop, Pagination },
  data() {
    return {
      clearable: true,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        province: undefined,
        city: undefined,
        job: undefined,
        salay_money: undefined,
        work_time: undefined
      },
      provinces: [],
      citys: [],
      job: [], // 工作岗位
      salay_money: [], // 薪资水平
      work_time: [] // 工作经验
    }
  },
  created() {
    console.log(this.listQuery)
    this.getList()
    this.initSelect()
    this.getProvinceCity({})
  },
  methods: {
    getList() {
      this.listLoading = true
      labourWorkList(this.listQuery).then(response => {
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
        key_group_name: 'job',
        callback: function(v) {
          _this.job = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'salay_money',
        callback: function(v) {
          _this.salay_money = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'work_time',
        callback: function(v) {
          _this.work_time = v
        }
      })
    },
    getProvinceCity(opts) {
      const _this = this
      const type = opts.type || '1'
      const pid = opts.pid || undefined
      const callback = opts.callback || undefined
      getRegion({ type, pid })
        .then(response => {
          if (type === '1') {
            _this.provinces = response.data.data
          } else {
            _this.citys = response.data.data
            typeof callback === 'function' && callback(response.data.data)
          }
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    provinceSelectChange() {
      const _this = this
      _this.getProvinceCity({
        type: '2',
        pid: this.listQuery.province,
        callback: function(v) {
          _this.list.city = v[0].id
        }
      })
    },
    getCommonSelect(opts) {
      if (opts.key_group_name === undefined || typeof opts.callback !== 'function') return
      const key_group_name = opts.key_group_name || undefined
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
      for (const i in this.listQuery) {
        if (this.listQuery[i] == null) {
          this.listQuery[i] = undefined
        }
      }
      this.getList()
    },
    handleCreate() {
      this.$router.push({ path: '/informationPublish/jobWantedCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/informationPublish/jobWantedEdit', query: { labour_code: row.labour_code }})
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete(row) {
      labourWorkDel(row).then(response => {
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
