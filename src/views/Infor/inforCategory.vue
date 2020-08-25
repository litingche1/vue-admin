<template>
  <div id="inforCategory-warp">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <h4>
            <!-- <svg-icon iconClass="minus"></svg-icon> -->
                <svg-icon iconClass="minus" iconName="minus" />
              新闻</h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
          <div class="category">
            <h4>新闻</h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16"> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inforCategory'
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
  .category {
    line-height: 44px;
    position: relative;
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
    svg{
      position: absolute;
      // font-size:16px;
      top:15px;
      left:15px;

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
  }
}
</style>
