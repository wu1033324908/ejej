<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>新增产品</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="标题名称" prop="notNull">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item label="品牌" prop="notNull">
          <el-select v-model="formData.brandId">
            <el-option v-for="item in brands" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商" prop="notNull">
          <el-select v-model="formData.merchant_id">
            <el-option v-for="item in goods_factorys" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="机型" prop="notNull">
          <el-select v-model="formData.fix_p_9">
            <el-option v-for="item in goods_types" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="动力" prop="notNull">
          <el-select v-model="formData.fix_p_10">
            <el-option v-for="item in goods_powers" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="铲斗" prop="notNull">
          <el-select v-model="formData.fix_p_11">
            <el-option v-for="item in goods_shovels" :key="item.id" :label="item.key_value" :value="item.key_name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="notNull">
          <el-input v-model="formData.fix_p_17"/>
        </el-form-item>
        <el-form-item label="整机重量（kg）" prop="notNull">
          <el-input v-model="formData.fix_p_1"/>
        </el-form-item>
        <el-form-item label="吨位（吨）" prop="notNull">
          <el-input v-model="formData.fix_p_12"/>
        </el-form-item>
        <el-form-item label="铲斗容量（m³）" prop="notNull">
          <el-input v-model="formData.fix_p_2"/>
        </el-form-item>
        <el-form-item label="额定功率（kW/rpm）" prop="notNull">
          <el-input v-model="formData.fix_p_5"/>
        </el-form-item>
        <el-form-item:label="item.key_value" @click.native="get_goods_photos_fn(item)">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            :file-list="picGalleryUrlListShow[index].pic_url"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item:label="item.key_value">
        <el-form-item label="商品详细介绍">
          <editor :init="editorInit" v-model="formData.detail"/>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-card v-for="item in goods_parameters" :key="item.id" class="box-card">
      <h3>{{ item.key_value }}</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow(item.key_name)">添加</el-button>
      <el-table :data="attributes">
        <el-table-column property="attribute" label="参数名称"/>
        <el-table-column property="value" label="参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable" title="设置商品参数">
        <el-form
          ref="attributeForm"
          :model="attributeForm"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="商品参数名称" prop="attribute">
            <el-input v-model="attributeForm.attribute"/>
          </el-form-item>
          <el-form-item label="商品参数值" prop="value">
            <el-input v-model="attributeForm.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card> -->

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">上架</el-button>
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
import { createStorage } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { findBrand, getComboBox } from '@/api/select'
export default {
  name: 'ExcavatorEdit',
  components: { Editor },

  data() {
    return {
      brand_type: 1, // 1是挖掘机 2是配件 3是金融产品
      uploadPath,
      brands: [], // 品牌下拉框
      goods_factorys: [], // 品牌下拉框
      goods_types: [], // 机型下拉框
      goods_powers: [], // 动力下拉框
      goods_shovels: [], // 铲斗下拉框
      // goods_parameters: [], // 参数项
      goods_photos: [], // 图片项
      formData: { goodsPics: [], goodsPros: [] },
      picGalleryUrlListShow: [{ url: [{ url: 'asdasd' }] }, { url: [{ url: 'asdasd' }] }, { url: [{ url: 'asdasd' }] }, { url: [{ url: 'asdasd' }] }],
      //   picGalleryUrlListShow: [],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      specificationID: undefined, // 存放上传图片项ID
      rules: {
        // notNull: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData).then(res => {
            success(res.data.data.url)
          }).catch(() => {
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
      if (_this.$route.query.good_code == null) {
        return
      }
      const good_code = _this.$route.query.good_code
      _this.good_code = good_code
      read({ good_code })
        .then(response => {
          for (const i in response.data.data.goodsDetails) {
            _this.$set(_this.formData, i, response.data.data.goodsDetails[i])
          }
          _this.picGalleryUrlListShow = []
          for (const j in response.data.data.goodsPics) {
            _this.$set(_this.formData.goodsPics, j, response.data.data.goodsPics[j])
            _this.picGalleryUrlListShow.push(response.data.data.goodsPics[j])
            // console.log(_this.picGalleryUrlListShow)

            for (const k in response.data.data.goodsPics[j]) {
              _this.$set(_this.formData.goodsPics[j], k, response.data.data.goodsPics[j][k])
              if (k === 'pic_url') {
                _this.$set(_this.formData.goodsPics[j], k, JSON.parse(response.data.data.goodsPics[j][k]))

                // console.log(typeof _this.formData.goodsPics[j][k])
                // console.log(_this.formData.goodsPics[j][k] instanceof Array)
                // _this.formData.goodsPics[j].pic_url = []
                // _this.formData.goodsPics[j].pic_url.concat(JSON.parse(response.data.data.goodsPics[j][k]))
              }
            }
          }
          for (const l in _this.picGalleryUrlListShow) {
            for (const h in _this.picGalleryUrlListShow[l].pic_url) {
              const arr = _this.picGalleryUrlListShow[l].pic_url
              _this.picGalleryUrlListShow[l].pic_url = []
              _this.picGalleryUrlListShow[l].pic_url.push({ url: arr[h] })
            }
          }
          console.log('==================')
          console.log(_this.formData.goodsPics)
          console.log(_this.picGalleryUrlListShow)
          console.log('==================')
        //   console.log(_this.formData.goodsPics[0].pic_url instanceof Array)
          //   图片初始化
        //   _this.picGalleryUrlListShow = []
        //   for (const i in _this.formData.picGalleryUrlList) {
        //     _this.picGalleryUrlListShow.push({
        //       url: _this.formData.picGalleryUrlList[i]
        //     })
        //   }
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
      _this.getCommonSelect({
        key_group_name: 'goods_parameter',
        callback: function(v) {
          _this.goods_photos = v
          for (const i in v) {
            _this.formData.goodsPics.push({ pic_key: v[i].key_value, specification: v[i].key_name, pic_url: [] })
          }
        }
      })
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
    get_goods_photos_fn(item) {
      this.specificationID = item.key_name
    },
    handleCategoryChange(value) {
      this.formData.categoryId = value[value.length - 1]
    },
    handleCancel: function() {
      this.$router.push({ path: '/product/excavator' })
    },
    handlePublish: function() {
      const finalGoods = this.formData
      finalGoods.pic_url = this.goodsPics[0].pic_url[0]
      for (const i in finalGoods.goodsPics) {
        finalGoods.goodsPics[i].pic_url = JSON.stringify(finalGoods.goodsPics[i].pic_url)
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
    },
    uploadPicUrl: function(response) {
      this.formData.picUrl = response.data.url
    },
    handleGalleryUrl(response, file, fileList) {
      const _this = this
      if (response.errno === 0) {
        for (const i in _this.formData.goodsPics) {
          if (_this.specificationID === _this.formData.goodsPics[i].specification) {
            _this.formData.goodsPics[i].pic_url.push({ url: response.data.allfilePath })
            console.log(_this.formData.goodsPics)
          }
        }
      }
    },
    handleRemove: function(file, fileList) {
      const _this = this
      for (const i in _this.formData.goodsPics) {
        if (_this.specificationID === _this.formData.goodsPics[i].specification) {
          _this.formData.goodsPics[i].pic_url.splice(i, 1)
        }
      }
      console.log(_this.formData.goodsPics)
    },
    handleAttributeShow() {
      this.attributeForm = {}
      this.attributeVisiable = true
    },
    handleAttributeAdd() {
      this.attributes.unshift(this.attributeForm)
      this.attributeVisiable = false
    },
    handleAttributeDelete(row) {
      const index = this.attributes.indexOf(row)
      this.attributes.splice(index, 1)
    }
  }
}
</script>
