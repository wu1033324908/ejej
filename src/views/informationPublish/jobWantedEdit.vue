<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:39:33
 * @LastEditTime: 2019-08-13 14:09:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>求职编辑</h3>
      <el-form ref="employment" :rules="rules" :model="employment" label-width="150px" class="jobWanted">
        <el-form-item label="标题" prop="name" required>
          <el-input v-model="employment.name" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="岗位职责" prop="job">
          <el-select v-model="employment.job" placeholder="请选择">
            <el-option
              v-for="item in job"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="机械类型" prop="m_type">
          <el-select v-model="employment.m_type" placeholder="请选择">
            <el-option
              v-for="item in m_type"
              :key="item.id"
              :label="item.desc"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select
            v-model="employment.province"
            placeholder="请选择"
            @change="provinceSelectChange"
          >
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="薪资水平" prop="salay_money">
          <el-select v-model="employment.salay_money" placeholder="请选择">
            <el-option
              v-for="item in salay_money"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="employment.city" placeholder="请选择">
            <el-option v-for="city in citys" :key="city.id" :label="city.name" :value="city.id" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="项目位置" prop="position">
          <el-input v-model="employment.position" placeholder="请输入项目位置"/>
        </el-form-item> -->
        <el-form-item label="结款周期" prop="settl_time">
          <el-select v-model="employment.settl_time" placeholder="请选择">
            <el-option
              v-for="item in settl_time"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="其他待遇">
          <el-checkbox-group v-model="employment.other_req">
            <el-checkbox-button v-for="item in other_reqs" :label="item" :key="item">{{ item }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="工作性质" prop="work_pre">
          <el-select v-model="employment.work_pre" placeholder="请选择">
            <el-option
              v-for="item in work_pre"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="招聘人数" prop="work_num">
          <el-input v-model="employment.work_num" placeholder="请输入招聘人数"/>
        </el-form-item> -->
        <el-form-item label="工作经验" prop="work_time">
          <el-select v-model="employment.work_time" placeholder="请选择">
            <el-option
              v-for="item in work_time"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="擅长项目" prop="good_work">
          <el-select v-model="employment.good_work" placeholder="请选择">
            <el-option
              v-for="item in work_type"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="有效日期" prop="end_time">
          <el-date-picker
            v-model="employment.end_time"
            type="date"
            placeholder="选择有效日期"/>
        </el-form-item>
        <!-- <el-form-item label="联系人" prop="contact">
          <el-input v-model="employment.contact" placeholder="请输入联系人"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact_msg">
          <el-input v-model="employment.contact_msg" placeholder="请输入联系方式"/>
        </el-form-item> -->
        <el-form-item label="其他信息" prop="other_desc">
          <el-input
            :rows="2"
            v-model="employment.other_desc"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish('employment')">保存</el-button>
    </div>
  </div>
</template>

<style scoped>
.jobWanted{
    display: flex;
    flex-wrap: wrap;
}
.el-form-item {
    width: 50%;
}
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
import { labourWorkUpdata, labourWorkInfo } from '@/api/jobWanted'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { getRegion, getComboBox } from '@/api/select'
export default {
  name: 'JobWantedEdit',
  data() {
    return {
      employment: {
        user_code: -1, // 用户编号后台保存  传-1
        other_req: []
      },
      provinces: [],
      citys: [],
      salay_money: [], // 薪资水平
      work_time: [], // 工作经验
      settl_time: [], // 结算周期
      work_pre: [], // 工作性质
      good_work: [], // 擅长工程
      m_type: [], // 机械类型
      job: [], // 工作岗位
      work_type: [], // 项目类型
      other_reqs: ['包吃', '包住', '白班', '有加班费', '报销路费', '上保险'], // 其他待遇
      rules: {
        name: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }
        ],
        job: [{ required: true, message: '请选择岗位职责', trigger: 'change' }],
        m_type: [{ required: true, message: '请选择机械类型', trigger: 'change' }],
        province: [{ required: true, message: '请选择省份', trigger: 'change' }],
        salay_money: [{ required: true, message: '请选择薪资水平', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        settl_time: [{ required: true, message: '请选择结款周期', trigger: 'change' }],
        work_pre: [{ required: true, message: '请选择工作性质', trigger: 'change' }],
        work_time: [{ required: true, message: '请选择经验', trigger: 'change' }],
        good_work: [{ required: true, message: '请选择擅长项目', trigger: 'change' }],
        end_time: [{ type: 'string', required: true, message: '请选择有效日期', trigger: 'change' }],
        other_desc: [{ required: true, message: '请输入其他信息', trigger: 'blur' }]
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
    this.initSelect()
  },
  mounted() {
  },
  methods: {
    init() {
      const _this = this
      if (_this.$route.query.labour_code == null) return

      const labour_code = _this.$route.query.labour_code
      _this.employment.labour_code = labour_code

      labourWorkInfo({ labour_code })
        .then(response => {
          console.log(response.data.data)
          for (const i in response.data.data.data) {
            _this.$set(_this.employment, i, response.data.data.data[i])
            if (i === 'other_req') {
              _this.$set(_this.employment, i, response.data.data.data[i].split(','))
            }
          }
          _this.getProvinceCity({
            type: '2',
            pid: _this.employment.province
          })
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })

      this.getProvinceCity({})
    },
    initSelect() {
      const _this = this
      _this.getCommonSelect({
        key_group_name: 'job',
        callback: function(v) {
          _this.job = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'salay_money',
        callback: function(v) {
          _this.salay_money = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'work_time',
        callback: function(v) {
          _this.work_time = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'settl_time',
        callback: function(v) {
          _this.settl_time = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'work_pre',
        callback: function(v) {
          _this.work_pre = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'good_work',
        callback: function(v) {
          _this.good_work = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'm_type',
        callback: function(v) {
          _this.m_type = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'work_type',
        callback: function(v) {
          _this.work_type = v
        }
      })
      _this.getCommonSelect({
        key_group_name: 'release_work_type',
        callback: function(v) {
          _this.work_type = v
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
    getProvinceCity(opts) {
      const _this = this
      const type = opts.type || '1'
      const pid = opts.pid || undefined
      const callback = opts.callback || undefined
      getRegion({ type, pid })
        .then(response => {
          if (type === '1') {
            _this.provinces = response.data.data
          } else {
            _this.citys = response.data.data
            typeof callback === 'function' && callback(response.data.data)
          }
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    provinceSelectChange() {
      const _this = this
      _this.getProvinceCity({
        type: '2',
        pid: this.employment.province,
        callback: function(v) {
          _this.employment.city = v[0].id
        }
      })
    },
    handleCancel: function() {
      this.$router.push({
        path: '/informationPublish/jobWantedList'
      })
    },
    handlePublish: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const finalGoods = this.employment
          finalGoods.other_req = (this.employment.other_req).join(',')
          labourWorkUpdata(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/informationPublish/jobWantedList' })
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
    }
  }
}
</script>
