<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 15:03:31
 * @LastEditTime: 2019-12-17 16:41:14
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户昵称"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-select v-model="listQuery.gender" class="filter-item" clearable placeholder="请选择性别">
        <el-option
          v-for="item in genders"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.city" class="filter-item" clearable placeholder="请选择城市">
        <el-option
          v-for="item in citys"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="listQuery.community" clearable class="filter-item" style="width: 200px;" placeholder="请输入小区"/>
      <el-date-picker
        v-model="listQuery.addTime_start"
        class="filter-item"
        type="datetime"
        placeholder="注册开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-date-picker
        v-model="listQuery.addTime_end"
        class="filter-item"
        type="datetime"
        placeholder="注册结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" min-width="100" label="昵称" prop="nickname"/>
      <el-table-column align="center" min-width="100" label="姓名" prop="name"/>
      <el-table-column align="center" min-width="100" label="性别" prop="gender_text"/>
      <el-table-column align="center" min-width="100" label="手机号码" prop="mobile"/>
      <el-table-column align="center" min-width="100" label="城市" prop="city"/>
      <el-table-column align="center" min-width="100" label="小区" prop="community"/>
      <el-table-column align="center" min-width="100" label="商品订单数" prop="goods_number"/>
      <el-table-column align="center" min-width="100" label="服务订单数" prop="service_number"/>
      <el-table-column align="center" min-width="100" label="出生日期" prop="birthday"/>
      <el-table-column align="center" min-width="100" label="注册日期" prop="add_time"/>
      <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 返回顶部 -->
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
import { list } from '@/api/menberUser'
import { getRegion } from '@/api/commonselect'
import BackToTop from '@/components/BackToTop'
import { MessageBox } from 'element-ui'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'MemberUserList',
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
      genders: [{ name: '未知', id: 0 }, { name: '男', id: 1 }, { name: '女', id: 2 }],
      citys: [],
      communitys: []
    }
  },
  created() {
    this.getList()
    this.getCitySelectData()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
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
    handleDetail(row) {
      this.$router.push({ path: '/memberUser/memberUserDetail', query: { data: JSON.stringify(row) }})
    },
    // handleDelete(row) {
    //   del(row).then(response => {
    //     this.$notify.success({
    //       title: '成功',
    //       message: '删除成功'
    //     })
    //     const index = this.list.indexOf(row)
    //     this.list.splice(index, 1)
    //   }).catch(response => {
    //     this.$notify.error({
    //       title: '失败',
    //       message: response.data.errmsg
    //     })
    //   })
    // },
    // handleChangeCity(data){
    //   const _this = this
    //   _this.getProvinceCity({
    //     pid:data,
    //     type:3,
    //     callback:function (res) {
    //       _this.communitys = res
    //     }
    //   })
    // },
    getCitySelectData() {
      const _this = this
      _this.getProvinceCity({
        pid: 13,
        type: 2
      })
    },
    // getCommunitysSelectData(){
    //   const _this = this
    //   _this.getProvinceCity({
    //     pid:'13',
    //     type:2
    //   })
    // },
    getProvinceCity(opts) {
      const _this = this
      const type = opts.type || 1
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '昵称',
          '姓名',
          '性别',
          '手机号码',
          '城市',
          '小区',
          '商品订单数',
          '服务订单数',
          '出生日期',
          '注册日期'
        ]
        const filterVal = [
          'nickname',
          'name',
          'gender_text',
          'mobile',
          'city',
          'community',
          'goods_number',
          'service_number',
          'birthday',
          'add_time'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '广告信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
