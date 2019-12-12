
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
      <el-input v-model="listQuery.exampleName" style="width: 150px;" placeholder="请输入案例名称" />
      <el-input v-model="listQuery.name" style="width: 120px;" placeholder="请输入姓名" />
      <el-input v-model="listQuery.housing_name" style="width: 150px;" placeholder="请输入小区名称" />
      <el-select
        v-model="listQuery.example_type"
        clearable
        style="width: 120px;"
        placeholder="案例类型"
      >
        <el-option
          v-for="(item , index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.example_source"
        clearable
        style="width: 150px;"
        placeholder="请选择案例来源"
      >
        <el-option
          v-for="(item,index) in sourceOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.example_model"
        clearable
        style="width: 120px;"
        placeholder="请选择样式"
      >
        <el-option
          v-for="(item,index) in modelOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.house_type" clearable style="width: 120px;" placeholder="请选择户型">
        <el-option
          v-for="(item,index) in house_typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.example_style"
        clearable
        style="width: 120px;"
        placeholder="请选择风格"
      >
        <el-option
          v-for="(item,index) in styleOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">新增</el-button>
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
      <el-table-column align="center" min-width="100" label="序号" prop="id" />
      <el-table-column align="center" min-width="100" label="编号" prop="exampleCode" />
      <el-table-column align="center" min-width="100" label="案例类别" prop="exampleType">
        <template
          slot-scope="scope"
        >{{ scope.row.exampleType==0 ? "设计师":scope.row.exampleType==1 ? "零工" : "项目经理" }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="案例名称" prop="exampleName" />
      <el-table-column align="center" min-width="100" label="小区名称" prop="housingName" />
      <el-table-column align="center" min-width="100" label="样式" prop="exampleModel">
          <template slot-scope="scope" >
            {{scope.row.exampleModel == 1 ? '复式' :scope.row.exampleModel ==2 ? '户型':'暂无'}}
          </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="户型" prop="houseType">
          <template slot-scope="scope" >
            {{scope.row.houseType == 1 ? '一户' : scope.row.houseType ==2 ? '两户' : scope.row.houseType ==3 ? "三户" :'暂无'  }}
          </template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="风格" prop="exampleStyle">
          <template slot-scope="scope" >
            {{scope.row.exampleStyle == 1 ? '西式' : scope.row.exampleStyle == 2 ? '中式' :scope.row.exampleStyle == 3 ? '法式' :scope.row.exampleStyle == 4 ? '日式' :'暂无' }}
          </template>  
      </el-table-column>
      <el-table-column align="center" min-width="100" label="作者" prop="creatorName" />
      <!-- <el-table-column align="center" min-width="100" label="图片" prop="goodsLabelUrl">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="viewimage(scope.row.goodsLabelUrl)">查看</el-button>
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" min-width="100" label="首付" prop="retailPrice"/> -->
      <el-table-column align="center" min-width="100" label="创建时间" prop="addTime" />
      <el-table-column align="center" min-width="100" label="状态" prop="state">
        <template slot-scope="scope">{{ scope.row.state ? '启用' : '禁用' }}</template>
      </el-table-column>

      <el-table-column
        align="operation"
        label="操作"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button
            v-show="scope.row.state"
            type="danger"
            size="mini"
            @click="handleForbid(scope.row)"
          >禁用</el-button>
          <el-button
            v-show="!scope.row.state"
            type="success"
            size="mini"
            @click="handleStart(scope.row)"
          >启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />-->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>
    <!-- 新增案例对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新建案例" width="30%">
      <el-form ref="ruleForm" :model="dialogForm" :rules="createRules">
        <el-form-item prop="example_type" label="案例类型" label-width="100px">
          <el-select v-model="dialogForm.example_type" size="medium" clearable placeholder="案例类型">
            <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="example_source" label="案例来源" label-width="100px">
          <el-select
            v-model="dialogForm.example_source"
            size="medium"
            clearable
            placeholder="请选择案例来源"
          >
            <el-option
              v-for="(item,index) in sourceOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCase('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
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
import { getCaseList, forbidCase, startCase } from '@/api/case'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getDropDown } from '@/api/dropDown'
export default {
  name: 'GoodsLabel',
  components: { BackToTop, Pagination },
  data() {
    return {
      handleRemove: '',
      pciImageUrl: '',
      typeOptions: [
        { value: 0, label: '设计师' },
        { value: 1, label: '零工' },
        { value: 2, label: '项目经理' }
      ],
      sourceOptions: [
        { value: 1, label: '链接案例' },
        { value: 0, label: '原创链接' }
      ],
      createRules: {
        example_type: [
          { required: true, message: '请选择案例类型', trigger: 'change' }
        ],
        example_source: [
          { required: true, message: '请选择案例来源', trigger: 'change' }
        ]
      },
      modelOptions: [],
      house_typeOptions: [],
      styleOptions: [],
      commonType: undefined,
      list: [],
      total: 0,
      text: undefined,
      listLoading: true,
      listQuery: {},
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogForm: {},
      caseDetail: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      this.getList()
      this.getDropDownFn()
    },
    // get
    // 获取案例数据
    getList() {
      this.listLoading = true
      // console.log(this.listQuery)
      getCaseList(this.listQuery)
        .then(response => {
          console.log(response)
          this.list = response.data.data.data
          this.listLoading = false
        })
        .catch(err => {
          // console.log(err)
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    // 获取下拉框数据
    getDropDownFn() {
      getDropDown({
        key_group_name: 'example_style'
      })
        .then(response => {
          response.data.data.forEach((item, index) => {
            this.styleOptions.push({
              label: item.key_value,
              value: item.key_name
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
      getDropDown({
        key_group_name: 'house_type'
      })
        .then(response => {
          response.data.data.forEach((item, index) => {
            this.house_typeOptions.push({
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
            this.modelOptions.push({
              label: item.key_value,
              value: item.key_name
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleFilter() {
      // this.listQuery.page = 1;
      this.getList()
    },
    // 编辑案例
    handleUpdate(row) {
      this.$router.push({
        path: '/case/edit',
        query: { exampleCode: row.exampleCode, example_type: row.exampleType }
      })
    },
    // 查看详情
    handleDetail(row) {
      this.$router.push({
        path: '/case/details',
        query: { exampleCode: row.exampleCode, example_type: row.exampleType }
      })
    },
    // 新增案例
    createCase(formName, data) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          window.sessionStorage.setItem(
            'example_source',
            this.dialogForm.example_source
          )
          window.sessionStorage.setItem(
            'example_type',
            this.dialogForm.example_type
          )
          this.dialogFormVisible = false
          this.$router.push({
            path: '/case/create',
            query: {
              example_source: this.dialogForm.example_source,
              example_type: this.dialogForm.example_type
            }
          })
        } else {
          return false
        }
      })
    },
    // 禁用案例
    handleForbid(row) {
      const caseState = {
        exampleCode: row.exampleCode
      }
      console.log(caseState)
      forbidCase(caseState)
        .then(response => {
          this.getList()
        })
        .catch(err => {})
    },
    // 启用案例
    handleStart(row) {
      const caseState = {
        exampleCode: row.exampleCode
      }

      startCase(caseState)
        .then(response => {
          this.getList()
        })
        .catch(err => {})
    }
  }
}
</script>
