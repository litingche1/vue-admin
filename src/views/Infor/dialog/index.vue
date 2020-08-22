<template>
  <el-dialog
    title="新增"
    :visible.sync="showdialog"
    @close="closedshow"
    width="580px"
  >
    <el-form :model="forms">
      <el-form-item label="类型:" :label-width="formLabelWidth">
        <el-select v-model="forms.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth">
        <el-input v-model="forms.name" placeholder="请选输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况:" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="forms.name"
          placeholder="请选输入内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closedshow">取消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watchEffect } from '@vue/composition-api'
export default {
  name: 'dialogs',
  props: {
    showlog: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const showdialog = ref(false)
    const formLabelWidth = ref('70px')
    const forms = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    })
    watchEffect(() => {
      showdialog.value = props.showlog
    })
    const closedshow = () => {
      showdialog.value = false
      emit('update:showlog', false)
    }

    return {
      closedshow,
      showdialog,
      forms,
      formLabelWidth
    }
  }
}
</script>

<style></style>
