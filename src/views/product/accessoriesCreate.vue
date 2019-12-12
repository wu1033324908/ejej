<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-31 10:38:25
 * @LastEditTime: 2019-08-15 17:10:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>配件新增</h3>
      <el-form ref="accessoriesData" :rules="rules" :model="accessoriesData" label-width="150px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="accessoriesData.name" />
        </el-form-item>
        <el-form-item label="品牌" required>
          <el-select v-model="accessoriesData.brandId" placeholder="请选择">
            <el-option
              v-for="brand in brands"
              :key="brand.id"
              :label="brand.name"
              :value="brand.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="accessoriesData.categoryId" placeholder="请选择">
            <el-option
              v-for="categoryType in categoryTypes"
              :key="categoryType.id"
              :label="categoryType.name"
              :value="categoryType.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" required>
          <el-select
            v-model="accessoriesData.province"
            placeholder="请选择"
            @change="provinceSelectChange"
          >
            <el-option
              v-for="province in provinces"
              :key="province.id"
              :label="province.name"
              :value="province.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" required>
          <el-select v-model="accessoriesData.city" placeholder="请选择">
            <el-option v-for="city in citys" :key="city.id" :label="city.name" :value="city.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="fixP8">
          <el-input v-model="accessoriesData.fixP8" />
        </el-form-item>
        <el-form-item label="价格" prop="counterPrice">
          <el-input v-model="accessoriesData.counterPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="运费到付" required>
          <el-radio v-model="accessoriesData.fixP16" label="0">是</el-radio>
          <el-radio v-model="accessoriesData.fixP16" label="1">否</el-radio>
        </el-form-item>
        <el-form-item v-show="accessoriesData.fixP16 == 1" label="运费">
          <el-input v-model="accessoriesData.freightPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存" prop="num">
          <el-input v-model.number="accessoriesData.num" />
        </el-form-item>

        <el-form-item label="图片" required>
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :before-upload="beforeUpload"
            :on-success="uploadPicUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="产品介绍" required>
          <editor :init="editorInit" v-model="accessoriesData.detail" />
        </el-form-item>
        <el-form-item label="详情" prop="wordDetail">
          <el-input
            :rows="2"
            v-model="accessoriesData.wordDetail"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button :disabled="disabled" type="primary" @click="handlePublish">保存</el-button>
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
import { createCategory, uploadPath } from '@/api/accessories'
import { createTestStorage } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { findBrand, findCategoryHomePage, getRegion } from '@/api/select'
export default {
  name: 'AccessoriesCreate',
  components: {
    Editor
  },

  data() {
    return {
      disabled: false,
      brand_type: 2, // 1是挖掘机 2是配件 3是金融产品
      accessoriesData: {
        picGalleryUrlList: [],
        fixP16: '0'
      },
      brands: [],
      categoryTypes: [],
      provinces: [],
      citys: [],
      uploadPath,
      rules: {
        name: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'blur'
          }
        ],
        fixP8: [
          {
            required: true,
            message: '规格不能为空',
            trigger: 'blur'
          }
        ],
        counterPrice: [
          {
            required: true,
            message: '价格不能为空或输入正确的价格',
            pattern: /^[0-9]\d*(.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        freightPrice: [
          {
            required: true,
            message: '运费不能为空或输入正确的运费',
            pattern: /^[0-9]\d*(.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        num: [
          {
            required: true,
            message: '库存不能为空或输入正确的库存',
            pattern: /^[+]{0,1}(\d+)$/,
            trigger: 'blur'
          }
        ],
        wordDetail: [
          {
            required: true,
            message: '详情不能为空',
            trigger: 'blur'
          }
        ]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        height: 500,
        plugins: [
          'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
        ],
        toolbar: [
          'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
          'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          var formData = new FormData()
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
        pid: this.accessoriesData.province,
        callback: function(v) {
          _this.accessoriesData.city = v[0].id
        }
      })
    },
    handleCancel: function() {
      this.$router.push({
        path: '/product/accessoriesList'
      })
    },
    handlePublish: function() {
      const finalGoods = this.accessoriesData
      finalGoods.picGalleryUrlList = JSON.stringify(this.accessoriesData.picGalleryUrlList)
      createCategory(finalGoods)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/product/accessoriesList' })
        })
        .catch(response => {
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
    uploadPicUrl: function(response) {
      this.disabled = false
      this.accessoriesData.picGalleryUrlList.push(response.data.allfilePath)
    },
    handleRemove: function(file, fileList) {
      for (let i = 0; i < this.accessoriesData.picGalleryUrlList.length; i++) {
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

        if (this.accessoriesData.picGalleryUrlList[i] === url) {
          this.accessoriesData.picGalleryUrlList.splice(i, 1)
        }
      }
    }
  }
}
</script>
