<template>
    <div class="form">
        <FormInfo
            v-model="formInfo"
        />

        <transition >
            <FormUser v-if="formInfo.status" :data="formInfo.data"/>
        </transition>
        
    </div>
</template>
<script>
import FormInfo from './FormComponent/FormInfo'
import FormUser from './FormComponent/FormUser'


export default {
    name:'Form',
    components:{
        FormInfo, FormUser
    },
    data(){
        return {
            formInfo:{
                status:false
            }
        }
    },
    watch: {
        formInfo:function(val){
            console.log(val.status)
        }
    },
}
</script>
<style lang="scss">
.form{
    position: relative;
    display: flex;
    justify-content: center;
}
</style>