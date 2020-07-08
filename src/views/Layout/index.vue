<template>
  <div id="layout-warp" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
    <LayoutNav></LayoutNav>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import LayoutHeader from './components/Header'
import LayoutMain from './components/Main'
import LayoutNav from './components/Nav'
export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.isCollapae)
    return {
      menuStatus
    }
  }
}
</script>
<style lang="scss" scoped>
#layout-warp {
  background: #f7f7f7;
}
</style>
