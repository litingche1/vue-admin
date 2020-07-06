<template>
  <div id="layout-warp">
      <LayoutHeader></LayoutHeader>
      <LayoutMain></LayoutMain>
      <LayoutNav></LayoutNav>
  </div>
</template>

<script>
import LayoutHeader from './components/Header'
import LayoutMain from './components/Main'
import LayoutNav from './components/Nav'
export default {
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  }
}
</script>
<style lang="scss" scoped>
#layout-warp {
  background: #f7f7f7;
}
</style>
