<template>
    <div class="form">

        <FormInfo
            v-if="getData && !statusInfo"
            v-model="formInfo"
            @input="checkingStatusInfo"
        />
        <FormUser v-else-if="statusInfo" v-model="formUser" @input="checkingStatusUser"/>
        
        <button class="form-info-next" v-if="next && !calc && !getData.getPrice" @click="nextStep">Далее</button>
        <button class="form-info-next" v-else-if="!next && calc && !getData.getPrice" @click="calculate">Рассчитать</button>
        <button class="form-info-next" v-else-if="getData.getPrice" @click="payed">Оплатить</button> 
        
        <div class="info" v-if="getData.loadMessage">
            
            <div class="info__block">
                <Icon class="info__block-close" icon="close" @click="close"></Icon>
                <button class="info__block-ok" @click="close">
                    Спасибо, понятно
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import FormInfo from './FormComponent/FormInfo'
import FormUser from './FormComponent/FormUser'
import Icon from './FormComponent/Form/Icon'

export default {
    name:'Form',
    components:{
        FormInfo, FormUser, Icon
    },
    watch:{
        statusInfo(val){
            if(val) {
                this.next = false
                this.calc = true
            }
        },
    },
    mounted(){
        this.getConfig();
    },
    computed:{
        ...mapState({
            getData: s => s.data,
        })
    },
    data(){
        return {
            statusInfo:false,
            statusUser:false,
            statusPay:false,
            next:true,
            calc:false,
            pay:false,
            sendObject:{
                car:{},
                insurer:{}
            },
            formInfo:{
                selectMark:{
                    text:'',
                    error:false,
                    success:false,
                    type:'mark',
                    message:'Марка не выбрана'
                },
                selectModel:{
                    text:'',
                    error:false,
                    success:false,
                    type:'model',
                    message:'Модель не выбрана'
                },
                selectTC:{
                    text:'',
                    error:false,
                    success:false,
                    type:'category',
                    message:'Транспортное средство не выбранно'
                },
                selectYear:{
                    text:'',
                    error:false,
                    success:false,
                    type:'year',
                    message:'Год не выбран'
                },
                selectPTC:{
                    text:'',
                    error:false,
                    success:false,
                    type:'pts_type',
                    message:'Тип птс не выбран'
                },
                inputVIN:{
                    text:'',
                    error:false,
                    success:false,
                    type:'vin',
                    message:'Не верный VIN'
                },
                inputNum:{
                    text:'',
                    error:false,
                    success:false,
                    type:'state_number',
                    message:'Не верный номер'
                },
                inputSPTC:{
                    text:'',
                    error:false,
                    success:false,
                    type:'pts_seria',
                    message:'Не верная серия птс'
                },
                inputNPTS:{
                    text:'',
                    error:false,
                    success:false,
                    type:'pts_kind',
                    message:'Не верный тип птс'
                },
                inputSSTS:{
                    text:'',
                    error:false,
                    success:false,
                    type:'sts_seria',
                    message:'Не верная серия стс'
                },
                inputNSTS:{
                    text:'',
                    error:false,
                    success:false,
                    type:'sts_number',
                    message:'Не верный номер стс'
                },
                inputCheckbox:false
            },
            formUser:{
                inputName:{
                    text:'',
                    error:false,
                    success:false,
                    type:'firstname',
                    require: true,
                    message:'Поле может содержать только кириллические символы'
                },
                inputLastName:{
                    text:'',
                    error:false,
                    success:false,
                    type:'lastname',
                    require: true,
                    message:'Поле может содержать только кириллические символы'
                },
                inputPatranom:{
                    text:'',
                    error:false,
                    success:false,
                    type:'middlename',
                    require: false,
                    message:'Поле может содержать только кириллические символы'
                },
                selectSex:{
                    text:'',
                    error:false,
                    success:false,
                    type:'gender',
                    require: true,
                    message:'Не выбран пол'
                },
                dateBirth:{
                    text:'',
                    error:false,
                    success:false,
                    type:'birthday',
                    require: true,
                    message:'Не верная дата рождения, возраст не должен превышать 65 и младше 21'
                },
                serialPasp:{
                    text:'',
                    error:false,
                    success:false,
                    require: true,
                    type:'passport_series',
                    message:'Не верная серия'
                },
                numPasp:{
                    text:'',
                    error:false,
                    success:false,
                    require: true,
                    type:'passport_number',
                    message:'Не верный номер'
                },
                phone:{
                    text:'',
                    error:false,
                    success:false,
                    require: true,
                    type:'phone',
                    message:'Номер телефона не должен содержать 9 одинаковых цифр'
                },
                email:{
                    text:'',
                    error:false,
                    success:false,
                    require: true,
                    type:'email',
                    message:'Формат почты не верен'
                },
                secEmail:{
                    text:'',
                    error:false,
                    success:false,
                    require: true,
                    message:'Почта должна совпадать'
                }
            }
        }
    },
    methods:{
        ...mapActions([
            'getConfig',
            'postSave',
            'getPay',
            'closeModal'
        ]),
        checkingStatusInfo(val){
            Object.values(val).filter(el=> {
                if(typeof el != 'boolean'){
                    if(el.code) this.sendObject.car[el.type] = el.code
                    else this.sendObject.car[el.type] = el.text
                }
            })
        },
        checkingStatusUser(val){
            Object.values(val).filter(el=> {
                    if(el.code) this.sendObject.insurer[el.type] = el.code
                    else this.sendObject.insurer[el.type] = el.text
            })
            
        },
        nextStep(){
            const obj  = this.formInfo;
            this.statusInfo = Object.values(obj).map(el => {
                if(typeof el != 'boolean' && !el.error && !el.success){
                    el.error = true
                }
                if(typeof el == 'boolean') return el
                
                return el.success
            }).every(el => el)
            this.formInfo = {...obj}
            if(this.statusInfo) {
                this.next = false
                this.calc = true
                this.pay = false
            }
        },
        calculate(){
            const obj = this.formUser;
            this.statusUser = Object.values(obj).filter(el => {
                        if(!el.error && !el.success && el.require){
                            el.error = true
                            return el.success
                        }
                        
                    }).every(el => el)
            
            this.formUser = {...obj}
            if (this.statusUser) {
                this.postSave(this.sendObject);
                if(!this.getData.save){
                this.next = false
                this.calc = false
                this.pay = true
                }
            }
        },
        payed(){
            this.getPay()
        },
        close(){
            this.closeModal()
        }
    }
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
    flex-flow: column;
    align-items: center;

    & .info{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        &__block{
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            align-items: flex-end;
            &-close{
                top:15px;
                right: 15px;
            }
        }
        & button{
            border: 1px solid #AAAEB2;
            box-sizing: border-box;
            border-radius: 2px;
            height: 47px;
            background: white;
            padding: 10px;
            margin-bottom: 15%;
            color: #3F3F3F;
            font-size: 20px;
        }
    }
}

</style>