<template>
  <div id="inforList-warp">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="label-warp category">
          <label for="">类别:</label>
          <div class="warp-content ">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div></div
      ></el-col>
      <el-col :span="6"><div class="label-warp"></div></el-col>
      <el-col :span="6"><div class="label-warp"></div></el-col>
      <el-col :span="6"><div class="label-warp"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
export default {
  name: 'inforList',
  setup() {
    const value = ref('')
    const options = reactive([
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '黄金糕'
      }
    ])
    return {
      value,
      options
    }
  }
}
</script>
<style lang="scss" scoped>
#inforList-warp {
  .category{
    @include labelDom(left,60,40)
  }
}
</style>
