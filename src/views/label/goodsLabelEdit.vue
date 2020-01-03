<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 15:51:22
 * @LastEditTime : 2019-12-20 16:07:54
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>商品标签编辑</h3>
      <el-form ref="formData" :rules="rules" :model="formData" label-width="150px">
        <el-form-item label="商品标签编号" prop="goodsLabelCode">
          <el-input v-model="formData.goodsLabelCode" />
        </el-form-item>
        <el-form-item label="商品标签名称" prop="goodsLabelName">
          <el-input v-model="formData.goodsLabelName" />
        </el-form-item>
        <!-- <el-form-item label="商品标签图片" required>
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            :on-exceed="uploadOverrun"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :multiple="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>-->
        <el-form-item label="商品标签图片">
          <el-upload
            :action="goodUploadPath"
            :headers="headers"
            :limit="1"
            :on-success="uploadPicUrl"
            :on-exceed="uploadOverrun"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="整机外观" required>
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
        </el-form-item>-->
        <el-form-item label="备注">
          <el-input v-model="formData.desc" />
        </el-form-item>
        <!-- <el-form-item label="图片" required>
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadPicUrl"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :multiple="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>-->
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button :disabled="disabled" type="primary" @click="handlePublish('formData')">保存</el-button>
      <el-button :disabled="disabled" type="danger" @click="handlePublish('formData')">删除</el-button>
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
import { getGoodsLableList, updateGoodsLabel, goodUploadPath } from '@/api/label'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
// import { getComboBox } from '@/api/select'
export default {
  name: 'AppIndexBannerEdit',
  data() {
    return {
      goodsLabeId: '',
      disabled: false,
      imgUrl: undefined,
      formData: {
        picGalleryUrlList: []
      },
      goodUploadPath,
      rules: {
        goodsLabeCode: [
          { required: true, message: '商品标签编号不能为空', trigger: 'blur' }
        ],
        goodsLabeName: [
          { required: true, message: '商品标签名称不能为空', trigger: 'blur' }
        ]
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
    this.getList()
  },
  methods: {
    init() {
      //   const _this = this
      this.goodsLabeId = this.$route.query.id
      if (!this.$route.query.id) {
        this.$router.push({
          path: '/label/goodsLabel'
        })
      }
    },
    getList() {
      const listQuery = { goodsLabelCode: this.goodsLabeId }
      console.log(listQuery)
      getGoodsLableList(listQuery)
        .then(response => {
          // console.log(response);
          this.formData = response.data.data[0]
          console.log(this.formData)
        })
        .catch(() => {
          //   console.log(err)
        })
    },
    // init() {
    //   const _this = this
    //   _this.formData = JSON.parse(_this.$route.query.rowData)
    //   console.log(_this.formData)
    //   _this.formData.content = JSON.parse(_this.formData.content)
    //   console.log(_this.formData.content)
    //   _this.imgUrl = _this.formData.url
    //    console.log( _this.imgUrl)
    //   _this.formData.HREF_URL = _this.formData.content.PARAM && _this.formData.content.PARAM.HREF_URL || undefined
    //   if (_this.formData.content.TYPE === 'WEB') {
    //     this.ISWEB = true
    //   } else {
    //     this.formData.HREF_URL = undefined
    //     this.ISWEB = false
    //   }
    //   console.log(_this.formData)
    //   _this.getCommonSelect({
    //     key_group_name: 'ad_type',
    //     callback: function(v) {
    //       _this.content_types = v
    //     }
    //   })
    // },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    // getCommonSelect(opts) {
    //   if (
    //     opts.key_group_name === undefined ||
    //     typeof opts.callback !== "function"
    //   )
    //     return;
    //   const key_group_name = opts.key_group_name || undefined;
    //   const callback = opts.callback || "";
    //   getComboBox({ key_group_name })
    //     .then(response => {
    //       callback(response.data.data);
    //     })
    //     .catch(res => {
    //       MessageBox.alert("业务错误：" + res.data.errmsg, "警告", {
    //         confirmButtonText: "确定",
    //         type: "error"
    //       });
    //     });
    // },
    handleCancel: function() {
      this.$router.push({
        path: '/label/goodsLabel'
      })
    },
    handlePublish(formName) {
      //   console.log(this.$route.query.id);

      updateGoodsLabel(this.formData)
        .then(response => {
          this.$router.push({
            path: '/label/goodsLabel'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // handlePublish: function(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       const finalGoods = this.formData
    //       finalGoods.url = this.imgUrl
    //       finalGoods.content = JSON.stringify({ TYPE: this.formData.content_type })
    //       console.log(finalGoods)
    //       adUpdata(finalGoods)
    //         .then(response => {
    //           this.$notify.success({
    //             title: '成功',
    //             message: '创建成功'
    //           })
    //           this.$router.push({ path: '/appManage/appIndexBanner' })
    //         })
    //         .catch(response => {
    //           MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
    //             confirmButtonText: '确定',
    //             type: 'error'
    //           })
    //         })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    uploadPicUrl: function(response) {
      this.disabled = false
      //   this.formData.picGalleryUrlList = [];
      //   this.formData.picGalleryUrlList.push(response.data.allfilePath);
      //   this.imgUrl = response.data.allfilePath;
      console.log(response.data)
      this.formData.goodsLabelUrl = response.data.allfilePath
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
    }
    // content_type_change(val) {
    //   if (val === "WEB") {
    //     this.ISWEB = true;
    //   } else {
    //     this.formData.HREF_URL = undefined;
    //     this.ISWEB = false;
    //   }
    // }
  }
}
</script>
