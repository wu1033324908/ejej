<!--
 * @Author: your name
 * @Date: 2019-12-06 11:41:13
 * @LastEditTime: 2019-12-13 15:49:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \com-ejej-admin-dev-env\src\components\SvgIcon\index.vue
 -->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
