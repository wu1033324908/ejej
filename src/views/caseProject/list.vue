<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2020-03-27 14:45:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.exampleModel" class="filter-item" clearable placeholder="请选择样式">
        <el-option
          v-for="(item,index) in exampleModels"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.houseType" class="filter-item" clearable placeholder="请选择户型">
        <el-option
          v-for="(item,index) in houseTypes"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.exampleStyle" class="filter-item" clearable placeholder="请选择风格">
        <el-option
          v-for="(item,index) in exampleStyles"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.review" class="filter-item" clearable placeholder="请选择案列资料包状态">
        <el-option
          v-for="item in reviews"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="listQuery.exampleName" clearable class="filter-item" style="width: 200px;" placeholder="请输入资料包名称"/>
      <el-input v-model="listQuery.housingName" clearable class="filter-item" style="width: 200px;" placeholder="请输入小区名称"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入姓名"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="index" align="center" width="50" label="序号"/>
      <el-table-column align="center" label="编号" prop="exampleCode"/>
      <el-table-column align="center" label="案例名称" prop="exampleName"/>
      <el-table-column align="center" label="小区名称" prop="housingName"/>
      <el-table-column align="center" label="样式" prop="exampleModel"/>
      <el-table-column align="center" label="户型" prop="houseType"/>
      <el-table-column align="center" label="销售价(元)" prop="dataMoney"/>
      <el-table-column align="center" label="跟踪服务价格(元)" prop="trackMoney"/>
      <el-table-column align="center" label="设计师" prop="creatorName"/>
      <el-table-column align="center" label="跟踪服务" prop="serviceMessage">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.serviceMessage }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"><span class="pointer">查看</span></el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="addTime"/>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state==1?'success':'danger'">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.review==0?'primary':scope.row.review==1?'success':'danger'">{{ scope.row.review | reviewFilters }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-permission="['POST /admin/exampleData/isUse']" v-show="scope.row.state == 0 && scope.row.review == 1" type="success" size="mini" @click="handleIsUse(scope.row)">上架</el-button>
          <el-button v-permission="['POST /admin/exampleData/disable']" v-show="scope.row.state == 1 && scope.row.review == 1" type="warning" size="mini" @click="handleDisable(scope.row)">下架</el-button>
          <el-button v-permission="['POST /admin/exampleData/pass']" v-show="scope.row.review == 0" type="success" size="mini" @click="handlePass(scope.row)">通过</el-button>
          <el-button v-permission="['POST /admin/exampleData/fail']" v-show="scope.row.review == 0" type="warning" size="mini" @click="handleFail(scope.row)">驳回</el-button>
          <el-button v-permission="['POST /admin/exampleData/detail']" type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 详情 -->
    <el-dialog :visible.sync="detailInfoSync" title="详情">

      <h3 class="name">施工图</h3>
      <template v-if="constImg.length > 0">

        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item, index) in constImg" :key="index">
            <div class="demo-image">
              <img :src="item" alt="" style="height: 340px;">
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
      <h3 v-else class="center">暂无施工图</h3>
      <hr>
      <h3 class="name">平面图</h3>
      <template v-if="flatImg.length > 0">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item, index) in flatImg" :key="index">
            <div class="demo-image">
              <img :src="item" alt="" style="height: 340px;">

            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
      <h3 v-else class="center">暂无平面图</h3>
      <hr>
      <h3 class="name">效果图</h3>
      <template v-if="flatImg.length > 0">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item, index) in effectImg" :key="index">
            <div class="demo-image">
              <img :src="item" alt="" style="height: 340px;">

            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
      <h3 v-else class="center">暂无平面图</h3>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailInfoSync = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 驳回 -->
    <el-dialog :visible.sync="checkSync" title="驳回">
      <el-form ref="verifiForm" :model="verifiForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="备注">
          <el-input :rows="2" v-model="verifiForm.passMsg" placeholder="请输入备注" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCheck">提交</el-button>
      </div>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style scoped>
.center{
  text-align: center;
  color: #ccc;
}
.pointer{
  cursor: pointer;
}
.demo-image{
  display: flex;
  justify-content: center;
}
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
    .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .name{
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>

import { exampleDatalist, exampleDataisUse, exampleDatadisable, exampleDatadetail, exampleDatapass, exampleDatafail } from '@/api/caseProject'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getDropDown } from '@/api/dropDown'

export default {
  name: 'CaseProjectList',
  components: { BackToTop, Pagination },
  filters: {
    reviewFilters(val) {
      if (val === 0 || val === '0') {
        return '审核中'
      }
      if (val === 1 || val === '1') {
        return '审核通过'
      }
      if (val === 2 || val === '2') {
        return '审核未通过'
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
      exampleModels: [],
      houseTypes: [],
      exampleStyles: [],
      reviews: [{ id: '0', name: '审核中' }, { id: '1', name: '审核通过' }, { id: '2', name: '审核未通过' }],

      // 详情
      detailInfoSync: false,
      constImg: [], // 施工图
      flatImg: [], // 平面图
      effectImg: [], // 效果图
      // 驳回
      checkSync: false,
      verifiForm: {}
    }
  },
  created() {
    this.getList()
    this.getDropDownFn()
  },
  methods: {
    getList() {
      this.listLoading = true
      exampleDatalist(this.listQuery).then(response => {
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
    // 详情
    handleDetail(row) {
      const _this = this
      _this.detailInfoSync = true
      exampleDatadetail({
        exampleCode: row.exampleCode
      }).then(response => {
        _this.constImg = []
        for (const i in response.data.data.const) {
          _this.constImg.push(response.data.data.const[i].fileUrl)
        }
        _this.flatImg = []
        for (const i in response.data.data.flat) {
          _this.flatImg.push(response.data.data.flat[i].fileUrl)
        }
        _this.effectImg = []
        for (const i in response.data.data.effect) {
          _this.effectImg.push(response.data.data.effect[i].fileUrl)
        }
        _this.$forceUpdate()
      }).catch(response => {
        _this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    },
    // 上架
    handleIsUse(row) {
      exampleDataisUse({
        exampleCode: row.exampleCode
      })
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '上架成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    // 下架
    handleDisable(row) {
      exampleDatadisable({
        exampleCode: row.exampleCode
      })
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '下架成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    // 审核通过
    handlePass(row) {
      const sendData = row
      sendData.adminId = this.$store.getters.userid
      exampleDatapass(sendData)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '审核通过'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    // 审核驳回
    handleFail(row) {
      this.checkSync = true
      this.verifiForm = row
      this.verifiForm.adminId = this.$store.getters.userid
    },
    submitCheck() {
      exampleDatafail(this.verifiForm)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '审核已驳回'
          })
          this.getList()
          this.checkSync = false
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    // 获取下拉框数据
    getDropDownFn() {
      getDropDown({
        key_group_name: 'example_style'
      }).then(response => {
        response.data.data.forEach((item, index) => {
          this.exampleModels.push({
            label: item.key_value,
            value: item.key_name
          })
        })
      }).catch(err => {
        console.log(err)
      })
      getDropDown({
        key_group_name: 'house_type'
      })
        .then(response => {
          response.data.data.forEach((item, index) => {
            this.houseTypes.push({
              label: item.key_value,
              value: item.key_name
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
      getDropDown({
        key_group_name: 'example_model'
      })
        .then(response => {
          response.data.data.forEach((item, index) => {
            this.exampleStyles.push({
              label: item.key_value,
              value: item.key_name
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleServiceMessage(row) {
      console.log(1)
      console.log(row)
    }
  }
}
</script>
