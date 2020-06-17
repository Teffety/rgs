<template>
    <div class="form-info">
        <div class="form-info-col">
            <Select class="row" title="Марка" :write="false" :selectData="getMarks" v-model="form.selectMark" @input="$emit('input',form)"></Select>
            <Select class="row" title="Модель" :selectData="getModels" :selectMark="form.selectMark" :disabled="isDisabled" v-model="form.selectModel" @input="$emit('input',form)"></Select>
            <Select class="row" title="Год Выпуска" :selectData="selectYearArray" v-model="form.selectYear" @input="$emit('input',form)"></Select>
            <Input class="row" title="vin номер" masked="NNNNNNNNNNNNNNNNN" :data="form.inputVIN" v-model="form.inputVIN" @input="$emit('input',form)"/>
            <Input class="row" title="гос номер" placeholder='A 123 AA 123' up="true" masked='C DDD CC DDD' :data="form.inputNum" v-model="form.inputNum" @input="$emit('input',form)"/>
        </div>
        <div class="form-info-col">
            <Select class="row" title="Категория тс" :write="false" :selectData="getPtsTypes" v-model="form.selectTC" @input="$emit('input',form)"></Select>
            <Select class="row" title="вид птс" :selectData="getCategories" v-model="form.selectPTC" @input="$emit('input',form)"></Select>
            <Input class="row" masked="DDDD" placeholder="1234" title="серия птс" :data="form.inputSPTC" v-model="form.inputSPTC" @input="$emit('input',form)"/> 
            <Input class="row" masked="DDDDDD" placeholder="123456" title="номер птс" :data="form.inputNPTS" v-model="form.inputNPTS" @input="$emit('input',form)"/>
        </div>
        <div class="form-info-col">
            <Input class="row" masked="DDDD" placeholder="1234" title="серия стс" :data="form.inputSSTS" v-model="form.inputSSTS" @input="$emit('input',form)"/>
            <Input class="row" masked="DDDDDD" placeholder="123456" title="номер стс" :data="form.inputNSTS" v-model="form.inputNSTS" @input="$emit('input',form)"/>
        </div>
        <div class="form-info-checkbox"> 
                <div class="custom-checkbox" :class="{'active':form.inputCheckbox}" @click="changeCheckbox">
                    <Icon v-if="form.inputCheckbox" class="svg__ok" icon="galochka"/>
                </div>
                <span @click="changeCheckbox">
                    Подтверждаю свое 
                </span>
                <a class="form-info-checkbox-link">Согласие на обработку персональных данных</a>
                <span @click="changeCheckbox">
                    и запрос в БКИ
                </span>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Select from './Form/Select'
import Input from './Form/Input'
import Icon from './Form/Icon'
export default {
    components:{
        Select,
        Input,
        Icon
    },
    props:['value'],
    computed:{
        ...mapState({
            getMarks: s => s.data.marks,
            getModels: s => s.data.models,
            getPtsTypes: s => s.data.ptsTypes,
            getCategories: s => s.data.categories
        }),
        selectYearArray(){
            const startYear = 1950;
            let date = new Date().getFullYear()
            const array = []
            for(; startYear < date; date--){
                array.push({
                    name:`${date}`,
                    code:`${date}`
                })
            }
            return array
        },
    },
    data(){
        return {
            form:'',
            isDisabled:true
        }
    },
    watch:{
        value(val){
            this.form = JSON.parse(JSON.stringify(val));    
        },
        'form.selectMark':function(val){
            this.isDisabled = !val.success
        }
    },
    mounted(){
        this.form = JSON.parse(JSON.stringify(this.value));
    },
    methods:{
        changeCheckbox(){
            this.form.inputCheckbox = !this.form.inputCheckbox
            this.$emit('input',this.form)
        }
    }
}
</script>
<style lang="scss">
    .form-info{
        display: flex;
        width: fit-content;
        position: relative;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: center;
        padding: 60px;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
        &-col{
            width: 300px;
            min-width: 240px;
            & .row{
                height: 45px;
                position: relative;
                padding-bottom:30px;
                display: flex;
                flex-flow: column;
                justify-content: flex-end;
                &:after{
                    content: '';
                    position: absolute;
                    width: calc(100% - 50px);
                    height: 1px;
                    bottom: 20px;
                    left:0;
                    background-color: #D0D4D9;
                }
            }
        }
        &-next{
            position: absolute;
            bottom: 0px;
            background: #B31B2C;
            border-radius: 2px;
            border: none;
            padding: 15px 60px;
            color: white;
            transform: translateY(50%);
            outline: none;
            cursor: pointer;
        }
        &-checkbox{
            font-size: 14px;
            left: calc(50% - 180px);
            bottom: 60px;
            padding: 20px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select:none;
            &-link{
            color: #B31B2C;
            }
            & .active{
                background-color: #B31B2C;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            & > *{
                margin: 0px 10px 0px 0px
            }
        }
    }
    .svg__ok{
        position: absolute;
        top: 2px;
        left: 2px;
    }
    #form-checkbox{
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .custom-checkbox{
        width: 20px;
        height: 20px;
        border: solid 1px #d0d4d9;
        border-radius: 2px;
    }
@media screen and (max-width:1040px) {

    .form-info{
        &-col{
            width: 100%;
        }
        &-checkbox{
            bottom: 30px;
            left:0;
            width: 100%;

        }
    }
}
</style>