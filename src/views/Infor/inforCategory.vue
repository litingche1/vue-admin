<template>
  <div id="inforCategory-warp">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category">
              <h4>
                <svg-icon iconClass="plus" iconName="plus" />新闻
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round>编辑</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>编辑</el-button>
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon iconClass="plus" iconName="plus" />新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级编辑分类</h4>
          <el-form  label-width="142px" class="from-warp">
            <el-form-item label="一级分类名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "inforCategory",
  setup() {
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: ""
    });
    return {
      formLabelAlign
    };
  }
};
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
   .from-warp{
      width:420px;
      
    }
  .category {
    line-height: 44px;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
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
        content: "";
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
