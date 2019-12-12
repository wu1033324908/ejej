<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 15:51:09
 * @LastEditTime: 2019-08-13 16:27:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>页面配置新增</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="广告标题" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="广告位置" prop="position">
          <el-select v-model="formData.position" placeholder="请选择">
            <el-option
              v-for="item in positions"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model="formData.sortOrder" placeholder="请输入排序（整数）" />
        </el-form-item>
        <el-form-item label="内容类型" prop="content_type">
          <el-select v-model="formData.content_type" placeholder="请选择" @change="content_type_change">
            <el-option
              v-for="item in content_types"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="ISWEB" label="WEB链接">
          <el-input v-model="formData.HREF_URL" placeholder="http://www.xxx.com"/>
        </el-form-item>
        <!-- <el-form-item v-show="dataForm.timeType === 1">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>
          </el-col>
        </el-form-item> -->

        <el-form-item label="图片" required>
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :multiple="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
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
import { adCreate, uploadPath } from '@/api/ad'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getComboBox } from '@/api/select'
export default {
  name: 'AppIndexBannerCreate',
  data() {
    return {
      disabled: false,
      imgUrl: undefined,
      formData: {
        picGalleryUrlList: []
      },
      positions: [{ id: 1, text: '启屏页' }, { id: 2, text: '首页轮播图' }, { id: 3, text: '首页菜单按扭' }, { id: 4, text: '活动营销位' }],
      content_types: [],
      uploadPath,
      rules: {
        name: [{ required: true, message: '广告标题不能为空', trigger: 'blur' }],
        // HREF_URL: [{ required: true, message: 'WEB链接不能为空', trigger: 'blur' }],
        position: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
        content_type: [{ required: true, message: '请选择内容类型', trigger: 'change' }],
        sortOrder: [{ required: true, message: '排序不能为空或输入正确的排序', pattern: /^[+]{0,1}(\d+)$/, trigger: 'blur' }]
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
  },
  methods: {
    init() {
      const _this = this
      _this.getCommonSelect({
        key_group_name: 'ad_type',
        callback: function(v) {
          _this.content_types = v
        }
      })
    },
    getCommonSelect(opts) {
      if (opts.key_group_name === undefined || typeof opts.callback !== 'function') return
      const key_group_name = opts.key_group_name || undefined
      const callback = opts.callback || ''
      getComboBox({ key_group_name }).then(response => {
        callback(response.data.data)
      }).catch(res => {
        MessageBox.alert('业务错误：' + res.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    handleCancel: function() {
      this.$router.push({
        path: '/appManage/appIndexBanner'
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
    handlePublish: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const finalGoods = this.formData
          finalGoods.url = this.formData.picGalleryUrlList[this.formData.picGalleryUrlList.length - 1]
          finalGoods.content = JSON.stringify({ TYPE: this.formData.content_type, PARAM: { HREF_URL: this.formData.HREF_URL }})
          console.log(finalGoods)
          adCreate(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/appManage/appIndexBanner' })
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
      console.log(response)
      this.disabled = false
      this.formData.picGalleryUrlList.push(response.data.allfilePath)
      this.imgUrl = response.data.allfilePath
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
    content_type_change(val) {
      if (val === 'WEB') {
        this.ISWEB = true
      } else {
        this.formData.HREF_URL = undefined
        this.ISWEB = false
      }
    }
  }
}
</script>
