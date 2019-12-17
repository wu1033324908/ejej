<template>
  <div class="app-container">
    <el-card v-loading="loading" class="box-card">
      <h3>编辑设计师</h3>
      <el-form ref="editDesigner" :rules="rules" :model="editDesigner" label-width="150px">
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="editDesigner.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editDesigner.gender" placeholder="请选择性别">
            <el-option :value="1" label="男"/>
            <el-option :value="2" label="女"/>
            <el-option :value="0" label="未知"/>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editDesigner.mobile" />
        </el-form-item>
        <el-form-item label="工作年限" prop="workYear">
          <el-input v-model="editDesigner.workYear" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
              v-model="editDesigner.birthday"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            />
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="归属机构" prop="departCode">
          <el-input v-model="editDesigner.departCode" />
        </el-form-item>-->
        <el-form-item label="归属机构">
          <el-select v-model="editDesigner.departCode" clearable placeholder="请选择所属机构">
            <el-option
              v-for="(item,index) in departOptions"
              :key="index"
              :label="item.departName"
              :value="item.departCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editDesigner.email" />
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
            <img v-if="editDesigner.avatar" :src="editDesigner.avatar" class="avatar">
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
            <div class="cPic" v-for="(item,index) in editDesigner.url_list" :key="index">
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
      // editDesigner: { picUrl: '', gallery: [] },
      editDesigner: {
        birthday: ''
      },
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
    // 获取设计师信息
    getUserDetail() {
      userDetail({ id: this.designerId })
        .then(response => {
          this.editDesigner = response.data.data.user
          // this.picUrl = { name: response.data.data.user.avatar, url: response.data.data.user.avatar }
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
      this.editDesigner.type = '0'
      this.editDesigner.status = '1'
      //   this.editDesigner.birthday = this.editDesigner.birthday + " 00:00:00";
      this.editDesigner.birthday = this.editDesigner.birthday.split(' ').splice(0, 1)[0]
      console.log(this.editDesigner.birthday)
      userUpdata(this.editDesigner)
        .then(response => {
          console.log(response)
          this.$notify.success({
            title: '成功',
            message: '保存成功'
          })
          // const id = response.data.data.id;
          this.$router.push({ path: '/designer/list' })
        })
        .catch(errmsg => {
          console.log(errmsg)
          MessageBox.alert('业务错误：' + errmsg.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 当出生日期变化时
    changeTime() {
      this.editDesigner.birthday = ''
    },
    handleCancel: function() {
      this.$router.push({ path: '/designer/list' })
    },
    // uploadPicUrl: function(response) {
    //   this.editDesigner.picUrl = response.data.url
    // },
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
      console.log(response)
      // this.editDesigner.fileUrl = response.data.allfilePath
      this.editDesigner.avatar = response.data.allfilePath
      // if (response.errno === 0) {
      //   this.editDesigner.gallery.push(response.data.url);
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
    //   this.editDesigner.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    // handleGalleryUrlCase(response, file, fileList) {
    //   console.log(fileList)
    //   console.log(file)
    //   this.editDesigner.url_list.push({
    //     fileName: this.fileName,
    //     sortOrder: this.sort,
    //     fileUrl: response.data.allfilePath
    //   })
    //   console.log(this.editDesigner)
    //   // if (response.errno === 0) {
    //   //   this.editDesigner.gallery.push(response.data.url);
    //   // }
    // },

    handleRemove(file, fileList) {
      this.editDesigner.avatar = ''
    }
  }
}
</script>
