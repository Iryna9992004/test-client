<template>
    <my-input placeholder="Write a question" v-model="question"/>
    <textarea class="textarea" placeholder="Long text" v-model="text"></textarea>
</template>

<script>

import MyInput from '../UI/MyInput';

export default{
    components:{MyInput},
    data(){
        return{
            question:'',
            text:''
        }
    },
    watch:{
        question(){
            this.$store.commit('setQuestion',this.question)
        },
        text(){
            this.$store.commit('setRightAnswer',this.text)
        }
    }
}
</script>

<style scoped>
.textarea{
   width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border:1px solid lightgrey;
    height:200px
}
</style>