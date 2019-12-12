<!-- 暂时不要 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>推送编辑</h3>
      <el-form ref="fromData" :rules="rules" :model="fromData" label-width="150px">
        <el-form-item label="推送类型" required>
          <el-select v-model="fromData.pushType" placeholder="请选择" @change="changePushType">
            <el-option
              v-for="pushType in pushTypes"
              :key="pushType.id"
              :label="pushType.name"
              :value="pushType.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型" required>
          <el-select v-model="fromData.msgType" placeholder="请选择">
            <el-option
              v-for="msgType in msgTypes"
              :key="msgType.id"
              :label="msgType.name"
              :value="msgType.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="fromData.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="fromData.content" :autosize="{ minRows: 4, maxRows: 8}" type="textarea"/>
        </el-form-item>
        <el-form-item label="详情" prop="desc">
          <el-input v-model="fromData.desc" :autosize="{ minRows: 4, maxRows: 8}" type="textarea"/>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="fromData.mobile" />
        </el-form-item>
        <el-form-item v-show="isShowTimeInput" label="推送时间" prop="pushTime">
          <el-date-picker
            v-model="fromData.pushTime"
            :picker-options="pushTimeOptions"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">保存</el-button>
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
import { pushCreate, pushRead } from '@/api/messages'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'MessagesCreate',
  data() {
    return {
      isShowTimeInput: false,
      fromData: {
      },
      pushTypes: [{ id: '1', name: '立即推送' }, { id: '2', name: '定时推送' }],
      msgTypes: [{ id: '0', name: '系统推送' }, { id: '1', name: '活动推送' }],
      rules: {
        title: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ]
      },
      pushTimeOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
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
      if (this.$route.query.id == null) {
        return
      }
      const id = this.$route.query.id
      pushRead({ id })
        .then(response => {
          console.log(response)
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleCancel: function() {
      this.$router.push({
        path: '/message/list'
      })
    },
    handlePublish: function() {
      const finalGoods = this.fromData
      pushCreate(finalGoods)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '保存成功'
          })
          this.$router.push({ path: '/message/list' })
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    changePushType() {
      const _this = this
      _this.fromData.pushType === '1' ? _this.isShowTimeInput = false : _this.isShowTimeInput = true
    }
    // changeTime() {
    //   this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
    //     pushTimeOptions: (time) => {
    //       return time.getTime() < this.upTime
    //     }
    //   })
    // }
  }
}
</script>
