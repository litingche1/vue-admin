<template>
    <el-upload
            class="avatar-uploader"
            :action="confing.action"
            :data="data.uploaadKey"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import {reactive, onMounted, watchEffect} from '@vue/composition-api'
    import {Qiniutoken} from "@/utils/common";

    export default {
        name: "ImgUnload",
        props: {
            imageUrl: {
                type: String,
                default: ''
            },
            confing: {
                type: Object,
                default: () => {}
            }
        },
        setup(props, {root, emit}) {
            const data = reactive({
                uploaadKey: {
                    token: '',
                    key: ''
                },
                imageUrl: ''
            })
            //获取七牛云的token
            const getQiniuToken = () => {
                console.log(props.confing)
                let params = {
                    accesskey: props.confing.accesskey,
                    secretkey: props.confing.secretkey,
                    buckety: props.confing.buckety,
                }
                Qiniutoken(params).then(res => {
                    data.uploaadKey.token = res.data.data.token
                })
            }
            //图片上传成功
            const handleAvatarSuccess = (res, file) => {
                console.log(file.raw)
                console.log(res)
                data.imageUrl = URL.createObjectURL(file.raw);
                emit("update:imageUrl", data.imageUrl)
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
            watchEffect(() => {
                data.imageUrl = props.imageUrl
            })
            onMounted(() => {
                getQiniuToken()
            })
            return {
                data,
                handleAvatarSuccess,
                beforeAvatarUpload,
            }
        }
    }
</script>

<style>
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