<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime : 2020-01-13 16:30:56
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.serviceLabelCode" class="labelNum" placeholder="请输入编号" />
      <el-input v-model="listQuery.serviceLabelName" class="labelName" placeholder="请输入名称" />
      <el-select v-model="listQuery.serviceSource" clearable placeholder="适用服务商">
        <el-option
          v-for="item in applyoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.serviceType" clearable placeholder="标签类型">
        <el-option
          v-for="item in typeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.state" clearable placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="search-button" size="medium" type="primary" @click="handleFilter">搜索</el-button>
      <el-button class="add-button" size="medium" type="primary" @click="addServiceLabelfn">新增</el-button>
    </div>
    <div class="list-container">
      <el-table :data="list" border style="width: 100%">
        <!-- <el-table-column prop="id" label="序号" /> -->
        <!-- <el-table-column prop="serviceLabelCode" label="编号" /> -->
        <el-table-column prop="serviceLabelName" label="名称" />
        <el-table-column prop="serviceLabelUrl" label="图片">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click="viewimage(scope.row.serviceLabelUrl)">查看</el-button> -->
            <div><img :src="scope.row.serviceLabelUrl" alt="暂无" style="height:50px;"></div>
          </template>
        </el-table-column>
        <el-table-column prop="serviceType" label="标签类型">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceType==0 ? "资质标签":scope.row.serviceType==1 ? "属性标签" : "自定义标签" }}</template>
        </el-table-column>
        <el-table-column prop="serviceSource" label="适用服务商">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceSource==0 ? "设计师":scope.row.serviceSource==1 ? "零工" :scope.row.serviceSource==2 ? "项目经理" : "装修公司" }}</template>
        </el-table-column>
        <el-table-column prop="desc" label="备注" />
        <el-table-column prop="state" label="状态" >
          <template slot-scope="scope">
            {{ scope.row.state ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="创建时间" />
        <el-table-column
          align="center"
          label="操作"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button> -->
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
  </div>
</template>

<style>
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
import { getServiceLable, forbiddenServiceLable, goodsLabelDelete } from '@/api/label'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination'
export default {
  components: { BackToTop, Pagination },
  data() {
    return {
      labelNum: '',
      labelName: '',
      labelState: '',
      apply: '',
      labeltype: '',
      applyoptions: [
        { value: '0', label: '设计师' },
        { value: '1', label: '零工' },
        { value: '2', label: '项目经理' },
        { value: '3', label: '装修公司' }
      ],
      typeoptions: [
        { value: '0', label: '资质标签' },
        { value: '1', label: '属性标签' },
        { value: '2', label: '自定义标签' }
      ],
      options: [{ value: 1, label: '启用' }, { value: 0, label: '禁用' }],
      total: 0,
      listQuery: {},
      list: [],
      picVisible: false,
      pciImageUrl: ''
    }
  },
  created() {
    this.getList()
  },
  // computed: {
  //   viewtype:function(data){
  //      return
  //   }
  // },

  methods: {
    getList() {
      this.listLoading = true
      getServiceLable(this.listQuery)
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
    // 查询
    handleFilter() {
      this.getList()
    },
    // 新增
    addServiceLabelfn() {
      this.$router.push({ path: '/label/createServiceLabel' })
    },
    // 更新
    handleUpdate(row) {
      this.$router.push({
        path: '/label/serviceLabelEdit',
        query: { id: row.serviceLabelCode }
      })
    },
    // 禁用
    handleForbid(row) {
      if (row.state) {
        row.state = 0
      } else {
        row.state = 1
      }
      const servicelState = {
        id: row.id.toString(),
        state: row.state
      }
      forbiddenServiceLable(servicelState)
        .then(response => {
          this.getList()
        })
        .catch(() => {
          // console.log(err);
        })
    },
    // 查看图片
    viewimage(url) {
      window.open(url)
      console.log(url)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.pciImageUrl = file.url
      this.pciImageUrl = true
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
