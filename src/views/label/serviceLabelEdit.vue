<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 15:51:22
 * @LastEditTime : 2019-12-20 16:08:27
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>服务商标签编辑</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="服务商标签编号" prop="serviceLabelCode">
          <el-input v-model="formData.serviceLabelCode" />
        </el-form-item>
        <el-form-item label="服务商标签名称" prop="serviceLabelName">
          <el-input v-model="formData.serviceLabelName" />
        </el-form-item>
        <el-form-item label="标签类型">
          <el-select v-model="formData.serviceType" clearable placeholder="标签类型">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="适用服务商">
          <el-select v-model="formData.serviceSource" clearable placeholder="适用服务商">
            <el-option
              v-for="item in applyoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务商标签图片">
          <el-upload
            :action="serviceUploadPath"
            :headers="headers"
            :limit="1"
            :on-success="uploadPicUrl"
            :on-exceed="uploadOverrun"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="formData.desc" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button :disabled="disabled" type="primary" @click="handlePublish('formData')">保存</el-button>
      <el-button :disabled="disabled" type="danger" @click="handlePublish('formData')">删除</el-button>
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
</style>

<script>
import { getServiceLable, updateServiceLable, serviceUploadPath } from '@/api/label'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
// import { getComboBox } from '@/api/select'
export default {
  name: 'AppIndexBannerEdit',
  data() {
    return {
      serviceLabelId: '',
      disabled: false,
      imgUrl: undefined,
      formData: {
        picGalleryUrlList: []
      },
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
      serviceUploadPath,
      rules: {
        serviceLabelCode: [
          { required: true, message: '服务商标签编号不能为空', trigger: 'blur' }
        ],
        serviceLabelName: [
          { required: true, message: '服务商标签名称不能为空', trigger: 'blur' }
        ]
      },
      ISWEB: false
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
    this.getList()
  },
  methods: {
    init() {
      //   const _this = this
      this.serviceLabelId = this.$route.query.id
      if (!this.$route.query.id) {
        this.$router.push({
          path: '/label/serviceLabel'
        })
      }
    },
    getList() {
      const listQuery = { serviceLabelCode: this.serviceLabelId }
      console.log(listQuery)
      getServiceLable(listQuery)
        .then(response => {
          // console.log(response);
          this.formData = response.data.data[0]
          console.log(this.formData)
        })
        .catch(() => {
        })
    },

    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },

    handleCancel: function() {
      this.$router.push({
        path: '/label/serviceLabel'
      })
    },
    handlePublish(formName) {
      updateServiceLable(this.formData)
        .then(response => {
          console.log(response)
          this.$router.push({
            path: '/label/serviceLabel'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    uploadPicUrl: function(response) {
      this.disabled = false
      //   this.formData.picGalleryUrlList = [];
      //   this.formData.picGalleryUrlList.push(response.data.allfilePath);
      //   this.imgUrl = response.data.allfilePath;
      console.log(response.data)
      this.formData.serviceLabelUrl = response.data.allfilePath
    },
    handleRemove: function(file, fileList) {
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
    },
    beforeUpload(file) {
      this.disabled = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.disabled = false
        this.$message({
          message: '上传文件大小不能超过 2MB!',
          type: 'warning'
        })
      }
      return isLt2M
    }
  }
}
</script>
