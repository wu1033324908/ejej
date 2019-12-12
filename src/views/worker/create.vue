<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>新增零工</h3>
      <el-form ref="newWorker" :rules="rules" :model="newWorker" label-width="150px">
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="newWorker.nickname" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="newWorker.gender" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="未知" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="newWorker.mobile" />
        </el-form-item>
        <el-form-item label="工作年限" prop="workYear">
          <el-input v-model="newWorker.workYear" />
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker
              v-model="newWorker.birthday"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
              value-format="yyyy-MM-dd hh:mm:ss"
            />
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="归属机构" prop="departCode">
          <el-input v-model="newWorker.departCode" />
        </el-form-item>-->
        <el-form-item label="归属机构">
          <el-select v-model="newWorker.departCode" style="width:300px" clearable placeholder="请选择所属机构">
            <el-option
              v-for="(item,index) in departOptions"
              :key="index"
              :label="item.departName"
              :value="item.departCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newWorker.email" />
        </el-form-item>
        <el-form-item label="工种" prop="typeWork">
          <el-select
            v-model="newWorker.typeWork"
            clearable
            style="width: 300px;"
            placeholder="请选择工种"
          >
            <el-option
              v-for="(item,index) in classOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="unitMoney">
          <el-input v-model="newWorker.unitMoney" />
        </el-form-item>
        <el-form-item label="是否可议价" prop="isBargain">
          <el-select
            v-model="newWorker.isBargain"
            clearable
            style="width: 300px;"
            placeholder="请选择是否可议价"
          >
            <el-option
              v-for="(item,index) in bargainOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-input v-model="newWorker.isBargain" /> -->
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            :action="uploadPath"
            :limit="1"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl"
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
            <div class="cPic" v-for="(item,index) in newWorker.url_list" :key="index">
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
import { createUser, uploadPath } from "@/api/user";
import { departList } from "@/api/depart";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
  data() {
    var chickmoney = ( rule, value , callback ) =>{
      if(!value) {
        return callback(new Error('单价不能为空'))
      }
      setTimeout(()=>{
        if(!/^\+?[1-9][0-9]*$/.test(value)){
          callback(new Error("请输入正确的单价"));
        }else {
            callback();
          }
      },1000)
    }
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
      uploadPath,
      // newWorker: { picUrl: '', gallery: [] },
      newWorker: {},
      departOptions: [],
      classOptions: [
        { value: "0", label: "水电工" },
        { value: "1", label: "水泥工" },
        { value: "2", label: "木匠" },
        { value: "3", label: "电工" },
        { value: "4", label: "打孔" }
      ],
      bargainOptions:[
        { value:'0' , label:'是' },
        { value:'1' , label:'否' }
      ],
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
          this.departOptions = response.data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加
    handlePublish() {
      this.newWorker.type = "1";
      this.newWorker.status = "1";

      //   this.newWorker.birthday = this.newWorker.birthday + " 00:00:00";
      console.log(this.newWorker.birthday);
      createUser(this.newWorker)
        .then(response => {
          console.log(response);
          this.$notify.success({
            title: "成功",
            message: "创建成功"
          });
          const id = response.data.data.id;
          this.$router.push({ path: "/worker/detail", query: { id: id } });
        })
        .catch(errmsg => {
          console.log(errmsg);
          MessageBox.alert("业务错误：" + errmsg.data.errmsg, "警告", {
            confirmButtonText: "确定",
            type: "error"
          });
        });
    },
    handleCancel: function() {
      this.$router.push({ path: "/case/create" });
    },
    uploadPicUrl: function(response) {
      this.newWorker.picUrl = response.data.url;
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    uploadOverrunCase: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    handleGalleryUrl(response, file, fileList) {
      console.log(response);
      this.newWorker.avatar = response.data.allfilePath;
      // if (response.errno === 0) {
      //   this.newWorker.gallery.push(response.data.url);
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
    //   this.newWorker.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    // handleGalleryUrlCase(response, file, fileList) {
    //   console.log(fileList);
    //   console.log(file);
    //   this.newWorker.url_list.push({
    //     fileName: this.fileName,
    //     sortOrder: this.sort,
    //     fileUrl: response.data.allfilePath
    //   });
    //   console.log(this.newWorker);
    //   // if (response.errno === 0) {
    //   //   this.newWorker.gallery.push(response.data.url);
    //   // }
    // },

    handleRemove(file, fileList) {
      for (var i = 0; i < this.newWorker.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url;
        console.log(file);
        console.log(fileList);
        // this.newWorker.url_list.
        if (file.response === undefined) {
          url = file.url;
        } else {
          url = file.response.data.url;
        }

        if (this.newWorker.gallery[i] === url) {
          this.newWorker.gallery.splice(i, 1);
        }
      }
    }
  }
};
</script>
