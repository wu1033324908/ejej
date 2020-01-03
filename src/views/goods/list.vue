<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.goods_sn"
        clearable
        class="filter-item"
        style="width:150px;"
        placeholder="请输入商品编号"
        @keyup.enter="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        clearable
        class="filter-item"
        style="width:150px;"
        placeholder="请输入商品名称"
        @keyup.enter.native="handleFilter"
      />
      <el-cascader
        v-model="categoryId"
        :options="cOptions1"
        :props="{ checkStrictly: true }"
        class="filter-item"
        placeholder="请选择分类"
        clearable
        filterable
        @change="handleChange"
      />
      <el-form
        ref="form"
        :model="timeForm"
        class="initialTime"
        style="width:400px"
        label-width="80px"
        size="mini"
      >
        <el-form-item class="tiemBox" label-width="100px" label="创建起止时间">
          <el-col :span="9">
            <el-date-picker
              v-model="timeForm.date1"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="0" class="line">-</el-col>
          <el-col :span="9">
            <el-date-picker
              v-model="timeForm.date2"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" prop="goods_sn" />
      <el-table-column align="center" label="一级分类" prop="p1_name" />
      <el-table-column align="center" label="二级分类" prop="p2_name" />
      <el-table-column align="center" label="三级分类" prop="p3_name" />

      <el-table-column align="center" min-width="100" label="商品名称" prop="name" />
      <el-table-column align="center" min-width="100" label="子商品数量" prop="amount" />

      <el-table-column align="center" prop="pic_url" label="封面图">
        <template slot-scope="scope">
          <img :src="scope.row.pic_url" width="40" >
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="市场价" prop="retail_price" />
      <el-table-column align="center" min-width="100" label="剩余库存总数" prop="total" />
      <el-table-column align="center" label="状态" prop="is_on_sale">
        <template slot-scope="scope">{{ scope.row.is_on_sale == "0" ? '未上架' : scope.row.is_on_sale == "1" ? '已上架' : '' }}</template>
      </el-table-column>
      <el-table-column :formatter="setTime" align="center" min-width="100" label="状创建时间" prop="add_time" />
      <el-table-column align="center" min-width="300" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button v-show="scope.row.is_on_sale == '1'" type="danger" size="mini" @click="handleDelete(scope.row)">下架</el-button>
          <el-button v-show="scope.row.is_on_sale == '0'" type="success" size="mini" @click="handleDelete(scope.row)">上架</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
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
.table-expand .elel-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.gallery {
  width: 80px;
  margin-right: 10px;
}
.initialTime {
  display: inline-block;
  vertical-align: sub;
  line-height: 47px;
}
.el-form-item.tiemBox.el-form-item--mini {
  margin-bottom: 0;
}
</style>

<script>
import { listGoods, listCatAndBrand, stateGoods } from '@/api/goods'
import BackToTop from '@/components/BackToTop'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Pagination from '@/components/Pagination'
export default {
  name: 'GoodsList',
  components: { BackToTop, Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        goodsSn: undefined,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      categoryId: [],
      timeForm: {},
      category1: undefined,
      category2: undefined,
      category3: undefined,
      cOptions1: [],
      cOptions2: [],
      cOptions3: [],
      goodsDetail: undefined,
      detailDialogVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表的方法
    getList() {
      this.listLoading = true
      if (this.category3 !== undefined) {
        this.listQuery.category_id = this.category3.toString()
      } else if (this.category2 !== undefined) {
        this.listQuery.category_id = this.category2.toString()
      } else if (this.category1 !== undefined) {
        this.listQuery.category_id = this.category1.toString()
      } else {
        this.listQuery.category_id = undefined
      }

      this.listQuery.beginDate = this.timeForm.date1 || undefined
      this.listQuery.endDate = this.timeForm.date2 || undefined

      listGoods(this.listQuery).then(response => {
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    // 获取分类id的方法
    handleChange(value) {
      // console.log(value)
      // console.log(this.categoryId)
    },
    // 获取分类的方法
    getCategory() {
      listCatAndBrand()
        .then(response => {
          this.cOptions1 = response.data.data.categoryList
          // this.brandList = response.data.data.brandList
        })
        .catch(() => { })
    },
    // 计算时间的方法
    setTime(row, column) {
      // var dateee = new Date(row[column.property]).toJSON();
      // var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
      //   .toISOString()
      //   .replace(/T/g, " ")
      //   .replace(/\.[\d]{3}Z/, "");
      // console.log(date);
      // return date;
      const date = new Date(row[column.property])
      return (
        date.getFullYear() +
        '年' +
        date.getMonth() +
        '月' +
        date.getDate() +
        '日 ' +
        date.getHours() +
        ':' +
        date.getMinutes()
      )
    },
    handleFilter() {
      this.listQuery.page = 1

      this.getList()
    },
    handleCreate() {
      this.$router.push({ path: '/goods/create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/goods/edit', query: { id: row.goods_sn }})
    },
    handleDetail(row) {
      this.$router.push({
        path: '/goods/detail',
        query: { id: row.goods_sn, total: row.total, amount: row.amount, gId: row.id }
      })
    },
    handleDelete(row) {
      if (row.is_on_sale === 1 || row.is_on_sale === '1') {
        row.is_on_sale = 0
      } else {
        row.is_on_sale = 1
      }
      stateGoods({
        id: row.id,
        isOnSale: row.is_on_sale
      })
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '修改成功'
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '商品ID',
          '商品编号',
          '名称',
          '专柜价格',
          '当前价格',
          '是否新品',
          '是否热品',
          '是否在售',
          '首页主图',
          '宣传图片列表',
          '商品介绍',
          '详细介绍',
          '商品图片',
          '商品单位',
          '关键字',
          '类目ID',
          '品牌商ID'
        ]
        const filterVal = [
          'id',
          'goodsSn',
          'name',
          'counterPrice',
          'retailPrice',
          'isNew',
          'isHot',
          'isOnSale',
          'listPicUrl',
          'gallery',
          'brief',
          'detail',
          'picUrl',
          'goodsUnit',
          'keywords',
          'categoryId',
          'brandId'
        ]
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
