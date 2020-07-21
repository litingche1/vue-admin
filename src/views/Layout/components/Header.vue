<template>
  <div id="header-warp">
    <div class="pull-left header-icon" @click="NavStatus">
      <svg-icon iconClass="menu" iconName="menu" />
    </div>
    <div class="pull-right">
      <div class="pull-left avatar">
        <img src="../../../assets/home/tx.jpg" alt="" />
      </div>
      <div class="user-infor pull-left">{{userName}}</div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="dropout" iconName="dropout" />
      </div>
    </div>
  </div>
</template>

<script>
import {  computed } from '@vue/composition-api'
export default {
  name: 'layoutheader',
  setup(props, { root }) {
    const userName = computed(()=>root.$store.state.login.userName)
    const NavStatus = () => {
      root.$store.commit('login/SET_COLLAPSE')
    }
    const exit = ()=>{
      root.$store.dispatch('login/loginout').then(()=>{
        root.$router.push({
            name: 'Login'
          })
      })
    }
    return {
      NavStatus,
      userName,
      exit
    }
  }
}
</script>
<style lang="scss" scoped>
#header-warp {
  position: fixed;
  left: $mainwidth;
  height: 75px;
  top: 0;
  right: 0;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  background: #fff;
  .header-icon {
    padding: 0 32px;
    svg {
      font-size: 25px;
      cursor: pointer;
      margin-bottom: -8px;
    }
  }
  .user-infor {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
  }
  .avatar {
    width: 50px;
    height: 50px;
    margin-top: 12.5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50% 50%;
    }
  }
}
.open {
  #header-warp {
    left: $mainwidth;
  }
}
.close {
  #header-warp {
    left: $mainWidthMin;
  }
}
</style>
