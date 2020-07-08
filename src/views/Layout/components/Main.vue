<template>
  <div id="main-warp">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutmain'
}
</script>
<style lang="scss" scoped>
#main-warp {
  // position: fixed;
  // left: $mainwidth;
  // top: 75px;
  // right: 0px;
  // bottom: 0px;
  // border: 30px solid #f7f7f7;
  // border-bottom: 0 none;
  // box-sizing: border-box;
  height: 100vh;
  .main-content {
    width: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-left: $mainwidth + 30;
    padding-right: 30px;
    box-sizing: border-box;
    @include webkit(transition, all 0.3s ease 0s);
    .content {
      width: 100%;
      height: 100%;
      padding: 30px 30px 0 30px;
      // padding-left: 30px;
      box-sizing: border-box;
      background: #fff;
    }
  }
}
.open {
  #main-warp {
    .main-content {
      padding-left: $mainwidth + 30;
    }
  }
}

.close {
  #main-warp {
    .main-content {
      padding-left: $mainWidthMin + 30;
      // width: $mainWidthMin;
    }
  }
}
</style>
