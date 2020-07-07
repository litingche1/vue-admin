<template>
  <div id="nav-warp">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, idx) in routerList">
        <el-submenu v-if="!item.hidden" :key="idx" :index="idx + ''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :iconName="item.meta.icon" />
            <!-- <i class="el-icon-location"></i> -->
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="(submenuItem, idx2) in item.children"
            :key="idx2"
            :index="submenuItem.path"
            >{{ submenuItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
    <!-- <svg-icon/> -->
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  name: 'layoutnav',
  setup(props, { root }) {
    /**
     * data数据
     */
    const routerList = reactive(root.$router.options.routes)
    console.log(root.$router.options.routes)
    /**
     * 函数
     */
    function handleOpen(key, keyPath) {
      console.log(key, keyPath)
    }
    function handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
      routerList
    }
  }
}
</script>
<style lang="scss" scoped>
#nav-warp {
  position: fixed;
  left: 0;
  top: 0;
  width: $mainwidth;
  height: 100vh;
  background: #344a5f;
  svg {
    color: #fff;
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
