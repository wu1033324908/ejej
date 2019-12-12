<template>
  <div class="app-container" v-loading="loadingDetail">
    <h3>查看详情</h3>
    <el-card class="box-card">
      <h4>零工基本信息</h4>
      <div style="display:inline-block ; vertical-align: top; margin-right:100px; width:100px;  height : 100px">
        <div style=" width:100px;  height : 100px" >
          <img style="width:100px ;height:100px " :src="workerData.avatar"  />
        </div>
        <el-upload
          style="margin-top: 20px;
    margin-left: 8px;"
          class="upload-demo"
          :action="uploadPath"
          :on-remove="handleRemove"
          :on-success="handleGalleryUrl"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button v-if="workerData.avatar!=''"  size="small" type="primary">点击编辑</el-button>
        </el-upload>
      </div>
      <table class="detailTable" style="display:inline-block">
        <tr>
          <th>姓名</th>
          <td>{{workerData.nickname}}</td>
          <th>手机号码</th>
          <td>{{workerData.mobile}}</td>
          <th>工种</th>
          <td>{{workerData.typeWork}}</td>
          <th>工作年限</th>
          <td>{{workerData.workYear}}</td>
        </tr>
        <tr>
          <th>归属机构</th>
          <td>{{workerData.departCode}}</td>
          <th>邮箱</th>
          <td>{{workerData.email}}</td>
          <th>单价</th>
          <td>{{workerData.unitMoney}}</td>
          <th>状态</th>
          <td>{{workerData.status}}</td>
        </tr>
        <tr>
          <th>性别</th>
          <td>{{workerData.gender== 0 ? "未知":workerData.gender==1 ?'男:' : workerData.gender==0 ? '女':'' }}</td>
          <th>出生日期</th>
          <td>{{workerData.birthday}}</td>
          <th>是否可议价</th>
          <td>{{workerData.isBargain}}</td>
          <th>注册时间</th>
          <td>{{workerData.addTime}}</td>
        </tr>
      </table>
    </el-card>
    <el-card>
      <h4>活跃度信息</h4>
      <table class="activity">
        <thead>
          <tr>
            <th>评分</th>
            <th>转发</th>
            <th>点赞</th>
            <th>收藏</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>{{activity.forWordNumber}}</td>
            <td>{{activity.likeNumber}}</td>
            <td>{{activity.collectNumber}}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card>
      <h4 style="display:line-block">介绍信息</h4>
      <el-button type="primary" @click="introduceCreate(scope.row)">新增</el-button>
      <el-table :data="introduce" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="introduceName" label="名称" width="180"></el-table-column>
        <el-table-column prop="introduceContent" label="内容" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.serviceLabelUrl" style="width:50px" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="operation" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="introduceEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="introduceHandleforbid(scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>标签信息</h4>
      <el-button type="primary" @click="ServiceLableCreate(scope.row)">新增</el-button>
      <el-table :data="ServiceLable" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="serviceType" label="类型" width="180">
          <template
            slot-scope="scope"
          >{{scope.row.serviceType == 0 ? "资质标签" : scope.row.serviceType == 1 ? "属性标签" : scope.row.serviceType == 2 ? "自定义标签" : ''}}</template>
        </el-table-column>
        <el-table-column prop="serviceLabelName" label="名称" width="180"></el-table-column>
        <el-table-column prop="serviceLabelUrl" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.serviceLabelUrl" style="width:50px" alt />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="operation" width="180">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleforbidLabel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>案例信息</h4>

    </el-card>
    <el-card>
      <h4>服务订单列表</h4>
    </el-card>
    <!-- <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">添加</el-button>
    </div>-->
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
.detailTable {
  text-align: left;
  border-collapse: collapse;
}
.detailTable td {
  height: 100px;
  width: 200px;
}
.detailTable tr {
  text-align: center;
  height: 100px;
  width: 200px;
}
.detailTable.th {
  height: 100px;
  width: 200px;
}
.activity {
  text-align: left;
}
.activity td {
  height: 100px;
  width: 200px;
}
</style>

<script>
import { userDetail, uploadPath } from "@/api/user";
import { getCaseList } from "@/api/case";
import { getServiceLable } from "@/api/label";
import { departList } from "@/api/depart";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      designerId: "",
      uploadPath,
      // workerData: { picUrl: '', gallery: [] },
      workerData: {},
      activity: {},
      ServiceLable: [],
      introduce: [],
      departOptions: [],
      userCode: "",
      loadingDetail: true,
      rules: {
        nickname: [
          { required: true, message: "作者不能为空", trigger: "blur" }
        ],
        housingname: [
          { required: true, message: "案例名称不能为空", trigger: "blur" }
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
      this.designerId = this.$route.query.id;
      this.getUserDetail();
    },

    // 获取零工详情
    getUserDetail() {
      userDetail({ id: this.designerId })
        .then(response => {
          console.log(response);
          this.workerData = response.data.data.user;
          this.activity = response.data.data.activity;
          this.ServiceLable = response.data.data.ServiceLabel;
          this.introduce = response.data.data.introduce;
          console.log(this.ServiceLable);
          this.loadingDetail = false;
        })
        .catch(errmsg => {});
    },
    handleCancel: function() {
      this.$router.push({ path: "/case/create" });
    },
    uploadPicUrl: function(response) {
      this.workerData.picUrl = response.data.url;
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
      this.workerData.fileUrl = response.data.allfilePath;
      // if (response.errno === 0) {
      //   this.workerData.gallery.push(response.data.url);
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
    //   this.workerData.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    handleGalleryUrlCase(response, file, fileList) {
      console.log(fileList);
      console.log(file);
      this.workerData.url_list.push({
        fileName: this.fileName,
        sortOrder: this.sort,
        fileUrl: response.data.allfilePath
      });
      console.log(this.workerData);
      // if (response.errno === 0) {
      //   this.workerData.gallery.push(response.data.url);
      // }
    },

    handleRemove(file, fileList) {
      for (var i = 0; i < this.workerData.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url;
        console.log(file);
        console.log(fileList);
        // this.workerData.url_list.
        if (file.response === undefined) {
          url = file.url;
        } else {
          url = file.response.data.url;
        }

        if (this.workerData.gallery[i] === url) {
          this.workerData.gallery.splice(i, 1);
        }
      }
    }
  }
};
</script>
