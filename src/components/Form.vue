<template>
    <div class="form">
        <FormInfo
            v-if="!formInfo.status"
            v-model="formInfo"
        />
        <FormUser v-else :data="formInfo.data"/>    
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
            
        }
    },
}
</script>
<style lang="scss">
@font-face {
    font-family: OpenSans;
    src: url(FormComponent/Form/OpenSansRegular.woff2);
}
.form{
    position: relative;
    display: flex;
    justify-content: center;
}
</style>