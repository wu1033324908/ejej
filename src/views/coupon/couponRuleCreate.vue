<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 18:16:57
 * @LastEditTime: 2019-12-11 10:05:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>{{ titleName }}</h3>
      <el-form ref="fromData" :rules="rules" :model="fromData" label-width="150px">
        <el-form-item label="优惠券类型" prop="type">
          <el-select v-model="fromData.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="fromData.name" />
        </el-form-item>
        <!-- <el-form-item label="优惠券类型">
          <el-select v-model="fromData.nosendtype" placeholder="请选择" @change="getList">
            <el-option
              v-for="item in nosendtypes"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="卡券" prop="title">
          <el-select v-model="fromData.couponCode" placeholder="请选择">
            <el-option
              v-for="item in couponCodeList"
              :key="item.couponCode"
              :label="item.name"
              :value="item.couponCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="人数限制" prop="total">
          <el-input v-model="fromData.total" placeholder="如果是0，则是不限制"/>
        </el-form-item>
        <el-form-item label="领券数量" prop="limit">
          <el-input v-model="fromData.limit" placeholder="如果为空，则是默认限制1张"/>
        </el-form-item>
        <el-form-item label="规则内容" prop="content">
          <el-input v-model="fromData.content"/>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="fromData.startTime"
            class="filter-item"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="fromData.endTime"
            class="filter-item"
            type="datetime"
            placeholder="截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish('fromData')">保存</el-button>
    </div>
  </div>
</template>

<style scoped>
.el-form-item{
    width: 49%;
    float: left;
}
.el-input{
    width: 196px;
}
.el-select{
    width: 196px;
}
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
import { getCouponList, couponRuleCreate, couponRuleUpdate } from '@/api/coupon'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'CouponRuleCreate',
  data() {
    return {
      fromData: {
      },
      isShowInput: false,
      typeList: [{ name: '注册赠送', id: 0 }, { name: '消费赠送', id: 1 }, { name: '登陆赠送', id: 2 }, { name: '充值赠送', id: 3 }, { name: '评论赠送', id: 4 }, { name: '自定义', id: 5 }],
      nosendtypes: [{ name: '商品券', id: 0 }, { name: '服务类型券', id: 1 }],
      couponCodeList: [],
      listQuery: {
        page: 1,
        limit: 9999
      },
      rules: {
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '优惠券类型不能为空',
            trigger: 'change'
          }
        ],
        discount: [
          {
            required: true,
            message: '请输入正确的金额',
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            trigger: 'blur'
          }
        ],
        min: [
          {
            required: true,
            message: '请输入正确的金额',
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            trigger: 'blur'
          }
        ],
        limit: [
          {
            required: true,
            message: '请选择每人限领张数',
            trigger: 'change'
          }
        ],
        safeMoney: [
          {
            message: '请输入正确的价格',
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            trigger: 'blur'
          }
        ],
        procedureMoney: [
          {
            message: '请输入正确的价格',
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            trigger: 'blur'
          }
        ],
        refundDay: [
          {
            message: '请输入正确的还款日',
            pattern: /^[0-9]+$/,
            trigger: 'blur'
          }
        ],
        timeLimit: [
          {
            message: '请输入正确的期限',
            pattern: /^[0-9]+$/,
            trigger: 'blur'
          }
        ]
      },
      pushTimeOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Wajueji-Admin-Token': getToken()
      }
    },
    titleName() {
      if (!this.fromData.id) {
        return '新增优惠券'
      } else {
        return '编辑优惠券'
      }
    }
  },
  created() {
    // this.getTypeList()
    this.init()
    this.getList()
  },
  methods: {
    init() {
      if (!this.$route.query.data) return
      const data = JSON.parse(this.$route.query.data)
      console.log(data)
      this.fromData = data

    //   couponOne({ id: this.$route.query.id }).then(response => {

    //   }).catch(() => {

    //   })
    },
    getList() {
      // this.listQuery.type = data
      getCouponList(this.listQuery).then(response => {
        this.couponCodeList = response.data.data.data
      }).catch(() => {
        this.list = []
      })
    },
    handleCancel() {
      this.$router.push({
        path: '/coupon/couponList'
      })
    },
    getTypeList() {
      this.listLoading = true
    //   couponTypeList().then(response => {
    //     this.typeList = response.data.data.data

    //   }).catch(() => {
    //     this.typeList = []
    //   })
    },
    handlePublish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var finalGoods = this.fromData
          if (finalGoods.discount / finalGoods.min > 0.2) {
            this.$message({
              message: '抵扣金额最大值为使用门槛的20%',
              type: 'warning'
            })
            return false
          }
          console.log(finalGoods)
          if (finalGoods.id) {
            couponRuleUpdate(finalGoods)
              .then(response => {
                this.$notify.success({
                  title: '成功',
                  message: '保存成功'
                })
                this.$router.push({ path: '/coupon/couponRuleList' })
              })
              .catch(response => {
                MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              })
          } else {
            couponRuleCreate(finalGoods)
              .then(response => {
                this.$notify.success({
                  title: '成功',
                  message: '保存成功'
                })
                this.$router.push({ path: '/coupon/couponRuleList' })
              })
              .catch(response => {
                MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
                  confirmButtonText: '确定',
                  type: 'error'
                })
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRadio(data) {
      // if(data === '1'){

      // }else{

      // }
      // console.log(data)
    },
    handleChangeSelect(data) {
      const _this = this
      // console.log(_this.fromData.type)
      data === 1 || data === '1' ? _this.isShowInput = true : _this.isShowInput = false
    }
  }
}
</script>
