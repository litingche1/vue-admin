<template>
    <div>
        <div>--------------b组件</div>
        {{data}}
        <button @click="eventTg()">孙组件调用父亲组件的方法</button>
        <div>{{data2}}</div>

    </div>
</template>

<script>
    import {reactive, inject,watch} from '@vue/composition-api'

    export default {
        name: "B",
        props: {
            list: {
                type: String,
            }
        },
        setup(props, {attrs, emit, root}) {
            console.log(props)
            console.log(attrs)
            const data2 = inject("customVal");
            const data = reactive(attrs)
            const eventTg = () => {
                emit('22')
                root.$store.commit('lx/AAA', 1111)
            }
            watch(()=>root.$store.state.lx.aaa,(val)=>{
                console.log(val)
            })
            return {
                data,
                eventTg,
                data2
            }
        }

    }
</script>

<style scoped>

</style>
