<template>
    <div class="form-user">
        <div class="form-user-col">
            <Input class="row cyril"  cyril="true" placeholder="Иванов" title="Фамилия" :data="form.inputLastName" v-model="form.inputLastName" @input="$emit('input',form)"/>
            <Input class="row cyril"  cyril="true" placeholder="Иван" title="Имя" :data="form.inputName" v-model="form.inputName" @input="$emit('input',form)"/>
            <Input class="row cyril"  cyril="true" placeholder="Иванович" patr="true" title="Отчество" :data="form.inputPatranom" v-model="form.inputPatranom" @input="$emit('input',form)"/>
            <Select class="row" :write="false" type="text" v-model="form.selectSex" :selectData="gender" title="Пол"  @input="$emit('input',form)"/>
        </div>
        <div class="form-user-col">
            <Input class="row" date="true" masked="DD.DD.DDDD" placeholder="дд.мм.гг" title="Дата Рождения" :data="form.dateBirth" v-model="form.dateBirth" @input="$emit('input',form)"/>
            <Input class="row" masked="DDDD" placeholder="1234" title="Серия паспорта" :data="form.serialPasp" v-model="form.serialPasp" @input="$emit('input',form)"/>
            <Input class="row" masked="DDDDDD" placeholder="123456" title="номер паспорта" :data="form.numPasp" v-model="form.numPasp" @input="$emit('input',form)"/>
        </div>
        <div class="form-user-col">
            <Input class="row" tel="true" masked="+7 (9DD) DDD-DD-DD" placeholder="+7 (123) 456 78 90" title="Мобильный телефон" :data="form.phone" v-model="form.phone" @input="$emit('input',form)"/>
            <Input class="row" email="true" placeholder="ivanovivan@mail.ru" title="Электронная почта"  :data="form.email" v-model="form.email" @input="$emit('input',form)"/>
            <Input class="row" email="true" placeholder="ivanovivan@mail.ru" title="Подтвердите электронную почту" :checkEmail="form.email"  :data="form.secEmail" v-model="form.secEmail" @input="$emit('input',form)"/>
        </div>
        <div class="price" v-if="getPrice">
            <span class="price-text">
                стоимость полиса
                <p>{{price}} &#8381;</p> 
            </span>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import Select from './Form/Select';
import Input from './Form/Input';

export default {
    components:{
        Select,
        Input
    },
    props:['data','value'],
    data(){
        return {
            form:''
        }
    },
    mounted(){
        this.form = JSON.parse(JSON.stringify(this.value));
    },
    watch:{
        value(val){
            this.form = JSON.parse(JSON.stringify(val));
        }
    },
    computed:{
        ...mapState({
            gender: s => s.data.gender,
            getPrice: s => s.data.getPrice,
            price: s => s.data.price
        })
    },
}
</script>
<style lang="scss" >
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
                &.cyril input{
                    text-transform: capitalize;
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
    .price{
        background: #F9F9F9;
        border-radius: 2px;
        width: 100%;
        min-height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
        &-text{
            color: #3E3E3E;
            font-size:18px;
            & p{ 
                color:#B31B2C;
                font-size: 25px;
                margin: 0;
            }
        }
    }
    @media screen and (max-width:1040px) {

    .form-user{
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