<template>
    <div>
        <div class="select-title" >{{title}}</div>
        <div class="select-label">
            <div class="select-message">
                <div class="select-input">
                    <input type="text" class="select-write" :class="{'can-write':write}" v-model="params.text" :placeholder="placeholder" :disabled="disabled" @focus="opened" @blur="opened">
                    <span v-if="!params.text && !write">{{placeholder}}</span>
                    <span class="input-input" v-else-if="!write">{{params.text}}</span>
                    <Icon class="select-arrow" :class="{'select-arrow-opened':isOpen}" icon="arrow"></Icon>
                </div>
                <Icon v-if="params.success" icon="ok"></Icon>
                <Icon v-if="params.error" :message="params.message" icon="error"></Icon>
            </div>
            <div class="select-block" v-if="isOpen && write" @mouseenter="enterLeave" @mouseleave="enterLeave">
                <span class="select-hover" v-for="(item, idx) in getSelectedData" :key="idx"  @click="click(item)">
                    {{item.name}}
                </span>
            </div>
            <div class="select-block" v-else-if="isOpen && !write" @mouseenter="enterLeave" @mouseleave="enterLeave">
                <span class="select-hover" v-for="(item, idx) in selectData" :key="idx"  @click="click(item)">
                    {{item.name}}
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from './Icon.vue';

export default {
    components:{
        Icon
    },
    props:{
        title:{},
        placeholder:{
            default:'Выберите...'
        },
        value:{
            default: () => {
                return {
                    text:'',
                    error:false,
                    success:false,
                }
            }
        },
        disabled:{
            default:false
        },
        write:{
            default:true
        },
        selectData:{},
        selectMark:{}
    },
    data(){
        return {
            isOpen: false,
            info:'',
            isSelect:false,
            params:''
        }
    },
    computed:{
        infoMessage:{
            get(){
                return this.info
            },
            set(val){
                this.info = val
            }
        },
        getSelectedData(){
            if(this.selectMark){
                return this.selectData.filter(el=> {
                    return this.selectMark.id === el.markId && el.name.toLowerCase().includes(this.params.text.toLowerCase())
                })
            }else return this.selectData.filter(el=> {
                return el.name.toLowerCase().includes(this.params.text.toLowerCase())
            })
        }
    },
    mounted(){
        this.params = JSON.parse(JSON.stringify(this.value))
    },
    watch:{
        value(val){
            this.params = JSON.parse(JSON.stringify(val))
        }
    },
    methods:{
        click(item){
            this.params.text = item.name;
            this.params.success = true
            this.params.error = false
            this.params.code = item.code,
            this.params.id=item.id
            this.$emit('input',{...this.params})
            this.sameEvent = 'choose'
            this.enterLeave();
            this.opened();
            
        },
        opened(e){   
            if(!this.isSelect) {
                this.isOpen = !this.isOpen                
            }
        },
        t(e){
            console.warn(e)
        },
        enterLeave(){
            this.isSelect = !this.isSelect
        }
    }
}
</script>
<style lang="scss" >
.select{
    &-title{
        text-transform: uppercase;
        font-size: 10px;
        color: #3E3E3E;
        position: absolute;
        top:0;
    }
    &-message{
        font-size: 20px;
        color: #919599;
        cursor: pointer;
        position: absolute;
        width: 100%;
        
        & > input{
            cursor: pointer;
            background-color: transparent;
            border: none;
            font-size: 20px;
            outline: none;
        }
    }
    &-label{
        position: relative;
        height: 25px;
    }
    &-write{
        opacity: 0;
        width: 100%;
        opacity: 0;
        position: absolute;
        width: calc(100% - 50px);
        cursor: pointer;
        background-color: transparent;
        border: none;
        font-size: 20px;
        outline: none;
        &.can-write{
            opacity: 1;
            width: 100%;
        }
    }
    &-block{
        position: absolute;
        border: solid 2px #e0e0e0;
        border-radius: 4px;
        font-size: 16px;
        top: 33px;
        display: flex;
        flex-flow: column;
        overflow: hidden auto;
        max-height: 300px;
        width: calc(100% - 50px);
        z-index: 10;
        background: white;
        & > span{
            padding: 10px 15px;
            white-space: normal;
            line-height: 1;
            cursor: pointer;
        }

    }
    &-input {
        position: relative;
        width: calc(100% - 50px);
        height: 45px;
    }
    &-hover:hover{
        background-color:#dfdfdf
    }
    &-arrow{
        transition-duration: .5s;
        right: 0;
        &-opened{
            transform: rotate(180deg);
        }
    }
}
</style>