<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>新增装修公司</h3>
      <el-form ref="newCompany" :rules="rules" :model="newCompany" label-width="150px">
        <el-form-item label="公司名称" prop="departName">
          <el-input v-model="newCompany.departName" />
        </el-form-item>
        <el-form-item label="姓名" prop="nickname	">
          <el-input v-model="newCompany.nickname" />
        </el-form-item>
        <el-form-item label="联系电话" prop="departPhone">
          <el-input v-model="newCompany.departPhone" />
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input v-model="newCompany.companyAddress" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newCompany.email" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input v-model="newCompany.idCard" />
        </el-form-item>
        <el-form-item label="账户/手机号码" prop="mobile">
          <el-input v-model="newCompany.mobile" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newCompany.password" />
        </el-form-item>
        <!-- <el-form-item label="归属机构" prop="departCode">
          <el-input v-model="newCompany.departCode" />
        </el-form-item>-->
        <el-form-item label="头像">
          <el-upload
            :action="uploadHeadUrlPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="headUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="执照">
          <el-upload
            :action="uploadPermitUrlPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="permitUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="身份证正面">
          <el-row :gutter="30">
            <el-col :span="8">
              <div class="grid-content">
                <el-upload
                  class="upload-demo"
                  ref="frontPic"
                  :headers="headers"
                  accept="image/png, image/jpeg"
                  name="imgPath"
                  :action="uploadIdCardUrlPath"
                  :before-upload="beforeAvatarUpload"
                  :on-success="idCardUrl"
                  :limit="1"
                  :on-exceed="uploadOverrun"
                  list-type="picture"
                >
                  <el-button size="small" type="primary" @click="uploadSign=1">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
              </div>
            </el-col>
           
          </el-row>
        </el-form-item>
        <el-form-item label="身份证背面">
          <el-row :gutter="30">
            <el-col :span="8">
              <div class="grid-content">
                <el-upload
                  class="upload-demo"
                  :headers="headers"
                  ref="reversePic"
                  accept="image/png, image/jpeg"
                  name="imgPath"
                  :action="uploadIdCardUrlPath"
                  :before-upload="beforeAvatarUpload"
                  :on-success="idCardUrl"
                  :limit="1"
                  :on-exceed="uploadOverrun"
                  list-type="picture"
                >
                  <el-button size="small" type="primary" @click="uploadSign=2">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
              </div>
            </el-col>
            
          </el-row>
        </el-form-item>-->
        <el-form-item label="身份证正面">
          <el-upload
            :action="uploadIdCardUrlPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="idCardUrlF"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面">
          <el-upload
            :action="uploadIdCardUrlPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="idCardUrlR"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
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
            <div class="cPic" v-for="(item,index) in newCompany.url_list" :key="index">
              <img :src="item.fileUrl" alt />
              <span style="display:block">{{item.fileName}}</span>
            </div>
          </div>
        </el-form-item>-->
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">添加</el-button>
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
import {
  departAdd,
  uploadHeadUrlPath,
  uploadPermitUrlPath,
  uploadIdCardUrlPath
} from "@/api/depart";
import { departList } from "@/api/depart";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
        // }
      }, 1000);
    };
    return {
      uploadHeadUrlPath,
      uploadPermitUrlPath,
      uploadIdCardUrlPath,
      // newCompany: { picUrl: '', gallery: [] },
      newCompany: {},
      departOptions: [],
      idCard: [],
      userCode: "",
      rules: {
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        mobile: [{ validator: checkPhone, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  computed: {
    headers() {
      return {
        "X-Wajueji-Admin-Token": getToken()
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    init: function() {
      this.getdepartList();
    },
    getdepartList() {
      departList()
        .then(response => {
          this.departOptions = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加
    handlePublish() {
      //   this.newCompany.birthday = this.newCompany.birthday + " 00:00:00";
      this.newCompany.status = 0;
      this.newCompany.idCardUrl = JSON.stringify(this.idCard)
      departAdd(this.newCompany)
        .then(response => {
          console.log(response);
          this.$notify.success({
            title: "成功",
            message: "创建成功"
          });
          // const id = response.data.data.id;
          this.$router.push({ path: "/designer/list"});
        })
        .catch(errmsg => {
          console.log(errmsg);
          // MessageBox.alert("业务错误：" + errmsg.data.errmsg, "警告", {
          //   confirmButtonText: "确定",
          //   type: "error"
          // });
        });
    },
    handleCancel: function() {
      this.$router.push({ path: "/case/create" });
    },
    uploadPicUrl: function(response) {
      this.newCompany.picUrl = response.data.url;
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    headUrl(response) {
      console.log(response);
      this.newCompany.avatar = response.data.allfilePath;
    },
    permitUrl(response) {
      this.newCompany.businessLicense = response.data.allfilePath;
    },
    idCardUrlF(response) {
      this.idCard.push(response.data.allfilePath);
    },
    idCardUrlR(response) {
      this.idCard.push(response.data.allfilePath);
    },
    // idCardUrl(response, file, fileList) {
    //   console.log(response);
    //   console.log(file);
    //   console.log(fileList);
    //   const me = {};
    //   const sign = this.uploadSign;
    //   // 判断 code 是否为  0    0 代表成功
    //   if (response.code === 0) {
    //     // 通过 sign 判断给相应的字段赋值
    //     if (sign === 1) {
    //       // 正面
    //       // me.frontPic = response.data.allfilePath;
    //     } else if (sign === 2) {
    //       // 背面
    //       // me.reversePic = response.data.allfilePath;
    //     }
    //   } else {
    //     // 失败回调
    //     this.$message.error(`${response.info}`);
    //     // 通过 sign 判断清空相应的列表 因为默认会显示出图片其实是失败了，容易造成用户误解
    //     if (sign === 1) {
    //       // 正面
    //       // me.$refs.frontPic.clearFiles();
    //     } else if (sign === 2) {
    //       // 背面
    //       // me.$refs.reversePic.clearFiles();
    //     }
    //   }
    //   // this.newCompany.idCardUrl = JSON.stringify([me.frontPic , me.reversePic ]);
    // },
    handleGalleryUrl(response, file, fileList) {
      console.log(response);
      this.newCompany.avatar = response.data.allfilePath;
      // if (response.errno === 0) {
      //   this.newCompany.gallery.push(response.data.url);
      // }
    },
    beforeAvatarUpload: function(file) {
      const me = this;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!(isJPG || isPNG)) {
        me.$message.error("上传的文件只能是 JPG 或者是 PNG 格式的");
      }
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
    //   this.newCompany.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    // handleGalleryUrlCase(response, file, fileList) {
    //   console.log(fileList);
    //   console.log(file);
    //   this.newCompany.avatar = response.data.allfilePath

    //   console.log(this.newCompany);
    //   // if (response.errno === 0) {
    //   //   this.newCompany.gallery.push(response.data.url);
    //   // }
    // },

    handleRemove(file, fileList) {
      for (var i = 0; i < this.newCompany.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url;
        console.log(file);
        console.log(fileList);
        // this.newCompany.url_list.
        if (file.response === undefined) {
          url = file.url;
        } else {
          url = file.response.data.url;
        }

        if (this.newCompany.gallery[i] === url) {
          this.newCompany.gallery.splice(i, 1);
        }
      }
    }
  }
};
</script>
