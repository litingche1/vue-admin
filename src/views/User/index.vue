<template>
    <div id="user-warp">
        <el-row :gutter="16">
            <el-col :span="20">
                <div class="label-wrap">
                    <label for="">关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <el-select v-model="data.selectValue">
                                  <el-option v-for="item in data.option" :key="item.value"
                                             :label="item.lable"
                                             :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-input placeholder="请输入搜索关键字">

                                </el-input>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="danger">
                                    搜索
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right">
                    添加用户
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {reactive} from '@vue/composition-api'

    export default {
        name: 'user',
        setup(props, {root}) {
          console.log(props,root)
            const data = reactive({
              selectValue:'name',
                option: [
                    {value: 'name', lable: '姓名'},
                    {
                        value: 'phone', lable: '手机号'
                    },
                    {
                        value: 'email', lable: '邮箱'
                    }
                ]
            })
            return {
                data
            }
        }
    }
</script>
<style lang="scss" scoped>
    #user-warp {
        .label-wrap {
            @include labelDom(left, 60, 40);
        }
    }
</style>
