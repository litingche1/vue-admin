<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" />
  </svg>
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const svgName = computed(() =>
      `#icon-${props.iconName}`
    )
    const svgClass = computed(() => {
      return props.iconClass ? `svg-icon ${props.iconClass}` : `svg-icon`
    })
    return {
      svgClass,
      svgName
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill:currentColor;
}
</style>
