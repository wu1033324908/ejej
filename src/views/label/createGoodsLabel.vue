<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>商品标签</h3>
      <el-form ref="goodsLabel" :rules="rules" :model="goodsLabel" label-width="150px">
        <el-form-item label="商品标签序号" prop="id">
          <el-input v-model="goodsLabel.id" />
        </el-form-item>
        <el-form-item label="商品标签编号" prop="goodsLabelCode">
          <el-input v-model="goodsLabel.goodsLabelCode" />
        </el-form-item>
        <el-form-item label="商品标签名称" prop="goodsLabelName">
          <el-input v-model="goodsLabel.goodsLabelName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="goodsLabel.desc" />
        </el-form-item>
        <!-- <el-form-item label="状态" prop="isNew">
          <el-radio-group v-model="goodsLabel.state">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item label="商品标签图片">
          <el-upload
            :action="goodUploadPath"
            :headers="headers"
            :limit="1"
            :on-exceed="uploadOverrun"
            :on-success="handleUrl"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
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
</style>

<script>
import { addGoodsLabel, goodUploadPath } from "@/api/label";
import { MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";

export default {
  name: "CreateGoodsLabel",
  data() {
    return {
      goodUploadPath,
      goodsLabel: { goodsLabelUrl: "", gallery: [] },
      rules: {
        id: [
          { required: true, message: "商品标签序号不能为空", trigger: "blur" }
        ],
        goodsLabelCode: [
          { required: true, message: "商品标签编号不能为空", trigger: "blur" }
        ],
        goodsLabelName: [
          { required: true, message: "商品标签名字不能为空", trigger: "blur" }
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
      listCatAndBrand()
        .then(response => {
          this.categoryList = response.data.data.categoryList;
          this.brandList = response.data.data.brandList;
        })
        .catch(err => {});
    },
    handlePublish() {
      addGoodsLabel(this.goodsLabel)
        .then(response => {
          console.log(response);
          this.$notify.success({
            title: "成功",
            message: "创建成功"
          });
          this.$router.push({ path: "/label/goodsLabel" });
        })
        .catch(response => {
          console.log(response);
          MessageBox.alert("业务错误：" + response.data.errmsg, "警告", {
            confirmButtonText: "确定",
            type: "error"
          });
        });
    },
    beforeUpload(file) {
      this.disabled = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.disabled = false;
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning"
        });
      }
      return isLt2M;
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制!最多上传1张图片!"
      });
    },
    handleUrl(response) {
      // this.goodsLabel.goodsLabelUrl = '123';
      this.goodsLabel.goodsLabelUrl = response.data.allfilePath;
    },
    handleCancel() {
      this.$router.push({ path: "/label/goodsLabel" });
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goodsLabel.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url;
        if (file.response === undefined) {
          url = file.url;
        } else {
          url = file.response.data.url;
        }

        if (this.goodsLabel.gallery[i] === url) {
          this.goodsLabel.gallery.splice(i, 1);
        }
      }
    }
  }
};
</script>
