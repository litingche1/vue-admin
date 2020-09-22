<template>
  <div>
    <div v-for="(item, i) in list" :ref="el => {divs[i]=el }" :key="i">
      {{ item }}
    </div>
  </div>
</template>

<script>
  import { ref, reactive ,onMounted,onBeforeUpdate } from '@vue/composition-api'
export default {
  name:'home',
  setup(props, { refs}){
    console.log(props)

    const list = reactive([1, 2, 3])
    const divs = ref([])

    // 确保在每次变更之前重置引用
    onBeforeUpdate(() => {
      // console.log(divs)
      // divs.value = []
    })
    onMounted(()=>{
      console.log(Object.values(refs)[0][0].innerText)
    })

    return {
      list,
      divs,
    }
  }
}
</script>
<style lang="scss" scoped></style>
