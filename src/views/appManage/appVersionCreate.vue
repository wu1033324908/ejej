<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 15:51:09
 * @LastEditTime: 2019-08-16 13:59:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>版本新增</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="应用名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="当前版本" prop="newVersion">
          <el-input v-model="formData.newVersion" />
        </el-form-item>
        <el-form-item label="最小支持版本" prop="minVersion">
          <el-input v-model="formData.minVersion" />
        </el-form-item>
        <el-form-item label="是否有更新" prop="isUpdate">
          <el-switch
            v-model="formData.isUpdate"
            active-value="0"
            inactive-value="1"
          />
        </el-form-item>
        <el-form-item label="是否强制更新" prop="isMustUpdate">
          <el-switch
            v-model="formData.isMustUpdate"
            active-value="0"
            inactive-value="1"
          />
        </el-form-item>
        <el-form-item label="是否重启" prop="isRestart">
          <el-switch
            v-model="formData.isRestart"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="客户端类型" prop="type">
          <el-switch
            v-model="formData.type"
            active-value="1"
            inactive-value="0"
            active-text="IOS"
            inactive-text="Android"
          />
        </el-form-item>
        <el-form-item label="APP上传" required>
          <el-upload
            :headers="headers"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="uploadPicUrl"
            :file-list="fileList"
            :action="uploadPath"
            class="upload-demo"
            multiple>
            <el-button size="small" type="primary">点我上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传APK文件，且不超过20Mb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="更新内容" required>
          <el-input :autosize="{ minRows: 4, maxRows: 8}" v-model="formData.content" type="textarea" placeholder="请输入更新内容" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button :disabled="disabled" type="primary" @click="handlePublish('formData')">保存</el-button>
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
import { getUpdateSave, uploadPath } from '@/api/appVersion'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'AppVersionCreate',
  data() {
    return {
      disabled: false,
      fileList: [],
      formData: {},
      uploadPath,
      rules: {
        name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        newVersion: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        minVersion: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
        // desc: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
        // content_type: [{ required: true, message: '请选择内容类型', trigger: 'change' }],
        // sortOrder: [{ required: true, message: '排序不能为空或输入正确的排序', pattern: /^[+]{0,1}(\d+)$/, trigger: 'blur' }]
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
  },
  methods: {
    init() {
    },
    handleCancel: function() {
      this.$router.push({
        path: '/appManage/appVersion'
      })
    },
    beforeUpload(file) {
      this.disabled = true
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.disabled = false
        this.$message({
          message: '上传文件大小不能超过 20MB!',
          type: 'warning'
        })
      }
      return isLt20M
    },
    handlePublish: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const finaldata = this.formData
          finaldata.url = this.appurl
          console.log(finaldata)
          // debugger
          getUpdateSave(finaldata)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/appManage/appVersion' })
            })
            .catch(response => {
              MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                confirmButtonText: '确定',
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadPicUrl: function(response) {
      this.appurl = response.data.allfilePath
      this.disabled = false
    },
    handleRemove: function(file, fileList) {
      this.appurl = undefined
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
