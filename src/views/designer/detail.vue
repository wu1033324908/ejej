<template>
  <div v-loading="loadingDetail" class="app-container">
    <h3>查看详情</h3>
    <el-card class="box-card">
      <h4>设计师基本信息</h4>
      <div
        style="display:inline-block ; vertical-align: top; margin-right:100px; width:100px;  height : 100px"
      >

        <div style="width:100px ;height:100px ">
          <img :src="designerData.avatar" style="width:100px;height:100px;">
        </div>
        <el-upload
          ref="upLoadAvatar"
          :headers="headers"
          :action="uploadPath"
          :on-remove="handleRemove"
          :on-success="handleGalleryUrl"
          :limit="1"
          style="margin-top: 20px;margin-left: 8px; "
          class="upload-demo"
          multiple
        >
          <!-- <el-button size="small" type="primary">点击编辑</el-button> -->
        </el-upload>
        <!-- @click="upLoadAvatar" -->
        <!-- :auto-upload="false" -->
      </div>
      <table class="detailTable" style="display: inline-block">
        <tr>
          <th>姓名</th>
          <td>{{ designerData.nickname }}</td>
          <th>手机号码</th>
          <td>{{ designerData.mobile }}</td>
          <th>工作年限</th>
          <td>{{ designerData.workYear }}</td>
        </tr>
        <tr>
          <th>归属机构</th>
          <td>{{ designerData.departCode }}</td>
          <th>邮箱</th>
          <td>{{ designerData.email }}</td>
          <th>状态</th>
          <td>{{ designerData.status }}</td>
        </tr>
        <tr>
          <th>性别</th>
          <td>{{ designerData.gender== 0 ? "未知":designerData.gender==1 ?'男:' : designerData.gender==0 ? '女':'' }}</td>
          <th>出生日期</th>
          <td>{{ designerData.birthday }}</td>
          <th>注册时间</th>
          <td>{{ designerData.addTime }}</td>
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
            <td/>
            <td>{{ activity.forWordNumber }}</td>
            <td>{{ activity.likeNumber }}</td>
            <td>{{ activity.collectNumber }}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card>
      <h4 style="display:line-block">介绍信息</h4>
      <el-button type="primary" @click="dialogInfo=true">新增</el-button>
      <el-table :data="introduce" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"/>
        <el-table-column prop="introduceName" label="名称" width="180"/>
        <el-table-column prop="introduceContent" label="内容" width="180">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.serviceLabelUrl" style="width:50px" alt /> -->
            <el-popover placement="right" width="400" trigger="click">
              <div style="margin-left:50px">内容: {{ scope.row.introduceContent }}</div>
              <div style="margin-top:20px ;margin-left:50px">
                <img :src="scope.row.introduceUrl" style="width:100px ; height:100px" alt >
              </div>
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="operation" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="openLableDetail(scope.row)">编辑</el-button>
            <el-button type="danger" @click="introduceHandleforbid(scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>标签信息</h4>
      <el-button type="primary" @click="ServiceLableCreate()">新增</el-button>
      <el-table :data="ServiceLable" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"/>
        <el-table-column prop="serviceType" label="类型" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceType==0 ? "资质标签" : scope.row.serviceType==1 ? "属性标签" :scope.row.serviceType==2? "自定义标签" : scope.row.serviceType==3? "第三方认证" : '' }}</template>
        </el-table-column>
        <el-table-column prop="serviceLabelName" label="名称" width="180"/>
        <el-table-column prop="serviceLabelUrl" label="图片" width="180">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <img :src="scope.row.serviceLabelUrl" style="width:100px ;height:100px " alt >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="operation" width="180">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleforbid(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>案例信息</h4>
      <el-table :data="caseData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"/>
        <el-table-column prop="exampleSource" label="案例来源" width="180"/>
        <el-table-column prop="exampleName" label="案例名称"/>
        <el-table-column prop="exampleStyle" label="风格"/>
        <el-table-column prop="exampleModel" label="样式"/>
        <el-table-column prop="decorationBudget" label="装修预算"/>
        <el-table-column prop="area" label="面积"/>
        <el-table-column prop="designMoney" label="设计费用"/>
        <el-table-column prop="desc" label="设计说明">
          <template slot-scope="scope">{{ scope.row }}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleforbidCase(scope.row)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>服务订单列表</h4>
    </el-card>
    <!-- <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">添加</el-button>
    </div>-->
    <el-dialog :visible.sync="dialogInfoEdit" title="编辑介绍信息">
      <el-form :model="introduceEdit">
        <el-form-item label="介绍名称">
          <el-input v-model="introduceEdit.introduceName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="介绍内容">
          <el-input v-model="introduceEdit.introduceContent" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="图片">
          <img :src="introduceEdit.introduceUrl" style="width:100px;height:100px" alt >
          <el-upload
            ref="upLoadInfo"
            :headers="headers"
            :action="serviceUploadPath"
            :on-remove="handleRemove"
            :on-success="handleGalleryUrlInfo"
            :limit="1"
            class="upload-demo"
            multiple
          >
            <el-button size="small" style="margin-left:46px" type="primary">点击编辑</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoEdit = false">取 消</el-button>
        <el-button type="primary" @click="editLableDetail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogInfo" title="新增介绍信息">
      <el-form :model="InfoForm">
        <el-form-item label="介绍名称">
          <el-input v-model="InfoForm.introduce_name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="介绍内容">
          <el-input v-model="InfoForm.introduce_content" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="uploadInfo"
            :action="serviceUploadPath"
            :headers="headers"
            :limit="1"
            :on-success="handleGalleryUrlInfo"
            :on-remove="handleRemove"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo = false">取 消</el-button>
        <el-button type="primary" @click="addLableDetail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-loading="lableLoading" :visible.sync="dialogLable" title="新增关联标签">
      <el-input v-model="searchLable.serviceLabelName" style="width: 150px;" placeholder="请输入名称" />
      <el-select
        v-model="searchLable.serviceType"
        clearable
        style="width: 120px;"
        placeholder="请选择类型"
      >
        <el-option label="资质标签" value="0"/>
        <el-option label="属性标签" value="1"/>
        <el-option label="自定义标签" value="2"/>
        <el-option label="第三方认证" value="3"/>
      </el-select>
      <el-button type="primary" @click="ServiceLableCreate">搜索</el-button>
      <el-button type="primary" @click="createLableLoading = true">新增</el-button>
      <el-table :data="lableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"/>
        <el-table-column prop="serviceType" label="类型" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceType==0 ? "资质标签" : scope.row.serviceType==1 ? "属性标签" :scope.row.serviceType==2? "自定义标签" : scope.row.serviceType==3? "第三方认证" : '' }}</template>
        </el-table-column>
        <el-table-column prop="serviceLabelName" label="名称"/>
        <el-table-column prop="serviceLabelUrl" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.serviceLabelUrl" style=" width:100px;height:100px" alt >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="addRelevanceLabel(scope.row)">选择</el-button>
            <!-- <el-button type="danger" @click="deleteLabel(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLable = false">取 消</el-button>
        <el-button type="primary" @click="addUserLabel">确 定</el-button>
      </div>

      <el-dialog :visible.sync="createLableLoading" width="30%" title="新增一个关联标签" append-to-body>
        <el-form ref="serviceLabel" :rules="rules" :model="serviceNewLabel" label-width="120px">
          <el-form-item label="服务商标签序号" prop="id">
            <el-input v-model="serviceNewLabel.id" />
          </el-form-item>
          <el-form-item label="服务商标签编号" prop="serviceLabelCode">
            <el-input v-model="serviceNewLabel.serviceLabelCode" />
          </el-form-item>
          <el-form-item label="服务商标签名称" prop="serviceLabelName">
            <el-input v-model="serviceNewLabel.serviceLabelName" />
          </el-form-item>
          <el-form-item label="标签类型">
            <el-select v-model="serviceNewLabel.serviceType" placeholder="标签类型">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="适用服务商">
            <el-select v-model="serviceNewLabel.serviceSource" placeholder="适用服务商">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="serviceNewLabel.desc" />
          </el-form-item>
          <el-form-item label="服务商标签图片">
            <el-upload
              :action="serviceUploadPath"
              :headers="headers"
              :limit="1"
              :on-exceed="uploadOverrun"
              :on-success="handleGalleryUrlLable"
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
        <div slot="footer" class="dialog-footer">
          <el-button @click="createLableLoading = false">取 消</el-button>
          <el-button type="primary" @click="addLabel">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
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
import { userDetail, uploadPath } from '@/api/user'
import { getCaseList } from '@/api/case'
import {
  getServiceLable,
  // addServiceLable,
  // forbidGoodsLabel,
  detailServiceLable,
  addServiceUserLable,
  getOneServiceUserLable,
  deleteServiceUserLable,
  serviceUploadPath,
  addOneServiceUserLable,
  // introduceUploadPath,
  updataDetailServiceLable
  // delDetailServiceLable
} from '@/api/label'
// import { departList } from '@/api/depart'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      designerId: '',
      uploadPath,
      serviceUploadPath,
      dialogLable: false,
      searchLable: {},
      lableData: [],
      lableLoading: true,
      selectLable: [],
      // designerData: { picUrl: '', gallery: [] },
      designerData: {},
      activity: {},
      ServiceLable: [],
      introduce: [],
      departOptions: [],
      caseData: [],
      userCode: '',
      InfoForm: {},
      introduceEdit: {},
      loadingDetail: true,
      dialogInfo: false,
      createLableLoading: false,
      serviceNewLabel: {},
      dialogInfoEdit: false,
      typeoptions: [
        // { value: "", label: "" },
        { value: '0', label: '资质标签' },
        { value: '1', label: '属性标签' },
        { value: '2', label: '自定义标签' },
        { value: '3', label: '第三方认证' }
      ],
      rules: {
        nickname: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        housingname: [
          { required: true, message: '案例名称不能为空', trigger: 'blur' }
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
      this.getUserDetail()
      this.getLableList()
    },

    // 获取标签列表
    getLableList() {
      // 获取标签列表
      // {
      //   serviceCode: this.designerData.departCode
      // }
      getOneServiceUserLable({ serviceCode: this.designerData.serviceCode })
        .then(response => {
          // console.log(123)
          // console.log(response);
          // this.ServiceLable = response.data.data;
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 获取设计师详情
    getUserDetail() {
      userDetail({ id: this.designerId })
        .then(response => {
          console.log(response)
          this.designerData = response.data.data.user
          // console.log(this.designerData);
          this.activity = response.data.data.activity
          this.ServiceLable = response.data.data.ServiceLabel
          this.introduce = response.data.data.introduce
          // console.log(this.ServiceLable);
          this.loadingDetail = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 获取案例列表
    getCaseList() {
      getCaseList({})
        .then(response => {
          console.log(Response)
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 选择与服务商相关的标签
    addRelevanceLabel(row) {
      const labelData = {
        serviceCode: this.designerData.serviceCode,
        serviceLabelCode: row.serviceLabelCode,
        serviceType: row.serviceType,
        serviceSource: '0'
      }

      addOneServiceUserLable(labelData)
        .then(response => {
          console.log(response)
          // this.getLableList();
          this.getUserDetail()
          this.dialogLable = false
          this.$message({
            type: 'success',
            message: '关联成功'
          })
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 打开编辑标签详情
    openLableDetail(row) {
      this.dialogInfoEdit = true
      console.log(row)
      this.introduceEdit = row
    },
    // 更新标签详情
    editLableDetail() {
      const InfoData = {}
      InfoData.introduce_name = this.introduceEdit.introduceName
      InfoData.introduce_content = this.introduceEdit.introduceContent
      InfoData.introduce_url = this.InfoForm.introduce_url
      InfoData.service_source = 0
      InfoData.service_code = this.designerData.serviceCode
      updataDetailServiceLable(InfoData)
        .then(response => {
          this.dialogInfoEdit = false
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 禁用标签详情
    introduceHandleforbid() {},
    // 新增标签详情
    addLableDetail() {
      this.dialogInfo = true
      const InfoData = this.InfoForm
      InfoData.service_source = 0
      InfoData.service_code = this.designerData.serviceCode
      // service_type: 0
      detailServiceLable(InfoData)
        .then(response => {
          this.dialogInfo = false
          this.InfoForm = {}
          this.$refs.uploadInfo.clearFiles()
          this.getUserDetail()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增标签
    ServiceLableCreate() {
      this.dialogLable = true
      // 查询服务商的标签列表
      const searchLableData = this.searchLable
      searchLableData.serviceSource = '0'
      searchLableData.id = this.$route.query.id
      getServiceLable(searchLableData)
        .then(response => {
          console.log(response)
          this.lableData = response.data.data
          this.lableLoading = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })

      // this.$router.push({
      //   path: "/label/createServiceLabel",
      //   query: { id: this.designerData.id }
      // });
      // addServiceLable()
      // .then(response =>{
      //   console.log(response)
      // })
      // .catch(errmsg=>{
      //   console.log(errmsg)
      // })
    },
    // 选择新增标签
    addLabel() {
      this.createLableLoading = true
      const newLableData = this.serviceNewLabel
      newLableData.serviceSource = '0'
      newLableData.serviceCode = this.designerData.serviceCode
      // {
      //   serviceLabelCode: row.serviceLabelCode,
      //   serviceCode: this.designerData.departCode,
      //   serviceLabelName: row.serviceLabelName,
      //   serviceType: row.serviceType,
      //   serviceSource: row.serviceSource,
      //   serviceLabelUrl: row.serviceLabelUrl
      // };
      // console.log(this.designerData);
      addServiceUserLable(newLableData)
        .then(response => {
          console.log(response)
          console.log(11223)
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.createLableLoading = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 新增标签
    addUserLabel() {
      this.dialogLable = false
    },
    // 删除
    handleforbid(row) {
      // console.log(this.designerData.departCode);
      deleteServiceUserLable({
        serviceCode: this.designerData.serviceCode,
        serviceLabelCode: row.serviceLabelCode
        // deleted:"0"
      })
        .then(response => {
          // console.log(123);
          // console.log(response);
          this.getUserDetail()
          // console.log(this.ServiceLable)
        })
        .catch(errmsg => {
          // console.log(errmsg);
          // console.log(1234444);
        })
    },
    upLoadAvatar() {
      this.$refs.upLoadAvatar.submit()
      this.getUserDetail()
    },
    handleCancel: function() {
      this.$router.push({ path: '/case/create' })
    },
    uploadPicUrl: function(response) {
      this.designerData.picUrl = response.data.url
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
    // 信息图片上传成功的钩子
    handleGalleryUrlInfo(response) {
      this.InfoForm.introduce_url = response.data.allfilePath
    },
    handleGalleryUrl(response, file, fileList) {
      console.log(response)
      this.designerData.avatar = response.data.allfilePath
      // if (response.errno === 0) {
      //   this.designerData.gallery.push(response.data.url);
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
    //   this.designerData.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    handleGalleryUrlLable(response, file, fileList) {
      console.log(fileList)
      console.log(file)
      // this.designerData.url_list.push({
      //   fileName: this.fileName,
      //   sortOrder: this.sort,
      this.serviceNewLabel.serviceLabelUrl = response.data.allfilePath
      // fileUrl: response.data.allfilePath
      // });
      console.log(this.designerData)
      // if (response.errno === 0) {
      //   this.designerData.gallery.push(response.data.url);
      // }
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
    handleRemove(file, fileList) {
      for (var i = 0; i < this.designerData.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        console.log(file)
        console.log(fileList)
        // this.designerData.url_list.
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.designerData.gallery[i] === url) {
          this.designerData.gallery.splice(i, 1)
        }
      }
    }
  }
}
</script>
