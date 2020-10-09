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
            <el-upload
                    class="avatar-uploader"
                    action="http://up-z2.qiniup.com"
                    :data="data.uploaadKey"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
    import {reactive, onMounted, watchEffect} from '@vue/composition-api'
    import {EditInfo, getInfor} from '@/api/news'
    import {getInforCategory, timestampToTime, Qiniutoken} from "@/utils/common";
    import {quillEditor} from "vue-quill-editor";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    // import { mapGetters } from 'vuex';
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
                editorOption: {},
                uploaadKey: {
                    token: '',
                    key: ''
                }
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
            //保存编辑的内容
            const editInfo = () => {
                data.button_status = true
                let params = {
                    id: data.id,
                    categoryId: form.categoryId,
                    title: form.title,
                    imgUrl:form.imageUrl,
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
                    imgUrl:form.imageUrl
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
            //图片上传成功
            const handleAvatarSuccess = (res, file) => {
                console.log(file.raw)
                console.log(res)
                form.imageUrl = URL.createObjectURL(file.raw);
            }
            //
            const beforeAvatarUpload = file => {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    root.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    root.$message.error('上传头像图片大小不能超过 2MB!');
                }
                const suffix = file.name
                const key = encodeURI(`${suffix}`)
                data.uploaadKey.key = key
                return isJPG && isLt2M;
            }
            //获取七牛云的token
            const getQiniuToken = () => {
                let params = {
                    accesskey: 'gKSspSs6S6ZtVbEJ6phllzZ_iDgAlKUHhuy7wKCW',
                    secretkey: 'snQe1ZFy3WXe0zXwLpWgc4PY4Es0080yXG_9HO0N',
                    buckety: 'litingchen--vue3',
                }
                Qiniutoken(params).then(res => {
                    data.uploaadKey.token = res.data.data.token
                })
            }
            // computed(()=>{
            // ...mapGetters(['ptRouter', 'tradingCenter']),
            // })
            watchEffect(() => {
                data.categoryList = categoryItem.item
            })
            onMounted(() => {
                getCategoryData()
                GetInfor()
                getQiniuToken()
            })

            return {
                form,
                data,
                onSubmit,
                handleAvatarSuccess,
                beforeAvatarUpload
                // divs,
            }
        }
    }
</script>
<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
