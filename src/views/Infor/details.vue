<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="信息分类：">
            <el-select v-model="form.categoryId" placeholder="请选择活动区域">
                <el-option v-for="(item,idx) in data.categoryList" :label="item.category_name" :value="item.id"
                           :key="idx"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新闻标题：">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="缩略图：">
            <ImgUpload :imageUrl.sync="form.imageUrl" :confing="ImgUploadConfig"></ImgUpload>
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
    import {reactive, onMounted, watchEffect,onActivated} from '@vue/composition-api'
    import {EditInfo, getInfor} from '@/api/news'
    import {getInforCategory, timestampToTime} from "@/utils/common";
    import {quillEditor} from "vue-quill-editor";
    import ImgUpload from "@c/ImgUpload/index";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    // import { mapGetters } from 'vuex';
    export default {
        name: 'Itemdetails',
        components: {
            quillEditor,
            ImgUpload,
        },
        setup(props, {root}) {
            console.log(props)
            const data = reactive({
                id: root.$store.state.inforList.id || sessionStorage.getItem('inForItemId'),
                categoryList: [],
                button_status: false,
                editorOption: {},
            })
            const {categoryItem, getCategoryData} = getInforCategory()
            const form = reactive({
                categoryId: '',
                title: '',
                createDate: '',
                imgUrl: '',
                content: '',
                imageUrl: ''
            })
            const ImgUploadConfig = reactive({
                action: 'http://up-z2.qiniup.com',
                accesskey: 'gKSspSs6S6ZtVbEJ6phllzZ_iDgAlKUHhuy7wKCW',
                secretkey: 'snQe1ZFy3WXe0zXwLpWgc4PY4Es0080yXG_9HO0N',
                buckety: 'litingchen--vue3',
            })
            //保存编辑的内容
            const editInfo = () => {
                data.button_status = true
                let params = {
                    id: data.id,
                    categoryId: form.categoryId,
                    title: form.title,
                    imgUrl: form.imageUrl,
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
            //获取改条信息的详情内容
            const GetInfor = () => {
                let requestData = {
                    pageNumber: 1,
                    pageSize: 1,
                    id: data.id,
                    imgUrl: form.imageUrl
                }
                getInfor(requestData).then(response => {
                    let responseData = response.data.data.data[0]
                    form.categoryId = responseData.categoryId;
                    form.title = responseData.title;
                    form.createDate = timestampToTime(responseData.createDate);
                    form.content = responseData.content;
                    form.imageUrl = responseData.imgUrl;
                }).catch(err => {
                    console.log(err)
                })
            }
            //保存
            const onSubmit = () => {
                editInfo()
            }
            watchEffect(() => {
                data.categoryList = categoryItem.item
            })
            onMounted(() => {
                getCategoryData()

            })
            onActivated(()=>{
                data.id=root.$store.state.inforList.id || sessionStorage.getItem('inForItemId')
                GetInfor()
            })
            return {
                form,
                data,
                onSubmit,
                ImgUploadConfig,
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
