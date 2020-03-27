
<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:28:46
 * @LastEditTime : 2020-01-17 11:06:45
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.id" style="width: 150px;" placeholder="请输入编号" />
      <el-input v-model="listQuery.name" style="width: 150px;" placeholder="请输入名称" />
      <el-select v-model="classL" clearable placeholder="请选择" @change="getL2">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"/>
      </el-select>
      <el-select v-model="classL2" clearable placeholder="请选择">
        <el-option v-for="item in optionsL2" :key="item.value" :label="item.name" :value="item.id"/>
      </el-select>
      <el-button
        type="primary"
        style="margin-top:20px"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button type="primary" style="margin-top:20px" icon="el-icon-edit" @click="handleCreate">新增</el-button>
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
      <el-table-column align="center" width="80" label="序号" prop>
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column align="center" min-width="100" label="编号" prop="id" />
      <el-table-column align="center" min-width="100" label="名称" prop="name" />
      <!-- <el-table-column align="center" min-width="100" label="下属三级分类" prop="wc2" /> -->
      <el-table-column align="center" min-width="100" label="备注" prop="desc" />
      <el-table-column align="center" min-width="100" label="状态" prop="state">
        <template
          slot-scope="scope"
        >{{ scope.row.state == 1 ? '可用' : scope.row.state == 0 ? '禁用' : "" }}</template>
      </el-table-column>

      <el-table-column
        align="operation"
        label="操作"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- <el-button type="primary" @click="handleCreateL2(scope.row)">新增三级分类</el-button> -->
          <el-button v-show="scope.row.state==1" type="danger" @click="handleForbid(scope.row)">禁用</el-button>
          <el-button v-show="scope.row.state==0" type="success" @click="handleForbid(scope.row)">启用</el-button>
          <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑的弹窗 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑二级分类" width="800">
      <el-form :model="formEdit">
        <el-form-item :label-width="'180px'" label="名称" style="width:600px">
          <el-input v-model="formEdit.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="备注" style="width:600px">
          <el-input v-model="formEdit.desc" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="头像" prop="desc" style="width:600px">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-remove="handleRemoveD"
            :multiple="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editL1">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增的弹窗 -->
    <el-dialog :visible.sync="dialogCreate" title="新增三级分类" width="800">
      <el-form ref="ruleForm" :model="formCreate" :rules="rules">
        <el-form-item :label-width="'180px'" label="一级分类">
          <el-select v-model="class1" placeholder="请选择一级分类" @change="getL12">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="二级分类">
          <el-select v-model="class2" placeholder="请选择二级分类">
            <el-option
              v-for="item in optionsL12"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="名称" prop="name" style="width:600px">
          <el-input v-model="formCreate.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="备注" prop="desc" style="width:600px">
          <el-input v-model="formCreate.desc" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="'180px'" label="头像" prop="desc" style="width:600px">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-remove="handleRemoveD"
            :multiple="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreate = false">取 消</el-button>
        <el-button type="primary" @click="createL1('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
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
.initialTime {
  display: inline-block;
  vertical-align: middle;
  line-height: 47px;
}
.el-form-item.tiemBox.el-form-item--mini {
  margin-bottom: 0;
}
.avatar-uploader .el-upload {
  width: 145px;
  height: 145px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>

<script>
// import { getUserList, deleteUser } from "@/api/user";
import {
  listCategoryLv,
  createCategory,
  updateCategory,
  deleteCategory,
  deletedata

} from '@/api/category'
import { uploadPath } from '@/api/user'
// import { departList } from '@/api/depart'
import BackToTop from '@/components/BackToTop'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import { getDropDown } from '@/api/dropDown'
export default {
  name: 'GoodsLabel',
  components: { BackToTop, Pagination },
  data() {
    return {
      imgUrl: undefined,
      uploadPath,
      dialogEdit: false,
      dialogCreate: false,
      dialogCreateL2: false,
      dialogL2: false,
      dialogEditL2: false,
      pid: '',
      options: [],
      optionsL2: [],
      optionsL12: [],
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      class1: '',
      class2: '',
      classL: '',
      classL2: '',
      formEdit: {},
      formCreate: {},
      formCreateL2: {},
      formEditL2: {},
      handleRemove: '',
      pciImageUrl: '',
      departOptions: [],
      styleOptions: [],
      commonType: undefined,
      list: [],
      listL2: [],
      total: 0,
      text: undefined,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogForm: {},
      caseDetail: {},
      downloadLoading: false
    }
  },
  computed: {
    headers() {
      return {
        'X-Wajueji-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      this.getList()
      this.getListL1()
      //   this.getDropDownFn();
    },
    // 获取分类列表
    getList() {
      // let listData = {
      //   level: 1,
      //   pid: 0
      // };
      this.listLoading = true
      const data = this.listQuery
      //   data.pid = 0;
      data.level = 3

      if (this.classL !== '') {
        this.listQuery.pid = this.classL2
      } else {
        delete this.listQuery.pid
      }

      listCategoryLv(data)
        .then(response => {
          console.log(response)
          this.list = response.data.data.data
          this.total = response.data.data.page.total
          this.listLoading = false
          //   listData = {};
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      // this.listQuery.page = 1;
      if (this.classL === '') {
        this.getList()
      } else {
        if (this.classL2 === '') {
          MessageBox.alert('请选择二级分类', {
            confirmButtonText: '确定',
            type: 'error'
          })
        } else {
          this.getList()
        }
      }
    },
    // 获取某个一级分类下面的二级分类
    getL2(e) {
      if (this.classL !== '') {
        console.log(e)
        const data = {
          level: 2,
          pid: e
        }
        listCategoryLv(data)
          .then(response => {
            console.log(response)
            this.optionsL2 = response.data.data.data
          })
          .catch(response => {
            MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
              confirmButtonText: '确定',
              type: 'error'
            })
          })
      } else {
        this.classL = ''
        this.classL2 = ''
      }
    },

    getL12(e) {
      const data = {
        level: 2,
        pid: e
      }
      listCategoryLv(data)
        .then(response => {
          this.optionsL12 = response.data.data.data
          this.class2 = ''
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 获得一级分类列表
    getListL1() {
      const data = {
        level: 1,
        pid: 0
      }
      listCategoryLv(data)
        .then(response => {
          console.log(response)
          this.options = response.data.data.data
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 获得三级分类列表
    getListL2(id) {
      const data = {}
      data.pid = id
      data.level = 3
      listCategoryLv(data)
        .then(response => {
          console.log(response)
          this.listL2 = response.data.data.data
        })
        .catch(response => {
          console.log(response)
        })
    },

    // 查看详情
    handleDetail(row) {
      this.$router.push({
        path: '/designer/detail',
        query: { id: row.id }
      })
    },
    // 新增三级分类
    handleCreate() {
      this.imgUrl = undefined
      this.dialogCreate = true
    },
    createL1(formName) {
      if (this.class2 === '') {
        MessageBox.alert('请选择二级分类', {
          confirmButtonText: '确定',
          type: 'error'
        })
      } else {
        const data = this.formCreate
        data.pid = this.class2
        data.level = 3
        data.iconUrl = this.imgUrl
        // debugger
        this.$refs[formName].validate(valid => {
          if (valid) {
            createCategory(data)
              .then(response => {
                this.$notify.success({
                  title: '成功',
                  message: '新增成功'
                })
                this.dialogCreate = false
                this.formCreate = {}
                this.getList()
              })
              .catch(response => {
                MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              })
          } else {
            MessageBox.alert('请输入名字或备注', {
              confirmButtonText: '确定',
              type: 'error'
            })
            return false
          }
        })
      }
    },
    // 编辑二级分类对话框
    handleUpdate(row) {
      console.log(row)
      this.dialogEdit = true
      // this.editL1(row.id)]
      this.formEdit = row
      this.imgUrl = row.icon_url
      // this.formEdit.name = row.name
      // this.formEdit.desc = row.desc
      // this.formEdit.id = row.id
    },
    // 编辑二级分类
    editL1(id) {
      const data = this.formEdit
      //   data.pid = 0;
      data.level = 2
      data.iconUrl = this.imgUrl
      updateCategory(data)
        .then(response => {
          // console.log(response);
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.formEdit = {}
          this.dialogEdit = false
          // this.router.push({ path: "/goods/list" });
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 编辑三级分类
    handleUpdateL2(row) {
      console.log(row)
      this.dialogEditL2 = true
      this.formEditL2 = row
      // this.editL1(row.id)]
    },
    handleAddL2() {
      this.dialogCreateL2 = true
    },
    editL2() {
      console.log(this.formEditL2)
      const data = {}
      data.name = this.formEditL2.name
      data.desc = this.formEditL2.desc
      //   data.pid = this.formEditL2.pid;
      data.id = this.formEditL2.id
      data.level = 3
      updateCategory(data)
        .then(response => {
          // console.log(response);
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.formEditL2 = {}
          this.dialogEditL2 = false
          // this.router.push({ path: "/goods/list" });
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleCreateL2(row) {
      this.dialogL2 = true
      this.pid = row.id
      console.log(row)
      this.getListL2(row.id)
    },
    CreateL2() {
      this.dialogCreateL2 = true
      console.log(this.pid)
    },
    dCreateL2() {
      const data = this.formCreateL2
      data.level = 3
      data.pid = this.pid
      createCategory(data)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.dialogCreateL2 = false
          this.getListL2(this.pid)
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },

    // 禁用分类
    handleForbid(row) {
      if (row.state === 1) {
        row.state = 0
      } else if (row.state === 0) {
        row.state = 1
      }
      const State = {
        id: row.id,
        state: row.state
        // .toString()
      }
      //   console.log(State)
      deleteCategory(State)
        .then(response => {
          console.log(response)
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.getList()
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleDel(row) {
      deletedata(row).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
    },
    uploadPicUrl: function(response) {
      this.disabled = false
      // this.imgUrl.push(response.data.allfilePath)
      this.imgUrl = response.data.allfilePath
    },
    handleRemoveD: function(file, fileList) {
      for (let i = 0; i < this.formData.picGalleryUrlList.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.allfilePath
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        let url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.allfilePath
        }

        if (this.formData.picGalleryUrlList[i] === url) {
          this.formData.picGalleryUrlList.splice(i, 1)
        }
      }
    }
  }
}
</script>
