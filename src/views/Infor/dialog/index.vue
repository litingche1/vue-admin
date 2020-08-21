<template>
  <el-dialog title="收货地址" :visible.sync="showdialog" @closed="closedshow">
      333
</el-dialog>
</template>

<script>
export default {
name:'dialogs',
props:{
 showlog:{
     type:Boolean,
 }
},
data(){
    return{
showdialog:false,
    }
},
watch:{
showlog(val){
 this.showdialog=val
}
},
methods:{
    closedshow(){
        this.$emit('update:showlog',false)
    }
}
// setup(){
//     const showdialog=ref(false)
//     const closed =()=>{
//         this.$emit('update:dialogShow',false)
//     }
//     return{
//         closed,
//         showdialog
//     }
// }
}
</script>

<style>

</style>