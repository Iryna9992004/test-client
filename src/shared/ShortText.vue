<template>
    <my-input placeholder="Write a question" v-model="question"/>
    <my-input placeholder="Write an answer" v-model="answer"/>
</template>

<script>

import MyInput from '../UI/MyInput';

export default{
    components:{MyInput},
    data(){
        return{
            question:'',
            answer:null
        }
    },
    watch:{
        question(){
            this.$store.commit('setQuestion',this.question);

        },
        answer(){
            this.$store.commit('setRightAnswer',this.answer)
        }
    }
}
</script>