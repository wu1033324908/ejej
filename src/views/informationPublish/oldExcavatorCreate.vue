<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 10:29:06
 * @LastEditTime: 2019-08-15 17:07:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>二手机新增</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="标题名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="品牌" prop="brandId">
          <el-select v-model="formData.brandId" placeholder="请选择">
            <el-option
              v-for="item in brands"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="merchantId">
          <el-select v-model="formData.merchantId" placeholder="请选择">
            <el-option
              v-for="item in merchants"
              :key="item.id"
              :label="item.key_value"
              :value="item.key_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号" required>
          <el-col :span="5">
            <el-select v-model="formData.fixP17" placeholder="请选择">
              <el-option
                v-for="item in fixP17"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input v-model="formData.fixP17" placeholder="如没有对应型号请手动输入"/>
          </el-col>
        </el-form-item>
        <el-form-item label="机型" prop="fixP9">
          <el-select v-model="formData.fixP9" placeholder="请选择">
            <el-option v-for="item in fixP9s" :key="item.id" :label="item.key_value" :value="item.key_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select
            v-model="formData.province"
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
        <el-form-item label="城市" prop="city">
          <el-select v-model="formData.city" placeholder="请选择">
            <el-option v-for="city in citys" :key="city.id" :label="city.name" :value="city.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="小时数" prop="oldTime">
          <el-input v-model="formData.oldTime" />
        </el-form-item>
        <el-form-item label="售价" prop="counterPrice">
          <el-input v-model="formData.counterPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否打锤" prop="fixP13">
          <el-radio v-model="formData.fixP13" label="0">是</el-radio>
          <el-radio v-model="formData.fixP13" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="作业方式" prop="fixP14">
          <el-radio v-model="formData.fixP14" label="0">土方</el-radio>
          <el-radio v-model="formData.fixP14" label="1">石方</el-radio>
        </el-form-item>
        <el-form-item label="环保标牌" prop="fixP15">
          <el-input v-model="formData.fixP15" />
        </el-form-item>
        <el-form-item label="出厂时间" required>
          <el-date-picker
            v-model="formData.factoryTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>

        <el-form-item label="整机外观" required>
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon" />
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
import { oldCreate, uploadPath } from '@/api/oldExcavator'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { findBrand, findCategoryHomePage, getRegion, getComboBox } from '@/api/select'
export default {
  name: 'OldExcavatorCreate',
  data() {
    return {
      disabled: false,
      radio: 3,
      brand_type: 1, // 1是挖掘机 2是配件 3是金融产品
      formData: {
        picGalleryUrlList: []
      },
      brands: [], // 品牌下拉框
      merchants: [], // 厂商
      categoryTypes: [],
      provinces: [],
      citys: [],
      fixP17: [], // 型号
      fixP9s: [], // 机型
      uploadPath,
      rules: {
        name: [{ required: true, message: '标题名称不能为空', trigger: 'blur' }],
        fixP15: [{ required: true, message: '环保标牌不能为空', trigger: 'blur' }],
        oldTime: [{ required: true, message: '小时数不能为空或输入正确的小时数', pattern: /^\d+$/, trigger: 'blur' }],
        counterPrice: [{ required: true, message: '价格不能为空或输入正确的价格', pattern: /^[0-9]\d*(.\d{1,2})?$/, trigger: 'blur' }],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        merchantId: [{ required: true, message: '请选择厂商', trigger: 'change' }],
        province: [{ required: true, message: '请选择省份', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        fixP13: [{ required: true, message: '请选择打锤方式', trigger: 'change' }],
        fixP14: [{ required: true, message: '请选择作业方式', trigger: 'change' }],
        fixP9: [{ required: true, message: '请选择机型', trigger: 'change' }]
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
  methods: {
    init() {
      findBrand({ brand_type: this.brand_type })
        .then(response => {
          this.brands = response.data.data.result
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
      findCategoryHomePage()
        .then(response => {
          this.categoryTypes = response.data.data.result
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
      // 厂商
      _this.getCommonSelect({
        key_group_name: 'goods_factory',
        callback: function(v) {
          _this.merchants = v
        }
      })
      // 机型
      _this.getCommonSelect({
        key_group_name: 'goods_type',
        callback: function(v) {
          _this.fixP9s = v
        }
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
        pid: this.formData.province,
        callback: function(v) {
          _this.formData.city = v[0].id
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
        path: '/informationPublish/oldExcavatorList'
      })
    },
    handlePublish: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const finalGoods = this.formData
          console.log(typeof finalGoods.picGalleryUrlList)
          finalGoods.picGalleryUrlList = JSON.stringify(this.formData.picGalleryUrlList)
          oldCreate(finalGoods)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/informationPublish/oldExcavatorList' })
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
    }
  }
}
</script>
