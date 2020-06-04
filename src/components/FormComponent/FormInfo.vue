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
                <input type="checkbox" value="checkbox" v-model="inputCheckbox" id="form-checkbox"/>
                <div class="custom-checkbox"></div>
                <label for="#form-checkbox">
                    Подтверждаю свое 
                        <a class="form-info-checkbox-link">Согласие на обработку персональных данных</a>
                    и запрос в БКИ
                </label>
        </div>
        <button class="form-info-next"  @click="next">Далее</button>
    </div>
</template>
<script>
import Select from './Form/Select'
import Input from './Form/Input'
export default {
    components:{
        Select,
        Input
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
        padding:60px 60px 100px 60px;
        background: #FFFFFF;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
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
        }
        &-checkbox{
            font-size: 14px;
            left: calc(50% - 180px);
            bottom: 100px;
            padding: 20px;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            & label{
                margin-left: 10px;
            }
            &.row:after{
                content: none;
            }
            &-link{
            color: #B31B2C;

        }
        }
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