
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime: 2019-12-13 16:32:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.goodsLabelCode" style="width: 200px;" placeholder="请输入编号" />
      <el-input v-model="listQuery.goodsLabelName" style="width: 200px;" placeholder="请输入名称" />
      <el-select v-model="listQuery.state" style="width: 200px;" placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="addGoodsLabelfn">新增</el-button>
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
      s
      <!-- <el-table-column align="center" label="出厂时间" prop="factory_time"/> -->
      <el-table-column align="center" min-width="100" label="序号" prop="id" />

      <el-table-column align="center" min-width="100" label="编号" prop="goodsLabelCode" />
      <el-table-column align="center" min-width="100" label="名称" prop="goodsLabelName" />
      <el-table-column align="center" min-width="100" label="图片" prop="goodsLabelUrl">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="viewimage(scope.row.goodsLabelUrl)">查看</el-button>
          <!-- 图片 -->
          <!-- <div class="demo-image__preview">
            <el-image style="width: 100px; height: 100px" src="https://img2018.cnblogs.com/blog/857591/201905/857591-20190520105429819-844152244.png"></el-image>
            {{scope.row.goodsLabelUrl}}
          </div>-->
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="备注" prop="desc" />
      <!-- <el-table-column align="center" min-width="100" label="首付" prop="retailPrice"/> -->
      <el-table-column align="center" min-width="100" label="状态" prop="state">
        <template slot-scope="scope">{{ scope.row.state ? '启用' : '禁用' }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="创建时间" prop="addTime" />
      <el-table-column
        align="operation"
        label="操作"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.state"
            type="danger"
            size="mini"
            @click="handleForbid(scope.row)"
          >禁用</el-button>
          <el-button
            v-if="!scope.row.state"
            type="success"
            size="mini"
            @click="handleForbid(scope.row)"
          >启用</el-button>

          <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
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
.labelNum {
  display: inline-block;
  width: 200px;
}
.labelName {
  display: inline-block;
  width: 200px;
}
.search-button {
  width: 120px;
}
.add-button {
  width: 120px;
}
.addlabelname {
  display: inline-block;
  width: 300px;
}
.addremark {
  display: inline-block;
  width: 300px;
}
</style>

<script>
import { getGoodsLableList, forbidGoodsLabel, goodsLabelDelete } from '@/api/label'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsLabel',
  components: { BackToTop, Pagination },
  // filters: {
  //   is_sellFilter(val) {
  //     // console.log(val)
  //     if (val === 0) {
  //       return '未审核'
  //     } else if (val === 1) {
  //       return '已销售'
  //     } else {
  //       return '正常状态'
  //     }
  //   },
  //   isSellFilter(val) {
  //     // console.log(val)
  //     if (val === 0) {
  //       return '审核'
  //     } else if (val === 2) {
  //       return '销售'
  //     }
  //   }
  // },
  data() {
    return {
      handleRemove: '',
      pciImageUrl: '',
      options: [{ value: 1, label: '启用' }, { value: 0, label: '禁用' }],
      commonType: undefined,
      list: [],
      total: 0,
      text: undefined,
      listLoading: true,
      listQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // init: function() {
    //   listCatAndBrand().then(response => {
    //     this.categoryList = response.data.data.categoryList;
    //     this.brandList = response.data.data.brandList;
    //   });
    // },
    getList() {
      this.listLoading = true
      getGoodsLableList(this.listQuery)
        .then(response => {
          this.list = response.data.data.data
          this.total = response.data.data.page.total
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 编辑商品标签
    handleUpdate(row) {
      this.$router.push({
        path: '/label/goodsLabelEdit',
        query: { id: row.goodsLabelCode }
      })
    },
    // 新增商品标签
    addGoodsLabelfn() {
      this.$router.push({ path: '/label/createGoodsLabel' })
    },
    // showDetail(detail) {
    //   this.goodsDetail = detail
    //   this.detailDialogVisible = true
    // },
    // handlePictureCardPreview(file) {
    //   this.pciImageUrl = file.url;
    //   this.pciImageUrl = true;
    // },
    // 禁用商品标签
    handleForbid(row) {
      if (row.state) {
        row.state = 0
      } else {
        row.state = 1
      }
      const goodsState = {
        id: row.id,
        state: row.state
      }
      // console.log(goodsState);
      forbidGoodsLabel(goodsState)
        .then(response => {
          console.log(response)
          this.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查看图片
    viewimage(url) {
      window.open(url)
    },
    handleDel(row) {
      goodsLabelDelete(row).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    }
  }
}
</script>
