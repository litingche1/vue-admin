<template>
  <div id="header-warp">
      <div class="pull-left header-icon">
         <svg-icon iconClass="menu" iconName="menu" />
      </div>
      <div class="pull-right">
        <div class="pull-left avatar"><img src="../../../assets/home/tx.jpg" alt=""></div>
        <div class="user-infor pull-left">管理员</div>
        <div class="header-icon pull-left">
          <svg-icon iconClass="dropout" iconName="dropout" />
          </div>
      </div>
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
  line-height: 75px;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  .header-icon{
    padding:0 32px;
    svg{
      font-size:25px;
      cursor: pointer;
      margin-bottom: -8px;
    }
  }
  .user-infor{
    height:100%;
    padding:0 32px;
    border-right:1px solid #ededed;
  }
  .avatar{
    width:75px;
    height: 75px;
    border-radius: 50% 50%;
    img{
      width:100%;
      height:100%;
    }
  }
}
</style>
