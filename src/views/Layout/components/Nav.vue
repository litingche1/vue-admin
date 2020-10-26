<template>
    <div id="nav-warp">
        <div class="login">
            <img src="../../../assets/logo.png" alt=""/>
        </div>
        <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                :collapse="collapse"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#fff"
                router
        >
            <template v-for="(item, idx) in routerList">
                <el-submenu v-if="!item.hidden" :key="idx" :index="idx + ''">
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :iconName="item.meta.icon"/>
                        <!-- <i class="el-icon-location"></i> -->
                        <span>{{ item.meta.name }}</span>
                    </template>
                    <template v-for="(submenuItem, idx2) in item.children">
                        <el-menu-item
                                v-if="!submenuItem.hidden"
                                :key="idx2"
                                :index="submenuItem.path"
                        >{{ submenuItem.meta.name }}
                        </el-menu-item
                        >
                    </template>
                </el-submenu>
            </template>
        </el-menu>
        <!-- <svg-icon/> -->
    </div>
</template>

<script>
    import {reactive, computed} from '@vue/composition-api'

    export default {
        name: 'layoutnav',
        setup(props, {root}) {
            /**
             * data数据
             */
            const routerList = reactive(root.$router.options.routes)
            const collapse = computed(() => root.$store.state.login.isCollapae)
            const defaultActive = computed(() => {
                const route = root.$route
                const {path} = route
                return path
            })
            /**
             * 函数
             */
            return {
                routerList,
                collapse,
                defaultActive
            }
        }
    }
</script>
<style lang="scss" scoped>
    #nav-warp {
        position: fixed;
        left: 0;
        top: 0;
        width: $mainwidth;
        height: 100vh;
        background: #344a5f;
        @include webkit(transition, all 0.3s ease 0s);

        svg {
            color: #fff;
            font-size: 20px;
            margin-right: 10px;
        }

        .login {
            width: 100px;
            height: 100px;
            margin: 10px auto;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .open {
        #nav-warp {
            width: $mainwidth;
        }
    }

    .close {
        #nav-warp {
            width: $mainWidthMin;

            .login {
                width: 40px;
                height: 40px;
                margin: 10px auto;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
