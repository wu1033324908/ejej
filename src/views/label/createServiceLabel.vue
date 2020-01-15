<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>服务商标签</h3>
      <el-form ref="serviceLabel" :rules="rules" :model="serviceLabel" label-width="150px">
        <!-- <el-form-item v-if="userId==undefined" label="服务商标签序号" prop="id">
          <el-input v-model="serviceLabel.id" />
        </el-form-item>
        <el-form-item label="服务商标签编号" prop="serviceLabelCode">
          <el-input v-model="serviceLabel.serviceLabelCode" />
        </el-form-item> -->
        <el-form-item label="服务商标签名称" prop="serviceLabelName">
          <el-input v-model="serviceLabel.serviceLabelName"/>
        </el-form-item>
        <el-form-item label="标签类型">
          <el-select v-model="serviceLabel.serviceType" placeholder="标签类型">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="适用服务商">
          <el-select v-model="serviceLabel.serviceSource" placeholder="适用服务商">
            <el-option
              v-for="item in applyoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="serviceLabel.desc" />
        </el-form-item>
        <el-form-item label="服务商标签图片">
          <el-upload
            :action="serviceUploadPath"
            :headers="headers"
            :limit="1"
            :on-exceed="uploadOverrun"
            :on-success="handleUrl"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
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
</style>

<script>
import { addServiceLable, serviceUploadPath } from '@/api/label'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'CreateGoodsLabel',
  data() {
    return {
      serviceUploadPath,
      userId: '',
      serviceLabel: { serviceLabelUrl: '', gallery: [] },
      applyoptions: [
        // { value: "", label: "" },
        { value: '0', label: '设计师' },
        { value: '1', label: '零工' },
        { value: '2', label: '项目经理' },
        { value: '3', label: '装修公司' }
      ],
      typeoptions: [
        // { value: "", label: "" },
        { value: '0', label: '资质标签' },
        { value: '1', label: '属性标签' },
        { value: '2', label: '自定义标签' }
      ],
      rules: {
        id: [
          { required: true, message: '服务商标签序号不能为空', trigger: 'blur' }
        ],
        serviceLabelCode: [
          { required: true, message: '服务商标签编号不能为空', trigger: 'blur' }
        ],
        serviceLabelName: [
          { required: true, message: '服务商标签名字不能为空', trigger: 'blur' }
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
    // console.log(getToken())
  },

  methods: {
    init: function() {
      // listCatAndBrand().then(response => {
      //   this.categoryList = response.data.data.categoryList;
      //   this.brandList = response.data.data.brandList;
      // });
      this.userId = this.$route.query.id
      console.log(this.userId)
    },
    handlePublish() {
      if (this.userId !== '') {
        this.serviceLabel.id = this.userId
      }
      addServiceLable(this.serviceLabel)
        .then(response => {
          console.log(response)
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          if (this.$route.query.id && this.$route.query.id.length > 0) {
            this.$router.push({ path: '/designer/detail', query: { id: this.userId }})
          } else {
            this.$router.push({ path: '/label/serviceLabel' })
          }
        })
        .catch(response => {
          console.log(response)
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
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
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    handleUrl(response) {
    //   this.serviceLabel.serviceLabelUrl = '123';
      this.serviceLabel.serviceLabelUrl = response.data.allfilePath
    },
    handleCancel() {
      this.$router.push({ path: '/label/serviceLabel' })
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.serviceLabel.gallery.length; i++) {
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

        if (this.serviceLabel.gallery[i] === url) {
          this.serviceLabel.gallery.splice(i, 1)
        }
      }
    }
  }
}
</script>
