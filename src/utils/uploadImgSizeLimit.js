/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 12:49:53
 * @LastEditTime: 2019-08-13 15:31:26
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by jiachenpan on 17/3/8.
 */
export default function beforeUploadImg(file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    this.$message({
      message: '上传文件大小不能超过 2MB!',
      type: 'warning'
    })
  }
  return isLt2M
}

