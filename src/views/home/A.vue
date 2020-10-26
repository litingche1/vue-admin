<template>
    <div>
        <div>--------------A组件</div>
        {{data}}
        <B v-bind="$attrs" v-on="$listeners"></B>
<!--        {{list}}-->
<!--        <button @click="eventTg(9)">子组件改变父组件的传入的值</button>-->
    </div>
</template>

<script>
    import {reactive,provide} from '@vue/composition-api'
    import B from "./B";
    export default {
        name: "A",
        components: {B},
        props:{
          list:{
              type:String,
          }
        },
        setup(props,{attrs}) {
            console.log(props)
            provide("customVal", "provide、inject传递的值");
            // console.log(content.attrs)
            const data= reactive(attrs)
            return {
                data
                // eventTg,
            }
        }

    }
</script>

<style scoped>

</style>
