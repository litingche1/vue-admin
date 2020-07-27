<template>
  <div id="inforList-warp">
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label-warp category">
          <label for>类别&nbsp;&nbsp;:</label>
          <div class="warp-content">
            <el-select v-model="categoryvalue" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-warp date">
          <label for="" class="description">日期&nbsp;&nbsp;:</label>
          <div class="warp-content">
            <el-date-picker
              v-model="datevalue"
              style="width:100%"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-warp keyword">
          <label for="" class="description">关键字&nbsp;&nbsp;:</label>
          <div class="warp-content">
            <el-select v-model="keywordvalue" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in keywordoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="input" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%">搜索</el-button>
      </el-col>
      <el-col :span="3">
      <div class="div-box"></div>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" class="pull-right">新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "inforList",
  setup() {
    const categoryvalue = ref("");//类别选中的值
    const keywordvalue = ref("");//关键字选中的值
    const datevalue = ref("");//日期框选中的值
    const input = ref("");
    const options = reactive([
      {
        value: "选项1",
        label: "国际信息"
      },
      {
        value: "选项2",
        label: "国内信息"
      },
      {
        value: "选项3",
        label: "行业信息"
      }
    ]);
        const keywordoptions = reactive([
      {
        value: "选项1",
        label: "ID"
      },
      {
        value: "选项2",
        label: "标题"
      }
    ]);
    return {
      categoryvalue,
      keywordvalue,
      datevalue,
      input,
      options,
      keywordoptions
    };
  }
};
</script>
<style lang="scss" scoped>
#inforList-warp {
   .description{
      padding-right:5px;
      box-sizing: border-box;
    }
    .div-box{
      padding:8px;
      box-sizing: border-box;
    }
  .category {
    @include labelDom(left, 60, 40);
  }
  .date {
    @include labelDom(right, 93, 40);
  }
  .keyword {
    @include labelDom(right, 99, 40);
  }
}
</style>
