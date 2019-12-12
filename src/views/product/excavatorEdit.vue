<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 14:55:48
 * @LastEditTime: 2019-08-15 17:11:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>挖掘机编辑</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="标题名称" prop="name">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="品牌" prop="brandId">
          <el-select v-model="formData.brandId">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="merchant_id">
          <el-select v-model="formData.merchant_id">
            <el-option v-for="item in goods_factorys" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="机型" prop="fix_p_9">
          <el-select v-model="formData.fix_p_9">
            <el-option v-for="item in goods_types" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="动力" prop="fix_p_10">
          <el-select v-model="formData.fix_p_10">
            <el-option v-for="item in goods_powers" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="铲斗" prop="fix_p_11">
          <el-select v-model="formData.fix_p_11">
            <el-option v-for="item in goods_shovels" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="fix_p_17">
          <el-input v-model="formData.fix_p_17"/>
        </el-form-item>
        <el-form-item label="整机重量（kg）" prop="fix_p_1">
          <el-input v-model="formData.fix_p_1"/>
        </el-form-item>
        <el-form-item label="吨位（吨）" prop="fix_p_12">
          <el-input v-model="formData.fix_p_12"/>
        </el-form-item>
        <el-form-item label="铲斗容量（m³）" prop="fix_p_2">
          <el-input v-model="formData.fix_p_2"/>
        </el-form-item>
        <el-form-item label="额定功率（kW/rpm）" prop="fix_p_5">
          <el-input v-model="formData.fix_p_5"/>
        </el-form-item>
        <el-form-item label="整体外观">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl1"
            :before-upload="beforeUpload"
            :on-remove="handleRemove1"
            :file-list="picGalleryUrlListShow1"
            list-type="picture-card"
            multiple
            accept=".jpg,.jpeg,.png,.gif">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="局部">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl2"
            :before-upload="beforeUpload"
            :on-remove="handleRemove2"
            :file-list="picGalleryUrlListShow2"
            list-type="picture-card"
            multiple
            accept=".jpg,.jpeg,.png,.gif">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="其他">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl3"
            :before-upload="beforeUpload"
            :on-remove="handleRemove3"
            :file-list="picGalleryUrlListShow3"
            list-type="picture-card"
            multiple
            accept=".jpg,.jpeg,.png,.gif">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="图解">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl4"
            :before-upload="beforeUpload"
            :on-remove="handleRemove4"
            :file-list="picGalleryUrlListShow4"
            list-type="picture-card"
            multiple
            accept=".jpg,.jpeg,.png,.gif">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详细介绍">
          <editor :init="editorInit" v-model="formData.detail"/>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 1 -->
    <el-card class="box-card">
      <h3>规格</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow1">添加</el-button>
      <el-table :data="attributes1">
        <el-table-column property="key" label="参数名称"/>
        <el-table-column property="value" label="参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete1(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable1" title="设置规格参数">
        <el-form
          ref="attributeForm1"
          :model="attributeForm1"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="参数名称" prop="key">
            <el-input v-model="attributeForm1.key"/>
          </el-form-item>
          <el-form-item label="参数值" prop="value">
            <el-input v-model="attributeForm1.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable1 = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd1">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!-- 2 -->
    <el-card class="box-card">
      <h3>性能</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow2">添加</el-button>
      <el-table :data="attributes2">
        <el-table-column property="key" label="参数名称"/>
        <el-table-column property="value" label="参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete2(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="attributeVisiable2" title="设置性能参数">
        <el-form
          ref="attributeForm2"
          :model="attributeForm2"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="参数名称" prop="key">
            <el-input v-model="attributeForm2.key"/>
          </el-form-item>
          <el-form-item label="参数值" prop="value">
            <el-input v-model="attributeForm2.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable2 = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd2">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!-- 3 -->
    <el-card class="box-card">
      <h3>发动机</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow3">添加</el-button>
      <el-table :data="attributes3">
        <el-table-column property="key" label="参数名称"/>
        <el-table-column property="value" label="参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete3(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable3" title="设置发动机参数">
        <el-form
          ref="attributeForm3"
          :model="attributeForm3"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="参数名称" prop="key">
            <el-input v-model="attributeForm3.key"/>
          </el-form-item>
          <el-form-item label="参数值" prop="value">
            <el-input v-model="attributeForm3.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable3 = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd3">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!-- 4 -->
    <el-card class="box-card">
      <h3>作业范围</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow4">添加</el-button>
      <el-table :data="attributes4">
        <el-table-column property="key" label="参数名称"/>
        <el-table-column property="value" label="参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete4(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable4" title="设置作业范围参数">
        <el-form
          ref="attributeForm4"
          :model="attributeForm4"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="参数名称" prop="key">
            <el-input v-model="attributeForm4.key"/>
          </el-form-item>
          <el-form-item label="参数值" prop="value">
            <el-input v-model="attributeForm4.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable4 = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd4">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button :disabled="disabled" type="primary" @click="handlePublish('formData')">上架</el-button>
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
import { updata, read, uploadPath } from '@/api/excavator'
import { createTestStorage } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { findBrand, getComboBox } from '@/api/select'
export default {
  name: 'ExcavatorEdit',
  components: { Editor },

  data() {
    return {
      disabled: false,
      brand_type: 1, // 1是挖掘机 2是配件 3是金融产品
      uploadPath,
      brands: [], // 品牌下拉框
      goods_factorys: [], // 品牌下拉框
      goods_types: [], // 机型下拉框
      goods_powers: [], // 动力下拉框
      goods_shovels: [], // 铲斗下拉框
      // goods_parameters: [], // 参数项
      goods_photos: [], // 图片项
      formData: {},
      //   goodsPics: [{
      //     specification: '1',
      //     pic_key: '规格',
      //     pic_url: []
      //   }, {
      //     specification: '2',
      //     pic_key: '性能',
      //     pic_url: []
      //   }, {
      //     specification: '3',
      //     pic_key: '发动机',
      //     pic_url: []
      //   }, {
      //     specification: '4',
      //     pic_key: '作业范围',
      //     pic_url: []
      //   }],
      goodsPics: [],
      picGalleryUrlListShow1: [],
      picGalleryUrlListShow2: [],
      picGalleryUrlListShow3: [],
      picGalleryUrlListShow4: [],
      goodsPros: [{
        pro_key: '整体外观',
        specification: '1',
        pro_value: {}
      },
      {
        pro_key: '局部',
        specification: '2',
        pro_value: {}
      },
      {
        pro_key: '其他',
        specification: '3',
        pro_value: {}
      },
      {
        pro_key: '图解',
        specification: '4',
        pro_value: {}
      }],
      attributeVisiable1: false,
      attributeForm1: { key: '', value: '' },
      attributes1: [],
      attributeVisiable2: false,
      attributeForm2: { key: '', value: '' },
      attributes2: [],
      attributeVisiable3: false,
      attributeForm3: { key: '', value: '' },
      attributes3: [],
      attributeVisiable4: false,
      attributeForm4: { key: '', value: '' },
      attributes4: [],
      rules: {
        name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        brandId: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        merchant_id: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        fix_p_9: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        fix_p_10: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        fix_p_11: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        fix_p_17: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        fix_p_1: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        fix_p_12: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        fix_p_2: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        fix_p_5: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createTestStorage(formData)
            .then(res => {
              success(res.data.data.allfilePath)
            })
            .catch(() => {
              failure('上传失败，请重新上传')
            })
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
    init: function() {
      const _this = this
      if (_this.$route.query.good_code == null) return

      const good_code = _this.$route.query.good_code
      _this.good_code = good_code
      read({ good_code })
        .then(response => {
          console.log(response.data.data)
          for (const i in response.data.data.goodsDetails) {
            _this.$set(_this.formData, i, response.data.data.goodsDetails[i])
          }
          for (const j in response.data.data.goodsPics) {
            _this.$set(_this.goodsPics, j, response.data.data.goodsPics[j])
          }
          //   to Array and init imgList
          for (const i in _this.goodsPics) {
            const k = parseInt(i) + 1
            _this.goodsPics[i].pic_url = JSON.parse(_this.goodsPics[i].pic_url)
            _this['picGalleryUrlListShow' + k ] = []
            for (const j in _this.goodsPics[i].pic_url) {
              _this['picGalleryUrlListShow' + k ].push({ url: _this.goodsPics[i].pic_url[j] })
            }
          }
          //   to Array and init arg =============================
          for (const j in response.data.data.goodsPros) {
            _this.$set(_this.goodsPros, j, response.data.data.goodsPros[j])
          }
          for (const i in _this.goodsPros) {
            const k = parseInt(i) + 1
            const obj = {}
            _this.goodsPros[i].pro_value = JSON.parse(_this.goodsPros[i].pro_value)
            _this['attributes' + k ] = []
            for (const j in _this.goodsPros[i].pro_value) {
              obj.key = j
              obj.value = _this.goodsPros[i].pro_value[j]
              _this['attributes' + k ].push(obj)
            }
          }

          console.log(_this.attributeForm1)
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })

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
      this.initSelect()
    },
    initSelect() {
      const _this = this
      // 厂商
      _this.getCommonSelect({
        key_group_name: 'goods_factory',
        callback: function(v) {
          _this.goods_factorys = v
        }
      })
      // 机型
      _this.getCommonSelect({
        key_group_name: 'goods_type',
        callback: function(v) {
          _this.goods_types = v
        }
      })
      // 动力
      _this.getCommonSelect({
        key_group_name: 'goods_power',
        callback: function(v) {
          _this.goods_powers = v
        }
      })
      // 机型
      _this.getCommonSelect({
        key_group_name: 'goods_shovel',
        callback: function(v) {
          _this.goods_shovels = v
        }
      })
      // 新机图片项
      // _this.getCommonSelect({
      //   key_group_name: 'goods_parameter',
      //   callback: function(v) {
      //     _this.goods_photos = v
      //     for (const i in v) {
      //       _this.formData.goodsPics.push({ pic_key: v[i].key_value, specification: v[i].key_name, pic_url: [] })
      //     }
      //   }
      // })
      // 新机参数项
      // _this.getCommonSelect({
      //   key_group_name: 'goods_photo',
      //   callback: function(v) {
      //     _this.goods_parameters = v
      //     console.log(v)
      //     for (const i in v) {
      //       _this.formData.goodsPros.push({ pro_key: v[i].key_value, specification: v[i].key_name, pro_value: {}})
      //     }
      //   }
      // })
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
    handleCategoryChange(value) {
      this.formData.categoryId = value[value.length - 1]
    },
    handleCancel: function() {
      this.$router.push({ path: '/product/excavator' })
    },
    handlePublish: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const finalGoods = this.formData
          finalGoods.goodsPics = this.goodsPics
          for (const i in finalGoods.goodsPics) {
            finalGoods.goodsPics[i].pic_url = JSON.stringify(finalGoods.goodsPics[i].pic_url)
          }
          this.attributes1.forEach(ele => {
            this.goodsPros[0].pro_value[ele.key] = ele.value
          })
          this.attributes2.forEach(ele => {
            this.goodsPros[1].pro_value[ele.key] = ele.value
          })
          this.attributes3.forEach(ele => {
            this.goodsPros[2].pro_value[ele.key] = ele.value
          })
          this.attributes4.forEach(ele => {
            this.goodsPros[3].pro_value[ele.key] = ele.value
          })
          finalGoods.goodsPros = this.goodsPros
          for (const j in finalGoods.goodsPros) {
            finalGoods.goodsPros[j].pro_value = JSON.stringify(finalGoods.goodsPros[j].pro_value)
          }
          updata(finalGoods).then(response => {
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.$router.push({ path: '/product/excavator' })
          }).catch(response => {
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
    handleGalleryUrl1(response, file, fileList) {
      if (response.errno === 0) {
        this.disabled = false
        this.goodsPics[0].pic_url.push(response.data.allfilePath)
      }
    },
    handleGalleryUrl2(response, file, fileList) {
      if (response.errno === 0) {
        this.disabled = false
        this.goodsPics[1].pic_url.push(response.data.allfilePath)
      }
    },
    handleGalleryUrl3(response, file, fileList) {
      if (response.errno === 0) {
        this.disabled = false
        this.goodsPics[2].pic_url.push(response.data.allfilePath)
      }
    },
    handleGalleryUrl4(response, file, fileList) {
      if (response.errno === 0) {
        this.disabled = false
        this.goodsPics[3].pic_url.push(response.data.allfilePath)
      }
    },
    handleRemove1: function(file, fileList) {
      for (let i = 0; i < this.goodsPics[0].pic_url.length; i++) {
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
        if (this.goodsPics[0].pic_url[i] === url) {
          this.goodsPics[0].pic_url.splice(i, 1)
        }
      }
    },
    handleRemove2: function(file, fileList) {
      for (let i = 0; i < this.goodsPics[1].pic_url.length; i++) {
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
        if (this.goodsPics[1].pic_url[i] === url) {
          this.goodsPics[1].pic_url.splice(i, 1)
        }
      }
    },
    handleRemove3: function(file, fileList) {
      for (let i = 0; i < this.goodsPics[1].pic_url.length; i++) {
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
        if (this.goodsPics[1].pic_url[i] === url) {
          this.goodsPics[1].pic_url.splice(i, 1)
        }
      }
    },
    handleRemove4: function(file, fileList) {
      for (let i = 0; i < this.goodsPics[1].pic_url.length; i++) {
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
        if (this.goodsPics[1].pic_url[i] === url) {
          this.goodsPics[1].pic_url.splice(i, 1)
        }
      }
    },
    handleAttributeShow1() {
      this.attributeForm1 = {}
      this.attributeVisiable1 = true
    },
    handleAttributeAdd1() {
      this.attributes1.unshift(this.attributeForm1)
      this.attributeVisiable1 = false
    },
    handleAttributeDelete1(row) {
      const index = this.attributes1.indexOf(row)
      this.attributes1.splice(index, 1)
    },

    handleAttributeShow2() {
      this.attributeForm2 = {}
      this.attributeVisiable2 = true
    },
    handleAttributeAdd2() {
      this.attributes2.unshift(this.attributeForm2)
      this.attributeVisiable2 = false
    },
    handleAttributeDelete2(row) {
      const index = this.attributes2.indexOf(row)
      this.attributes2.splice(index, 1)
    },

    handleAttributeShow3() {
      this.attributeForm3 = {}
      this.attributeVisiable3 = true
    },
    handleAttributeAdd3() {
      this.attributes3.unshift(this.attributeForm3)
      this.attributeVisiable3 = false
    },
    handleAttributeDelete3(row) {
      const index = this.attributes3.indexOf(row)
      this.attributes3.splice(index, 1)
    },

    handleAttributeShow4() {
      this.attributeForm4 = {}
      this.attributeVisiable4 = true
    },
    handleAttributeAdd4() {
      this.attributes4.unshift(this.attributeForm4)
      this.attributeVisiable4 = false
    },
    handleAttributeDelete4(row) {
      const index = this.attributes4.indexOf(row)
      this.attributes4.splice(index, 1)
    }
  }
}
</script>
