<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>推送新增</h3>
      <el-form ref="fromData" :rules="rules" :model="fromData" label-width="150px">
        <el-form-item label="推送类型" prop="msgState">
          <el-select v-model="fromData.msgState" placeholder="请选择" @change="changeMsgState">
            <el-option
              v-for="msgState in msgStates"
              :key="msgState.id"
              :label="msgState.name"
              :value="msgState.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型" prop="sendType">
          <el-select v-model="fromData.sendType" placeholder="请选择" @change="changeSendType">
            <el-option
              v-for="sendType in sendTypes"
              :key="sendType.id"
              :label="sendType.name"
              :value="sendType.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="fromData.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="fromData.content" :autosize="{ minRows: 4, maxRows: 8}" type="textarea"/>
        </el-form-item>
        <el-form-item v-show="isShowTimeInput" label="推送时间">
          <el-date-picker
            v-model="fromData.sendTime"
            :picker-options="sendTimeOptions"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item v-show="isSJR" label="收件人">
          <el-button type="primary" @click="handleSet">设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish('fromData')">保存</el-button>
    </div>
    <el-dialog :visible.sync="syncVisible" :title="'选择联系人'">
      <el-card class="box-card">
        <div class="card-head" style="height:450px; overflow-y:auto;">
          <div class="filter-container">
            <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称"/>
            <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </div>
          <el-table v-loading="listLoading" ref="multipleTable" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <el-table-column align="center" label="昵称" prop="nickname"/>
            <el-table-column align="center" label="姓名" prop="userName"/>
            <el-table-column align="center" label="手机号" prop="mobile"/>
          </el-table>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getSelectId">确定</el-button>
      </div>
    </el-dialog>
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
import { save, AppUserList, edit } from '@/api/messages'
import { getUserList } from '@/api/user'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'MessagesCreate',
  data() {
    return {
      isShowTimeInput: false,
      isSJR: false,
      fromData: {
      },
      sendTypes: [{ id: 0, name: '直接发送' }, { id: 1, name: '定时发送' }],
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
      },
      sendTimeOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      },
      syncVisible: false,
      list: [],
      listQuery: {
        page: 1,
        limit: 999
      },
      saveMultipleSelection: [],
      multipleSelection: [],
      listLoading: false,
      msgStates: [
        { name: '系统消息', id: 0 },
        { name: '活动消息', id: 1 },
        { name: '优惠促销', id: 2 },
        { name: '售后反馈', id: 3 },
        { name: '通知', id: 4 },
        { name: '私信', id: 5 },
        { name: 'b端站内消息', id: 6 },
        { name: 'b端站内私信', id: 7 }
      ]
    }
  },
  computed: {
    headers() {
      return {
        'X-Wajueji-Admin-Token': getToken()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      // this.fromData.msgCode = data.msgCode
      console.log(data)
      this.fromData = data
      this.fromData.sendType = data.sendType
      this.fromData.msgState = data.msgState
      if (this.fromData.sendType === 1) {
        this.isShowTimeInput = true
      }
      if (this.fromData.sendType === 3 || this.fromData.sendType === 4 || this.fromData.sendType === 5 || this.fromData.sendType === 7) {
        this.isSJR = true
      }
    },
    handleCancel: function() {
      this.$router.push({
        path: '/message/list'
      })
    },
    handlePublish: function(formName) {
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const finalGoods = _this.fromData
          if (_this.saveMultipleSelection.length > 0) {
            finalGoods.userCode_list = JSON.stringify(_this.saveMultipleSelection) || undefined
          }
          // console.log(finalGoods)
          if (finalGoods.msgCode) {
            edit(finalGoods)
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
          } else {
            save(finalGoods)
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
          }
        }
      })
    },
    changeSendType(data) {
      const _this = this
      data === 0 ? _this.isShowTimeInput = false : _this.isShowTimeInput = true
    },
    changeMsgState(data) {
      if (data === 3 || data === 4 || data === 5 || data === 7) {
        this.isSJR = true
      }
      this.saveMultipleSelection = []
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toggleSelection(rows) {
      const _this = this
      if (rows) {
        this.$nextTick(() => {
          rows.forEach(row => {
            if (this.saveMultipleSelection.indexOf(row.userCode) >= 0) { // 改过
              _this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
      }
    },
    getSelectId() {
      this.saveMultipleSelection = []
      for (const i in this.multipleSelection) {
        this.saveMultipleSelection.push(this.multipleSelection[i].userCode) // 改过
      }
      this.syncVisible = false
      console.log(this.saveMultipleSelection)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.handleSet()
    },
    handleSet() {
      this.syncVisible = true
      this.listLoading = true
      if (this.fromData.msgState === 7) {
        const sendData = this.listQuery
        sendData.type = '-1'
        getUserList(sendData)
          .then(response => {
            this.list = response.data.data.data
            this.total = response.data.data.page.total
            this.listLoading = false
            this.toggleSelection(this.list)
          })
          .catch(response => {
            this.list = []
            this.total = 0
            this.listLoading = false
          })
      } else {
        AppUserList(this.listQuery)
          .then(response => {
            this.list = response.data.data.data
            this.total = response.data.data.page.total
            this.listLoading = false
            this.toggleSelection(this.list)
          })
          .catch(response => {
            this.list = []
            this.total = 0
            this.listLoading = false
          })
      }
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
