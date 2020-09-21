<template>
  <div id="inforList-warp">
    <!-- 头部 -->
    <el-row :gutter="14" class="inforList-warp-header">
      <el-col :span="4">
        <div class="label-warp category">
          <label for>分类&nbsp;&nbsp;:</label>
          <div class="warp-content">
            <el-select
              v-model="categoryvalue"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options.item"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-warp date">
          <label for class="description">日期&nbsp;&nbsp;:</label>
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
      <el-col :span="4">
        <div class="label-warp keyword">
          <label for class="description">关键字&nbsp;&nbsp;:</label>
          <div class="warp-content">
            <el-select
              v-model="keywordvalue"
              placeholder="请选择"
              style="width:100%"
            >
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
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width:100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <div class="div-box"></div>
      </el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          style="width:100%"
          class="pull-right"
          @click="showtck"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <!-- 内容 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="types" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="danger" @click="deleteItem()"
            >删除</el-button
          >
          <el-button size="mini" type="success" @click="editItem()"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll()">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>
    <Dialogs :showlog.sync="dialogShow" />
  </div>
</template>

<script>
import Dialogs from './dialog/index'
import { ref, reactive, watchEffect,onMounted } from '@vue/composition-api'
import { global } from '@/utils/globla.js'
import {getInforCategory} from "@/utils/common";
export default {
  name: 'inforList',
  components: {
    Dialogs
  },
  setup(props) {
    console.log(props)
    const { str: zfc, confirm: confirmed } = global()
    const {categoryItem,getCategoryData} = getInforCategory()
    watchEffect(() => {
      console.log(zfc.value)
    })
    const categoryvalue = ref('') //类别选中的值
    const keywordvalue = ref('') //关键字选中的值
    const datevalue = ref('') //日期框选中的值
    const input = ref('')
    const dialogShow = ref(false) //日期框选中的值
    const options = reactive({
      item:[ {
        value: '选项1',
        label: '国际信息'
      },
        {
          value: '选项2',
          label: '国内信息'
        },
        {
          value: '选项3',
          label: '行业信息'
        }]
    }

    )
    const keywordoptions = reactive([
      {
        value: '选项1',
        label: 'ID'
      },
      {
        value: '选项2',
        label: '标题'
      }
    ])
    const tableData = reactive([
      {
        date: '2016-05-02',
        user: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        types: '类型1'
      },
      {
        date: '2016-05-02',
        user: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        types: '类型1'
      },
      {
        date: '2016-05-02',
        user: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        types: '类型1'
      },
      {
        date: '2016-05-02',
        user: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄',
        types: '类型1'
      }
    ])
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`)
    }
    const handleCurrentChange = val => {
      console.log(`每页 ${val} 条`)
    }
    //新增
    const showtck = () => {
      dialogShow.value = true
    }
    //表格删除按钮
    const deleteItem = () => {
      confirmed({
        content: '此操作将永久删除该文件, 是否继续?',
        id: 42222,
        tip: '警告'
      })
    }
    //表格编辑
    const editItem = () => {
      dialogShow.value = true
    }
    //批量删除
    const deleteAll = () => {
      confirmed({
        content: '此操作将永久删除所选择的文件, 是否继续?',
        id: 42222,
        tip: '警告',
        fn:confirms,
      })
    }
    const confirms = val =>{
       console.log(val)
    }
    /*
    * 生命周期函数
    * */
    onMounted(()=>{
      getCategoryData()
    })
    //获取分类列表
    watchEffect(()=>{
      options.item=categoryItem.item
    })
    return {
      categoryvalue,
      keywordvalue,
      datevalue,
      input,
      dialogShow,
      options,
      keywordoptions,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      showtck,
      deleteItem,
      editItem,
      deleteAll
    }
  }
}
</script>
<style lang="scss" scoped>
#inforList-warp {
  .description {
    padding-right: 5px;
    box-sizing: border-box;
  }
  .div-box {
    padding: 8px;
    box-sizing: border-box;
  }
  .inforList-warp-header {
    margin-bottom: 18px;
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
