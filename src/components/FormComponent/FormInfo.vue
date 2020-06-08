<template>
    <div class="form-info">
        <div class="form-info-col">
            <Select class="row" title="Марка" :data="selectMark"  v-model="selectMark.text"></Select>
            <Select class="row" title="Модель" :data="selectModel"  v-model="selectModel.text"></Select>
            <Select class="row" title="Год Выпуска" :data="selectYear"  v-model="selectYear.text"></Select>
            <Input class="row" title="vin номер" :data="inputVIN" v-model="inputVIN.text"/>
            <Input class="row" title="гос номер" :data="inputNum" v-model="inputNum.text"/>
        </div>
        <div class="form-info-col">
            <Select class="row" title="Категория тс" :data="selectTC" v-model="selectTC.text"></Select>
            <Select class="row" title="вид птс" :data="selectPTC" v-model="selectPTC.text"></Select>
            <Input class="row" type="number" title="серия птс" :data="inputSPTC" v-model="inputSPTC"/>
            <Input class="row" type="number" title="номер птс" :data="inputNPTS" v-model="inputNPTS"/>
        </div>
        <div class="form-info-col">
            <Input class="row" type="number" title="серия стс" :data="inputSSTS" v-model="inputSSTS"/>
            <Input class="row" type="number" title="номер стс" :data="inputNSTS" v-model="inputNSTS"/>
        </div>
        <div class="form-info-checkbox"> 
                <div class="custom-checkbox" :class="{'active':inputCheckbox}" @click="changeCheckbox">
                    <Icon v-if="inputCheckbox" class="svg__ok" icon="galochka"/>
                </div>
                <span @click="changeCheckbox">
                    Подтверждаю свое 
                </span>
                <a class="form-info-checkbox-link">Согласие на обработку персональных данных</a>
                <span @click="changeCheckbox">
                    и запрос в БКИ
                </span>
        </div>
        <button class="form-info-next"  @click="next">Далее</button>
    </div>
</template>
<script>
import Select from './Form/Select'
import Input from './Form/Input'
import Icon from './Form/Icon'
export default {
    components:{
        Select,
        Input,
        Icon
    },
    watch:{
        inputNSTS:function(val){
            console.warn(val)
        }
    },
    props:['value'],
    data(){
        return {
            selectMark:{
                text:'',
                error:false,
                success:false
            },
            selectModel:{
                text:'',
                error:false,
                success:false
            },
            selectYear:{
                text:'',
                error:false,
                success:false
            },
            selectTC:{
                text:'',
                error:false,
                success:false
            },
            selectPTC:{
                text:'',
                error:false,
                success:false
            },
            inputVIN:{
                text:'',
                error:false,
                success:false
            },
            inputNum:{
                text:'',
                error:false,
                success:false
            },
            inputSPTC:{
                text:'',
                error:false,
                success:false
            },
            inputNPTS:{
                text:'',
                error:false,
                success:false
            },
            inputSSTS:{
                text:'',
                error:false,
                success:false
            },
            inputNSTS:{
                text:'',
                error:false,
                success:false
            },
            inputCheckbox:false
        }

    },
    methods:{
        changeCheckbox(){
            this.inputCheckbox = !this.inputCheckbox
        },
        next(){            
            const array = [
                this.selectMark,
                this.selectModel,
                this.selectYear,
                this.selectTC,
                this.selectPTC,
                this.inputVIN,
                this.inputNum,
                this.inputSPTC,
                this.inputNPTS,
                this.inputSSTS,
                this.inputNSTS,
            ]  
            let object = { status: this.inputCheckbox}
            if(this.inputCheckbox) {
                object = {
                    status: array.some(el => el.success === true && el.error === false),
                    data: array
                }
            }     
            this.$emit('input', object)
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