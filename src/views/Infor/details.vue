<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="信息分类：">
            <el-select v-model="form.categoryId" placeholder="请选择活动区域">
                <el-option v-for="(item,idx) in data.categoryList" :label="item.category_name" :value="item.category_name"
                           :key="idx"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新闻标题：">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="缩略图：">
            缩略图
        </el-form-item>
        <el-form-item label="发布时间：">
            <el-date-picker
                    v-model="form.createDate"
                    type="date"
                    disabled
                    style="width: 200px;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="详细内容：">
            <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="data.button_status">保存</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    import {reactive, onMounted} from '@vue/composition-api'
    import {EditInfo, getInfor} from '@/api/news'
    import {getInforCategory, timestampToTime} from "@/utils/common";
    import {quillEditor} from "vue-quill-editor";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        name: 'Itemdetails',
        components: {
            quillEditor,
        },
        setup(props, {root}) {
            console.log(props)
            const data = reactive({
                id: root.$store.state.inforList.id || sessionStorage.getItem('inForItemId'),
                categoryList: [],
                button_status: false,
                editorOption: {}
            })
            // data.categoryList = getInforCategory().getCategoryData()
            console.log(getInforCategory())
            const form = reactive({
                categoryId: '',
                title: '',
                createDate: '',
                imgUrl: '',
                content: ''
            })
            console.log(data.id)
            const editInfo = () => {
                data.button_status = true
                let params = {
                    id: data.id,
                    categoryId:form.categoryId,
                    title: form.title,
                    imgUrl: '',
                    updateDate: '',
                    content: form.content,
                }
                EditInfo(params).then(res => {
                    data.button_status = false
                    if (res.data.resCode === 0) {
                        root.$message({
                            message: res.data.message,
                            type: 'success'
                        })
                    }
                }).catch(err => {
                    data.button_status = false
                    console.log(err)
                })
            }
            const GetInfor = () => {
                let requestData = {
                    pageNumber: 1,
                    pageSize: 1,
                    id: data.id
                }
                getInfor(requestData).then(response => {
                    let responseData = response.data.data.data[0]
                    console.log(responseData)
                    form.categoryId = responseData.categoryId;
                    form.title = responseData.title;
                    form.createDate = timestampToTime(responseData.createDate);
                    form.content = responseData.content;
                    form.imgUrl = responseData.imgUrl;
                }).catch(err => {
                    console.log(err)
                })
            }
            //保存
            const onSubmit = () => {
                editInfo()
            }
            onMounted(() => {
                GetInfor()

            })

            return {
                form,
                data,
                onSubmit
                // divs,
            }
        }
    }
</script>
<style lang="scss" scoped></style>
