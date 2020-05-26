<template>
    <div>
        <div class="input-title">
            {{title}}
        </div>
        <input class="input-input" type="text" @input="checking($event.target.value)" :placeholder="placeholder">
        <Icon v-if="data.success" :icon="'ok'"></Icon>
        <Icon v-if="data.error" :icon="'error'"></Icon>
    </div>
</template>
<script>
import Icon from './Icon.vue'

export default {
    components:{
        Icon
    },
    props:{
        value:{},
        title:{},
        type:{
            default:'text'
        },
        data:{},
        placeholder:{}
    },
    data(){
        return {
        }
    },
    methods:{
        checking(value){
            if(this.type === 'number'){
                if (value.length != 0 && value.match(/[^\d\s0-9]/gi) === null) {
                    this.data.success = true
                    this.data.error = false
                }else {
                    this.data.success = false
                    this.data.error = true
                }
            }
            if(this.type === 'rus'){
                 if (value.length != 0 && value.match(/[^а-яА-Я\s]/) === null) {
                    this.data.success = true
                    this.data.error = false
                }else {
                    this.data.success = false
                    this.data.error = true
                 }
            }
            if(this.type === 'email'){
                if (value.length != 0 && value.match( /\S+@\S+\.\S+/) !== null) {
                    this.data.success = true
                    this.data.error = false
                 }else {
                    this.data.success = false
                    this.data.error = true
                 }
            }
            this.$emit('input',this.data)
        }
    }
}
</script>
<style lang="scss">
.input{
    &-title{
        text-transform: uppercase;
        font-size: 10px;
        color: #3E3E3E;
        position: absolute;
        top:0;
    }
    &-input{
        font-size: 20px;
        color: black;
        cursor: pointer;
        border:none;
        outline: none;
        &:focus{
            border: none;
        }

    }
}
</style>