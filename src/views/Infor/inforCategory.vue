<template>
  <div id="inforCategory-warp">
    <el-button type="danger" @click="addchilds">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div
              class="category"
              v-for="items in categoryData.item"
              :key="items.id"
            >
              <h4>
                <svg-icon iconClass="plus" iconName="plus" />{{
                  items.category_name
                }}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round
                    >添加子级</el-button
                  >
                  <el-button size="mini" round>编辑</el-button>
                </div>
              </h4>
              <ul v-if="items.children">
                <li
                  v-for="childrenitem in items.children"
                  :key="childrenitem.id"
                >
                  {{ childrenitem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>编辑</el-button>
                  </div>
                </li>
              </ul>
            </div>
            <!-- <div class="category">
              <h4><svg-icon iconClass="plus" iconName="plus" />新闻</h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div> -->
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级编辑分类</h4>
          <el-form label-width="142px" class="from-warp">
            <el-form-item label="一级分类名称" v-if="categoryName">
              <el-input v-model="formLabelAlign.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="secondaryCategoryName">
              <el-input
                v-model="formLabelAlign.secondaryCategoryName"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit" :loading="button_loading"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { AddFristCategory, getCategory } from '@/api/news'
export default {
  name: 'inforCategory',
  setup(props, { root }) {
    console.log(props)
    const formLabelAlign = reactive({
      categoryName: '',
      secondaryCategoryName: ''
    })
    const categoryData = reactive({
      item: []
    })
    const categoryName = ref(true)
    const secondaryCategoryName = ref(true)
    const button_loading = ref(false)
    const submit = () => {
      if (!formLabelAlign.categoryName) {
        root.$message({
          message: '一级分类名称不能为空',
          type: 'error'
        })
        return
      }
      button_loading.value = true
      let params = {
        categoryName: formLabelAlign.categoryName
      }
      AddFristCategory(params)
        .then(res => {
          let data = res.data
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: 'success'
            })
            categoryData.item.push(data.data)
          }
          button_loading.value = false
          formLabelAlign.categoryName = ''
          formLabelAlign.secondaryCategoryName = ''
        })
        .catch(err => {
          button_loading.value = false
          formLabelAlign.categoryName = ''
          formLabelAlign.secondaryCategoryName = ''
          console.log(err)
        })
    }
    const addchilds = () => {
      categoryName.value = true
      secondaryCategoryName.value = false
    }
    const getCategorys = () => {
      getCategory({})
        .then(res => {
          if (res.data.resCode === 0) {
            categoryData.item = res.data.data.data
            console.log(res.data.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    /**
     * 生命周期
     */
    onMounted(() => {
      getCategorys()
    })
    // console.log(onMounted())
    return {
      formLabelAlign,
      submit,
      addchilds,
      categoryName,
      secondaryCategoryName,
      categoryData,
      button_loading
    }
  }
}
</script>
<style lang="scss" scoped>
#inforCategory-warp {
  .hr-e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: 0 none;
    border-bottom: 1px solid #e9e9e9;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .category-wrap {
    div:first-child {
      &::before {
        top: 20px;
      }
    }
    div:last-child {
      &::before {
        bottom: 21px;
      }
    }
  }
  .menu-title {
    background: #f3f3f3;
    line-height: 44px;
    padding-left: 22px;
    margin-bottom: 26px;
  }
  .from-warp {
    width: 420px;
  }
  .category {
    line-height: 44px;
    position: relative;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      width: 32px;
      left: 22px;
      top: 0;
      bottom: 0;
      border-left: 1px dotted #000;
    }
    h4 {
      padding-left: 40px;
      position: relative;
    }
    svg {
      position: absolute;
      font-size: 17px;
      top: 14px;
      left: 15px;
    }
    li {
      padding-left: 36px;
      margin-left: 24px;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 32px;
        left: 0;
        top: 22px;
        border-bottom: 1px dotted #000;
      }
    }
    li,
    h4 {
      @include webkit(transition, all 0.3s ease 0s);
      &:hover {
        background: #f3f3f3;
        .button-group {
          display: block;
        }
      }
    }
    .button-group {
      display: none;
      position: absolute;
      z-index: 2;
      right: 11px;
      top: -1px;
      button {
        font-size: 12px;
      }
    }
  }
}
</style>
