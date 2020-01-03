<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>新增{{ example_type==0 ? "设计师":example_type==1 ? "零工" : "项目经理" }}案例</h3>
      <el-form ref="newCase" :rules="rules" :model="newCase" label-width="150px">
        <el-form-item label="作者" prop="creator">
          <template>
            <el-select v-model="userCode" filterable placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.value"
                :label="item.nickname"
                :value="item.serviceCode"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="案例名称" prop="exampleName">
          <el-input v-model="newCase.exampleName" />
        </el-form-item>
        <el-form-item label="小区名称" prop="housingName">
          <el-input v-model="newCase.housingName" />
        </el-form-item>
        <el-form-item v-if="example_type==1" label="施工类型" prop="workType">
          <el-input v-model="newCase.workType" />
        </el-form-item>
        <el-form-item v-if="example_type!=1" label="案例风格" prop="exampleStyle">
          <!-- <el-input v-model="detailCase.exampleStyle" /> -->
          <el-select
            v-model="newCase.exampleStyle"
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
        </el-form-item>
        <el-form-item label="房屋样式" prop="exampleModel">
          <!-- <el-input v-model="newCase.exampleModel" /> -->
          <el-select
            v-model="newCase.exampleModel"
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
        </el-form-item>
        <el-form-item label="房屋户型" prop="houseType">
          <!-- <el-input v-model="newCase.houseType" /> -->
          <el-select
            v-model="newCase.houseType"
            clearable
            style="width: 120px;"
            placeholder="请选择户型"
          >
            <el-option
              v-for="(item,index) in house_typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="example_type!=1" label="案例风格" prop="exampleStyle">
          <el-input v-model="newCase.exampleStyle" />
        </el-form-item>
        <el-form-item label="房屋样式" prop="exampleModel">
          <el-input v-model="newCase.exampleModel" />
        </el-form-item>
        <el-form-item label="房屋户型" prop="houseType">
          <el-input v-model="newCase.houseType" />
        </el-form-item>-->
        <el-form-item v-if="example_type==0" label="装修预算" prop="decorationBudget">
          <el-input v-model="newCase.decorationBudget" placeholder="0.00" />
        </el-form-item>
        <el-form-item v-if="example_type==1" label="施工费用" prop="workMoney">
          <el-input v-model="newCase.workMoney" placeholder="0.00" />
        </el-form-item>
        <el-form-item v-if="example_type==2" label="装修费用" prop="decorationMoney">
          <el-input v-model="newCase.decorationMoney" placeholder="0.00" />
        </el-form-item>
        <el-form-item label="面积" prop="area">
          <el-input v-model="newCase.area" />
        </el-form-item>
        <el-form-item v-if="example_type==0 || example_type==2" label="设计费用" prop="designMoney">
          <el-input v-model="newCase.designMoney" />
        </el-form-item>
        <el-form-item v-if="example_type==1 || example_type==2" label="施工天数" prop="workDay">
          <el-input v-model="newCase.workDay" />
        </el-form-item>
        <el-form-item v-if="example_source==1" label="跳转路径" prop="url">
          <el-input v-model="newCase.url" />
        </el-form-item>
        <el-form-item v-if="example_type==0 || example_type==2" label="设计说明" prop="desc">
          <el-input v-model="newCase.desc" />
        </el-form-item>
        <el-form-item v-if="example_type==1" label="施工说明" prop="desc">
          <el-input v-model="newCase.desc" />
        </el-form-item>
        <el-form-item v-if="example_type==2" label="材料费用" prop="materialMoney">
          <!-- ||example_type==1 -->
          <el-input v-model="newCase.materialMoney" />
        </el-form-item>
        <el-form-item label="封面图">
          <el-upload
            :action="uploadPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item v-if="example_source==0" class="casePic" label="案例图片">
          <el-form-item>
            <el-upload
              ref="upload"
              :action="uploadPath"
              :limit="9"
              :headers="headers"
              :auto-upload="false"
              :on-exceed="uploadOverrunCase"
              :on-success="handleGalleryUrlCase"
              :on-remove="handleRemoveCase"
              :multiple="false"
              :on-change="changeFile"
              accept=".jpg, .jpeg, .png, .gif"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>

          <div class="picList" style="margin-top:30px">
            <div v-for="(item,index) in newCase.url_list" :key="index" class="cPic">
              <img :src="item.fileUrl" alt >
              <span style="display:block">{{ item.fileName }}</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">添加</el-button>
    </div>
  </div>
</template>

