<template>
    <div>
        <div class="select-title">{{title}}</div>
        <div class="select-message">{{message}}</div>
        <div v-for="(item, idx) in selectData" :key="idx">
            {{item}}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{},
        message:{
            default:'Выберите...'
        },
        selectData:{ }
    }
}
</script>
<style lang="scss">
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
    }
}
</style>