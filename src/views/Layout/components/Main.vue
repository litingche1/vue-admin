<template>
  <div id="main-warp">
      <router-view/>
  </div>
</template>

<script>
export default {
 name:'layoutmain'
}
</script>
<style lang="scss" scoped>
#main-warp {
  position: fixed;
  left: $mainwidth;
  top: 75px;
  right: 0px;
  bottom: 0px;
  border: 30px solid #f7f7f7;
  border-bottom: 0 none;
  box-sizing: border-box;
}
</style>
