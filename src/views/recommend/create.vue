<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>{{ titleName }}</h3>
      <el-form ref="fromData" :rules="rules" :model="fromData" label-width="150px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="fromData.name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="fromData.sort" />
        </el-form-item>
        <el-form-item label="跳转路径" prop="jumpUrl">
          <el-input v-model="fromData.jumpUrl" />
        </el-form-item>
        <el-form-item label="图片" class="img">
          <el-upload
            :show-file-list="false"
            :action="uploadPath"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-remove="handleRemove"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <img v-if="picUrl" :src="picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button :disabled="disabled" @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish('fromData')">保存</el-button>
    </div>

  </div>
</template>

<style scoped>

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
import { homeDAAdd, homeDAupdate, uploadPath } from '@/api/recommend'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'MessagesCreate',
  data() {
    return {
      uploadPath,
      picUrl: '',
      fromData: {},
      disabled: false,
      rules: {
        title: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        msgState: [
          {
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        sendType: [
          {
            required: true,
            message: '不能为空',
            trigger: 'change'
          }
        ],
        content: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Wajueji-Admin-Token': getToken()
      }
    },
    titleName() {
      if (!this.fromData.id) {
        return '新增'
      } else {
        return '编辑'
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      // this.fromData.msgCode = data.msgCode
      console.log(data)
      this.fromData = data
      this.picUrl = data.bannerUrl
    },
    handleCancel: function() {
      this.$router.push({
        path: '/recommend/indexRecommendList'
      })
    },

    uploadPicUrl: function(response) {
      this.disabled = true
      console.log(response)
      this.picUrl = response.data.allfilePath
      this.disabled = false

      console.log(this.picUrl)
    },

    handleRemove: function(file, fileList) {
      var __file = file
      if (__file.response) {
        __file.url = __file.response.data.allfilePath
      }
      this.picUrl = ''
      console.log(this.picUrl)
      // const index = this.picUrl.indexOf(__file)
      // this.picUrl.splice(index, 1)
    },
    handlePublish: function(formName) {
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const finalGoods = _this.fromData
          if (_this.picUrl && _this.picUrl.length > 0) {
            finalGoods.bannerUrl = _this.picUrl
          }
          // console.log(finalGoods)
          if (finalGoods.id) {
            homeDAupdate(finalGoods)
              .then(response => {
                this.$notify.success({
                  title: '成功',
                  message: '保存成功'
                })
                this.$router.push({ path: '/recommend/indexRecommendList' })
              })
              .catch(response => {
                MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              })
          } else {
            homeDAAdd(finalGoods)
              .then(response => {
                this.$notify.success({
                  title: '成功',
                  message: '保存成功'
                })
                this.$router.push({ path: '/recommend/indexRecommendList' })
              })
              .catch(response => {
                MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              })
          }
        }
      })
    }
  }
}
</script>