<style>
.el-card {
  margin-bottom: 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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
.picList {
  width: 100%;
  float: left;
}
.picList .cPic {
  width: 33%;
  display: inline-block;
  text-align: center;
}
.picList .cPic span {
  text-align: center;
}
.picList .cPic img {
  width: 200px;
}
</style>

<script>
import { saveCase, uploadPath } from '@/api/case'
import { getUserList } from '@/api/user'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getDropDown } from '@/api/dropDown'
export default {
  data() {
    return {
      uploadPath,
      // newCase: { picUrl: '', gallery: [] },
      newCase: { url_list: [] },
      specForm: { specification: '', value: '', picUrl: '' },
      example_source: '',
      example_type: '',
      styleOptions: [],
      house_typeOptions: [],
      modelOptions: [],
      userCode: '',
      fileName: '',
      dialogFormVisible: false,
      userList: [],
      sort: 0,
      rules: {
        creator: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
        exampleName: [
          { required: true, message: '案例名称不能为空', trigger: 'blur' }
        ],
        housingName: [
          { required: true, message: '小区名称不能为空', trigger: 'blur' }
        ],
        workType: [
          { required: true, message: '施工类型不能为空', trigger: 'blur' }
        ],
        exampleStyle: [
          { required: true, message: '案例风格不能为空', trigger: 'blur' }
        ],
        exampleModel: [
          { required: true, message: '房屋样式不能为空', trigger: 'blur' }
        ],
        houseType: [
          { required: true, message: '房屋户型不能为空', trigger: 'blur' }
        ],
        decorationBudget: [
          { required: true, message: '装修预算不能为空', trigger: 'blur' }
        ],
        retailPrice: [
          { required: true, message: '施工费用不能为空', trigger: 'blur' }
        ],
        workMoney: [
          { required: true, message: '装修费用不能为空', trigger: 'blur' }
        ],
        area: [{ required: true, message: '面积不能为空', trigger: 'blur' }],
        designMoney: [
          { required: true, message: '设计费用不能为空', trigger: 'blur' }
        ],
        workDay: [
          { required: true, message: '施工天数不能为空', trigger: 'blur' }
        ],
        url: [{ required: true, message: '链接地址不能为空', trigger: 'blur' }],
        desc: [{ required: true, message: '说明不能为空', trigger: 'blur' }],
        materialMoney: [
          { required: true, message: '材料费用不能为空', trigger: 'blur' }
        ]
      }
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
    this.getAuthor()
  },
  // destroyed() {
  //   // window.sessionStorage.removeItem('example_type')
  //   // window.sessionStorage.removeItem('example_source')
  // },
  methods: {
    init: function() {
      this.getDropDownFn()
      // this.example_type = this.$route.query.example_type||window.sessionStorage.getItem('example_type');
      this.example_type =
        parseInt(this.$route.query.example_type) ||
        parseInt(window.sessionStorage.getItem('example_type'))
      // this.example_source = this.$route.query.example_source||window.sessionStorage.getItem('example_source');
      this.example_source =
        parseInt(this.$route.query.example_source) ||
        parseInt(window.sessionStorage.getItem('example_source'))
    },
    getAuthor() {
      // if(this.example_type){
      //   this.$router.push({ path: "/case/list" });
      // }
      const userdata = {
        type: this.example_type
      }
      getUserList(userdata)
        .then(response => {
          console.log(response)
          this.userList = response.data.data.data
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {})
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
    // 添加
    handlePublish() {
      this.newCase.exampleType = this.example_type.toString()
      this.newCase.exampleSource = this.example_source.toString()

      this.newCase.creator = this.userCode
      this.newCase.url_list = JSON.stringify(this.newCase.url_list)
      // console.log(this.userCode);
      saveCase(this.newCase)
        .then(response => {
          console.log(response)
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/case/list' })
        })
        .catch(err => {
          console.log(err)
          document.querySelector('.picList').innerHTML = ''
          MessageBox.alert('业务错误：' + err.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/case/create' })
    },
    uploadPicUrl: function(response) {
      this.newCase.picUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    uploadOverrunCase: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    handleGalleryUrl(response, file, fileList) {
      console.log(response)
      this.newCase.fileUrl = response.data.allfilePath
      // if (response.errno === 0) {
      //   this.newCase.gallery.push(response.data.url);
      // }
    },
    setCasePicName() {
      this.dialogFormVisible = false
    },

    changeFile(file) {
      if (file.status === 'ready') {
        this.$prompt('请输入上传案例图片的名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: file.name
        })
          .then(({ value }) => {
            this.fileName = value
            this.$refs.upload.submit()
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          })
          .catch(() => {
            // this.$refs.upload.clearFiles();
            this.$message({
              type: 'info',
              message: '取消文件上传'
            })
          })
      }
    },
    // beforeAvatarUpload(file) {
    //   this.$prompt("请输入文件名", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消"
    //     // inputValue：this.value,
    //   })
    //     .then(({ value }) => {
    //       return true;
    //     })
    //     .catch(() => {
    //       return false;
    //     });
    //   this.dialogFormVisible = true;
    //   this.newCase.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    handleGalleryUrlCase(response, file, fileList) {
      console.log(fileList)
      console.log(file)
      this.newCase.url_list.push({
        fileName: this.fileName,
        sortOrder: this.sort,
        fileUrl: response.data.allfilePath
      })
      console.log(this.newCase)
      // if (response.errno === 0) {
      //   this.newCase.gallery.push(response.data.url);
      // }
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.newCase.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url

        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.newCase.gallery[i] === url) {
          this.newCase.gallery.splice(i, 1)
        }
      }
    },
    handleRemoveCase(file, fileList) {
      for (var i = 0; i < this.newCase.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        console.log(file)
        console.log(fileList)
        // this.newCase.url_list.
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.newCase.gallery[i] === url) {
          this.newCase.gallery.splice(i, 1)
        }
      }
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.url
    },

    uploadProductUrl: function(response) {
      this.productForm.url = response.data.url
    }
  }
}
</script>
