<template>
  <div id="header-warp">
      我是头部
  </div>
</template>

<script>
export default {
 name:'layoutheader'
}
</script>
<style lang="scss" scoped>
#header-warp {
  position: fixed;
  left: $mainwidth;
  height: 75px;
  top:0;
  right: 0;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
</style>
