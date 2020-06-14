<template>
    <div>
        <div class="input-title">
            {{title}}
        </div>
        <input v-if="!cyril && !date && !tel && !email" class="input-input" v-mask="masked" type="text" v-model="val"  @input="upper" :placeholder="placeholder">
        <input v-else-if="cyril" class="input-input" type="text" v-model="val"  @input="cyrilFunc" :placeholder="placeholder">
        <input v-else-if="date" v-mask="masked" type="text" v-model="val" class="input-input"  @input="dateFunc" :placeholder="placeholder">
        <input v-else-if="tel" v-mask="masked" type="text" v-model="val" class="input-input"  @input="telFunc" :placeholder="placeholder">
        <input v-else-if="email" type="text" v-model="val" class="input-input"  @input="emailFunction" :placeholder="placeholder">
        <Icon v-if="data.success" :icon="'ok'"></Icon>
        <Icon v-if="data.error" :message="data.message" :icon="'error'"></Icon>
    </div>
</template>
<script>
import Icon from './Icon.vue'
import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask,{
  placeholders: {
    D: /\d/,        
    C: /[а-яА-Я]/,

  }
});

export default {
    components:{
        Icon,
    },
    props:{
        'value':{},
        'data':{
            default: () => {
                return {
                    success:false,
                    error:false,
                }
            }
        },
        'title':{},
        'masked':{},
        'up':{},
        'placeholder':{},
        'cyril':{},
        'patr':{},
        'date':{},
        'tel':{},
        'email':{},
        'checkEmail':{}

    },

    data(){
        return {
            val:'',
            checkingEmail:''
        }
    },
    mounted(){
        if(this.checkEmail) this.checkingEmail = Object.assign(this.checkEmail)
    },
    watch:{
        checkEmail(val){
            this.checkingEmail = val
        }
    },
    methods:{
        upper(event){
            if(this.up) this.val = event.target.value.toUpperCase();
            if(this.masked.length == event.target.value.length){
                this.data.success = true
                this.data.error = false
            }
            else {      
                this.data.success = false
                this.data.error = true
            }
            this.data.text = event.target.value   
            this.$emit('input', {...this.data})
        },
        cyrilFunc(event){
            const text = event.target.value
            this.data.success = false
            this.data.error = true

            if(!this.patr && text.match(/^[а-яА-Я-ёЁ]+$/i)){
                this.data.success = true
                this.data.error = false
                this.data.text = event.target.value
            }
            else if(this.patr && text.match(/^[а-яА-Я-ёЁ \s]+$/i)){
                this.data.success = true
                this.data.error = false
                this.data.text = event.target.value
            }
                

            this.$emit('input', {...this.data})
        },
        dateFunc(event){
            const dateNow = new Date().getFullYear() - 21;
            const minYear = new Date().getFullYear() - 65;
            let date = event.target.value.split('.');
            this.data.success = false
            this.data.error = true	
            let leapYear = false
            if(date[0] && date[0].length==2 && date[0] >= 1 && date[0] <= 31){
                
                if(date[1] && date[1].length==2 && date[1] >=1 && date[1]<=12){

                    if(date[0] == 29 && date[1] == 2){
                        if(date[2] && date[2].length==4 && date[2] < dateNow && date[2] > minYear){
                            leapYear = date[2] % 4 == 0 && (date[2] % 100 != 0 || date[2]    % 400 == 0);
                                        this.data.success = true
                                        this.data.error = false
                                        this.data.text = event.target.value
                        }else if(date[2] && date[2].length && date[2].length == 4 && date[2] >= dateNow) {
                            this.val = date[0]+'.'+date[1]+'.'
                            this.data.success = false;
                            this.data.error = true;
                        }
                    }else if(date[0] >= 30 && date[1] == 2){
                        if(date[2] && date[2].length ===4 && date[2] < dateNow && date[2] > minYear)  {
                            leapYear = date[2] % 4 == 0 && (date[2] % 100 != 0 || date[2]    % 400 == 0);
                            if(leapYear) {
                                this.val = 29+"."+date[1]+'.'+date[2]
                            }else this.val = 28 +"." + date[1] + date[2]
                            this.data.success = true;
                            this.data.error = false;
                        }
                    }else if(date[0] >=30 && (date[1] == 4 || date[1] == 7 || date[1] == 9 || date[1] == 11)){
                        if(date[2] && date[2].length === 4 &&date[2] < dateNow && date[2] > minYear){
                            this.val=30 +'.' + date[1] +'.'+ date[2]
                            this.data.success = true
                            this.data.error = false
                            this.data.text = event.target.value
                        }
                    }else if(date[1] <= 12 && date[1] <= 1){
                        
                        if(date[1] <=12 ) this.val = date[0] +'.'+ 12
                        if(date[1] <= 1 ) this.val = date[0] +'.'+ '01'
                    }else{
                        if(date[2] && date[2].length === 4 && date[2] < dateNow && date[2] > minYear ){
                            this.data.success = true
                            this.data.error = false
                            this.data.text = event.target.value
                        }else if (date[2] && date[2].length === 4 ){
                            this.val = date[0]+'.'+date[1]+'.'
                            this.data.success = false;
                            this.data.error = true;
                        }
                    }
                }else if( date[1] && date[1].length == 2){
                            this.val=''
                            this.data.success = false;
                            this.data.error = true;
                }
            }else if(date[0] && date[0].length==2 ){
                    
                            this.val = ''
                            this.data.success = false;
                            this.data.error = true;
            }
            this.$emit('input', this.data)
            
        },
        telFunc(event){
            let set = new Set();
            let tel = event.target.value;
            this.data.success = false
            this.data.error = true
            if(this.masked.length == tel.length){
                tel = tel.match(/\d/g)
                tel.splice(0,2)
                tel.forEach(el => {set.add(el)})
                if(set.size  >= 2) {
                    this.data.success = true
                    this.data.error = false
                    this.data.text = event.target.value; 
                }
            }            
            this.$emit('input', {...this.data})
        },
        emailFunction(event){
            const email = event.target.value;
            this.data.success = false;
            this.data.error = true;
            if(email.match(/^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,4}$/) && email.match(/^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/))
            {

                if(this.checkEmail){
                    if(this.checkEmail.text == email){
                        this.data.success = true
                        this.data.error = false
                        this.data.text = email
                    } else {
                        this.data.success = false
                        this.data.error = true
                        this.data.text = email
                    }
                }else{
                    this.data.success = true
                    this.data.error = false
                    this.data.text = email   
                }
            }
            
            this.$emit('input', {...this.data})
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
        font-family: OpenSans;
    }
    &-input{
        font-family: OpenSans;
        font-size: 20px;
        color: #231f20;
        cursor: pointer;
        border:none;
        outline: none;
        &:focus{
            border: none;
        }

    }
}
</style>