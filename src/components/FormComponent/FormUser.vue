<template>
    <div class="form-user">
        <div class="form-user-col">
            <Input class="row" type="text" cyril title="Фамилия" :data="inputLastName" v-model="inputLastName"/>
            <Input class="row" type="text" cyril title="Имя" :data="inputName" v-model="inputName"/>
            <Input class="row" type="text" cyril title="Отчество" :data="inputPatranom" v-model="inputPatranom"/>
            <Select class="row" title="Пол" />
        </div>
        <div class="form-user-col">
            <Input class="row" type="number" title="Дата Рождения" :data="dateBirth" v-model="dateBirth"/>
            <Input class="row" type="number" title="Серия паспорта" :data="serialPasp" v-model="serialPasp"/>
            <Input class="row" type="number" title="номер паспорта" :data="numPasp" v-model="numPasp"/>
        </div>
        <div class="form-user-col">
            <Input class="row" type="number" title="Мобильный телефон" :data="phone" v-model="phone"/>
            <Input class="row" type="email" title="Электронная почта" :data="email" v-model="email"/>
            <Input class="row" type="email" title="Подтвердите электронную почту" :data="secEmail" v-model="secEmail"/>
        </div>
        <button class="form-info-next"  @click="sell">Оплатить</button>
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
    props:['data'],
    data(){
        return {
            inputName:{
                text:'',
                error:false,
                success:false
                },
            inputLastName:{
                text:'',
                error:false,
                success:false
                },
            inputPatranom:{
                text:'',
                error:false,
                success:false
                },
            selectSex:{
                text:'',
                error:false,
                success:false
                },
            dateBirth:{
                text:'',
                error:false,
                success:false
                },
            serialPasp:{
                text:'',
                error:false,
                success:false
                },
            numPasp:{
                text:'',
                error:false,
                success:false
                },
            phone:{
                text:'',
                error:false,
                success:false
                },
            email:{
                text:'',
                error:false,
                success:false
                },
            secEmail:{
                text:'',
                error:false,
                success:false
                }
        }
    },
    methods:{
        sell(){
            this.data
            console.warn()
        }
    }
}
</script>
<style lang="scss">
    .form-user{
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
</style>