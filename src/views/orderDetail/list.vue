<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 09:34:48
 * @LastEditTime: 2019-12-10 11:58:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="app-container">

    <el-card class="box-card">
        <div class="card-head">
            <div class="head">
                <div class="head-l">
                    <img src="" alt="">
                </div>
                <div class="head-r">
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
          
        </div>
      </el-card>
<!-- <el-table v-loading="readListLoading" ref="multipleTable" :data="readlList" element-loading-text="正在查询中。。。" border fit highlight-current-row>
            <el-table-column align="center" label="昵称" prop="nickname"/>
            <el-table-column align="center" label="姓名" prop="userName"/>
            <el-table-column align="center" label="手机号" prop="mobile"/>
          </el-table> -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
</style>

<script>
// import { rollback, list, pushRead } from '@/api/messages'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'ProductorderDetailPage',
  components: { BackToTop },
  data() {
    return {
        
    }
  },
  filters: {
    sendTypeFilter(val){
      if (val === 0 || val === '0') {
        return '直接发送'
      }
      if (val === 1 || val === '1') {
        return '定时发送'
      }
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        console.log(typeof response.data.data.data)
        this.list = response.data.data.data
        this.total = response.data.data.page.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    }
  }
}
</script>
