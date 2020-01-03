<template>
  <div v-loading="loadingDetail" class="app-container">
    <h3>查看详情</h3>
    <el-card class="box-card">
      <h4>商品基本信息</h4>
      <div>
        <!-- style="display:inline-block ; vertical-align: top; margin-right:100px; width:100px;  height : 100px" -->
        <!-- <div style="width:100px ;height:100px ">
          <img style="width:100px ;height:100px " :src="goodsData.picUrl" />
        </div>-->
        <!-- <el-upload
          style="margin-top: 20px;margin-left: 5px; "
          ref="upLoadAvatar"
          class="upload-demo"
          :headers="headers"
          :action="uploadPath"
          :on-remove="handleRemove"
          :on-success="handleGalleryUrl"
          multiple
          :limit="1"
        >-->
        <el-upload
          ref="upLoadAvatar"
          :headers="headers"
          :action="uploadPath"
          :on-success="handleGalleryUrl"
          style="margin-top: 20px;margin-left: 5px; "
          class="avatar-uploader"
          accept=".jpg, .jpeg, .png, .gif"
        >
          <img v-if="goodsData.picUrl" :src="goodsData.picUrl" class="avatar" >
        </el-upload>
      </div>
      <table class="detailTable" style="display: inline-block">
        <tr>
          <th>商品编号</th>
          <td>{{ goodsData.goodsSn }}</td>
          <th>一级分类</th>
          <td>{{ categoryIds.name1 }}</td>
          <th>子商品数量</th>
          <td>{{ amount }}</td>
          <th>销售数</th>
          <!-- 暂留 -->
          <td>{{ goodsData.salesVolume == '' ? '暂无' : goodsData.salesVolume }}</td>
        </tr>
        <tr>
          <th>商品名称</th>
          <td>{{ goodsData.name }}</td>
          <th>二级分类</th>
          <td>{{ categoryIds.name2 }}</td>
          <th>总库存数量</th>
          <td>{{ goodsData.commodityStocks }}</td>
          <th>状态</th>
          <td>{{ goodsData.isOnSale == "0" ? '未上架' : goodsData.isOnSale == "1" ? '已上架' : '' }}</td>
        </tr>
        <tr>
          <th>市场价</th>
          <td>{{ goodsData.retailPrice }}</td>
          <th>三级分类</th>
          <td>{{ categoryIds.name2 }}</td>
          <th>剩余库存数</th>
          <td>{{ total }}</td>
          <th>创建日期</th>
          <td>{{ goodsData.addTime }}</td>
        </tr>
      </table>
    </el-card>
    <!-- 子商品信息 -->
    <el-card>
      <h4 style="display:line-block">子商品信息</h4>
      <!-- <el-button type="primary" @click="dialogProduct=true">新增子商品</el-button> -->
      <el-table :data="products1" type="index" style="width: 100%">
        <el-table-column prop="id" label="序号" width="80">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="goods.productName" label="名称" width="180"/>
        <!-- <el-table-column prop="goods.goodsSn" label="编号" width="180"></el-table-column> -->
        <el-table-column prop="goods.specifications" label="SKU" width="200">
          <template slot-scope="scope">
            <el-tag v-for="(tag,index) in scope.row.goods.specifications " :key="index">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="goods" label="图片" width="100">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.goodsLabelUrl" style="width:50px" alt /> -->
            <el-popover placement="right" width="240" trigger="click">
              <div style="margin-top:20px ;margin-left:50px">
                <img :src="scope.row.goods.url" width="100" alt >
              </div>
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="goods.costPrice" label="成本价" width="180"/>
        <el-table-column prop="goods.price" label="销售价" width="180"/>
        <el-table-column prop="goods.number" label="库存数量" width="180"/>
        <el-table-column prop="goods.deleted" label="状态" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.goods.isOnSale=="0" ? '未上架' : scope.row.goods.isOnSale=="1" ? '已上架' : '' }}</template>
        </el-table-column>
        <el-table-column prop="brand.name" label="关联供应商" width="180"/>
        <el-table-column prop="brand.address" label="发货地" width="180"/>
        <el-table-column label="操作" align="operation" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="productDetail(scope.row)">编辑</el-button>
            <el-button
              v-show="scope.row.goods.isOnSale=='1'"
              type="danger"
              @click="updateState(scope.row)"
            >下架</el-button>
            <el-button
              v-show="scope.row.goods.isOnSale=='0'"
              type="success"
              @click="updateState(scope.row)"
            >上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- <el-dialog title="新增子商品信息" :visible.sync="dialogProduct">
      <el-form :model="productForm">
        <el-form-item label="子商品名称">
          <el-input v-model="productForm.introduce_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="SKU名称">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售价">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联供应商">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发货地">
          <el-input v-model="productForm.introduce_content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            ref="uploadInfo"
            :action="uploadPath"
            :headers="headers"
            :limit="1"
            :on-success="handleGalleryUrlProduct"
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
        <el-button @click="dialogProduct = false">取 消</el-button>
        <el-button type="primary" @click="addProduct">确 定</el-button>
      </div>
    </el-dialog>-->
    <el-dialog :visible.sync="dialogProduct" title="编辑子商品信息">
      <el-form
        ref="productForm"
        :model="productForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item label="货品规格列" prop="specifications">
          <el-row :gutter="20" type="flex" align="middle" style="padding:20px 0;">
            <el-col :span="10">
              <el-radio-group v-model="multipleSpec" @change="specChanged">
                <el-radio-button :label="false">默认标准规格</el-radio-button>
                <el-radio-button :label="true">多规格支持</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col v-if="multipleSpec" :span="10">
              <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
            </el-col>
          </el-row>
          <el-table :data="specifications">
            <el-table-column property="specification" label="规格名" />
            <el-table-column property="value" label="规格值">
              <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.value }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column property="picUrl" label="规格图片">
              <template slot-scope="scope">
                <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="40" />
              </template>
            </el-table-column>
            <el-table-column
              v-if="multipleSpec"
              align="center"
              label="操作"
              width="250"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleSpecificationDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>-->
        <el-form-item label="子商品名称" prop="productName">
          <el-input v-model="productForm.productName" />
        </el-form-item>
        <el-form-item label="成本价" prop="costPrice">
          <el-input v-model="productForm.costPrice" />
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="productForm.price" />
        </el-form-item>
        <el-form-item label="库存数数量" prop="number">
          <el-input v-model="productForm.number" />
        </el-form-item>
        <el-form-item label="货品重量" prop="weight">
          <el-input v-model="productForm.weight" />
        </el-form-item>
        <el-form-item label="供应商" prop="brandId">
          <el-select v-model="productForm.brandId">
            <el-option
              v-for="item in brandList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="货品图片" prop="url">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadProductUrl"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="productForm.url" :src="productForm.url" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogProduct = false">取消</el-button>
        <el-button type="primary" @click="productEdit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="specVisiable" title="设置规格">
      <el-form
        ref="specForm"
        :rules="rules"
        :model="specForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="规格名" prop="specification">
          <el-input v-model="specForm.specification" />
        </el-form-item>
        <el-form-item label="规格值" prop="value">
          <el-input v-model="specForm.value" />
        </el-form-item>
        <el-form-item label="规格图片" prop="picUrl">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadSpecPicUrl"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png, .gif"
          >
            <img v-if="specForm.picUrl" :src="specForm.picUrl" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specVisiable = false">取消</el-button>
        <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
      </div>
    </el-dialog>
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
            <td>{{ goodsData.grade }}</td>
            <td>{{ goodsData.forwordNumber }}</td>
            <td>{{ goodsData.likeNumber }}</td>
            <td>{{ goodsData.collectNumber }}</td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <el-card>
      <h4>介绍/规格信息</h4>
      <!-- <el-button type="primary" @click="handleIntroInfo()">新增</el-button> -->
      <el-table :data="specifications" style="width: 100%">
        <el-table-column label="序号" width="100">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="value" label="类型" width="180"/>
        <el-table-column prop="specification" label="名称" width="180">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.specification }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="picUrl" label="内容" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width:100px ;height:100px " alt >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h4>标签信息</h4>
      <el-button type="primary" @click="addGoodsLabelFn()">新增标签</el-button>
      <el-table :data="goodsLable" style="width: 100%">
        <el-table-column label="序号" width="100">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <!-- <el-table-column prop="serviceType" label="类型" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceType==0 ? "资质标签" : scope.row.serviceType==1 ? "属性标签" :scope.row.serviceType==2? "自定义标签" : scope.row.serviceType==3? "第三方认证" : ''  }}</template>
        </el-table-column>-->
        <el-table-column prop="goodsLabelName" label="名称" width="180"/>
        <el-table-column prop="goodsLabelUrl" label="图片" width="180">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <img :src="scope.row.goodsLabelUrl" style="width:100px ;height:100px " alt >
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
      <h4>条件信息</h4>
      <el-table :data="condition" style="width: 100%">
        <el-table-column type="index" width="180"/>
        <el-table-column prop="conditionType" label="类型" width="180">
          <template slot-scope="scope">
            {{ scope.row.conditionType =='0' ? '邮费' : scope.row.conditionType=='1' ?
              '退款' : scope.row.conditionType=='2' ? '卡券优惠' : scope.row.conditionType=='3' ?
            '售后期限' : '' }}
          </template>
        </el-table-column>
        <el-table-column :formatter="setRule" prop="conditionState" label="规则"/>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleforbidCondition(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑条件 -->
    <el-dialog :title="dialogConditionTitle" :visible.sync="dialogCondition">
      <el-form :model="conditionData">
        <el-form-item label="条件名称">
          <!-- <el-input v-model="conditionData.introduceName" autocomplete="off"></el-input> -->
          <span v-show="conditionDataType==0">邮费</span>
          <span v-show="conditionDataType==1">退款</span>
          <span v-show="conditionDataType==2">优惠</span>
          <span v-show="conditionDataType==3">售后期限</span>
        </el-form-item>
        <!-- 邮费 -->
        <el-form-item v-show="conditionDataType==0" label>
          <!-- <el-input v-model="conditionData.conditionState" autocomplete="off"></el-input> -->
          <el-radio-group
            v-model="conditionData.condition_state"
            class="postage"
            style="width:900px"
            @change="postageChange"
          >
            <div class="postageBox">
              <el-radio label="0">包邮</el-radio>
            </div>
            <div class="postageBox">
              <el-radio label="1">一口价</el-radio>
              <el-input
                :disabled="postageState!=1"
                v-model="conditionData.content.postage"
                style="display:inline-block ;width:180px "
                autocomplete="off"
              />
              <span>元/公里</span>
            </div>
            <div class="postageBox">
              <el-radio label="2">可变价</el-radio>
            </div>
          </el-radio-group>
          <div
            style="display:inline-block vertical-align:top ; margin-top: -28px;margin-left: 80px; "
          >
            <span>首重</span>&nbsp;&nbsp;&nbsp;
            <el-input
              :disabled="postageState!=2"
              v-model="conditionData.content.basic_weight	"
              class="postageInput"
              placeholder="请输入重量"
            />
            <span>千克</span>&nbsp;
            <span>路程</span>&nbsp;&nbsp;&nbsp;
            <el-input
              :disabled="postageState!=2"
              v-model="conditionData.content.mileage"
              class="postageInput"
              placeholder="请输入公里数"
            />
            <span>KM</span>&nbsp;
            <span>邮费</span>&nbsp;&nbsp;&nbsp;
            <el-input
              :disabled="postageState!=2"
              v-model="conditionData.content.postage"
              class="postageInput"
              placeholder="请输入金额"
            />
            <span>元</span>&nbsp;
            <br >
            <br >
            <span>超过每千克数加收</span>&nbsp;
            <el-input
              :disabled="postageState!=2"
              v-model="conditionData.content.weight_unit"
              class="postageInput"
              placeholder="请输入金额"
            />&nbsp;
            <span>元</span>&nbsp;
            <span>超过每公里加收</span>&nbsp;
            <el-input
              :disabled="postageState!=2"
              v-model="conditionData.content.mileage_unit"
              class="postageInput"
              placeholder="请输入金额"
            />&nbsp;
            <span>元</span>&nbsp;
          </div>
        </el-form-item>
        <!-- 退款 -->
        <el-form-item v-show="conditionDataType==1">
          <el-radio-group
            v-model="conditionData.conditionState"
            class="postage"
            style="width:900px"
            @change="postageChange"
          >
            <div class="postageBox">
              <el-radio label="0">不支持退款</el-radio>
            </div>
            <div class="postageBox">
              <el-radio label="1">支持</el-radio>
            </div>
          </el-radio-group>
          <div style="margin-top:-28px ; margin-left:70px" >
            <span>签收后</span>
            <el-input
              :disabled="postageState!=1"
              v-model="conditionData.content.refund_day"
              style="display:inline-block ;width:180px "
              autocomplete="off"
              placeholder="请输入天数"
            />
            <span>天,全额退款;超过后仅退还</span>
            <el-input :disabled="postageState!=1" v-model="conditionData.content.refund_ratio" style="display:inline-block ;width:180px " placeholder="请输入比例"/>
            <span>付款金额</span>
          </div>
        </el-form-item>
        <!-- 优惠 -->
        <el-form-item v-show="conditionDataType==2">
          <el-radio-group
            v-model="conditionData.conditionState"
            class="postage"
            style="width:900px"
            @change="postageChange"
          >
            <div class="postageBox">
              <el-radio label="0">不支使用卡券</el-radio>
            </div>
            <div class="postageBox">
              <el-radio label="1">支持使用卡劵</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
        <!-- 售后 -->
        <el-form-item v-show="conditionDataType==3">
          <el-radio-group
            v-model="conditionData.conditionState"
            class="postage"
            style="width:900px"
            @change="postageChange"
          >
            <div class="postageBox">
              <el-radio label="0">不支持售后</el-radio>
            </div>
            <div class="postageBox">
              <el-radio label="1">支持</el-radio>
            </div>
          </el-radio-group>
          <div style="margin-top:-28px ; margin-left:70px" >
            <span>收货后</span>
            <el-input
              :disabled="postageState!=1"
              v-model="conditionData.content.after_day"
              style="display:inline-block ;width:180px "
              autocomplete="off"
              placeholder="请输入天数"
            />
            <span>天</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCondition = false">取 消</el-button>
        <el-button type="primary" @click="editCondition">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="编辑介绍信息" :visible.sync="dialogInfoEdit">
      <el-form :model="introduceEdit">
        <el-form-item label="介绍名称">
          <el-input v-model="introduceEdit.introduceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍内容">
          <el-input v-model="introduceEdit.introduceContent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <img style="width:100px;height:100px" :src="introduceEdit.introduceUrl" alt />
          <el-upload
            ref="upLoadInfo"
            class="upload-demo"
            :headers="headers"
            :action="uploadPath"
            :on-remove="handleRemove"
            :on-success="handleGalleryUrlInfo"
            multiple
            :limit="1"
          >
            <el-button size="small" style="margin-left:46px" type="primary">点击编辑</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoEdit = false">取 消</el-button>
        <el-button type="primary" @click="editLableDetail">确 定</el-button>
      </div>
    </el-dialog> -->

    <el-dialog v-loading="lableLoading" :visible.sync="dialogLable" title="新增关联标签">
      <el-input v-model="searchLable.goodsLabelName" style="width: 150px;" placeholder="请输入名称" />
      <!-- <el-select
        v-model="searchLable.serviceType"
        clearable
        style="width: 120px;"
        placeholder="请选择类型"
      >
        <el-option label="资质标签" value="0"></el-option>
        <el-option label="属性标签" value="1"></el-option>
        <el-option label="自定义标签" value="2"></el-option>
        <el-option label="第三方认证" value="3"></el-option>
      </el-select>-->
      <el-button type="primary" @click="addGoodsLabelFn">搜索</el-button>
      <el-button type="primary" @click="createGoodsLabel">新增</el-button>
      <el-table :data="lableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="100"/>
        <!-- <el-table-column prop="serviceType" label="类型" width="180">
          <template
            slot-scope="scope"
          >{{ scope.row.serviceType==0 ? "资质标签" : scope.row.serviceType==1 ? "属性标签" :scope.row.serviceType==2? "自定义标签" : scope.row.serviceType==3? "第三方认证" : '' }}</template>
        </el-table-column>-->
        <el-table-column prop="goodsLabelName" width="180" label="名称"/>
        <el-table-column prop="goodsLabelUrl" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.goodsLabelUrl" style=" width:100px;height:100px" alt >
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
        <el-form ref="goodsLabel" :rules="rules" :model="goodsNewLabel" label-width="120px">
          <!-- <el-form-item label="商品标签序号" prop="id">
            <el-input v-model="goodsNewLabel.id" />
          </el-form-item>
          <el-form-item label="商品标签编号" prop="goodsLabelCode">
            <el-input v-model="goodsNewLabel.goodsLabelCode" />
          </el-form-item> -->
          <el-form-item label="商品标签名称" prop="goodsLabelName">
            <el-input v-model="goodsNewLabel.goodsLabelName" />
          </el-form-item>
          <!-- <el-form-item label="标签类型">
            <el-select v-model="goodsNewLabel.serviceType" placeholder="标签类型">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>-->
          <!-- <el-form-item label="适用商品">
            <el-select v-model="goodsNewLabel.serviceSource" placeholder="适用商品">
              <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="goodsNewLabel.desc" />
          </el-form-item>
          <el-form-item label="商品标签图片">
            <el-upload
              :action="uploadPath"
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
.postage .postageBox {
  display: block;
  margin-top: 30px;
}
.postageInput {
  display: inline-block;
  width: 180px;
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
import {
  detailGoods,
  uploadPath,
  updateGoodsProduct,
  listCatAndBrand,
  editGoodsCondition
} from '@/api/goods'
import {
  getGoodsLableList,
  deletedOneGoodsLabel,
  addGoodsLabel,
  addOneGoodsLabel
} from '@/api/label'
import { getCaseList } from '@/api/case'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      goods_sn: '',
      goodsData: {},
      categoryIds: {},
      products1: [],
      products: [],
      // specifications: [],
      goodsLable: [],
      total: '',
      amount: '',
      productId: 0,
      specVisiable: false,
      productVisiable: false,
      brandList: [],
      dialogCondition: false,
      conditionData: {
        content: {
          postage: ''
        }
      },
      postageState: '',
      conditionDataType: '', // condition_type 条件类型,（0：邮费1：退款2：卡券优惠3：售后期限）
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      specForm: { picUrl: '' },
      multipleSpec: false,
      uploadPath,
      dialogProduct: false,
      dialogLable: false,
      searchLable: {},
      lableData: [],
      lableLoading: true,
      selectLable: [],
      // goodsData: { picUrl: '', gallery: [] },
      activity: {},
      ServiceLable: [],
      introduce: [],
      departOptions: [],
      caseData: [],
      userCode: '',
      productForm: {
        id: 0,
        specifications: [],
        cost_price: 0.0,
        price: 0.0,
        number: 0,
        weight: 0,
        url: '',
        brandId: ''
      },
      introduceEdit: {},
      loadingDetail: true,
      dialogInfo: false,
      createLableLoading: false,
      goodsNewLabel: {},
      dialogInfoEdit: false,
      typeoptions: [
        // { value: "", label: "" },
        { value: '0', label: '资质标签' },
        { value: '1', label: '属性标签' },
        { value: '2', label: '自定义标签' },
        { value: '3', label: '第三方认证' }
      ],
      condition: [],
      dialogConditionTitle: '',
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
      this.goods_sn = this.$route.query.id
      this.total = this.$route.query.total
      this.amount = this.$route.query.amount
      this.getGoodsDetail()
      listCatAndBrand().then(response => {
        // console.log(response)
        // this.categoryList = response.data.data.categoryList;
        this.brandList = response.data.data.brandList
      })
      //   this.getLableList();
    },
    // 获取商品详情
    getGoodsDetail() {
      detailGoods({ goods_sn: this.$route.query.id })
        .then(response => {
          console.log(response)
          this.goodsData = response.data.data.goods
          this.categoryIds = response.data.data.categoryIds
          this.products1 = response.data.data.products
          this.specifications = response.data.data.specifications
          this.goodsLable = response.data.data.label
          this.condition = response.data.data.condition
          this.loadingDetail = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })
    },
    // 编辑子商品
    productDetail(row) {
      // console.log(row);
      //  console.log(this.products1)
      this.productForm = this.products1.filter(item => {
        // eslint-disable-next-line eqeqeq
        return item.goods.id == row.goods.id
      })[0].goods
      // console.log(this.productForm)
      this.dialogProduct = true
    },
    // 更新子商品的方法
    productEdit() {
      updateGoodsProduct(this.productForm)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '更新成功'
          })
          this.getGoodsDetail(0)
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
      this.dialogProduct = false
    },
    // 新增商品标签
    createGoodsLabel() {
      this.createLableLoading = true
      this.goodsNewLabel = {}
    },
    // 编辑条件
    editCondition() {
      console.log()
      const sendData = this.conditionData
      sendData.condition_type = this.conditionDataType.toString()
      sendData.goods_id = this.$route.query.id

      editGoodsCondition(sendData)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '更新成功'
          })
          this.getGoodsDetail(0)
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    // 商品条件的规则显示
    setRule(row, column) {
      switch (row.conditionType) {
        case 0:
          if (row[column.property] === 0 || row[column.property] === '0') {
            return '包邮'
          } else if (row[column.property] === 1 || row[column.property] === '1') {
            return '一口价'
          } else if (row[column.property] === 2 || row[column.property] === '2') {
            return '分阶段邮费'
          }
          // eslint-disable-next-line no-fallthrough
        case 1:
          if (row[column.property] === 0 || row[column.property] === '0') {
            return '不允许退款'
          } else if (row[column.property] === 1 || row[column.property] === '1') {
            return '允许退款'
          }
          break
        case 2:
          if (row[column.property] === 0 || row[column.property] === '0') {
            return '不允许使用卡劵'
          } else if (row[column.property] === 1 || row[column.property] === '1') {
            return '允许使用卡劵'
          }
          break
        case 3:
          if (row[column.property] === 0 || row[column.property] === '0') {
            return '无售后'
          } else if (row[column.property] === 1 || row[column.property] === '1') {
            return '有售后'
          }
          break
      }
      // console.log(row)
    },
    // 编辑条件信息
    handleforbidCondition(row) {
      this.conditionDataType = row.conditionType
      this.dialogConditionTitle = '编辑条件'
      switch (row.conditionType) {
        case 0:
          this.dialogCondition = true
          break
        case 1:
          this.dialogCondition = true
          break
        case 2:
          this.dialogCondition = true
          break
        case 3:
          this.dialogCondition = true
          break
      }
    },
    // 选择邮费状态改变时
    postageChange(data) {
      this.postageState = data
    },
    // sku相关
    specChanged(label) {
      if (label === false) {
        this.specifications = [
          { specification: '规格', value: '标准', picUrl: '' }
        ]
        this.products = [
          {
            id: 0,
            specifications: ['标准'],
            price: 0.0,
            weight: 0,
            number: 0,
            url: ''
          }
        ]
      } else {
        this.specifications = []
        this.products = []
      }
    },
    uploadProductUrl(response) {
      this.productForm.url = response.data.allfilePath
    },

    handleProductEdit() {
      for (var i = 0; i < this.products.length; i++) {
        const v = this.products[i]
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm)
          break
        }
      }
      const addGoodsProductData = this.productForm
      addGoodsProductData.specifications = JSON.stringify(this.specifications)
      this.productVisiable = false
    },
    handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.allfilePath
    },
    handleSpecificationAdd() {
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.specification === this.specForm.specification) {
          if (v.value === this.specForm.value) {
            this.$message({
              type: 'warning',
              message: '已经存在规格值:' + v.value
            })
            this.specForm = {}
            this.specVisiable = false
            return
          } else {
            index = i
          }
        }
      }

      this.specifications.splice(index + 1, 0, this.specForm)
      this.specVisiable = false

      this.specToProduct()
    },
    handleSpecificationDelete(row) {
      const index = this.specifications.indexOf(row)
      this.specifications.splice(index, 1)
      this.specToProduct()
    },
    specToProduct() {
      if (this.specifications.length === 0) {
        return
      }
      // 根据specifications创建临时规格列表
      var specValues = []
      var spec = this.specifications[0].specification
      var values = []
      values.push(0)

      for (var i = 1; i < this.specifications.length; i++) {
        const aspec = this.specifications[i].specification

        if (aspec === spec) {
          values.push(i)
        } else {
          specValues.push(values)
          spec = aspec
          values = []
          values.push(i)
        }
      }
      specValues.push(values)

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0
      var products = []
      var combination = []
      var n = specValues.length
      for (var s = 0; s < n; s++) {
        combination[s] = 0
      }
      var index = 0
      var isContinue = false
      do {
        var specifications = []
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]]
          specifications.push(this.specifications[z].value)
        }
        products[productsIndex] = {
          id: productsIndex,
          specifications: specifications,
          price: 0.0,
          weight: 0,
          number: 0,
          url: ''
        }
        productsIndex++

        index++
        combination[n - 1] = index
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0
            index = 0
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1
            }
          }
        }
        isContinue = false
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true
          }
        }
      } while (isContinue)

      this.products = products
    },
    handleGalleryUrl(response) {
      this.goodsData.picUrl = response.data.allfilePath
      //  editGoods(this.goodsData)
      //   .then(response => {
      //     this.$notify.success({
      //       title: "成功",
      //       message: "创建成功"
      //     });
      //     this.$router.push({ path: "/goods/list" });
      //   })
      //   .catch(response => {
      //     MessageBox.alert("业务错误：" + response.data.errmsg, "警告", {
      //       confirmButtonText: "确定",
      //       type: "error"
      //     });
      //   });
      console.log(this.goodsData)
    },
    handleGalleryUrlInfo() {},
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
    // 选择与商品相关的标签
    addRelevanceLabel(row) {
      const labelData = {
        goodsCode: this.goodsData.goodsSn,
        goodsLabelCode: row.goodsLabelCode
      }

      addOneGoodsLabel(labelData)
        .then(response => {
          console.log(response)
          // this.getLableList();
          this.getGoodsDetail()
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
    // 打开编辑子商品详情

    // 更新标签详情
    // editLableDetail() {
    //   const InfoData = {}
    //   InfoData.introduce_name = this.introduceEdit.introduceName
    //   InfoData.introduce_content = this.introduceEdit.introduceContent
    //   InfoData.introduce_url = this.productForm.introduce_url
    //   InfoData.service_source = 0
    //   InfoData.service_code = this.goodsData.serviceCode
    //   updataDetailServiceLable(InfoData)
    //     .then(response => {
    //       this.dialogInfoEdit = false
    //       console.log(response)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // 上架下架
    updateState(row) {
      const data = {
        id: row.goods.id,
        isOnSale: ''
      }
      console.log(row.goods.id)
      if (row.goods.isOnSale === 0 || row.goods.isOnSale === '0') {
        data.isOnSale = 1
      } else {
        data.isOnSale = 0
      }
      updateGoodsProduct(data)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '更新成功'
          })
          console.log(response)
          this.getGoodsDetail()
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },

    // 新增标签详情
    // addLableDetail() {
    //   this.dialogInfo = true
    //   const InfoData = this.productForm
    //   InfoData.service_source = 0
    //   InfoData.service_code = this.goodsData.serviceCode
    //   // service_type: 0
    //   detailServiceLable(InfoData)
    //     .then(response => {
    //       this.dialogInfo = false
    //       this.productForm = {}
    //       this.$refs.uploadInfo.clearFiles()
    //       this.getUserDetail()
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // 新增标签
    addGoodsLabelFn() {
      this.dialogLable = true
      // 查询商品的标签列表
      const searchLableData = this.searchLable
      // searchLableData.serviceSource = "0";
      searchLableData.id = this.$route.query.gId
      getGoodsLableList(searchLableData)
        .then(response => {
          console.log(response)
          this.lableData = response.data.data.data
          this.lableLoading = false
        })
        .catch(errmsg => {
          console.log(errmsg)
        })

      // this.$router.push({
      //   path: "/label/createServiceLabel",
      //   query: { id: this.goodsData.id }
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
      const newLableData = this.goodsNewLabel
      newLableData.goodsCode = this.goodsData.goodsSn
      // {
      //   goodsLabelCode: row.goodsLabelCode,
      //   serviceCode: this.goodsData.departCode,
      //   goodsLabelName: row.goodsLabelName,
      //   serviceType: row.serviceType,
      //   serviceSource: row.serviceSource,
      //   goodsLabelUrl: row.goodsLabelUrl
      // };
      // console.log(this.goodsData);
      addGoodsLabel(newLableData)
        .then(response => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.createLableLoading = false
          const searchLableData = this.searchLable
          // searchLableData.serviceSource = "0";
          searchLableData.id = this.$route.query.gId
          getGoodsLableList(searchLableData)
            .then(response => {
              console.log(response)
              this.lableData = response.data.data
              this.lableLoading = false
            })
            .catch(errmsg => {
              console.log(errmsg)
            })
        })
        .catch(errmsg => {
          console.log(errmsg)
          this.$message({
            type: 'danger',
            message: '新增失败'
          })
        })
    },
    // 新增标签
    addUserLabel() {
      this.dialogLable = false
    },
    // 删除
    handleforbid(row) {
      // console.log(this.goodsData.departCode);
      deletedOneGoodsLabel({
        goodsCode: this.goodsData.goodsSn,
        goodsLabelCode: row.goodsLabelCode
        // deleted:"0"
      })
        .then(response => {
          this.getGoodsDetail()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(errmsg => {
          // console.log(errmsg);
          // console.log(1234444);
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
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
      this.goodsData.picUrl = response.data.url
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
    // 子商品图片上传成功的钩子
    handleGalleryUrlProduct(response) {
      this.goodsData.picUrl = response.data.allfilePath
    },
    // handleGalleryUrl(response, file, fileList) {
    //   console.log(response);
    //   this.goodsData.avatar = response.data.allfilePath;
    //   // if (response.errno === 0) {
    //   //   this.goodsData.gallery.push(response.data.url);
    //   // }
    // },
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
    //   this.goodsData.url_list.push({
    //     fileName: this.picForm.name,
    //     sortOrder: "",
    //     fileUrl: ""
    //   });
    // },
    handleGalleryUrlLable(response, file, fileList) {
      console.log(fileList)
      console.log(file)
      // this.goodsData.url_list.push({
      //   fileName: this.fileName,
      //   sortOrder: this.sort,
      this.goodsNewLabel.goodsLabelUrl = response.data.allfilePath
      // fileUrl: response.data.allfilePath
      // });
      console.log(this.goodsData)
      // if (response.errno === 0) {
      //   this.goodsData.gallery.push(response.data.url);
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
      for (var i = 0; i < this.goodsData.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        console.log(file)
        console.log(fileList)
        // this.goodsData.url_list.
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goodsData.gallery[i] === url) {
          this.goodsData.gallery.splice(i, 1)
        }
      }
    },
    handleIntroInfo() {

    }
  }
}
</script>
