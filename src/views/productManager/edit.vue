<template>
  <div class="app-container">
    <el-card v-loading="loading" class="box-card">
      <h3>编辑项目经理</h3>
      <el-form ref="editproductManager" :rules="rules" :model="editproductManager" label-width="150px">
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="editproductManager.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editproductManager.gender" placeholder="请选择性别">
            <el-option :value="1" label="男"/>
            <el-option :value="2" label="女"/>
            <el-option :value="0" label="未知"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editproductManager.mobile" />
        </el-form-item>
        <el-form-item label="工作年限" prop="workYear">
          <el-input v-model="editproductManager.workYear" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
              v-model="editproductManager.birthday"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="归属机构" prop="departCode">
          <el-input v-model="editproductManager.departCode" />
        </el-form-item>-->
        <el-form-item label="归属机构">
          <el-select v-model="editproductManager.departCode" clearable placeholder="请选择所属机构">
            <el-option
              v-for="(item,index) in departOptions"
              :key="index"
              :label="item.departName"
              :value="item.departCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editproductManager.email" />
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            :show-file-list="false"
            :action="uploadPath"
            :headers="headers"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <img v-if="editproductManager.avatar" :src="editproductManager.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <!-- <el-form-item v-if="example_source==0" class="casePic" label="案例图片">
          <el-form-item>
            <el-upload
              :action="uploadPath"
              :limit="9"
              ref="upload"
              :headers="headers"
              :auto-upload="false"
              :on-exceed="uploadOverrunCase"
              :on-success="handleGalleryUrlCase"
              :on-remove="handleRemoveCase"
              :multiple="false"
              :on-change="changeFile"
              accept=".jpg, .jpeg, .png, .gif"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>

          <div class="picList" style="margin-top:30px">
            <div class="cPic" v-for="(item,index) in editproductManager.url_list" :key="index">
              <img :src="item.fileUrl" alt />
              <span style="display:block">{{item.fileName}}</span>
            </div>
          </div>
        </el-form-item>-->
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
.picList {
  width: 100%;
  float: left;
}
.picList .cPic {
  width: 33%;
  display: inline-block;
  text-align: center;
}
.picList .cPic span {
  text-align: center;
}
.picList .cPic img {
  width: 200px;
}
</style>

<script>
import { userUpdata, uploadPath, userDetail } from '@/api/user'
import { departList } from '@/api/depart'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
        // }
      }, 1000)
    }
    return {
      uploadPath,
      loading: true,
      // editproductManager: { picUrl: '', gallery: [] },
      editproductManager: {},
      departOptions: [],
      userCode: '',
      designerId: '',
      rules: {
        nickname: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mobile: [{ validator: checkPhone, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
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
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      this.designerId = this.$route.query.id
      this.getdepartList()
      this.getUserDetail()
    },
    // 获取项目经理信息
    getUserDetail() {
      userDetail({ id: this.designerId })
        .then(response => {
          console.log(response)
          this.editproductManager = response.data.data.user
          this.loading = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },

    getdepartList() {
      departList()
        .then(response => {
          this.departOptions = response.data.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 保存
    handlePublish() {
      this.editproductManager.type = '2'
      this.editproductManager.status = '1'
      //   this.editproductManager.birthday = this.editproductManager.birthday + " 00:00:00";
      console.log(this.editproductManager.birthday)
      userUpdata(this.editproductManager)
        .then(response => {
          console.log(response)
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          // const id = response.data.data.id;
          this.$router.push({ path: '/productManager/list' })
        })
        .catch(errmsg => {
          console.log(errmsg)
          MessageBox.alert('业务错误：' + errmsg.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/productManager/list' })
    },
    uploadPicUrl: function(response) {
      this.editproductManager.picUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    uploadOverrunCase: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传1张图片!'
      })
    },
    handleGalleryUrl(response, file, fileList) {
      this.editproductManager.avatar = response.data.allfilePath
      // if (response.errno === 0) {
      //   this.editproductManager.gallery.push(response.data.url);
      // }
    },
    // beforeAvatarUpload(file) {
    //   this.$prompt("请输入文件名", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消"
    //     // inputValue：this.value,
    //   })
    //     .then(({ value }) => {
    //       return true;
    //     })
    //     .catch(() => {
    //       return false;
    //     });
    //   this.dialogFormVisible = true;
    //   this.editproductManager.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    // handleGalleryUrlCase(response, file, fileList) {
    //   console.log(fileList)
    //   console.log(file)
    //   this.editproductManager.url_list.push({
    //     fileName: this.fileName,
    //     sortOrder: this.sort,
    //     fileUrl: response.data.allfilePath
    //   })
    //   console.log(this.editproductManager)
    //   // if (response.errno === 0) {
    //   //   this.editproductManager.gallery.push(response.data.url);
    //   // }
    // },

    handleRemove(file, fileList) {
      this.editproductManager.avatar = ''
      // for (var i = 0; i < this.editproductManager.gallery.length; i++) {
      //   // 这里存在两种情况
      //   // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
      //   //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
      //   // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
      //   var url
      //   console.log(file)
      //   console.log(fileList)
      //   // this.editproductManager.url_list.
      //   if (file.response === undefined) {
      //     url = file.url
      //   } else {
      //     url = file.response.data.url
      //   }

      //   if (this.editproductManager.gallery[i] === url) {
      //     this.editproductManager.gallery.splice(i, 1)
      //   }
      // }
    }
  }
}
</script>
